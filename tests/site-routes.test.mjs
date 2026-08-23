import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  {
    path: "/",
    marker: "React Native Toolkits",
    destinations: [
      "/rn-agents-kit",
      "/rn-typed-assets",
      "/rn-newarch-ready",
      "/design-to-nativewind",
    ],
  },
  {
    path: "/rn-agents-kit",
    marker: "RN Agents Kit",
    destinations: ["https://github.com/AndrewDongminYoo/rn-agents-kit"],
  },
  {
    path: "/rn-typed-assets",
    marker: "rn-typed-assets",
    destinations: [
      "https://github.com/AndrewDongminYoo/rn-typed-assets",
      "https://www.npmjs.com/package/rn-typed-assets",
    ],
  },
  {
    path: "/rn-newarch-ready",
    marker: "rn-newarch-ready",
    destinations: [
      "https://github.com/AndrewDongminYoo/rn-newarch-ready",
      "https://www.npmjs.com/package/rn-newarch-ready",
    ],
  },
  {
    path: "/design-to-nativewind",
    marker: "Design to NativeWind",
    destinations: [
      "https://github.com/AndrewDongminYoo/design-to-nativewind",
      "https://www.figma.com/community/plugin/1653684573206075427/design-to-nativewind",
    ],
  },
];

for (const route of routes) {
  test(`${route.path} renders its public product contract`, async () => {
    const response = await fetch(new URL(route.path, baseUrl), { redirect: "manual" });
    const html = await response.text();

    assert.equal(response.status, 200, `${route.path} returned HTTP ${response.status}`);
    assert.match(html, new RegExp(route.marker, "i"));

    for (const destination of route.destinations) {
      assert.ok(
        html.includes(`href="${destination}"`),
        `${route.path} is missing a link to ${destination}`
      );
    }
  });
}

const assets = [
  { path: "/sitemap.xml", marker: "/rn-agents-kit</loc>" },
  { path: "/robots.txt", marker: "Sitemap:" },
  { path: "/llms.txt", marker: "# React Native Toolkits" },
];

for (const asset of assets) {
  test(`${asset.path} is served`, async () => {
    const response = await fetch(new URL(asset.path, baseUrl), { redirect: "manual" });
    const body = await response.text();

    assert.equal(response.status, 200, `${asset.path} returned HTTP ${response.status}`);
    assert.ok(body.includes(asset.marker), `${asset.path} is missing ${asset.marker}`);
  });
}

// Legacy root fragments redirect into this route, so these ids are a public contract.
const typedAssetsAnchors = [
  "start",
  "features",
  "how-it-works",
  "installation",
  "cli",
  "configuration",
  "ci",
];

test("/rn-typed-assets keeps its legacy section anchors", async () => {
  const response = await fetch(new URL("/rn-typed-assets", baseUrl), { redirect: "manual" });
  const html = await response.text();

  assert.equal(response.status, 200, `/rn-typed-assets returned HTTP ${response.status}`);

  for (const anchor of typedAssetsAnchors) {
    assert.ok(html.includes(`id="${anchor}"`), `/rn-typed-assets lost the #${anchor} anchor`);
  }
});

// A product page without its own openGraph block inherits the root one, which once made every
// product link preview as the site root. The origin is build-time, so only the path is asserted.
test("product routes advertise themselves in og:url", async () => {
  for (const route of routes.filter((candidate) => candidate.path !== "/")) {
    const response = await fetch(new URL(route.path, baseUrl), { redirect: "manual" });
    const html = await response.text();
    const match = html.match(/property="og:url" content="([^"]*)"/);

    assert.ok(match, `${route.path} emits no og:url`);
    assert.ok(
      match[1].endsWith(route.path),
      `${route.path} advertises ${match[1]} instead of itself`
    );
  }
});

