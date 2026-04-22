import type { BundledTheme } from "shiki";

export interface CodeThemeDefinition {
  id: string;
  label: string;
  light: BundledTheme;
  dark: BundledTheme;
}

export const CODE_THEMES: CodeThemeDefinition[] = [
  { id: "github", label: "GitHub", light: "github-light", dark: "github-dark" },
  { id: "catppuccin", label: "Catppuccin", light: "catppuccin-latte", dark: "catppuccin-mocha" },
  { id: "ayu", label: "Ayu", light: "ayu-light", dark: "ayu-dark" },
  { id: "vitesse", label: "Vitesse", light: "vitesse-light", dark: "vitesse-dark" },
  { id: "solarized", label: "Solarized", light: "solarized-light", dark: "solarized-dark" },
  { id: "min", label: "Min", light: "min-light", dark: "min-dark" },
  { id: "everforest", label: "Everforest", light: "everforest-light", dark: "everforest-dark" },
  { id: "gruvbox", label: "Gruvbox", light: "gruvbox-light-medium", dark: "gruvbox-dark-medium" },
];

export const DEFAULT_CODE_THEME_ID = "github";

export function resolveCodeTheme(id: string, isDark: boolean): BundledTheme {
  const def = CODE_THEMES.find((t) => t.id === id) ?? CODE_THEMES[0]!;
  return isDark ? def.dark : def.light;
}

export const ALL_CURATED_THEMES: BundledTheme[] = CODE_THEMES.flatMap((t) => [t.light, t.dark]);
