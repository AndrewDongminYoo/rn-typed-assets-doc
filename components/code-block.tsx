"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getLanguageFromFilename,
  highlightCode,
  resolveLanguage,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/syntax-highlighter";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
  theme?: "dark" | "light";
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = false,
  theme = "dark",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedResult, setHighlightedResult] = useState<{
    code: string;
    html: string;
    language: SupportedLanguage;
    theme: "dark" | "light";
  } | null>(null);

  // Determine language from filename if not specified
  const resolvedLanguage = filename ? getLanguageFromFilename(filename) : resolveLanguage(language);

  // Get display name for language badge
  const languageInfo = SUPPORTED_LANGUAGES[resolvedLanguage as SupportedLanguage];
  const languageDisplayName = languageInfo?.name || resolvedLanguage;
  const highlightedHtml =
    highlightedResult?.code === code &&
    highlightedResult.language === resolvedLanguage &&
    highlightedResult.theme === theme
      ? highlightedResult.html
      : null;
  const isLoading = highlightedHtml === null;

  useEffect(() => {
    let cancelled = false;

    void highlightCode(code, {
      language: resolvedLanguage,
      theme: theme === "dark" ? "github-dark" : "github-light",
    }).then((html) => {
      if (!cancelled) {
        setHighlightedResult({
          code,
          html,
          language: resolvedLanguage,
          theme,
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, resolvedLanguage, theme]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border",
        theme === "dark" ? "bg-[#0d1117]" : "bg-[#f6f8fa]",
        className
      )}
    >
      {/* Header with filename and language badge */}
      {(filename || language) && (
        <div
          className={cn(
            "flex items-center justify-between border-b px-4 py-2",
            theme === "dark" ? "border-[#30363d] bg-[#161b22]" : "border-[#d0d7de] bg-[#f6f8fa]"
          )}
        >
          <div className="flex items-center gap-3">
            {filename && (
              <span
                className={cn(
                  "font-mono text-sm font-medium",
                  theme === "dark" ? "text-[#c9d1d9]" : "text-[#24292f]"
                )}
              >
                {filename}
              </span>
            )}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                theme === "dark" ? "bg-[#30363d] text-[#8b949e]" : "bg-[#d0d7de] text-[#57606a]"
              )}
            >
              {languageDisplayName}
            </span>
          </div>
          <button
            aria-label="Copy code"
            className={cn(
              "rounded-md p-1.5 transition-colors",
              theme === "dark"
                ? "text-[#8b949e] hover:bg-[#30363d] hover:text-[#c9d1d9]"
                : "text-[#57606a] hover:bg-[#d0d7de] hover:text-[#24292f]"
            )}
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}

      {/* Code content */}
      <div className="group relative">
        {/* Floating copy button when no header */}
        {!filename && !language && (
          <button
            aria-label="Copy code"
            className={cn(
              "absolute top-3 right-3 z-10 rounded-md p-1.5 opacity-0 transition-all group-hover:opacity-100",
              theme === "dark"
                ? "bg-[#30363d]/80 text-[#8b949e] hover:bg-[#30363d] hover:text-[#c9d1d9]"
                : "bg-[#d0d7de]/80 text-[#57606a] hover:bg-[#d0d7de] hover:text-[#24292f]"
            )}
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        )}

        {/* Loading state */}
        {isLoading ? (
          <pre
            className={cn(
              "overflow-x-auto p-4 text-sm leading-relaxed",
              theme === "dark" ? "text-[#c9d1d9]" : "text-[#24292f]"
            )}
          >
            <code className="font-mono">
              {showLineNumbers
                ? lines.map((line, i) => (
                    <span className="block" key={i}>
                      <span
                        className={cn(
                          "mr-4 inline-block w-8 text-right select-none",
                          theme === "dark" ? "text-[#484f58]" : "text-[#8c959f]"
                        )}
                      >
                        {i + 1}
                      </span>
                      {line || " "}
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
                <div
                  className={cn(
                    "flex-none py-4 pr-2 pl-4 text-right font-mono text-sm leading-relaxed select-none",
                    theme === "dark" ? "text-[#484f58]" : "text-[#8c959f]"
                  )}
                >
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Highlighted code */}
                <div
                  className="flex-1 overflow-x-auto py-4 pr-4 [&_code]:text-sm [&_code]:leading-relaxed [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml || "" }}
                />
              </div>
            ) : (
              <div
                className="p-4 [&_code]:text-sm [&_code]:leading-relaxed [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
                dangerouslySetInnerHTML={{ __html: highlightedHtml || "" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
