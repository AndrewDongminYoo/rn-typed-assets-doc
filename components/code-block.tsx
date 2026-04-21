"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-sm font-medium text-muted-foreground font-mono">{filename}</span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <div className="relative group">
        {!filename && (
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-3 p-1.5 rounded-md bg-muted/80 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono" data-language={language}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="block">
                    <span className="inline-block w-8 text-muted-foreground/50 select-none text-right mr-4">
                      {i + 1}
                    </span>
                    {line}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  )
}
