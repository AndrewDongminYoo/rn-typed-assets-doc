import { Header } from "@/components/header";
import { CISection } from "@/components/sections/ci-section";
import { CLIReferenceSection } from "@/components/sections/cli-reference-section";
import { ConfigurationSection } from "@/components/sections/configuration-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InstallationSection } from "@/components/sections/installation-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InstallationSection />
        <CLIReferenceSection />
        <ConfigurationSection />
        <CISection />
      </main>
      <FooterSection />
    </div>
  );
}
