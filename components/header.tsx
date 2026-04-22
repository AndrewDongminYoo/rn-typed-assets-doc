"use client";

import { Github, Menu, Package, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Installation", href: "#installation" },
  { label: "CLI", href: "#cli" },
  { label: "Config", href: "#configuration" },
  { label: "Syntax", href: "#syntax-highlighting" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden font-semibold text-foreground sm:block">rn-typed-assets</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild size="sm" variant="outline">
              <a
                href="https://github.com/AndrewDongminYoo/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm">
              <a
                href="https://www.npmjs.com/package/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                npm
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="-mr-2 p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "overflow-hidden border-t border-border transition-all duration-300 md:hidden",
            mobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                href={link.href}
                key={link.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
            <Button asChild className="flex-1" size="sm" variant="outline">
              <a
                href="https://github.com/AndrewDongminYoo/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild className="flex-1" size="sm">
              <a
                href="https://www.npmjs.com/package/rn-typed-assets"
                rel="noopener noreferrer"
                target="_blank"
              >
                npm
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
