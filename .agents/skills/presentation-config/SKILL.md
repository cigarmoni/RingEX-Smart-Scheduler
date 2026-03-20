---
name: presentation-config
description: Add a floating Presentation Config FAB menu to any Spring UI demo app. Provides theme switching (Light/Dark/High Contrast), environment frames (Full Screen/macOS/Windows desktop simulators), user role selection, and flow options. Use when the user asks to add presentation settings, a config FAB, environment simulators, or theme switching to a Spring UI app.
---

# Presentation Config

A reusable floating action button (FAB) menu system that lets designers quickly switch themes, environment frames, user roles, and flow options in any Spring UI demo app.

## What It Provides

1. **PresentationConfigContext** — React context + provider managing shared state:
   - `themeOption` (light / dark / highContrast) with corresponding Spring UI theme objects
   - `environment` (fullscreen / macos / windows)
   - `userRole` (admin / agent)

2. **PresentationConfigFab** — A floating settings button (vertically centered, right edge) that opens a `Menu` with grouped sections for Theme, Environment, User, and Flow.

3. **EnvironmentFrame** — Wraps app content in a pixel-accurate desktop simulator:
   - **Full Screen** — plain flex wrapper
   - **macOS** — menu bar, draggable/resizable window with traffic lights, dock with icons
   - **Windows** — draggable/resizable window with min/max/close buttons, frosted taskbar with clock

## Prerequisites

- `@ringcentral/spring-ui`, `@ringcentral/spring-theme`, `@ringcentral/spring-icon` installed
- Tailwind CSS configured with Spring UI tokens
- Asset images for macOS and Windows frames (see Assets section below)

## File Structure

Create a `presentation-config/` folder inside the artifact's `src/` directory:

```
src/
  presentation-config/
    index.ts                        # barrel export
    PresentationConfigContext.tsx    # context + provider + hook
    PresentationConfigFab.tsx        # FAB + menu UI
    EnvironmentFrame.tsx             # macOS / Windows / fullscreen wrappers
  assets/
    macos/
      close.svg
      minimize.svg
      fullscreen.svg
      wallpaper-light.jpg
      finder.png
      safari.png
      trash.png
    windows/
      rc-icon.svg
      wallpaper.jpg
```

## Setup Steps

1. **Copy the source files** from the reference directory into the artifact's `src/presentation-config/` folder. Use the templates in `reference/` as the starting point:
   - `reference/PresentationConfigContext.tsx`
   - `reference/PresentationConfigFab.tsx`
   - `reference/EnvironmentFrame.tsx`
   - `reference/index.ts`

2. **Copy or provide the asset images** into `src/assets/macos/` and `src/assets/windows/`. The EnvironmentFrame imports these relative paths:
   - `../assets/macos/close.svg`, `minimize.svg`, `fullscreen.svg`, `wallpaper-light.jpg`, `finder.png`, `safari.png`, `trash.png`
   - `../assets/windows/rc-icon.svg`, `wallpaper.jpg`

3. **Wire into the app's root component** (e.g., `App.tsx`):

```tsx
import { PresentationConfigProvider, usePresentationConfig, PresentationConfigFab, EnvironmentFrame } from './presentation-config'

function AppContent() {
  const { themeObject } = usePresentationConfig()

  return (
    <ThemeProvider theme={themeObject}>
      <EnvironmentFrame>
        {/* Your app content here — use flex-1, NOT min-h-screen */}
        <div className="flex bg-neutral-base flex-1 flex-col">
          {/* ... */}
        </div>
      </EnvironmentFrame>
      <PresentationConfigFab />
    </ThemeProvider>
  )
}

function App() {
  return (
    <PresentationConfigProvider>
      <AppContent />
    </PresentationConfigProvider>
  )
}
```

## Important Implementation Rules

- **Content sizing**: App content inside `EnvironmentFrame` must use `flex-1` (not `min-h-screen`) so it sizes relative to the simulated frame, not the real viewport.
- **Backdrop blur pattern**: The macOS/Windows window chrome puts `backdropFilter: blur()` on a separate `absolute inset-0 pointer-events-none` sibling div, NOT on the parent containing app content. This keeps text crisp.
- **FAB component**: Use `IconButton` (variant="contained", shape="squircle") — not `FabButton`, which has internal activated-state conflicts.
- **Design tokens**: Use Spring UI tokens (`text-neutral-b0/b1/b2`, `bg-neutral-base/b5`, etc.) — never raw Tailwind colors.
- **Default environment** should be `'fullscreen'`.
- **Menu placement**: The FAB menu opens to the `left` with an 8px offset from the button.
- **Window interaction**: Both macOS and Windows frames lock to `height: 100vh` with `overflow: hidden`. The app window starts at 1440x960 (clamped to container) and supports drag (title bar) + resize (8 directions) via the `useWindowInteraction` hook.

## Customization

- **Add menu sections**: Edit `PresentationConfigFab.tsx` to add new grouped menu items (e.g., language, density).
- **Add environment frames**: Add new frame components in `EnvironmentFrame.tsx` and extend the `EnvironmentOption` type.
- **Extend context state**: Add new state fields to `PresentationConfigContext.tsx` and expose them via the hook.

## Reference Files

Complete source code for each file is in the `reference/` subdirectory of this skill. Copy and adapt them for your artifact.
