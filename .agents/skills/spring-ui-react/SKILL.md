---
name: spring-ui-react
description: >
  *REQUIRED READING!* READ THIS INSTEAD OF THE react-vite SKILL. THAT SKILL IS NOW *DEPRECATED*.
  This is the RingCentral Spring UI React+Vite skill. It replaces shadcn + Tailwind v4 with
  Spring UI + Tailwind v3. It contains all component documentation, build orchestration,
  and general frontend guidance. Always use this when the user is creating any web artifact.
---

# Spring UI Design System (React + Vite)

RingCentral Spring UI provides 55+ accessible UI components, a comprehensive Tailwind v3 theme preset, and 559 icons. All three packages (`@ringcentral/spring-ui`, `@ringcentral/spring-theme`, `@ringcentral/spring-icon`) must be direct dependencies in the frontend `package.json` for pnpm strict resolution.

Always follow these guidelines when building a React + Vite web application.

## Architecture

- Follow modern web application patterns and best-practices.
- Put as much of the app in the frontend as possible. The backend should only be responsible for data persistence and making API calls.
- Minimize the number of files. Collapse similar components into a single file.
- If the app is complex and requires functionality that can't be done in a single request, it is okay to stub out the backend and implement the frontend first.
- Do NOT use shadcn, Radix UI, lucide-react, or Tailwind v4. Import components from `@ringcentral/spring-ui`, icons from `@ringcentral/spring-icon`.
- Use `twMerge` from `@ringcentral/spring-ui` instead of `cn()` from `@/lib/utils`.
- All three `@ringcentral` packages (`spring-ui`, `spring-theme`, `spring-icon`) must be listed as **direct dependencies** in the frontend `package.json` for pnpm strict resolution.

## Build Order

**CRITICAL: The subagent is the #1 bottleneck. Sprint to launch it — do createArtifact, convert, OpenAPI, codegen, then IMMEDIATELY launch the subagent. No presentArtifact, no file reading, no exploring before the subagent is running.**

If you are the **main agent**, read [Setup](references/general/setup.md) for the full build order and orchestration instructions. Do it NOW — do not read anything else first.

If you are a **subagent**, skip setup.md — read the guides and component docs below instead.

## Documentation Structure

The references/ directory contains detailed documentation organized as follows:

### Guides - REQUIREMENT: Read all of these in order

- [Build Orchestration](references/guides/00-build-orchestration.md): Architecture rules, build order, design subagent instructions, service access, SEO, and forbidden changes.
- [Installation and Setup](references/guides/01-installation-and-setup.md): Complete setup guide — packages, Tailwind v3 config, PostCSS, Vite config, ThemeProvider, global CSS, and checklist.
- [Theming](references/guides/02-theming.md): ThemeProvider setup, dark mode via theme object swap (not `dark:` variants), design tokens, color system, typography, and component-level theme defaults.
- [Layout and Style](references/guides/03-layout-and-style.md): Layout rules, spacing, hover/focus states, color usage, borders/shadows, and visual style using Spring tokens.
- [Frontend General Rules](references/guides/04-frontend-general-rules.md): Routing (wouter), forms (react-hook-form + Controller), data fetching, sidebar navigation (hooks-based, not component), toasts (Snackbar), icons, and test IDs.

### General Guidance

- [Setup](references/general/setup.md): REQUIRED READING FOR MAIN AGENT - DO NOT READ IF YOU ARE THE SUBAGENT
- [Guardrails](references/general/guardrails.md): Rules for writing frontend using springui
- [Frontend General Rules](references/general/frontend_general_rules.md): Routing, forms, data fetching, sidebar navigation, toasts, icons, dark mode, test IDs, and common pitfalls.
- [Hover and Elevation](references/general/hover_and_elevation.md): Hover/focus/active state rules for Spring UI components and custom elements.
- [Layout and Spacing](references/general/layout_and_spacing.md): Layout rules, flexbox spacing, button sizing, and spacing consistency.
- [Component Rules](references/general/component_rules.md): Spring UI component usage rules (Button, IconButton, Avatar, TextField, Textarea, containers, borders, element dimensions).
- [Sidebar Rules](references/general/sidebar_rules.md): Hooks-based sidebar navigation with Spring UI.
- [Visual Style and Contrast](references/general/visual_style_and_contrast.md): Text color hierarchy, hero images, drop shadows, borders, backgrounds, and Spring UI color tokens.

### Components

- [Component Index](references/components/_index.md): Shadcn-to-Spring UI migration table and full alphabetical component listing with key props.
- [Icons](references/components/icons.md): All 559 icons, lucide-react-to-spring mappings, naming convention, and usage patterns.
- [Accordion](references/components/accordion.md)
- [Alert](references/components/alert.md)
- [Announcement](references/components/announcement.md)
- [Autocomplete](references/components/autocomplete.md)
- [Avatar](references/components/avatar.md)
- [Badge](references/components/badge.md)
- [Block](references/components/block.md)
- [BottomNavigation](references/components/bottom-navigation.md)
- [Button](references/components/button.md)
- [CallButton](references/components/call-button.md)
- [Checkbox](references/components/checkbox.md)
- [Chip](references/components/chip.md)
- [CircularProgressIndicator](references/components/circular-progress-indicator.md)
- [DatePicker](references/components/date-picker.md)
- [Dialog / DialogTitle / DialogContent / DialogActions](references/components/dialog.md)
- [Divider](references/components/divider.md)
- [Drawer](references/components/drawer.md)
- [Dropdown](references/components/dropdown.md)
- [EmptyState](references/components/empty-state.md)
- [FabButton](references/components/fab-button.md)
- [FormField](references/components/form-field.md)
- [IconButton](references/components/icon-button.md)
- [InlineEditable](references/components/inline-editable.md)
- [LinearProgressIndicator](references/components/linear-progress-indicator.md)
- [Link](references/components/link.md)
- [ListNavigation (Hooks)](references/components/list-navigation.md)
- [Menu / MenuItem / MenuActions](references/components/menu.md)
- [Modal](references/components/modal.md)
- [PageHeader](references/components/page-header.md)
- [Popover](references/components/popover.md)
- [Popper](references/components/popper.md)
- [Radio / RadioGroup](references/components/radio.md)
- [Rating](references/components/rating.md)
- [Select / Option](references/components/select.md)
- [SingleFilter](references/components/single-filter.md)
- [Skeleton](references/components/skeleton.md)
- [Slider](references/components/slider.md)
- [Snackbar](references/components/snackbar.md)
- [SortableList](references/components/sortable-list.md)
- [SplitButton](references/components/split-button.md)
- [Squircle](references/components/squircle.md)
- [StatusIndicator](references/components/status-indicator.md)
- [Stepper / Step / StepButton](references/components/stepper.md)
- [Switch](references/components/switch.md)
- [Table / TableHead / TableBody / TableRow / TableCell](references/components/table.md)
- [Tabs / Tab / TabPanel](references/components/tabs.md)
- [Tag](references/components/tag.md)
- [Text](references/components/text.md)
- [Textarea](references/components/textarea.md)
- [TextField](references/components/text-field.md)
- [TimePicker](references/components/time-picker.md)
- [Tooltip](references/components/tooltip.md)
- [Tray](references/components/tray.md)
- [VirtualizedList](references/components/virtualized-list.md)


## Content Rules (MANDATORY for all UI text)
All visible text in any design frame, mockup, or component MUST follow the RingCentral Content Companion rules (`.agents/skills/rc-content-companion/SKILL.md`). This applies to every label, button, heading, description, error message, empty state, tooltip, and placeholder.
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