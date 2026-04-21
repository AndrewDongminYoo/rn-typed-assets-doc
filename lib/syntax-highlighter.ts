import { createHighlighter, type Highlighter, type BundledLanguage, type BundledTheme } from 'shiki'

// Singleton pattern for highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null

// Supported languages with their display names and file extensions
export const SUPPORTED_LANGUAGES = {
  // Web Development
  typescript: { name: 'TypeScript', extensions: ['.ts', '.tsx'] },
  javascript: { name: 'JavaScript', extensions: ['.js', '.jsx'] },
  html: { name: 'HTML', extensions: ['.html', '.htm'] },
  css: { name: 'CSS', extensions: ['.css'] },
  json: { name: 'JSON', extensions: ['.json'] },
  
  // Mobile Development
  swift: { name: 'Swift', extensions: ['.swift'] },
  kotlin: { name: 'Kotlin', extensions: ['.kt', '.kts'] },
  java: { name: 'Java', extensions: ['.java'] },
  
  // Backend & Systems
  python: { name: 'Python', extensions: ['.py'] },
  go: { name: 'Go', extensions: ['.go'] },
  rust: { name: 'Rust', extensions: ['.rs'] },
  c: { name: 'C', extensions: ['.c', '.h'] },
  cpp: { name: 'C++', extensions: ['.cpp', '.hpp', '.cc'] },
  
  // Shell & Config
  bash: { name: 'Bash', extensions: ['.sh', '.bash'] },
  shell: { name: 'Shell', extensions: ['.sh'] },
  yaml: { name: 'YAML', extensions: ['.yml', '.yaml'] },
  toml: { name: 'TOML', extensions: ['.toml'] },
  
  // Data & Query
  sql: { name: 'SQL', extensions: ['.sql'] },
  graphql: { name: 'GraphQL', extensions: ['.graphql', '.gql'] },
  
  // Markup
  markdown: { name: 'Markdown', extensions: ['.md', '.mdx'] },
  xml: { name: 'XML', extensions: ['.xml'] },
  
  // Other
  dockerfile: { name: 'Dockerfile', extensions: ['Dockerfile'] },
  diff: { name: 'Diff', extensions: ['.diff', '.patch'] },
  plaintext: { name: 'Plain Text', extensions: ['.txt'] },
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// Language aliases for common variations
export const LANGUAGE_ALIASES: Record<string, SupportedLanguage> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  py: 'python',
  rb: 'rust',
  yml: 'yaml',
  sh: 'bash',
  zsh: 'bash',
  fish: 'bash',
  text: 'plaintext',
  txt: 'plaintext',
}

// Resolve language alias to canonical name
export function resolveLanguage(lang: string): SupportedLanguage {
  const normalized = lang.toLowerCase().trim()
  if (normalized in SUPPORTED_LANGUAGES) {
    return normalized as SupportedLanguage
  }
  return LANGUAGE_ALIASES[normalized] || 'plaintext'
}

// Get language from filename
export function getLanguageFromFilename(filename: string): SupportedLanguage {
  const ext = filename.includes('.') 
    ? '.' + filename.split('.').pop()?.toLowerCase()
    : filename
  
  for (const [lang, info] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (info.extensions.includes(ext!) || info.extensions.includes(filename)) {
      return lang as SupportedLanguage
    }
  }
  return 'plaintext'
}

// Initialize highlighter with lazy loading
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: Object.keys(SUPPORTED_LANGUAGES) as BundledLanguage[],
    })
  }
  return highlighterPromise
}

export interface HighlightOptions {
  language: string
  theme?: BundledTheme
}

// Main highlight function
export async function highlightCode(
  code: string, 
  options: HighlightOptions
): Promise<string> {
  const { language, theme = 'github-dark' } = options
  const resolvedLang = resolveLanguage(language)
  
  try {
    const highlighter = await getHighlighter()
    const html = highlighter.codeToHtml(code, {
      lang: resolvedLang as BundledLanguage,
      theme,
    })
    return html
  } catch (error) {
    console.error('[v0] Syntax highlighting failed:', error)
    // Fallback to escaped HTML
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

// Escape HTML for fallback
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Token color reference for documentation
export const TOKEN_COLORS = {
  keyword: { 
    description: 'Language keywords (const, function, if, return)', 
    lightColor: '#cf222e', 
    darkColor: '#ff7b72' 
  },
  string: { 
    description: 'String literals and template strings', 
    lightColor: '#0a3069', 
    darkColor: '#a5d6ff' 
  },
  comment: { 
    description: 'Comments and documentation', 
    lightColor: '#6e7781', 
    darkColor: '#8b949e' 
  },
  function: { 
    description: 'Function names and method calls', 
    lightColor: '#8250df', 
    darkColor: '#d2a8ff' 
  },
  variable: { 
    description: 'Variables and identifiers', 
    lightColor: '#24292f', 
    darkColor: '#c9d1d9' 
  },
  number: { 
    description: 'Numeric literals', 
    lightColor: '#0550ae', 
    darkColor: '#79c0ff' 
  },
  type: { 
    description: 'Type annotations and interfaces', 
    lightColor: '#953800', 
    darkColor: '#ffa657' 
  },
  operator: { 
    description: 'Operators (+, -, =, =>)', 
    lightColor: '#cf222e', 
    darkColor: '#ff7b72' 
  },
  punctuation: { 
    description: 'Brackets, parentheses, semicolons', 
    lightColor: '#24292f', 
    darkColor: '#c9d1d9' 
  },
  property: { 
    description: 'Object properties and attributes', 
    lightColor: '#0550ae', 
    darkColor: '#79c0ff' 
  },
  tag: { 
    description: 'HTML/JSX tags', 
    lightColor: '#116329', 
    darkColor: '#7ee787' 
  },
  attribute: { 
    description: 'HTML/JSX attributes', 
    lightColor: '#0550ae', 
    darkColor: '#79c0ff' 
  },
} as const
