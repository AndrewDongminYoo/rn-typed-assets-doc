import { faq } from "@/lib/faq";
import {
  siteAddress,
  siteAuthor,
  siteDescription,
  siteLocale,
  siteName,
  siteUrl,
} from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";
import { toolkits } from "@/lib/toolkits";

/** A JSON-LD node. Values stay loose because schema.org shapes differ per type. */
export type JsonLdNode = Record<string, unknown>;

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

function toolkitId(toolkit: Toolkit): string {
  return `${siteUrl}${toolkit.route}#software`;
}

/**
 * Publisher identity. `contactPoint` and `address` are both present because an agent verifying a
 * business wants a reachable channel and a jurisdiction, and a node carrying only one reads as
 * incomplete. Every value here is already public in the npm manifests or on the site itself.
 */
function organizationNode(): JsonLdNode {
  return {
    "@id": organizationId,
    "@type": "Organization",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": siteAddress.addressCountry,
      "addressLocality": siteAddress.addressLocality,
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Korean"],
        "contactType": "technical support",
        "email": siteAuthor.email,
        "url": `${siteUrl}/contact`,
      },
    ],
    "description": siteDescription,
    "email": siteAuthor.email,
    "founder": {
      "@type": "Person",
      "name": siteAuthor.name,
      "url": siteAuthor.githubUrl,
    },
    "logo": {
      "@type": "ImageObject",
      "contentUrl": `${siteUrl}/icon.svg`,
      "url": `${siteUrl}/icon.svg`,
    },
    "name": siteName,
    "sameAs": [siteAuthor.githubUrl],
    "url": `${siteUrl}/`,
  };
}

function websiteNode(): JsonLdNode {
  return {
    "@id": websiteId,
    "@type": "WebSite",
    "description": siteDescription,
    "inLanguage": siteLocale,
    "name": siteName,
    "publisher": { "@id": organizationId },
    "url": `${siteUrl}/`,
  };
}

/**
 * One product. `offers` states the free price explicitly rather than leaving it implied, because
 * "is this paid?" is one of the first questions an agent recommending a tool has to answer.
 */
function softwareApplicationNode(toolkit: Toolkit): JsonLdNode {
  const sameAs = [toolkit.githubUrl, toolkit.productUrl].filter(
    (url): url is string => typeof url === "string"
  );

  return {
    "@id": toolkitId(toolkit),
    "@type": "SoftwareApplication",
    "applicationCategory": "DeveloperApplication",
    "author": { "@id": organizationId },
    "codeRepository": toolkit.githubUrl,
    "description": toolkit.description,
    "isAccessibleForFree": true,
    "name": toolkit.name,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": 0,
      "priceCurrency": "USD",
    },
    "operatingSystem": "macOS, Linux, Windows",
    "publisher": { "@id": organizationId },
    sameAs,
    "url": `${siteUrl}${toolkit.route}`,
    ...(toolkit.license === undefined ? {} : { license: toolkit.license }),
    ...(toolkit.version === undefined ? {} : { softwareVersion: toolkit.version }),
  };
}

function breadcrumbNode(trail: { name: string; route: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "item": `${siteUrl}/`, "name": siteName, "position": 1 },
      ...trail.map((entry, index) => ({
        "@type": "ListItem",
        "item": `${siteUrl}${entry.route}`,
        "name": entry.name,
        "position": index + 2,
      })),
    ],
  };
}

function webPageNode(route: string, name: string, description: string): JsonLdNode {
  return {
    "@type": "WebPage",
    description,
    "inLanguage": siteLocale,
    "isPartOf": { "@id": websiteId },
    name,
    "publisher": { "@id": organizationId },
    "url": `${siteUrl}${route}`,
  };
}

/** The visible home-page Q&A, restated so an agent can lift an answer without parsing the DOM. */
function faqNode(): JsonLdNode {
  return {
    "@id": `${siteUrl}/#faq`,
    "@type": "FAQPage",
    "inLanguage": siteLocale,
    "mainEntity": faq.map((entry) => ({
      "@type": "Question",
      "acceptedAnswer": { "@type": "Answer", "text": entry.answer },
      "name": entry.question,
    })),
    "url": `${siteUrl}/`,
  };
}

/** The homepage graph: who publishes the site, what the site is, and what it ships. */
export function homeGraph(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "ItemList",
        "itemListElement": toolkits.map((toolkit: Toolkit, index) => ({
          "@type": "ListItem",
          "item": softwareApplicationNode(toolkit),
          "position": index + 1,
        })),
        "name": `${siteName} — product index`,
        "numberOfItems": toolkits.length,
        "url": `${siteUrl}/`,
      },
      faqNode(),
    ],
  };
}

export function productGraph(toolkit: Toolkit): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      softwareApplicationNode(toolkit),
      breadcrumbNode([{ name: toolkit.name, route: toolkit.route }]),
    ],
  };
}

export function pageGraph(route: string, name: string, description: string): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      webPageNode(route, name, description),
      breadcrumbNode([{ name, route }]),
    ],
  };
}
