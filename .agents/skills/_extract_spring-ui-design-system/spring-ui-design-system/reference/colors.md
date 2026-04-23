# Color Design Tokens

Spring UI uses a comprehensive color system based on CSS variables and Tailwind CSS utilities. Colors are automatically provided through the ThemeProvider.

## Color Naming Convention

Spring UI uses a systematic naming convention for colors. Understanding the suffix meanings is critical:

### Suffix Meanings:

**For Primary/Semantic Colors:**

- **`-b`** = **Background** (e.g., `primary-b`, `success`, `danger`) - use with `bg-` utilities, pair with `text-neutral-w0`
- **`-f`** = **Foreground** (e.g., `primary-f`) - use with `border-` utilities and `text-` for colored text on light backgrounds

**For Neutral Colors:**

- **`-b0` through `-b5`** = **Black levels** (grayscale intensity, NOT background)
  - The "b" stands for "black level", representing different shades from darkest to lightest

**For All Colors:**

- **`-t10`, `-t20`, `-t50`, `-t80`** = **Transparency/Opacity** percentage

---

### Primary/Semantic Colors:

- **`-b` suffix**: **Background** variant (e.g., `primary-b`, `success`, `danger`)
  - Use with: `bg-` utilities for backgrounds
  - Pair with white text: `bg-primary-b text-neutral-w0`
  - Example: `bg-primary-b`, `bg-success`, `bg-danger`

- **`-f` suffix**: **Foreground** variant (e.g., `primary-f`, `success-f`)
  - Use with: `border-` utilities for accent borders
  - Use with: `text-` utilities for colored text (when NOT on colored background)
  - **NOT for text on colored backgrounds** - use `text-neutral-w0` instead
  - Example: `border-primary-f` (accent border), `text-success-f` (success colored text on light background)

### Neutral Colors (Grayscale):

- **`-b0` through `-b5` suffix**: **Black levels** (grayscale intensity)
  - `neutral-b0` = Black level 0 (pure black, for primary text when paired with secondary text)
  - `neutral-b1` = Black level 1 (dark gray, for standalone text)
  - `neutral-b2` = Black level 2 (medium-dark gray, for secondary text)
  - `neutral-b3` = Black level 3 (medium gray, for disabled text)
  - `neutral-b4` = Black level 4 (light gray)
  - `neutral-b5` = Black level 5 (lightest gray)
  - **Can be used for foreground (text) and background (fill)**
  - Use with: `bg-`, `text-` utilities
  - Example: `text-neutral-b1` (dark text), `bg-neutral-b5` (light gray background), `bg-neutral-b1` (dark background)

**IMPORTANT - Border Usage**:

- **For borders, ALWAYS use `neutral-b0` or `neutral-b0` with opacity variants** (`-t10`, `-t20`, `-t50`, `-t80`)
- **DO NOT use `neutral-b1` through `neutral-b5` for borders**
- Reason: `neutral-b0` and its opacity variants are specifically optimized for better color contrast in high contrast mode
- Examples:
  - `border-neutral-b0` - Solid black border
  - `border-neutral-b0-t10` - 10% opacity border
  - `border-neutral-b0-t20` - 20% opacity border (most common)

### Opacity Variants:

- **`-t10`, `-t20`**: **Standard transparency/opacity levels available for all colors**
  - Appended to any color: `primary-b-t20`, `neutral-b0-t10`, `success-t10`, `danger-t20`
  - Numbers = opacity percentage: `-t10` = 10%, `-t20` = 20%
  - Example: `bg-primary-b-t20` (20% opacity primary), `bg-danger-t10` (10% opacity danger)
  - **For borders**: Always use with `neutral-b0`, e.g., `border-neutral-b0-t10`, `border-neutral-b0-t20`

**Available opacity variants for specific colors:**

