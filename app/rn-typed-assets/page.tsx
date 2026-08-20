import type { Metadata } from "next";

import { CISection } from "@/components/sections/ci-section";
import { CLIReferenceSection } from "@/components/sections/cli-reference-section";
import { ConfigurationSection } from "@/components/sections/configuration-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InstallationSection } from "@/components/sections/installation-section";
import { TypedAssetsCtaSection } from "@/components/sections/typed-assets-cta-section";

export const metadata: Metadata = {
  description:
    "Generate typed TypeScript registries for React Native images, SVGs, and Lottie animations, then audit unused assets and rewrite stale references.",
  title: "rn-typed-assets",
};

export default function TypedAssetsPage() {
  return (
    <main>
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
