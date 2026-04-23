---
name: spring-ui-design-system
description: >-
  *REQUIRED READING!* RingCentral Spring UI component library and design system.
  Use when building React UI with Spring UI components, applying design tokens
  (colors, spacing, typography, shadows, borders), or following RingCentral design
  patterns. Uses Spring UI + Tailwind v3.
  Includes 120+ components, Tailwind utilities, and accessibility guidelines.
---

# Spring UI Design System (React + Vite)

RingCentral Spring UI provides 120+ accessible UI components, a comprehensive Tailwind v3 theme preset, and 559 icons. All three packages (`@ringcentral/spring-ui`, `@ringcentral/spring-theme`, `@ringcentral/spring-icon`) must be direct dependencies in the frontend `package.json` for pnpm strict resolution.

All UI must use Spring UI components and design tokens — never use hardcoded colors, arbitrary spacing, or raw CSS font properties.

## Architecture

- Follow modern web application patterns and best-practices.
- Put as much of the app in the frontend as possible. The backend should only be responsible for data persistence and making API calls.
- Minimize the number of files. Collapse similar components into a single file.
- Do NOT use shadcn, Radix UI, lucide-react, or Tailwind v4. Import components from `@ringcentral/spring-ui`, icons from `@ringcentral/spring-icon`.
- Use `twMerge` from `@ringcentral/spring-ui` instead of `cn()` from `@/lib/utils`.
- All three `@ringcentral` packages (`spring-ui`, `spring-theme`, `spring-icon`) must be listed as **direct dependencies** in the frontend `package.json` for pnpm strict resolution.
- Wrap all UI in `<ThemeProvider theme={suiLight}>`.

## Documentation Structure

For full details on any token category or component, read the corresponding reference file:

### Core References

- [Implementation Guide](reference/implementation-guide.md): Step-by-step workflow for implementing UI from Figma, screenshots, or text descriptions
- [Components](reference/components.md): All 120+ components organized by category with detailed prop documentation
- [Icons](reference/icons.md): All 559 icons from `@ringcentral/spring-icon` with usage examples
- [Colors](reference/colors.md): Full color palette, naming conventions, opacity variants, pairing rules
- [Spacing](reference/spacing.md): Spacing scale, padding/margin/gap guidelines
- [Typography](reference/typography.md): All typography classes, hierarchy, sizing
- [Shadows & Borders](reference/shadows-borders.md): Elevation, border radius, border colors, focus rings

### Individual Component Docs

- [Accordion](reference/components/accordion.md)
- [Alert](reference/components/alert.md)
- [Announcement](reference/components/announcement.md)
- [Autocomplete](reference/components/autocomplete.md)
- [Avatar / AvatarGroup](reference/components/avatar.md)
- [Badge](reference/components/badge.md)
- [Block](reference/components/block.md)
- [BottomNavigation](reference/components/bottomnavigation.md)
- [Button](reference/components/button.md)
- [CallButton](reference/components/callbutton.md)
- [Checkbox](reference/components/checkbox.md)
- [Chip](reference/components/chip.md)
- [CircularProgressIndicator](reference/components/circularprogressindicator.md)
- [DatePicker](reference/components/datepicker.md)
- [Dialog / DialogTitle / DialogContent / DialogActions](reference/components/dialog.md)
- [Divider](reference/components/divider.md)
- [Drawer / SwipeableDrawer](reference/components/drawer.md)
- [Dropdown](reference/components/dropdown.md)
- [EmptyState](reference/components/emptystate.md)
- [FabButton](reference/components/fabbutton.md)
- [FormField / FormLabel](reference/components/formfield.md)
- [IconButton / IconButtonGroup](reference/components/iconbutton.md)
- [InlineEditable](reference/components/inlineeditable.md)
- [LinearProgressIndicator](reference/components/linearprogressindicator.md)
- [Link](reference/components/link.md)
- [List / ListItem](reference/components/list.md)
- [Menu / MenuItem / MenuActions](reference/components/menu.md)
- [Modal](reference/components/modal.md)
- [PageHeader](reference/components/pageheader.md)
- [Popover](reference/components/popover.md)
- [Popper](reference/components/popper.md)
- [Radio / RadioGroup](reference/components/radio.md)
- [Rating](reference/components/rating.md)
- [Select / Option](reference/components/select.md)
- [SingleFilter](reference/components/singlefilter.md)
- [Skeleton](reference/components/skeleton.md)
- [Slider](reference/components/slider.md)
- [Snackbar](reference/components/snackbar.md)
- [SortableList](reference/components/sortablelist.md)
- [SplitButton](reference/components/splitbutton.md)
- [Squircle](reference/components/squircle.md)
- [StatusIndicator](reference/components/statusindicator.md)
- [Stepper / Step / StepButton](reference/components/stepper.md)
- [Switch](reference/components/switch.md)
- [Table / TableHead / TableBody / TableRow / TableCell](reference/components/table.md)
- [Tabs / Tab / TabPanel](reference/components/tabs.md)
- [Tag](reference/components/tag.md)
- [Text](reference/components/text.md)
- [Textarea](reference/components/textarea.md)
- [TextField](reference/components/textfield.md)
- [TimePicker](reference/components/timepicker.md)
- [Tooltip](reference/components/tooltip.md)
- [Tray](reference/components/tray.md)
- [VirtualizedList](reference/components/virtualizedlist.md)

