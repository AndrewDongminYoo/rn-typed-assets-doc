import { ExternalLink, Github, Package } from "lucide-react";

import { Button } from "@/components/ui/button";

const links = {
  quickLinks: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Installation", href: "#installation" },
    { label: "CLI Reference", href: "#cli" },
    { label: "Configuration", href: "#configuration" },
  ],
  resources: [
    {
      label: "GitHub Repository",
      href: "https://github.com/AndrewDongminYoo/rn-typed-assets",
      external: true,
    },
    {
      label: "NPM Package",
      href: "https://www.npmjs.com/package/rn-typed-assets",
      external: true,
    },
    {
      label: "Report an Issue",
      href: "https://github.com/AndrewDongminYoo/rn-typed-assets/issues",
      external: true,
    },
  ],
  inspiration: [
    {
      label: "SwiftGen",
      href: "https://github.com/SwiftGen/SwiftGen",
      external: true,
    },
    {
      label: "FlutterGen",
      href: "https://github.com/FlutterGen/flutter_gen",
      external: true,
    },
  ],
};

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card">
      {/* CTA Section */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            Ready to eliminate string-based assets?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Get started in minutes. No configuration required for standard React Native projects.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="w-full gap-2 sm:w-auto" size="lg">
              <a href="#installation">
                <Package className="h-4 w-4" />
                Get Started
              </a>
            </Button>
            <Button asChild className="w-full gap-2 sm:w-auto" size="lg" variant="outline">
              <a
                href="https://github.com/AndrewDongminYoo/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Package className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">rn-typed-assets</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Type-safe asset management for React Native. Inspired by SwiftGen and FlutterGen.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                {links.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Resources</h3>
              <ul className="space-y-2">
                {links.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      target={link.external ? "_blank" : undefined}
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inspiration */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Inspiration</h3>
              <ul className="space-y-2">
                {links.inspiration.map((link) => (
                  <li key={link.label}>
                    <a
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
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
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">MIT License</p>
            <p className="text-sm text-muted-foreground">Zero runtime dependencies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