- **neutral-w0** (white): `w0`, `w0-t0`, `w0-t10`, `w0-t20`, `w0-t80`
- **neutral-b0** (black): `b0`, `b0-t0`, `b0-t10`, `b0-t20`, `b0-t30`, `b0-t50`
- **All other colors** (primary, success, danger, warning, etc.): Only `-t10` and `-t20` available

### Custom Opacity Values

If you need an opacity value not included in the predefined tokens, use Tailwind's opacity modifier syntax:

```tsx
// Custom opacity with slash notation
<div className="bg-neutral-b0/60">60% opacity black background</div>
<div className="bg-primary-b/75">75% opacity primary background</div>
<div className="border-neutral-b0/15">15% opacity border</div>
```

**Syntax**: `{utility}-{color}/{opacity}`

- Opacity value: 0-100 (percentage)
- Example: `bg-neutral-b0/60` = neutral-b0 at 60% opacity
- Works with: `bg-`, `text-`, `border-` utilities

**When to use custom opacity:**

- Prefer predefined tokens (`-t10`, `-t20`, etc.) when available
- Use custom opacity only when specific values are needed for design requirements

**Common Patterns:**

```tsx
// Primary background with white text
<div className="bg-primary-b text-neutral-w0">Primary colored box</div>

// Neutral background with black level text
<div className="bg-neutral-base text-neutral-b1">Main content (dark text)</div>

// Semi-transparent black overlay
<div className="bg-neutral-b0-t50">50% dark overlay</div>

// Borders with opacity variants
<div className="border border-neutral-b0-t20">Card with 20% opacity border</div>
<div className="border border-primary-f">Card with primary foreground border</div>
```

## Color Categories

### Primary Colors

**primary-b** - Primary background color

- Usage: Primary button backgrounds, active state backgrounds, brand backgrounds
- Pair with white text: `bg-primary-b text-neutral-w0`
- Example: `bg-primary-b`

**primary-f** - Primary foreground color

- Usage: Accent borders, primary colored text (on light backgrounds, NOT on primary backgrounds)
- Example: `border-primary-f`, `text-primary-f` (for primary colored text on neutral background)

**primary-b-high-contrast** - High contrast primary background

- Usage: Enhanced contrast for accessibility, focus rings
- Example: `focus:ring-primary-b-high-contrast`

### Neutral Colors (Grayscale)

**neutral-base** - Base background color (white in light theme, dark in dark theme)

- **IMPORTANT**: Always use `neutral-base` as the standard background color
- Usage: Main background color, cards, surfaces, page backgrounds
- Example: `bg-neutral-base`
- **Do NOT use `neutral-w0` for standard backgrounds**

**neutral-w0** - Pure white color

- **Specific usage only**:
  1. **Foreground text on contained action elements**: `text-neutral-w0` on primary/success/danger buttons
  2. **Input backgrounds**: `bg-neutral-w0` for text fields and form inputs
- Available opacity variants: `w0`, `w0-t0`, `w0-t10`, `w0-t20`, `w0-t80`
- Example: `bg-primary-b text-neutral-w0`, `bg-neutral-w0` (for inputs)

**neutral-b0** through **neutral-b5** - Black levels (grayscale from darkest to lightest)

- **neutral-b0**: Black level 0 (pure black)
  - Available opacity variants: `b0`, `b0-t0`, `b0-t10`, `b0-t20`, `b0-t30`, `b0-t50`
  - **Required for borders** - see Border Colors section
  - **For text**: Use for primary text when paired with secondary text (better contrast)
- **neutral-b1**: Black level 1 (dark gray)
  - **For text**: Use for standalone text content
- **neutral-b2**: Black level 2 (medium-dark gray)
  - **For text**: Use for secondary/supporting text
- **neutral-b3**: Black level 3 (medium gray)
  - **For text**: Use for disabled or subtle text
- **neutral-b4**: Black level 4 (light gray)
- **neutral-b5**: Black level 5 (very light gray)

**neutral-highcontrast** - High contrast neutral color (visible only in high contrast theme)

