import { Github, ExternalLink, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = {
  quickLinks: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Installation", href: "#installation" },
    { label: "CLI Reference", href: "#cli" },
    { label: "Configuration", href: "#configuration" },
  ],
  resources: [
    { label: "GitHub Repository", href: "https://github.com/nicepkg/rn-typed-assets", external: true },
    { label: "NPM Package", href: "https://www.npmjs.com/package/rn-typed-assets", external: true },
    { label: "Report an Issue", href: "https://github.com/nicepkg/rn-typed-assets/issues", external: true },
  ],
  inspiration: [
    { label: "SwiftGen", href: "https://github.com/SwiftGen/SwiftGen", external: true },
    { label: "FlutterGen", href: "https://github.com/FlutterGen/flutter_gen", external: true },
  ],
}

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card">
      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to eliminate string-based assets?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started in minutes. No configuration required for standard React Native projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <a href="#installation">
                <Package className="w-4 h-4" />
                Get Started
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" asChild>
              <a href="https://github.com/nicepkg/rn-typed-assets" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">rn-typed-assets</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Type-safe asset management for React Native. Inspired by SwiftGen and FlutterGen.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {links.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                {links.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inspiration */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Inspiration</h3>
              <ul className="space-y-2">
                {links.inspiration.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              MIT License
            </p>
            <p className="text-sm text-muted-foreground">
              Zero runtime dependencies
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