// A segment without its own opengraph-image file inherits the root card, so every product link
// previews as the hub. The origin is build-time, so the assertion is on the resolved path.
test("every route advertises its own og:image", async () => {
  for (const route of routes) {
    const response = await fetch(new URL(route.path, baseUrl), { redirect: "manual" });
    const html = await response.text();
    const match = html.match(/property="og:image" content="([^"]*)"/);

    assert.ok(match, `${route.path} emits no og:image`);

    // Crawlers do not resolve a relative og:image, so this must parse without a base.
    const image = new URL(match[1]);
    const expected = route.path === "/" ? "/opengraph-image" : `${route.path}/opengraph-image`;

    assert.equal(image.pathname, expected, `${route.path} advertises ${image.pathname}`);

    const card = await fetch(new URL(image.pathname + image.search, baseUrl));

    assert.equal(card.status, 200, `${expected} returned HTTP ${card.status}`);
    assert.equal(card.headers.get("content-type"), "image/png", `${expected} is not a PNG`);
  }
});

// --- Agent readiness -------------------------------------------------------
//
// Everything below is a public contract with automated readers: content negotiation per
// acceptmarkdown.com, structured data, canonical metadata, and a recoverable 404.

const negotiableRoutes = [
  "/",
  "/rn-agents-kit",
  "/rn-typed-assets",
  "/rn-newarch-ready",
  "/design-to-nativewind",
  "/about",
  "/contact",
  "/privacy",
];

const trustRoutes = ["/about", "/contact", "/privacy"];

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mainOf(html) {
  const match = html.match(/<main[\s\S]*?<\/main>/);

  assert.ok(match, "response has no <main> element");

  return match[0];
}

function jsonLdGraph(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  assert.equal(blocks.length, 1, `expected exactly one JSON-LD block, found ${blocks.length}`);

  // The component escapes `<` so a payload can never terminate the script element early.
  return JSON.parse(blocks[0][1].replaceAll("\\u003c", "<"))["@graph"];
}

function nodeOfType(graph, type) {
  const node = graph.find((candidate) => candidate["@type"] === type);

  assert.ok(node, `JSON-LD graph has no ${type} node`);

  return node;
}

function varyIncludesAccept(response) {
  // fetch() joins repeated Vary headers, which is what a spec-compliant cache sees.
  const vary = response.headers.get("vary") ?? "";

  return vary
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .includes("accept");
}