- Usage: High contrast borders, emphasized elements
- Example: `border-neutral-highcontrast`
- **Note**: Only visible in high contrast theme; hidden in light and dark themes

**Important**: The `-b` in neutral colors stands for **"black level"** (grayscale intensity), not "background".

**These colors can be used for BOTH foreground (text) AND background (fill):**

- As text: `text-neutral-b1`, `text-neutral-b2`, `text-neutral-b3`
- As background: `bg-neutral-b0`, `bg-neutral-b5`, `bg-neutral-b4`
- As border: Use with opacity variants instead (see Border Colors section)

**Usage examples:**

```tsx
// As text/foreground colors - when paired with secondary text
<div>
  <h2 className="text-neutral-b0">Heading (pure black for contrast)</h2>
  <p className="text-neutral-b2">Description (medium gray)</p>
</div>

// As text/foreground colors - standalone text
<p className="text-neutral-b1">Standalone content (dark gray)</p>

// Disabled or subtle text
<p className="text-neutral-b3">Disabled text (medium gray)</p>

// As background/fill colors
<div className="bg-neutral-base">Main background (white/base)</div>
<div className="bg-neutral-b5">Light gray background</div>
<div className="bg-neutral-b4">Medium-light gray background</div>
<div className="bg-neutral-b1">Dark gray background</div>

// As borders (prefer opacity variants or highcontrast)
<div className="border border-neutral-b0-t20">Card with standard border</div>
<div className="border border-neutral-highcontrast">Card with high contrast border (visible only in high contrast theme)</div>
```

### Semantic Colors

Semantic colors follow the same pattern as primary colors: `-b` suffix is not needed (defaults to background), `-f` suffix for foreground.

**success** - Green for success states

- Background: `bg-success` (for success backgrounds, use with white text: `text-neutral-w0`)
- Foreground: `text-success-f`, `border-success-f` (for text/borders when NOT on success background)
- Usage: Success messages, completed states, positive indicators
- Example: `bg-success text-neutral-w0` (success box), `border-success-f` (accent border)

**danger** - Red for error/destructive states

- Background: `bg-danger` (for error backgrounds, use with white text: `text-neutral-w0`)
- Foreground: `text-danger-f`, `border-danger-f` (for text/borders when NOT on danger background)
- Usage: Error messages, delete actions, alerts
- Example: `bg-danger text-neutral-w0` (error box), `border-danger-f` (accent border)

**warning** - Orange for warning states

- Background: `bg-warning` (for warning backgrounds, use with white text: `text-neutral-w0`)
- Foreground: `text-warning-f`, `border-warning-f` (for text/borders when NOT on warning background)
- Usage: Warning messages, caution indicators
- Example: `bg-warning text-neutral-w0` (warning box), `border-warning-f` (accent border)

**ai** - AI accent color

- Usage: AI features, AI-related UI elements
- Example: `bg-ai`, `text-ai`

**Important Notes:**

- **For text on colored backgrounds**: Always use `text-neutral-w0` (white text)
- **For borders**: Use `-f` variant: `border-success-f`, `border-danger-f`, `border-warning-f`
- **For colored text on light backgrounds**: Use `-f` variant: `text-success-f`, `text-danger-f`, `text-warning-f`

### Extra Colors

Additional colors for data visualization and variety:

- **extra-amethyst** - Purple
- **extra-denim** - Blue
- **extra-lime** - Green/Yellow
- **extra-mango** - Orange
- **extra-olive** - Green
- **extra-scarlet** - Red
- **extra-tangerine** - Orange
- **extra-tiffany** - Teal
- **extra-wildberry** - Purple/Pink

**Usage**: Charts, graphs, tags, badges for visual variety

```tsx
<Chip className="bg-extra-amethyst">Tag</Chip>
<Chip className="bg-extra-lime">Tag</Chip>
```

## Opacity Variants