## Color System Summary

### Naming Convention

| Suffix         | Meaning                  | Example                                   |
| -------------- | ------------------------ | ----------------------------------------- |
| `-b`           | Background variant       | `bg-primary-b`, `bg-success`, `bg-danger` |
| `-f`           | Foreground variant       | `border-primary-f`, `text-success-f`      |
| `-b0` to `-b5` | Black levels (grayscale) | `text-neutral-b1`, `bg-neutral-b5`        |
| `-w0`          | White                    | `text-neutral-w0` (on colored bg)         |
| `-t10`, `-t20` | Opacity (10%, 20%)       | `border-neutral-b0-t20`                   |

### Essential Color Rules

1. **Backgrounds**: Use `bg-neutral-base` (not `bg-white`). For colored: `bg-primary-b`, `bg-success`, `bg-danger`.
2. **Text on colored bg**: Always `text-neutral-w0`.
3. **Text hierarchy**: `text-neutral-b0` (primary, with secondary), `text-neutral-b1` (standalone), `text-neutral-b2` (secondary), `text-neutral-b3` (disabled).
4. **Borders**: Always use `neutral-b0` + opacity: `border-neutral-b0-t10` (subtle), `border-neutral-b0-t20` (standard). Never use `neutral-b1` through `neutral-b5` for borders.
5. **Accent borders**: `border-primary-f`, `border-success-f`, `border-danger-f`.

### Cobranding Colors (App Bar)

Used exclusively in the top app bar area:

| Token                         | Usage                      |
| ----------------------------- | -------------------------- |
| `bg-cobranding-accent`        | App bar background         |
| `text-cobranding-on-accent`   | Text/icons on app bar      |
| `bg-cobranding-on-accent-t10` | Inputs/controls on app bar |
| `text-cobranding-on-base`     | Action icons on app bar    |

### Semantic Colors

| Color   | Background     | Foreground                           | Use                    |
| ------- | -------------- | ------------------------------------ | ---------------------- |
| Primary | `bg-primary-b` | `text-primary-f`, `border-primary-f` | Brand, active states   |
| Success | `bg-success`   | `text-success-f`, `border-success-f` | Positive, call buttons |
| Danger  | `bg-danger`    | `text-danger-f`, `border-danger-f`   | Error, destructive     |
| Warning | `bg-warning`   | `text-warning-f`, `border-warning-f` | Caution                |
| AI      | `bg-ai`        | `text-ai`                            | AI features            |

### Extra Colors (Visualization)

