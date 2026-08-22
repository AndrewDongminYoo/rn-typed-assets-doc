const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Canonical origin. Vercel supplies the production host automatically; override with NEXT_PUBLIC_SITE_URL for a custom domain. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const siteName = "React Native Toolkits";

export const siteDescription =
  "A focused collection of React Native developer tools for agent workflows, typed assets, New Architecture audits, and NativeWind code generation.";
