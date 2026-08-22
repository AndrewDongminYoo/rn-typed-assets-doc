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
