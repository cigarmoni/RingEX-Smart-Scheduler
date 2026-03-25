# Guardrails

## Architecture

- Follow modern web application patterns and best-practices.
- Put as much of the app in the frontend as possible. The backend should only be responsible for data persistence and making API calls.
- Minimize the number of files. Collapse similar components into a single file.
- If the app is complex and requires functionality that can't be done in a single request, it is okay to stub out the backend and implement the frontend first.
- Do NOT use shadcn, Radix UI, lucide-react, or Tailwind v4. Import components from `@ringcentral/spring-ui`, icons from `@ringcentral/spring-icon`.
- Use `twMerge` from `@ringcentral/spring-ui` instead of `cn()` from `@/lib/utils`.
- All three `@ringcentral` packages (`spring-ui`, `spring-theme`, `spring-icon`) must be listed as **direct dependencies** in the frontend `package.json` for pnpm strict resolution.

## Frontend

- Use `@ringcentral/spring-ui` for ALL UI components and `@ringcentral/spring-icon` for ALL icons. Do NOT use shadcn, lucide-react, or any `@/components/ui/` paths. ThemeProvider is already set up at the app root.
- `@ringcentral/spring-ui/index.css` MUST be imported in `main.tsx` (before `./index.css`). This stylesheet defines all `sui-*` component classes. Without it, components render unstyled.
- ALWAYS pass icons as symbol references (`startIcon={AddMd}`, `symbol={EditMd}`), NEVER as JSX elements (`startIcon={<AddMd />}`). JSX elements bypass the `<Icon>` wrapper and render as oversized, black SVGs. For standalone icons, always wrap in `<Icon symbol={...} size="..." />`.

## How to Access Services

- Always use `https://$REPLIT_DEV_DOMAIN` to reach services, never use `localhost` directly.
  - Correct: `https://$REPLIT_DEV_DOMAIN/api/healthz`
  - Wrong: `localhost:8080/api/healthz`
- Do NOT add Vite proxy configs or custom base URLs to reach other services; the global routing already handles cross-service access.
- Routes are matched most-specific-first, so a service on `/api` won't conflict with one on `/`.
- Use relative URLs where possible.

## SEO

- Ensure every page has a unique, descriptive title tag (e.g., "Product Name - Category | Site Name")
- Add meta descriptions that summarize page content concisely
- Implement Open Graph tags for better social media sharing appearance

## Forbidden Changes

- NEVER edit `package.json` scripts — if you need to install packages, read the `package-management` skill.
- Never install `@tailwindcss/vite` — it is a Tailwind v4 feature and is incompatible with Spring UI.
- Never use `@import "tailwindcss"` — use `@tailwind base; @tailwind components; @tailwind utilities;` (v3 syntax).
- Never import from shadcn paths (`@/components/ui/*`) or use `lucide-react`.