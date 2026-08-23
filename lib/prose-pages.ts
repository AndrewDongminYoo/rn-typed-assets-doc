import { siteAuthor, siteName, siteUrl } from "@/lib/site";
import type { Toolkit } from "@/lib/toolkits";
import { toolkits } from "@/lib/toolkits";

export interface ProseSection {
  /** Optional definition rows rendered under the paragraphs. */
  entries?: { detail: string; label: string; url?: string }[];
  heading: string;
  paragraphs: string[];
}

export interface ProsePage {
  description: string;
  intro: string;
  kicker: string;
  route: string;
  sections: ProseSection[];
  title: string;
}

const issueEntries = toolkits.map((toolkit: Toolkit) => ({
  detail: `Bugs, questions, and feature requests for ${toolkit.name}.`,
  label: `${toolkit.name} issues`,
  url: `${toolkit.githubUrl}/issues`,
}));

export const aboutPage: ProsePage = {
  description:
    "Who maintains React Native Toolkits, what the four products do, and the editorial rules this site holds itself to.",
  intro:
    "React Native Toolkits is the public index for four independently released React Native developer tools maintained by one person in the open.",
  kicker: "Trust anchor / About",
  route: "/about",
  sections: [
    {
      heading: "What this site is",
      paragraphs: [
        `${siteName} is a documentation hub, not a product in itself. Each tool it lists ships from its own public repository and, where applicable, its own public package listing. This site exists so that a developer or an agent can compare the four tools in one place, understand which problem each one solves, and follow a direct link to the source rather than to a gated download.`,
        "Everything on the site is server-rendered static HTML. There is no account system, no login, no paywall, and no lead-capture form. Reading any page requires nothing from the reader.",
      ],
    },
    {
      heading: "Who maintains it",
      paragraphs: [
        `The tools and this site are maintained by ${siteAuthor.name}, publishing on GitHub as AndrewDongminYoo. The same identity appears in the author field of the published npm manifests, so the maintainer of the packages and the publisher of this site are verifiably the same party.`,
        "This is an open-source effort rather than a company. There is no sales team, no support contract, and no paid tier. Issues filed on the individual repositories are the support channel.",
      ],
    },
    {
      heading: "What it publishes",
      paragraphs: [
        "The four tools cover distinct stages of React Native maintenance work. They are usable independently; the agent kit is the only one that orchestrates the others.",
      ],
      entries: toolkits.map((toolkit: Toolkit) => ({
        detail: `${toolkit.description} Status: ${toolkit.status}.`,
        label: toolkit.name,
        url: `${siteUrl}${toolkit.route}`,
      })),
    },
    {
      heading: "Editorial rules",
      paragraphs: [
        "Product copy on this site is limited to claims that can be checked against a public repository, a public package listing, or published release metadata. Benchmarks, roadmap items, and unreleased features are not described here, because a reader cannot verify them.",
        "Audits and examples quoted on the site name the project, the date, and the tool version they came from, so the run can be reproduced. Where a tool reports uncertainty, the site repeats the uncertainty instead of resolving it into a confident claim.",
      ],
    },
  ],
  title: "About",
};

export const contactPage: ProsePage = {
  description:
    "How to reach the maintainer of React Native Toolkits: per-product issue trackers, email, and what each channel is for.",
  intro:
    "Every tool listed here has a public issue tracker, and that tracker is the fastest route to an answer about that tool.",
  kicker: "Trust anchor / Contact",
  route: "/contact",
  sections: [
    {
      heading: "Per-product issue trackers",
      paragraphs: [
        "Report a defect, ask how something behaves, or propose a feature on the repository that owns the code. Filing there keeps the discussion attached to the source, the release history, and the test suite, and it means the answer stays public for the next person with the same question.",
      ],
      entries: issueEntries,
    },
    {
      heading: "Email",
      paragraphs: [
        `For anything that does not belong in a public issue — a security report, a licensing question, or a press or listing enquiry about this site — write to ${siteAuthor.email}. This is the same address published in the author field of the npm manifests for these packages.`,
        "This is a solo open-source project, so email is answered on a best-effort basis and is not covered by any service level agreement. Anything that can be discussed publicly gets a faster answer on the relevant issue tracker.",
      ],
      entries: [
        {
          detail: "Direct email to the maintainer.",
          label: siteAuthor.email,
          url: `mailto:${siteAuthor.email}`,
        },
        {
          detail: "Profile, public repositories, and release history.",
          label: "AndrewDongminYoo on GitHub",
          url: siteAuthor.githubUrl,
        },
      ],
    },
    {
      heading: "What to include",
      paragraphs: [
        "A useful report names the tool and its version, the React Native version of the project it ran against, the exact command that was run, and the output that was unexpected. Reports about the audit tools are much easier to act on when they include the verdict line the tool printed, because the verdict states which evidence the tool did and did not find.",
      ],
    },
  ],
  title: "Contact",
};

export const privacyPage: ProsePage = {
  description:
    "What React Native Toolkits stores, what it measures, and what it sends to third parties — described from the site's own source.",
  intro:
    "This site has no accounts, no forms, and no advertising. The short version: it stores two display preferences in your browser and counts page views in aggregate.",
  kicker: "Trust anchor / Privacy",
  route: "/privacy",
  sections: [
    {
      heading: "What is stored in your browser",
      paragraphs: [
        "Two values are written to your browser's local storage so the site looks the same on your next visit: `site-theme`, which records whether you chose light or dark, and `code-theme`, which records the syntax highlighting theme you picked for the code samples. Both are written only when you use the theme controls.",
        "These values never leave your browser. They are not sent to the server, they are not read by any third party, and clearing your site data removes them permanently. The site works exactly the same with local storage disabled; it simply falls back to its default appearance on each visit.",
        "No cookies are set by this site.",
      ],
    },
    {
      heading: "What is measured",
      paragraphs: [
        "Production deployments load Vercel Analytics, which records aggregate page views and referrers. Vercel documents this product as operating without cookies and without cross-site identifiers. It is loaded only in production builds; local and preview development runs without it.",
        "Standard web-server request logs are kept by the hosting provider, Vercel, as part of serving the site. No analytics or logging data is sold, and none of it is used to build a profile of an individual reader.",
      ],
    },
    {
      heading: "Third parties and embedded content",
      paragraphs: [
        "Fonts are downloaded at build time and served from this site's own origin, so rendering a page does not call a font CDN. There are no advertising networks, no social media embeds, no chat widgets, no tag managers, and no session-replay tools anywhere on the site.",
        "Outbound links to GitHub, npm, and the Figma Community are ordinary links. Following one takes you to that service, where that service's own privacy policy applies.",
      ],
    },
    {
      heading: "Data you send",
      paragraphs: [
        "There is nothing on this site to submit. No contact form, no newsletter signup, no comment box, no search box that reaches the server. The only way to send information to the maintainer is to file a public issue or send email, and in both cases the content is whatever you chose to write.",
        `Questions about this policy, or a request to remove something, can go to ${siteAuthor.email}.`,
      ],
    },
  ],
  title: "Privacy",
};

export const prosePages = [aboutPage, contactPage, privacyPage] as const;
