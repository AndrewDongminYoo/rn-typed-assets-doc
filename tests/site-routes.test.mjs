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
