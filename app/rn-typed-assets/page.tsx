import type { CSSProperties } from "react";

import { JsonLd } from "@/components/json-ld";
import { CISection } from "@/components/sections/ci-section";
import { CLIReferenceSection } from "@/components/sections/cli-reference-section";
import { ConfigurationSection } from "@/components/sections/configuration-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InstallationSection } from "@/components/sections/installation-section";
import { TypedAssetsCtaSection } from "@/components/sections/typed-assets-cta-section";
import { productMetadata } from "@/lib/site";
import { productGraph } from "@/lib/structured-data";
import { getToolkit } from "@/lib/toolkits";

const toolkit = getToolkit("rn-typed-assets");

export const metadata = productMetadata(toolkit);

export default function TypedAssetsPage() {
  return (
    <main
      className="tool-accent-scope"
      style={{ "--tool-accent": toolkit.accent } as CSSProperties}
    >
      <JsonLd graph={productGraph(toolkit)} />

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
