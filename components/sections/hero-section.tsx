import { CodeBlock } from "@/components/code-block";
import { ProductHero } from "@/components/product-hero";
import { getToolkit } from "@/lib/toolkits";

const beforeCode = `// Before: brittle string-based paths
<Image source={require('../../../assets/toast/info.png')} />
<LottieView source={require('../../utils/loading.json')} />`;

const afterCode = `// After: typed named constants
import { Assets, Lotties } from './generated/assets.gen';

<Image source={Assets.toast.info} />
<LottieView source={Lotties.loading} />`;

export function HeroSection() {
  const toolkit = getToolkit("rn-typed-assets");

  return (
    <ProductHero
      description="Scan the asset tree, emit stable TypeScript constants and a manifest, then find unused files or rewrite stale references through explicit commands. The package ships no runtime dependencies and takes TypeScript as its only peer."
      intro="Stop shipping string-based asset paths. Generate the registry your React Native project can actually type-check."
      toolkit={toolkit}
    >
      <div className="space-y-4">
        <div>
          <p className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] text-destructive-ink uppercase">
            <span className="size-1.5 bg-destructive" />
            Brittle input
          </p>
          <CodeBlock code={beforeCode} language="tsx" />
        </div>
        <div>
          <p className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] text-accent-ink uppercase">
            <span className="size-1.5 bg-accent" />
            Typed output
          </p>
          <CodeBlock code={afterCode} language="tsx" />
        </div>
      </div>
    </ProductHero>
  );
}
