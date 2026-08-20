import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/contexts/theme-context";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "React Native Toolkits — Inspect, Automate, Verify",
    template: "%s — React Native Toolkits",
  },
  description:
    "A focused collection of React Native developer tools for agent workflows, typed assets, New Architecture audits, and NativeWind code generation.",
  icons: {
    apple: "/apple-icon.png",
    icon: [{ type: "image/svg+xml", url: "/icon.svg" }],
  },
  keywords: [
    "react-native",
    "developer-tools",
    "agent-skills",
    "typed-assets",
    "new-architecture",
    "nativewind",
  ],
  openGraph: {
    description: "Agent workflows and deterministic tools for maintaining React Native projects.",
    title: "React Native Toolkits",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      className={`${display.variable} ${sans.variable} ${mono.variable} bg-background`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
