import { ArrowRight, Github, Package } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const beforeCode = `// Before: Brittle string-based paths
<Image source={require('../../../assets/toast/info.png')} />
<LottieView source={require('../../utils/loading.json')} />`;

const afterCode = `// After: Type-safe named constants
import { Assets, Lotties } from './generated/assets.gen';

<Image source={Assets.toast.info} />
<LottieView source={Lotties.loading} />`;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="mb-12 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Package className="h-4 w-4" />
            <span>npm package</span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Type-Safe Assets for <span className="text-primary">React Native</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
            Eliminate string-based asset references forever. Generate typed TypeScript registries
            for images, SVGs, and Lottie animations with compile-time safety.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="w-full gap-2 sm:w-auto" size="lg">
              <a href="#installation">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild className="w-full gap-2 sm:w-auto" size="lg" variant="outline">
              <a
                href="https://github.com/AndrewDongminYoo/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Code comparison */}
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-medium text-destructive">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              Without rn-typed-assets
            </p>
            <CodeBlock code={beforeCode} language="tsx" />
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              With rn-typed-assets
            </p>
            <CodeBlock code={afterCode} language="tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
