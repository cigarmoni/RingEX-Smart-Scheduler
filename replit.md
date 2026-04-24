# Smart scheduler in RingEX (Bookings)

React + Vite + Express + Drizzle. UI built with RingCentral Spring UI + Tailwind v3, with shadcn/Radix/lucide already present in the original upload.

## Workspace

- App package: `@workspace/smart-scheduler`
- Dev: `pnpm --filter @workspace/smart-scheduler run dev` (workflow: `artifacts/smart-scheduler: web`)
- Port: 24610

## Working principles

- Treat the original uploaded code as the source of truth. Tweaks must be small, surgical, and incremental — do not refactor broadly without explicit approval.
- When migrating UI to Spring UI components, follow the Figma reference for the specific node and the project's Spring UI tokens, not generic defaults.

## Spring UI gotchas (learned the hard way)

### 1. Design tokens override Figma fallbacks
Figma `getDesignContext` often returns class strings like `text-[length:var(--typography/subtitle/fontsize, 15px)]`. The `15px` is a **CSS fallback** — not the spec.

Always look up the project's actual token value before hardcoding. The authoritative source is `client/src/index.css` (and any imported Spring UI CSS). Examples in this project:

- `--subtitle-font-size: 14px` (Figma fallback shows 15px — wrong)
- `--subtitle-font-weight: 500`
- `--subtitle-line-height: 20px`

When applying typography, prefer the Tailwind class pattern already in use elsewhere in the codebase (e.g. `AppShell.tsx`):
```
font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] [font-style:var(--subtitle-font-style)]
```

### 2. Spring icon SVGs ship without `fill` attribute
Icons in `@ringcentral/spring-icon` (e.g. `Xmd`, `UpgradeMd`) are `<svg><path d="…" /></svg>` with **no fill attribute and no `currentColor`**. The `<Icon as={…} color={…}>` wrapper does not propagate fill to the path.

Net effect: the icon may render invisibly or as a flat black shape that ignores the requested color.

Fix pattern — render the icon component directly inside a span/button and use Tailwind arbitrary selectors to set fill on the inner SVG:
```tsx
<span className="inline-flex h-4 w-4 items-center justify-center [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-current">
  <Xmd />
</span>
```
For colored variants, replace `fill-current` with `fill-[#cc5200]` etc.

When fixing this for one icon, audit every other Spring icon usage in the same change — they all have the same bug.

## Working with Figma references

- File keys used:
  - `D4uOqeQK2hFoRHhMPWmUSM` — Spring Design System
  - `g6jPLFyDREVcd1iOPOARKH` — PLG UX Patterns
- Use `mcpFigma_getMetadata` for layout dimensions and `mcpFigma_getDesignContext` for the generated React snippet (then convert to project tokens — see above).

## Verification discipline

- Spec-table comparison (code-vs-Figma measurements) is necessary but not sufficient. Always render the live UI before claiming a match.
- For UI behind interaction (popover, modal, hover state, conditional tab):
  - Temporarily flip the controlling state to its visible value, screenshot, then revert.
  - Or drive the click via tooling.
- When the user says something looks wrong, that is ground truth. Investigate the live render rather than re-defending the spec.
