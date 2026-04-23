---
name: spring-ui-project-setup
description: Set up or convert a React project to use RingCentral Spring UI with the correct React version, Tailwind CSS v3, PostCSS, and all required configurations. Use when creating a new Spring UI app, converting an existing React project to Spring UI, or fixing Spring UI project setup issues.
---

# Spring UI Project Setup

This skill ensures any React project is correctly configured for RingCentral Spring UI. It handles new project creation and conversion of existing projects (e.g., projects using Tailwind v4, React 19, or different CSS setups).

## When to Use

- Creating a new Spring UI demo or application from scratch
- Converting an existing React + Vite project to use Spring UI
- Fixing a broken Spring UI setup (missing theme, unstyled components, build errors)
- Setting up a project from a user-provided zip, Figma export, or code snippet that uses Spring UI

## Critical Requirements

Spring UI has specific version requirements that differ from the Replit workspace defaults. These must be followed exactly:

| Dependency | Required | Workspace Default | Notes |
|---|---|---|---|
| `react` | `^18.3.1` | `19.x` (catalog) | Spring UI requires React 18. Do NOT use `catalog:` |
| `react-dom` | `^18.3.1` | `19.x` (catalog) | Must match React version |
| `@types/react` | `^18.3.23` | `^19.x` (catalog) | Must match React 18. Do NOT use `catalog:` |
| `@types/react-dom` | `^18.3.7` | `^19.x` (catalog) | Must match React 18. Do NOT use `catalog:` |
| `tailwindcss` | `3` | `^4.x` (catalog) | Spring UI theme plugin requires Tailwind v3. Do NOT use `catalog:` |
| `postcss` | `^8.5.8` | not needed for TW4 | Required for Tailwind v3 |
| `autoprefixer` | `^10.4.27` | not needed for TW4 | Required for Tailwind v3 |
| `@tailwindcss/vite` | **REMOVE** | catalog | Tailwind v4 plugin — incompatible with Spring UI |
| `@tailwindcss/typography` | **REMOVE** | sometimes present | Tailwind v4 plugin — not needed |
| `tw-animate-css` | **REMOVE** | sometimes present | Not needed for Spring UI |

## Spring UI Packages

These are the core Spring UI packages (all at `^1.8.0`):

```json
{
  "@ringcentral/spring-ui": "^1.8.0",
  "@ringcentral/spring-theme": "^1.8.0",
  "@ringcentral/spring-icon": "^1.8.0"
}
```

**Important**: The icon package is `@ringcentral/spring-icon` (singular), NOT `@ringcentral/spring-icons`.

Common peer dependencies used alongside Spring UI:

```json
{
  "dayjs": "^1.11.20",
  "react-virtuoso": "4.7.10"
}
```

## Setup Steps

### 1. Create the Artifact

Use `createArtifact()` with `artifactType: "react-vite"`. This scaffolds a Vite project with Replit plugins.

### 2. Fix package.json

The scaffold will use `catalog:` references that resolve to React 19 and Tailwind v4. These must be replaced with explicit Spring UI-compatible versions.

Replace dependencies — see `reference/package.json.template` for a complete example.

Key changes:
- Pin `react` and `react-dom` to `^18.3.1` (not `catalog:`)
- Pin `@types/react` to `^18.3.23` and `@types/react-dom` to `^18.3.7` (not `catalog:`)
- Pin `tailwindcss` to `3` (not `catalog:`)
- Add `postcss` and `autoprefixer` as devDependencies
- Remove `@tailwindcss/vite`, `@tailwindcss/typography`, `tw-animate-css`
- Remove all `@radix-ui/*`, `wouter`, `@tanstack/react-query`, `@workspace/api-client-react`, shadcn-related packages unless the project needs them
- Add Spring UI packages: `@ringcentral/spring-ui`, `@ringcentral/spring-theme`, `@ringcentral/spring-icon`

### 3. Remove @tailwindcss/vite from vite.config.ts

The scaffold's `vite.config.ts` imports `@tailwindcss/vite` and adds it as a plugin. **Remove both the import and the plugin entry.** Tailwind v3 uses PostCSS, not a Vite plugin.

```diff
- import tailwindcss from "@tailwindcss/vite";

  plugins: [
    react(),
-   tailwindcss(),
    runtimeErrorOverlay(),
```

