import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'rn-typed-assets — Type-Safe Asset Management for React Native',
  description: 'Eliminate string-based asset references in React Native. Generate typed TypeScript registries for images, SVGs, and Lottie animations with compile-time safety.',
  keywords: ['react-native', 'typescript', 'assets', 'codegen', 'type-safety', 'images', 'svg', 'lottie'],
  openGraph: {
    title: 'rn-typed-assets',
    description: 'Type-safe asset management for React Native',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
