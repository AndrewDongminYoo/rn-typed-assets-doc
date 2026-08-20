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
    destinations: ["https://github.com/AndrewDongminYoo/rn-typed-assets"],
  },
  {
    path: "/rn-newarch-ready",
    marker: "rn-newarch-ready",
    destinations: ["https://github.com/AndrewDongminYoo/rn-newarch-ready"],
  },
  {
    path: "/design-to-nativewind",
    marker: "Design to NativeWind",
    destinations: ["https://github.com/AndrewDongminYoo/design-to-nativewind"],
  },
];

for (const route of routes) {
  test(`${route.path} renders its public product contract`, async () => {
    const response = await fetch(new URL(route.path, baseUrl));
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