`extra-amethyst`, `extra-denim`, `extra-lime`, `extra-mango`, `extra-olive`, `extra-scarlet`, `extra-tangerine`, `extra-tiffany`, `extra-wildberry`

## Spacing Summary

Base unit: 4px. Use Tailwind scale values only.

| Token | Size | Use                          |
| ----- | ---- | ---------------------------- |
| `1`   | 4px  | Micro (icon gaps)            |
| `2`   | 8px  | Compact (within components)  |
| `3`   | 12px | Small                        |
| `4`   | 16px | Base unit (standard padding) |
| `6`   | 24px | Comfortable (card padding)   |
| `8`   | 32px | Large (page padding)         |
| `12`  | 48px | Section spacing              |
| `16`  | 64px | Major sections               |

**Rules**: Use `gap-` for flex/grid. Use `p-`/`m-` for padding/margin. Avoid arbitrary values like `p-[13px]`.

## Typography Summary

Always use typography utility classes (they include font-family, size, weight, and line-height):

| Class                   | Size      | Use                 |
| ----------------------- | --------- | ------------------- |
| `typography-headline`   | 28px      | Hero headlines      |
| `typography-display1`   | 24px      | Page titles         |
| `typography-display2`   | 24px semi | Section headers     |
| `typography-display3`   | 20px      | Subsections         |
| `typography-title`      | 16px      | Card/dialog titles  |
| `typography-subtitle`   | 14px      | Section labels      |
| `typography-mainText`   | 14px      | Body text (default) |
| `typography-descriptor` | 12px      | Metadata            |
| `typography-label`      | 12px      | Form labels         |

**Font weights**: Only `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700). No other weights are loaded.

## Shadows & Borders Summary

### Shadows (Elevation)

| Class       | Use                            |
| ----------- | ------------------------------ |
| No shadow   | Flat, inline elements          |
| `shadow-xs` | Subtle elevation, hover states |
| `shadow-sm` | Cards, floating elements       |
| `shadow-md` | Modals, dropdowns, overlays    |

Semantic shadows: `shadow-xs-primary`, `shadow-xs-success`, `shadow-xs-danger`, `shadow-sm-ai`.

### Border Radius

| Class          | Size | Use              |
| -------------- | ---- | ---------------- |
| `rounded-xs`   | 4px  | Tags, badges     |
| `rounded-sm`   | 10px | Buttons, inputs  |
| `rounded-md`   | 14px | Cards, dialogs   |
| `rounded-lg`   | 16px | Large containers |
| `rounded-full` | pill | Avatars, pills   |

## Common Patterns

### Card

```tsx
<div className="bg-neutral-base rounded-sm border border-neutral-b0-t20 p-4">
  <h3 className="typography-title text-neutral-b0">Title</h3>
  <p className="typography-mainText text-neutral-b2">Description</p>
</div>
```

### Sidebar

```tsx
<div className="bg-neutral-b5 border-r border-neutral-b0-t10 w-18">
  <IconButton
    symbol={CallFilledMd}
    label="Phone"
    size="xxxlarge"
    shape="rectangular"
    variant="inverted"
    background={true}
  />
</div>
```

### Hover Effect

```tsx
<div className="bg-neutral-base hover:bg-neutral-b5 transition-colors">
  Hoverable
</div>
```

### Status Indicator

```tsx
<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-success" />
  <span className="typography-descriptor text-neutral-b2">Active</span>
</div>
```

## Anti-Patterns

- **Never** use Tailwind's default colors (`bg-blue-600`, `text-gray-500`) — use Spring UI tokens
- **Never** set `font-family` manually — typography classes include it
- **Never** use `bg-white` — use `bg-neutral-base`
- **Never** use `neutral-b1`–`neutral-b5` for borders — use `neutral-b0` with opacity
- **Never** use `font-light`, `font-extrabold`, `font-black` — only 4 weights are available
- **Never** use arbitrary spacing (`p-[13px]`) when a scale value exists