Many colors have opacity variants (transparency levels) for overlays, borders, and subtle effects. The `-t` suffix followed by a number indicates the opacity percentage:

- **-t0**: Fully transparent (0% opacity)
- **-t10**: 10% opacity
- **-t20**: 20% opacity
- **-t30**: 30% opacity
- **-t50**: 50% opacity
- **-t80**: 80% opacity

**Common Uses:**

**Borders (most common):**

```tsx
// Subtle to emphasized borders using black level opacity
<div className="border border-neutral-b0-t10">Subtle border (10%)</div>
<div className="border border-neutral-b0-t20">Standard border (20%) - most common</div>
<div className="border border-neutral-b0-t50">Emphasized border (50%)</div>
```

**Backgrounds and overlays:**

```tsx
// Semi-transparent backgrounds
<div className="bg-neutral-b0-t10">10% black overlay</div>
<div className="bg-primary-b-t20">20% primary background overlay</div>

// Hover effects with transparency
<div className="hover:bg-neutral-b0-t10">Hover overlay</div>
```

## Color Usage Guidelines

### Text Colors

**Primary text:**

- **When paired with secondary text**: Use `text-neutral-b0` for better contrast between primary and secondary text
  ```tsx
  <div>
    <h2 className="text-neutral-b0">Primary Heading</h2>
    <p className="text-neutral-b2">
      Secondary description text
    </p>
  </div>
  ```
- **When text appears alone**: Use `text-neutral-b1`
  ```tsx
  <p className="text-neutral-b1">Standalone text content</p>
  ```

**Secondary text:** Use `text-neutral-b2`

```tsx
<p className="text-neutral-b2">
  Supporting or descriptive text
</p>
```

**Disabled text:** Use `text-neutral-b3`

```tsx
<p className="text-neutral-b3">Disabled or subtle text</p>
```

**Text Color Selection Guide:**

- **Strongest contrast** (with secondary text): `text-neutral-b0` (pure black)
- **Standard text** (standalone): `text-neutral-b1` (dark gray)
- **Secondary text**: `text-neutral-b2` (medium-dark gray)
- **Disabled/subtle text**: `text-neutral-b3` (medium gray)

### Background Colors

**Main backgrounds:** Use `bg-neutral-base` or neutral black levels

```tsx
<div className="bg-neutral-base">Base background (white in light theme)</div>
<div className="bg-neutral-b5">Light gray background</div>
<div className="bg-neutral-b4">Medium-light gray background</div>
```

**Card/Surface backgrounds:** Use `bg-neutral-base` or light neutrals with shadows or borders

```tsx
<div className="bg-neutral-base shadow-sm">Card with shadow</div>
<div className="bg-neutral-base border border-neutral-b0-t20">Card with border</div>
<div className="bg-neutral-b5 rounded-sm p-4">Subtle gray card</div>
```

**Hover states:** Add subtle background on hover using neutral black levels

```tsx
<button className="hover:bg-neutral-b5">Hover me (light gray)</button>
<button className="hover:bg-neutral-b4">Hover me (medium-light gray)</button>
```

**Dark backgrounds:** Use darker neutral black levels

```tsx
<div className="bg-neutral-b1 text-neutral-base">Dark background with light text</div>
<div className="bg-neutral-b0 text-neutral-base">Black background with white text</div>
```

### Border Colors

**Best Practice: Use opacity variants, foreground colors, or high contrast**

Spring UI typically uses these patterns for borders:

**1. Black level opacity variants (most common):**

```tsx
<div className="border border-neutral-b0-t10">Subtle border (10% black)</div>
<div className="border border-neutral-b0-t20">Standard border (20% black) - most common</div>
<div className="border border-neutral-b0-t50">Emphasized border (50% black)</div>
```

**2. Foreground colors (for accent borders):**

```tsx
<div className="border border-primary-f">Primary accent border</div>
<div className="border-2 border-primary-f">Strong primary border</div>
```

