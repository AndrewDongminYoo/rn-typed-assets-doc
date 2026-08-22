import type { CSSProperties } from "react";

import { CISection } from "@/components/sections/ci-section";
import { CLIReferenceSection } from "@/components/sections/cli-reference-section";
import { ConfigurationSection } from "@/components/sections/configuration-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InstallationSection } from "@/components/sections/installation-section";
import { TypedAssetsCtaSection } from "@/components/sections/typed-assets-cta-section";
import { productMetadata } from "@/lib/site";
import { getToolkit } from "@/lib/toolkits";

const toolkit = getToolkit("rn-typed-assets");

export const metadata = productMetadata(
  toolkit,
  "Generate typed TypeScript registries for React Native images, SVGs, and Lottie animations, then audit unused assets and rewrite stale references."
);

export default function TypedAssetsPage() {
  return (
    <main
      className="tool-accent-scope"
      style={{ "--tool-accent": toolkit.accent } as CSSProperties}
    >
      <HeroSection />
      <div className="scroll-mt-20" id="start">
        <FeaturesSection />
      </div>
      <HowItWorksSection />
      <InstallationSection />
      <CLIReferenceSection />
      <ConfigurationSection />
      <CISection />
      <TypedAssetsCtaSection />
    </main>
  );
}
