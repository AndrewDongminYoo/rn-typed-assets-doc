export interface FaqEntry {
  answer: string;
  question: string;
}

/**
 * Questions a reader — or an agent deciding whether to recommend these tools — has to answer
 * before doing anything else. Rendered on the home page, mirrored into its structured data, and
 * carried into the home page's Markdown representation, all from this one list.
 */
export const faq: readonly FaqEntry[] = [
  {
    answer:
      "No. The three deterministic tools each run on their own from a public source with no agent involved: rn-typed-assets and rn-newarch-ready are npm command-line tools, and Design to NativeWind is a Figma plugin. RN Agents Kit is the layer that drives them as one maintenance loop, and it is optional.",
    question: "Do I have to adopt all four tools?",
  },
  {
    answer:
      "Nothing. Every tool listed here is free and open source. rn-typed-assets, rn-newarch-ready, and Design to NativeWind are MIT licensed, and the two npm packages install from the public registry. There is no hosted service, no account, and no paid tier to upgrade to.",
    question: "What do these tools cost?",
  },
  {
    answer:
      "Only when you say so. The audits are read-only: rn-newarch-ready reports a readiness verdict without writing to the project at all. In RN Agents Kit, a skill that can mutate source asks for explicit consent first, then runs the project's own type, lint, and test commands and leaves the resulting git diff visible for review.",
    question: "Will these tools change my project files?",
  },
  {
    answer:
      "Start with a project snapshot. The rn-project-snapshot skill in RN Agents Kit captures the React Native version, the architecture and Hermes flags, the package manager, and the key configuration, which is what decides whether an asset pass, a New Architecture audit, or a code review is the useful next step.",
    question: "Which tool should an agent reach for first?",
  },
  {
    answer:
      "Yes. rn-newarch-ready exits non-zero on a needs-review verdict, so the same command that produces a readable report also works as a CI gate, and --json gives a machine-readable version of it. Regenerating the rn-typed-assets registry in CI turns a missing or renamed asset file into a failed build rather than a runtime error.",
    question: "Can these run in continuous integration?",
  },
  {
    answer:
      "Yes. Every page here answers Accept: text/markdown with a Markdown representation of itself, and every page has a .md sibling URL. /llms.txt indexes the site for language models, and /agents.md is the agent instruction file covering when to use each tool and when not to.",
    question: "Is there a machine-readable version of this documentation?",
  },
];
