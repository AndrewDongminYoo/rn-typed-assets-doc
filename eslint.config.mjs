import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import importSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Flat ESLint config for a Next.js 16 + TypeScript + Tailwind stack.
 * - Uses type-aware rules (`project` set to tsconfig.json).
 * - Enforces Next.js Core Web Vitals rules.
 * - Adds React Hooks safety and import/JSX sorting.
 */
const eslintConfig = [
  {
    ignores: [".next/"],
  },
  ...nextTs,
  ...nextVitals,
  js.configs.recommended,
  // ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Specifiers written only as `type` are now required to include `type` + auto-correction
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // (Optional) Prevents mistakes from incorrectly using side-effect imports via type imports
      "@typescript-eslint/no-import-type-side-effects": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "simple-import-sort": importSort,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{test.js,test.ts,test.tsx}", "jest.setup.js"],
    ...pluginJest.configs["flat/recommended"],
  },
  {
    files: ["scripts/**/*.test.ts", "lib/**/*.test.ts"],
    rules: {
      // These dirs use node:test, not jest
      ...Object.fromEntries(
        Object.keys(pluginJest.rules ?? {}).map((rule) => [`jest/${rule}`, "off"])
      ),
    },
  },
  {
    files: ["jest.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      // It's rare to need a /// triple-slash reference outside of auto-generated code...
      // https://typescript-eslint.io/rules/triple-slash-reference/
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default eslintConfig;
