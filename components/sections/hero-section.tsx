import { ArrowRight, Github, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"

const beforeCode = `// Before: Brittle string-based paths
<Image source={require('../../../assets/toast/info.png')} />
<LottieView source={require('../../utils/loading.json')} />`

const afterCode = `// After: Type-safe named constants
import { Assets, Lotties } from './generated/assets.gen';

<Image source={Assets.toast.info} />
<LottieView source={Lotties.loading} />`

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            <span>npm package</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Type-Safe Assets for{" "}
            <span className="text-primary">React Native</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed text-pretty">
            Eliminate string-based asset references forever. Generate typed TypeScript registries 
            for images, SVGs, and Lottie animations with compile-time safety.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <a href="#installation">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" asChild>
              <a href="https://github.com/nicepkg/rn-typed-assets" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
        
        {/* Code comparison */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              Without rn-typed-assets
            </p>
            <CodeBlock code={beforeCode} language="tsx" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-accent flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              With rn-typed-assets
            </p>
            <CodeBlock code={afterCode} language="tsx" />
          </div>
        </div>
      </div>
    </section>
  )
}
