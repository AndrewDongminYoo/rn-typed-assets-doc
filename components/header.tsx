"use client";

import { Github, Menu, Moon, Package, Palette, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useSiteTheme } from "@/contexts/theme-context";
import { CODE_THEMES } from "@/lib/code-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Installation", href: "#installation" },
  { label: "CLI", href: "#cli" },
  { label: "Config", href: "#configuration" },
];

export function Header() {
  const { siteTheme, toggleSiteTheme, codeThemeId, setCodeThemeId } = useSiteTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target as Node)) {
        setThemePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTheme = CODE_THEMES.find((t) => t.id === codeThemeId);

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
            {/* Code theme picker */}
            <div className="relative" ref={themePickerRef}>
              <button
                aria-expanded={themePickerOpen}
                aria-label="Select code theme"
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setThemePickerOpen((v) => !v)}
              >
                <Palette className="h-4 w-4" />
                <span className="hidden lg:inline">{activeTheme?.label ?? "Theme"}</span>
              </button>

              {themePickerOpen && (
                <div className="absolute top-full right-0 z-50 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                  {CODE_THEMES.map((theme) => (
                    <button
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                        theme.id === codeThemeId
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-foreground"
                      )}
                      key={theme.id}
                      onClick={() => {
                        setCodeThemeId(theme.id);
                        setThemePickerOpen(false);
                      }}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Site dark/light toggle */}
            <button
              aria-label={siteTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={toggleSiteTheme}
            >
              {siteTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

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
            mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
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

          {/* Mobile theme controls */}
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">Code Theme</p>
            <div className="grid grid-cols-2 gap-1">
              {CODE_THEMES.map((theme) => (
                <button
                  className={cn(
                    "rounded-md px-3 py-2 text-left text-sm transition-colors",
                    theme.id === codeThemeId
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  key={theme.id}
                  onClick={() => setCodeThemeId(theme.id)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
            <button
              aria-label={siteTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={toggleSiteTheme}
            >
              {siteTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Dark Mode
                </>
              )}
            </button>
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
