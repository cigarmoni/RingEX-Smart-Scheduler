---
name: spring-ui-mockup-sandbox
description: >
  *REQUIRED READING!* READ THIS INSTEAD OF THE mockup-sandbox SKILL. THAT SKILL IS NOW *DEPRECATED*.
  Spring UI adaptation of the built-in mockup-sandbox artifact type. Provides
  an isolated sandbox for rapid UI prototyping on the workspace canvas using
  Spring UI components and Tailwind v3. Use when building mockup frames with
  @ringcentral/spring-ui and Tailwind v3.
---

# Spring UI Mockup Sandbox

This skill is the Spring UI adaptation of the built-in `mockup-sandbox` artifact type. It uses Spring UI (`@ringcentral/spring-ui`) and Tailwind v3.

The `mockup-sandbox` artifact provides an isolated sandbox for rapid UI prototyping on the workspace canvas. Components are placed in `src/components/mockups/` and are automatically discovered by the `mockupPreviewPlugin` Vite plugin.

## When to Use

- The user wants to prototype UI components on the workspace canvas
- Building mockup frames for design iteration
- Any `mockup-sandbox` artifact that should use Spring UI components

## When NOT to Use

- Building a full web application (use `spring-ui-react-vite` instead)
- Extracting design data from existing mockups (use `spring-ui-mockup-extract`)
- Building mobile apps (use `spring-ui-expo`)

## Setup

### 1. Create the artifact

```javascript
await createArtifact({
  artifactType: "mockup-sandbox",
  slug: "<slug>",
  previewPath: "/<slug>/",
  title: "<Title>"
});
```

### 2. Convert to Spring UI

Immediately after creating the artifact, run the conversion script:

```bash
bash .agents/skills/spring-ui-mockup-sandbox/scripts/convert-to-spring-ui.sh artifacts/<slug>
```

This replaces the default scaffold with the Spring UI template, installs Spring UI packages, and configures Tailwind v3 with the Spring theme plugin.

### 3. Restart the workflow

Restart the artifact's workflow so the dev server picks up the changes.

## Architecture

### Mockup Preview Plugin

The `mockupPreviewPlugin.ts` Vite plugin automatically discovers `.tsx` files in `src/components/mockups/` and generates a module map at `src/.generated/mockup-components.ts`. This is artifact-specific infrastructure and must not be modified.

- Files prefixed with `_` (e.g. `_helpers.tsx`) or inside `_`-prefixed directories are excluded from discovery
- The plugin uses `chokidar` for file watching and `fast-glob` for initial discovery
- Components are loaded lazily via dynamic imports

### Preview Routing

- Root URL (`/`) shows a gallery/landing page
- `/preview/<ComponentName>` renders the specified component in isolation
- The canvas iframe targets `/preview/...` URLs to display individual mockup frames

### Component Resolution

When a preview URL is requested, the app resolves the component by checking (in order):
1. `default` export
2. `Preview` named export
3. Export matching the filename
4. Last function export

## Spring UI Components

Import components directly from `@ringcentral/spring-ui`:

```tsx
import { Button, TextField, ThemeProvider, suiLight } from "@ringcentral/spring-ui";
```

Import icons from `@ringcentral/spring-icon`:

```tsx
import { Search } from "@ringcentral/spring-icon";
```

### ThemeProvider

The app is wrapped in `ThemeProvider` with `suiLight` theme. Mockup components rendered via `/preview/...` also inherit this provider.

### Tailwind Classes

Use Spring UI's Tailwind token classes for consistent styling:

- **Backgrounds**: `bg-sui-neutral-b01`, `bg-sui-neutral-b02`, `bg-sui-neutral-b03`
- **Text**: `text-sui-neutral-f01` (primary), `text-sui-neutral-f02` (secondary), `text-sui-neutral-f03` (tertiary)
- **Borders**: `border-sui-neutral-l02`

Refer to the `spring-ui-react-vite` skill for full component documentation and Spring UI conventions.

## Building Mockup Components

Create mockup components in `src/components/mockups/`:

```tsx
// src/components/mockups/LoginForm.tsx
import { Button, TextField } from "@ringcentral/spring-ui";

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-sui-neutral-b01 flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-sui-neutral-f01">Sign In</h1>
        <TextField label="Email" placeholder="you@example.com" />
        <TextField label="Password" type="password" />
        <Button variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </div>
    </div>
  );
}
```

The component will be accessible at `/preview/LoginForm` after the plugin rediscovers it.

## Delegation

For design work, delegate to a GENERAL subagent:

```javascript
await subagent({
  task: "Build a dashboard mockup component...",
  relevantFiles: [
    ".agents/skills/spring-ui-mockup-sandbox/SKILL.md",
    ".agents/skills/spring-ui-react-vite/SKILL.md",
    "artifacts/<slug>/src/components/mockups/"
  ],
  specialization: "GENERAL"
});
```

## Key Files

| File | Purpose |
|------|---------|
| `mockupPreviewPlugin.ts` | Vite plugin for auto-discovering mockup components |
| `src/.generated/mockup-components.ts` | Auto-generated module map (do not edit) |
| `src/components/mockups/` | Place mockup components here |
| `src/App.tsx` | Root app with ThemeProvider, preview routing, and gallery |
| `tailwind.config.cjs` | Tailwind v3 config with Spring theme plugin |
| `postcss.config.cjs` | PostCSS config for Tailwind v3 |

## Content Rules (MANDATORY for all UI text)
All visible text in any mockup component MUST follow the RingCentral Content Companion rules (`.agents/skills/rc-content-companion/SKILL.md`). This applies to every label, button, heading, description, error message, empty state, tooltip, and placeholder.
### Quick Reference
- **Be brief**: "To share your screen, ask the host" — cut "in order to", "due to the fact that"
- **Plain language**: "Turn on" not "Enable", "Sign in" not "Log in", "Go to" not "Navigate", "Use" not "Utilize"
- **Contractions always**: "don't", "can't", "won't", "it's", "you'll", "doesn't"
- **Be positive**: "Free up some space to save this" not "You don't have enough space"
- **Active voice**: "The host muted you" not "You have been muted by the host"
- **No filler**: Never use "successfully", "unfortunately", "oops", "please note that"
- **Preferred terms**: "Admin Portal" not "Service web", "click" (desktop) / "tap" (mobile), "text" not "SMS", "coworker" not "colleague", "dropdown" (one word), "WiFi" not "Wi-Fi", "sign in" not "log in", "delete" (permanent) vs "remove" (reversible)
- **Error messages**: State what happened + how to fix it — never show error codes
- **Empty states**: Explain what will appear here + provide a CTA to get started
- **Articles & pronouns**: Include "a/an/the" and "you/your" in body text (omit in CTAs and headers)
For full rules and examples, read `.agents/skills/rc-content-companion/SKILL.md` and its `reference/` files.

## Constraints

- This artifact type is **not deployable** — it is a local prototyping tool only
- Do not add routing libraries — the preview routing is handled by the App component
- Do not modify `mockupPreviewPlugin.ts` or `src/.generated/`
- Do not add any component libraries other than Spring UI — use `@ringcentral/spring-ui` for all components
- Do not use the Tailwind Vite plugin — this uses Tailwind v3 with PostCSS
