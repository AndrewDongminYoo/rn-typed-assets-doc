"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { useSiteTheme } from "@/contexts/theme-context";
import { resolveCodeTheme } from "@/lib/code-themes";
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
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const { siteTheme, codeThemeId } = useSiteTheme();
  const isDark = siteTheme === "dark";
  const shikiTheme = resolveCodeTheme(codeThemeId, isDark);

  const [copied, setCopied] = useState(false);
  const [highlightedResult, setHighlightedResult] = useState<{
    code: string;
    html: string;
    language: SupportedLanguage;
    shikiTheme: string;
  } | null>(null);

  const resolvedLanguage = filename ? getLanguageFromFilename(filename) : resolveLanguage(language);
  const languageInfo = SUPPORTED_LANGUAGES[resolvedLanguage as SupportedLanguage];
  const languageDisplayName = languageInfo?.name || resolvedLanguage;

  const highlightedHtml =
    highlightedResult?.code === code &&
    highlightedResult.language === resolvedLanguage &&
    highlightedResult.shikiTheme === shikiTheme
      ? highlightedResult.html
      : null;
  const isLoading = highlightedHtml === null;

  useEffect(() => {
    let cancelled = false;

    void highlightCode(code, { language: resolvedLanguage, theme: shikiTheme }).then((html) => {
      if (!cancelled) {
        setHighlightedResult({ code, html, language: resolvedLanguage, shikiTheme });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, resolvedLanguage, shikiTheme]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  // Shiki-generated HTML: input code is static (from module constants), not user-supplied.
  // Shiki escapes all code content before emitting HTML, so XSS is not a concern here.
  const shikiHtml = highlightedHtml ?? "";

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      {/* Header with filename and language badge */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-3">
            {filename && (
              <span className="font-mono text-sm font-medium text-foreground">{filename}</span>
            )}
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {languageDisplayName}
            </span>
          </div>
          <button
            aria-label="Copy code"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
            className="absolute top-3 right-3 z-10 rounded-md bg-muted/80 p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        )}

        {/* Loading state */}
        {isLoading ? (
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-sm leading-relaxed text-foreground">
            <code>
              {showLineNumbers
                ? lines.map((line, i) => (
                    <span className="block" key={i}>
                      <span className="mr-4 inline-block w-8 text-right text-muted-foreground select-none">
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
                <div className="flex-none bg-muted py-4 pr-2 pl-4 text-right font-mono text-sm leading-relaxed text-muted-foreground select-none">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Highlighted code — Shiki output, not user input */}
                <div
                  className="flex-1 overflow-x-auto [&_code]:text-sm [&_code]:leading-relaxed [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-4!"
                  dangerouslySetInnerHTML={{ __html: shikiHtml }}
                />
              </div>
            ) : (
              <div
                className="[&_code]:text-sm [&_code]:leading-relaxed [&_pre]:m-0! [&_pre]:p-4!"
                dangerouslySetInnerHTML={{ __html: shikiHtml }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