// A nonexistent path must answer a real 404 rather than a 200 with the app shell, or an agent
// concludes every path on the site exists.
test("a nonexistent path answers HTTP 404 in both representations", async () => {
  const html = await fetch(new URL("/no-such-path-exists-here", baseUrl), {
    headers: { accept: "text/html" },
    redirect: "manual",
  });

  assert.equal(html.status, 404);
  assert.match(html.headers.get("content-type") ?? "", /text\/html/);

  const markdown = await fetch(new URL("/no-such-path-exists-here", baseUrl), {
    headers: { accept: "text/markdown" },
    redirect: "manual",
  });

  assert.equal(markdown.status, 404);
  assert.equal(markdown.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.ok(varyIncludesAccept(markdown), "the Markdown 404 does not vary on Accept");
});

// The 404 body is what an agent recovers from, so it has to name where to look next.
test("the 404 body points agents at the live routes and the machine-readable endpoints", async () => {
  const markdown = await (
    await fetch(new URL("/no-such-path-exists-here", baseUrl), {
      headers: { accept: "text/markdown" },
    })
  ).text();

  assert.match(markdown, /^# 404/m);

  for (const path of ["/llms.txt", "/agents.md", "/sitemap.xml", "/robots.txt", ...trustRoutes]) {
    assert.ok(markdown.includes(path), `the Markdown 404 never mentions ${path}`);
  }

  const html = await (
    await fetch(new URL("/no-such-path-exists-here", baseUrl), { headers: { accept: "text/html" } })
  ).text();

  for (const path of ["/llms.txt", "/agents.md", "/sitemap.xml", ...trustRoutes]) {
    assert.ok(html.includes(path), `the HTML 404 never links ${path}`);
  }
});

for (const route of negotiableRoutes) {
  test(`${route} serves Markdown for Accept: text/markdown`, async () => {
    const response = await fetch(new URL(route, baseUrl), {
      headers: { accept: "text/markdown" },
      redirect: "manual",
    });

    assert.equal(response.status, 200, `${route} returned HTTP ${response.status}`);
    assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
    assert.ok(varyIncludesAccept(response), `${route} does not vary on Accept`);

    const body = await response.text();

    assert.match(body, /^# .+/, `${route} has no Markdown H1`);
    assert.ok(body.includes("Canonical URL:"), `${route} states no canonical URL`);
  });

  test(`${route} keeps serving HTML to a browser Accept header`, async () => {
    const response = await fetch(new URL(route, baseUrl), {
      headers: { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
      redirect: "manual",
    });

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
  });
}

// RFC 9110 §12.5.1 ranking. A positional-only implementation gets the middle two cases wrong.
const negotiationCases = [
  { accept: "text/markdown", expected: "text/markdown" },
  { accept: "text/markdown, text/html;q=0.9", expected: "text/markdown" },
  { accept: "text/markdown;q=0.5, text/html;q=0.9", expected: "text/html" },
  // A specific range overrides a wildcard regardless of q, so this rejects HTML.
  { accept: "text/html;q=0, */*", expected: "text/markdown" },
  { accept: "*/*", expected: "text/html" },
  { accept: "text/*", expected: "text/html" },
];

for (const negotiation of negotiationCases) {
  test(`Accept: ${negotiation.accept} resolves to ${negotiation.expected}`, async () => {
    const response = await fetch(new URL("/", baseUrl), {
      headers: { accept: negotiation.accept },
      redirect: "manual",
    });

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", new RegExp(negotiation.expected));
  });
}

test("a request with no Accept header still gets HTML", async () => {
  // undici always sends one, so drop it explicitly rather than trusting the default.
  const response = await fetch(new URL("/", baseUrl), {
    headers: { accept: "" },
    redirect: "manual",
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);
});

test("an Accept header this site cannot satisfy answers 406, not a silent fallback", async () => {
  const response = await fetch(new URL("/", baseUrl), {
    headers: { accept: "application/pdf" },
    redirect: "manual",
  });

  assert.equal(response.status, 406);
  assert.ok(varyIncludesAccept(response), "the 406 does not vary on Accept");

  const body = await response.text();

  // RFC 9110 §15.5.7 recommends listing what is available so the client can retry.
  assert.ok(body.includes("text/html"), "the 406 body does not list text/html");
  assert.ok(body.includes("text/markdown"), "the 406 body does not list text/markdown");
});

// Metadata images are single-representation resources: negotiating them would 406 the Open Graph
// crawlers that correctly ask for image/*.
test("metadata images and static files are never renegotiated", async () => {
  for (const path of ["/opengraph-image", "/icon.svg", "/robots.txt", "/sitemap.xml"]) {
    const response = await fetch(new URL(path, baseUrl), {
      headers: { accept: "image/avif,image/webp,*/*;q=0.8" },
      redirect: "manual",
    });

    assert.equal(response.status, 200, `${path} returned HTTP ${response.status}`);
  }
});

// `Link: rel="alternate"` and `<link rel="alternate">` both point at the .md sibling, and a
// crawler that follows one may send no Accept header at all.
for (const route of negotiableRoutes) {
  test(`${route} has a working .md sibling`, async () => {
    const sibling = route === "/" ? "/index.md" : `${route}.md`;
    const response = await fetch(new URL(sibling, baseUrl), { redirect: "manual" });

    assert.equal(response.status, 200, `${sibling} returned HTTP ${response.status}`);
    assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");

    const negotiated = await (
      await fetch(new URL(route, baseUrl), { headers: { accept: "text/markdown" } })
    ).text();

    assert.equal(
      await response.text(),
      negotiated,
      `${sibling} and ${route} disagree on the Markdown body`
    );
  });
}

test("every route advertises its Markdown alternate", async () => {
  for (const route of negotiableRoutes) {
    const sibling = route === "/" ? "/index.md" : `${route}.md`;
    const response = await fetch(new URL(route, baseUrl), { headers: { accept: "text/html" } });
    const html = await response.text();

    assert.match(
      html,
      new RegExp(`<link rel="alternate" type="text/markdown" href="[^"]*${sibling}"`),
      `${route} has no <link rel="alternate"> for ${sibling}`
    );

    const link = response.headers.get("link") ?? "";

    assert.ok(
      link.includes(sibling) && link.includes('type="text/markdown"'),
      `${route} sends no Link: rel="alternate" header`
    );
  }
});

// Next 16's app-page template overwrites `Vary` during the render, so the proxy's value cannot
// survive on an HTML page. vercel.json restores it at the edge; this asserts the config stays.
test("vercel.json declares Accept in Vary for HTML pages", async () => {
  const { readFile } = await import("node:fs/promises");
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const rule = config.headers.find((entry) =>
    entry.headers.some((header) => header.key.toLowerCase() === "vary")
  );

  assert.ok(rule, "vercel.json declares no Vary header rule");

  const vary = rule.headers.find((header) => header.key.toLowerCase() === "vary").value;
  const tokens = vary.split(",").map((token) => token.trim().toLowerCase());

  assert.ok(tokens.includes("accept"), "the edge Vary value omits Accept");

  // Overriding Next's own value must not drop what its router needs to key on.
  for (const token of [
    "rsc",
    "next-router-state-tree",
    "next-router-prefetch",
    "next-router-segment-prefetch",
  ]) {
    assert.ok(tokens.includes(token), `the edge Vary value drops ${token}`);
  }
});

// Metadata completeness: the four signals agents use for entity resolution and attribution.
for (const route of ["/", ...routes.slice(1).map((entry) => entry.path), ...trustRoutes]) {
  test(`${route} carries canonical, lang, og:image, and og:type`, async () => {
    const html = await (await fetch(new URL(route, baseUrl), { redirect: "manual" })).text();
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/);

    assert.ok(canonical, `${route} emits no canonical link`);

    const canonicalPath = new URL(canonical[1]).pathname.replace(/\/$/, "");

    assert.equal(
      canonicalPath === "" ? "/" : canonicalPath,
      route,
      `${route} canonicalises to ${canonical[1]}`
    );
    assert.match(html, /<html[^>]*\slang="[a-z-]+"/, `${route} has no html lang`);
    assert.match(html, /<meta property="og:image" content="http/, `${route} has no og:image`);
    assert.match(html, /<meta property="og:type" content="\w+"/, `${route} has no og:type`);
  });
}

// Structured data: the identity an agent parses instead of guessing from prose.
test("the home page publishes Organization, WebSite, and product structured data", async () => {
  const html = await (await fetch(new URL("/", baseUrl), { redirect: "manual" })).text();
  const graph = jsonLdGraph(html);

  const organization = nodeOfType(graph, "Organization");

  assert.ok(organization.name);
  assert.ok(organization.url);
  assert.ok(organization.description);

  // Organization completeness: a reachable channel *and* a jurisdiction.
  const contactPoint = Array.isArray(organization.contactPoint)
    ? organization.contactPoint[0]
    : organization.contactPoint;

  assert.ok(contactPoint, "Organization has no contactPoint");
  assert.ok(contactPoint.contactType, "contactPoint has no contactType");
  assert.ok(
    contactPoint.email || contactPoint.telephone,
    "contactPoint has neither email nor telephone"
  );
  assert.equal(organization.address?.["@type"], "PostalAddress");
  assert.ok(organization.address.addressCountry, "PostalAddress has no addressCountry");

  const website = nodeOfType(graph, "WebSite");

  assert.equal(website.publisher["@id"], organization["@id"]);

  const list = nodeOfType(graph, "ItemList");

  assert.equal(list.numberOfItems, routes.length - 1);

  for (const entry of list.itemListElement) {
    assert.equal(entry.item["@type"], "SoftwareApplication");
    assert.ok(entry.item.name && entry.item.url && entry.item.description);
    assert.ok(entry.item.offers, `${entry.item.name} states no offers`);
  }

  const faqPage = nodeOfType(graph, "FAQPage");

  assert.ok(faqPage.mainEntity.length >= 3);

  // Structured data must restate what the page actually says, not add claims of its own.
  const text = textOf(html);

  for (const question of faqPage.mainEntity) {
    assert.ok(text.includes(question.name), `the page does not show the question ${question.name}`);
  }
});

for (const route of routes.slice(1)) {
  test(`${route.path} publishes SoftwareApplication structured data`, async () => {
    const html = await (await fetch(new URL(route.path, baseUrl), { redirect: "manual" })).text();
    const graph = jsonLdGraph(html);
    const software = nodeOfType(graph, "SoftwareApplication");

    assert.ok(software.url.endsWith(route.path));
    assert.ok(software.description);
    assert.ok(software.offers);
    assert.equal(software.codeRepository, route.destinations[0]);

    nodeOfType(graph, "Organization");
    nodeOfType(graph, "BreadcrumbList");
  });
}

// Server-rendered content: an agent with JavaScript disabled must still see a page.
test("the home page ships an H1, a nested heading outline, and real text without JavaScript", async () => {
  const html = await (await fetch(new URL("/", baseUrl), { redirect: "manual" })).text();
  const main = mainOf(html);
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));

  assert.equal(levels.filter((level) => level === 1).length, 1, "the home page has no single H1");
  assert.ok(levels.filter((level) => level === 2).length >= 4, "the home page has too few H2s");
  assert.ok(levels.filter((level) => level === 3).length >= 4, "the home page has no H3 depth");
  assert.ok(textOf(main).length >= 4000, "the home page renders too little text server-side");
});

// Trust anchors: the pages an agent checks before recommending anything the site publishes.
for (const route of trustRoutes) {
  test(`${route} is a real page with substantive content`, async () => {
    const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });

    assert.equal(response.status, 200, `${route} returned HTTP ${response.status}`);

    const main = mainOf(await response.text());

    assert.ok(
      textOf(main).length >= 500,
      `${route} renders under 500 characters of body text server-side`
    );
    assert.match(main, /<h1[\s>]/, `${route} has no H1`);
  });

  test(`${route} is reachable from the site footer`, async () => {
    const html = await (await fetch(new URL("/", baseUrl), { redirect: "manual" })).text();

    assert.ok(html.includes(`href="${route}"`), `the home page never links ${route}`);
  });

  test(`${route} is listed in the sitemap`, async () => {
    const xml = await (
      await fetch(new URL("/sitemap.xml", baseUrl), { redirect: "manual" })
    ).text();

    assert.ok(xml.includes(`${route}</loc>`), `${route} is missing from the sitemap`);
  });
}

// Agent instructions: when-to-use guidance, not marketing copy.
test("/llms.txt carries when-to-use guidance and the full route index", async () => {
  const response = await fetch(new URL("/llms.txt", baseUrl), { redirect: "manual" });

  assert.equal(response.status, 200);

  const body = await response.text();

  assert.match(body, /^# React Native Toolkits$/m);
  assert.match(body, /^> /m, "llms.txt has no blockquote summary");
  assert.match(body, /^## When to use these toolkits$/m, "llms.txt has no when-to-use section");
  assert.ok(body.includes("Do not reach for these tools"), "llms.txt names no exclusions");

  for (const route of [...routes.map((entry) => entry.path), ...trustRoutes]) {
    if (route !== "/") {
      assert.ok(body.includes(route), `llms.txt never links ${route}`);
    }
  }

  for (const path of ["/agents.md", "/sitemap.xml", "/robots.txt"]) {
    assert.ok(body.includes(path), `llms.txt never links ${path}`);
  }
});

test("/agents.md is a dedicated agent instruction file", async () => {
  const response = await fetch(new URL("/agents.md", baseUrl), { redirect: "manual" });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");

  const body = await response.text();

  assert.match(body, /^## When to use these tools$/m);
  assert.match(body, /^## When not to use them$/m);
  assert.match(body, /^## How to consume this site$/m);

  for (const route of routes.slice(1)) {
    assert.ok(body.includes(route.marker), `agents.md never names ${route.marker}`);
  }
});

// The Markdown representation is generated from the same catalog as the page, so a fact that
// drifts between them is a bug rather than a formatting choice.
test("product Markdown restates the catalog facts the page shows", async () => {
  for (const route of routes.slice(1)) {
    const markdown = await (
      await fetch(new URL(route.path, baseUrl), { headers: { accept: "text/markdown" } })
    ).text();

    assert.ok(markdown.startsWith(`# ${route.marker}`), `${route.path}.md has the wrong H1`);
    assert.match(markdown, /^## When to use it$/m, `${route.path}.md has no when-to-use section`);

    for (const destination of route.destinations) {
      assert.ok(markdown.includes(destination), `${route.path}.md is missing ${destination}`);
    }
  }
});
