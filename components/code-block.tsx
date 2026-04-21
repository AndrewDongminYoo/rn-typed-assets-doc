"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightCode, resolveLanguage, getLanguageFromFilename, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/syntax-highlighter"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
  theme?: 'dark' | 'light'
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = false,
  theme = 'dark',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Determine language from filename if not specified
  const resolvedLanguage = filename 
    ? getLanguageFromFilename(filename) 
    : resolveLanguage(language)

  // Get display name for language badge
  const languageInfo = SUPPORTED_LANGUAGES[resolvedLanguage as SupportedLanguage]
  const languageDisplayName = languageInfo?.name || resolvedLanguage

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    highlightCode(code, { 
      language: resolvedLanguage,
      theme: theme === 'dark' ? 'github-dark' : 'github-light'
    }).then((html) => {
      if (!cancelled) {
        setHighlightedHtml(html)
        setIsLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [code, resolvedLanguage, theme])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className={cn(
      "rounded-lg border border-border overflow-hidden",
      theme === 'dark' ? 'bg-[#0d1117]' : 'bg-[#f6f8fa]',
      className
    )}>
      {/* Header with filename and language badge */}
      {(filename || language) && (
        <div className={cn(
          "flex items-center justify-between px-4 py-2 border-b",
          theme === 'dark' 
            ? 'border-[#30363d] bg-[#161b22]' 
            : 'border-[#d0d7de] bg-[#f6f8fa]'
        )}>
          <div className="flex items-center gap-3">
            {filename && (
              <span className={cn(
                "text-sm font-medium font-mono",
                theme === 'dark' ? 'text-[#c9d1d9]' : 'text-[#24292f]'
              )}>
                {filename}
              </span>
            )}
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              theme === 'dark' 
                ? 'bg-[#30363d] text-[#8b949e]' 
                : 'bg-[#d0d7de] text-[#57606a]'
            )}>
              {languageDisplayName}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              theme === 'dark'
                ? 'hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]'
                : 'hover:bg-[#d0d7de] text-[#57606a] hover:text-[#24292f]'
            )}
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      
      {/* Code content */}
      <div className="relative group">
        {/* Floating copy button when no header */}
        {!filename && !language && (
          <button
            onClick={copyToClipboard}
            className={cn(
              "absolute right-3 top-3 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 z-10",
              theme === 'dark'
                ? 'bg-[#30363d]/80 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]'
                : 'bg-[#d0d7de]/80 hover:bg-[#d0d7de] text-[#57606a] hover:text-[#24292f]'
            )}
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        )}

        {/* Loading state */}
        {isLoading ? (
          <pre className={cn(
            "p-4 overflow-x-auto text-sm leading-relaxed",
            theme === 'dark' ? 'text-[#c9d1d9]' : 'text-[#24292f]'
          )}>
            <code className="font-mono">
              {showLineNumbers
                ? lines.map((line, i) => (
                    <span key={i} className="block">
                      <span className={cn(
                        "inline-block w-8 select-none text-right mr-4",
                        theme === 'dark' ? 'text-[#484f58]' : 'text-[#8c959f]'
                      )}>
                        {i + 1}
                      </span>
                      {line || ' '}
                    </span>
                  ))
                : code}
            </code>
          </pre>
        ) : (
          <div className="overflow-x-auto">
            {showLineNumbers ? (
              <div className="flex">
                {/* Line numbers column */}
                <div className={cn(
                  "flex-none py-4 pl-4 pr-2 select-none text-right font-mono text-sm leading-relaxed",
                  theme === 'dark' ? 'text-[#484f58]' : 'text-[#8c959f]'
                )}>
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Highlighted code */}
                <div 
                  className="flex-1 py-4 pr-4 overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:text-sm [&_code]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml || '' }}
                />
              </div>
            ) : (
              <div 
                className="p-4 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:text-sm [&_code]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedHtml || '' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Inline code component for single-line code snippets
export function InlineCode({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <code className={cn(
      "px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-foreground",
      className
    )}>
      {children}
    </code>
  )
}