Keep everything else in `vite.config.ts` (Replit plugins, resolve aliases, port/basePath handling).

### 4. Create postcss.config.cjs

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. Create tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    'node_modules/@ringcentral/spring-ui/**/*.js',
  ],
  plugins: [require('@ringcentral/spring-theme/tailwind')],
}
```

The `@ringcentral/spring-theme/tailwind` plugin registers all Spring UI design tokens (colors, spacing, typography, shadows, borders). The content path for `spring-ui` ensures Tailwind scans Spring UI component classes.

### 6. Replace src/index.css

The scaffold uses Tailwind v4 CSS syntax (`@import "tailwindcss"`, `@theme inline`, etc.). Replace it entirely with Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Do NOT keep any `@import "tailwindcss"`, `@theme inline`, `@custom-variant`, `@plugin`, or CSS custom property blocks from the v4 scaffold. They are incompatible with Tailwind v3.

### 7. Update src/main.tsx

Keep it minimal:

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

### 8. Update src/App.tsx

Wrap all content in `<ThemeProvider theme={suiLight}>`:

```tsx
import { useState } from 'react'
import { Button, ThemeProvider, suiLight } from '@ringcentral/spring-ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={suiLight}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <h1 className="typography-headline text-neutral-b0">Spring UI Demo</h1>
        <Button
          variant="contained"
          onClick={() => setCount((c) => c + 1)}
        >
          Count is {count}
        </Button>
      </div>
    </ThemeProvider>
  )
}

export default App
```

### 9. Remove unused scaffold files

Delete these directories/files that the react-vite scaffold creates but Spring UI projects don't need:

- `src/components/ui/` (shadcn components)
- `src/hooks/` (shadcn hooks)
- `src/pages/` (scaffold pages)
- `src/lib/` (shadcn utils)
- `components.json` (shadcn config)

### 10. Install and run

```bash
pnpm install
```

Then restart the workflow.

## Converting an Existing Project

When converting a project that already uses a different setup:

### From Tailwind v4 to v3
1. Remove `@tailwindcss/vite` from vite.config.ts (import and plugin)
2. Remove `@tailwindcss/vite`, `@tailwindcss/typography`, `tw-animate-css` from package.json
3. Add `tailwindcss: "3"`, `postcss`, `autoprefixer` to devDependencies
4. Create `postcss.config.cjs` and `tailwind.config.cjs`
5. Replace `src/index.css` with Tailwind v3 directives

### From React 19 to React 18
1. Change `react` and `react-dom` to `"^18.3.1"` (not `catalog:`)
2. Change `@types/react` to `"^18.3.23"` and `@types/react-dom` to `"^18.3.7"`
3. Remove any React 19 features (use, Actions, etc.) if present

### From CSS Modules / styled-components / etc.
1. Add Tailwind v3 setup (postcss.config.cjs, tailwind.config.cjs, index.css)
2. Replace custom styling with Spring UI tokens and Tailwind utilities
3. Follow the `spring-ui-design-system` skill for correct token usage

## Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Using `catalog:` for react | Type errors, hook crashes | Pin to `^18.3.1` explicitly |
| Using `catalog:` for tailwindcss | Build errors, no styles | Pin to `3` explicitly |
| Keeping `@tailwindcss/vite` plugin | Duplicate/conflicting Tailwind | Remove import and plugin from vite.config.ts |
| Using `@import "tailwindcss"` in CSS | Tailwind v4 syntax, breaks v3 | Use `@tailwind base/components/utilities` |
| Keeping `@theme inline` block in CSS | Tailwind v4 syntax, breaks v3 | Remove entirely |
| Using `@ringcentral/spring-icons` | 404 from npm | Correct name is `@ringcentral/spring-icon` (singular) |
| Missing Spring UI content path in tailwind config | Spring UI classes get purged | Add `'node_modules/@ringcentral/spring-ui/**/*.js'` to content |
| Missing `@ringcentral/spring-theme/tailwind` plugin | No design tokens available | Add to plugins array in tailwind.config.cjs |
| Using `bg-white` instead of `bg-neutral-base` | Wrong color in dark mode | Follow spring-ui-design-system skill for correct tokens |

## Related Skills

- `spring-ui-design-system` — Component API reference, design tokens, color system, spacing, typography
- `presentation-config` — Add theme switching FAB, environment frames (macOS/Windows simulators)