**3. High contrast (visible only in high contrast theme):**

```tsx
<div className="border border-neutral-highcontrast">
  High contrast border
</div>
```

**Note**: `neutral-highcontrast` borders are only visible in high contrast theme. They are hidden in light and dark themes.

**Border Color Selection Guide:**

- **Subtle separators**: `border-neutral-b0-t10`
- **Standard borders**: `border-neutral-b0-t20` (most common)
- **Emphasized borders**: `border-neutral-b0-t50`
- **Solid borders**: `border-neutral-b0`
- **Accent borders**: `border-primary-f`
- **High contrast theme only**: `border-neutral-highcontrast` (hidden in other themes)

**❌ IMPORTANT - DO NOT use `neutral-b1` through `neutral-b5` for borders**

- Always use `neutral-b0` or `neutral-b0` with opacity variants (`-t10`, `-t20`, `-t50`, `-t80`)
- These are optimized for better color contrast in high contrast mode

### Interactive Colors

**Note**: When using Spring UI components like `Button`, follow their default setup without custom classes. Use these color patterns when building custom elements.

**Primary actions:** Use `bg-primary-b` (background) with white text

```tsx
<div className="bg-primary-b text-neutral-w0 px-4 py-2 rounded-sm">
  Primary Action
</div>
```

**Color pairing guidelines for custom elements:**

- Use `-b` suffix for backgrounds: `bg-primary-b`, `bg-success`, `bg-danger`
- Pair with white text: `text-neutral-w0`
- Use `-f` suffix for borders and text when NOT on colored backgrounds: `border-primary-f`, `text-success-f`

**Hover states:** Use appropriate hover variants

```tsx
<div className="bg-primary-b hover:bg-primary-b-high-contrast text-neutral-w0 px-4 py-2 rounded-sm cursor-pointer">
  Hover me
</div>
```

**Note**: For colors other than `neutral-w0` and `neutral-b0`, only `-t10` and `-t20` opacity variants are available. For other opacity values, use custom opacity syntax: `bg-primary-b/80`

**Success actions:** Use `bg-success`

```tsx
<div className="bg-success text-neutral-w0 px-4 py-2 rounded-sm">
  Success Action
</div>
```

**Destructive actions:** Use `bg-danger`

```tsx
<div className="bg-danger text-neutral-w0 px-4 py-2 rounded-sm">
  Delete
</div>
```

## Theme-Aware Colors

Colors automatically adapt to the selected theme (suiLight, suiDark, etc.). Always use design tokens instead of hardcoded colors:

**✅ Good - Theme-aware colors:**

```tsx
// Primary colors: use -b for background with white text
<div className="bg-primary-b text-neutral-w0">
  Primary background with white text
</div>

// Neutral colors: black levels work for both text and backgrounds
<div className="bg-neutral-base text-neutral-b1">
  Base background with dark text
</div>

<div className="bg-neutral-b5 text-neutral-b0">
  Light gray background with dark text
</div>

<div className="bg-neutral-b1 text-neutral-w0">
  Dark background with white text
</div>

// Success/danger/warning: use background with white text
<div className="bg-success text-neutral-w0">Success message</div>
<div className="bg-danger text-neutral-w0">Error message</div>
```

**❌ Bad - Hardcoded colors:**

```tsx
<div className="bg-blue-600 text-white">
  Not theme-aware, won't adapt to themes
</div>
```

**Remember:**

- **Primary/Semantic colors**:
  - Use `-b` for backgrounds: `bg-primary-b`, `bg-success`, `bg-danger`
  - **Always pair with white text**: `bg-primary-b text-neutral-w0`
  - Use `-f` for borders: `border-primary-f`, `border-success-f`
  - Use `-f` for colored text on light backgrounds: `text-success-f` (NOT for text on colored backgrounds)
- **Neutral colors**:
  - **neutral-w0**: White text on colored backgrounds
  - **neutral-b0 through b5**: Black levels for both text and backgrounds
    - As text: `text-neutral-b1`, `text-neutral-b2`
    - As background: `bg-neutral-b5`, `bg-neutral-b1`
  - For borders: Use opacity variants (`border-neutral-b0-t20`) or `border-neutral-highcontrast` (high contrast theme only)
- **Opacity variants**:
  - All colors support `-t10` and `-t20`: `bg-primary-b-t20`, `bg-success-t10`, `bg-danger-t20`
  - `neutral-b0` also supports `-t30` (rarely used) and `-t50`: `border-neutral-b0-t20`, `bg-neutral-b0-t50`
  - `neutral-w0` also supports `-t80`: `bg-neutral-w0-t80`

## Accessibility Considerations

### Contrast Ratios

Always ensure sufficient contrast:

- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- Use high-contrast variants when needed

**High contrast variants:**

```tsx
// For better accessibility
<div className="text-neutral-b0">Highest contrast text</div>
<div className="text-primary-b-high-contrast">High contrast primary</div>
```

### Color Blindness

Don't rely solely on color to convey information:

```tsx
// ✅ Good - Color + icon
<Alert severity="error" startSlot={AlertMd}>Error message</Alert>

// ❌ Bad - Color only
<div className="text-danger">Error</div>
```

## Common Patterns

### Status Indicators

```tsx
<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-success" />
  <span className="text-neutral-b2">Active</span>
</div>
```

### Hover Effects

```tsx
// Light backgrounds on hover
<div className="bg-neutral-base hover:bg-neutral-b5 transition-colors">
  Hover for subtle background
</div>

// Darker hover state
<div className="bg-neutral-b5 hover:bg-neutral-b4 transition-colors">
  Hover for darker background
</div>
```

### Cards and Surfaces

```tsx
// Light card with neutral background
<div className="bg-neutral-base rounded-sm p-4">
  <h3 className="text-neutral-b0">Card Title</h3>
  <p className="text-neutral-b2">Card description</p>
</div>

// Dark card with neutral background
<div className="bg-neutral-b1 rounded-sm p-4">
  <h3 className="text-neutral-w0">Dark Card Title</h3>
  <p className="text-neutral-b5">Dark card description</p>
</div>
```

### Focus Rings

```tsx
<button className="focus-ring-normal">
  Button with focus ring
</button>
```

## CSS Variables

For advanced usage, colors are available as CSS variables:

```css
/* Primary colors */
var(--sui-colors-primary-b)   /* Background variant */
var(--sui-colors-primary-f)   /* Foreground variant */

/* Neutral colors */
var(--sui-colors-neutral-w0)  /* White level 0 (pure white, for text on colored backgrounds) */
var(--sui-colors-neutral-b0)  /* Black level 0 (darkest) */
var(--sui-colors-neutral-b1)  /* Black level 1 */
var(--sui-colors-neutral-b2)  /* Black level 2 */
var(--sui-colors-neutral-b3)  /* Black level 3 */
var(--sui-colors-neutral-b4)  /* Black level 4 */
var(--sui-colors-neutral-b5)  /* Black level 5 (lightest) */
var(--sui-colors-neutral-highcontrast)  /* High contrast neutral */

/* Semantic colors */
var(--sui-colors-success)      /* Background */
var(--sui-colors-success-f)    /* Foreground */
var(--sui-colors-danger)       /* Background */
var(--sui-colors-danger-f)     /* Foreground */
var(--sui-colors-warning)      /* Background */
var(--sui-colors-warning-f)    /* Foreground */

/* Opacity variants */
var(--sui-colors-primary-b-t10)   /* 10% opacity */
var(--sui-colors-primary-b-t20)   /* 20% opacity */
var(--sui-colors-neutral-b0-t50)  /* 50% opacity black */
```

**Use Tailwind utilities instead of CSS variables when possible** for better maintainability and automatic theme switching.