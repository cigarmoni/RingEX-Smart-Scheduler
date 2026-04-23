# Typography Design Tokens

Spring UI provides a comprehensive typography system with predefined text styles for consistent typography across your application.

## Important: Use Typography Classes

**All text elements must use one of the predefined typography classes.** The font-family (Inter with system fallbacks) is automatically included in typography classes and does not need to be set separately.

### Default Setup

Spring UI's `theme.css` includes a default setup for the body element:

```css
body {
  @apply bg-neutral-base typography-mainText text-neutral-b0;
}
```

This provides:

- **Background**: `bg-neutral-base` - standard background color
- **Typography**: `typography-mainText` - default text style (14px, regular weight)
- **Text Color**: `text-neutral-b0` - primary text color (when paired with secondary text)

**Note**: Do not set `font-family` separately. Always use typography classes which include the correct font settings.

## Typography Utilities

Spring UI provides typography utility classes that combine font-size, line-height, font-weight, and letter-spacing:

### Display Typography

**typography-headline** - Largest headline text

- Usage: Hero sections, main page headlines
- Size: 1.75rem (28px)

```tsx
<h1 className="typography-headline">Welcome to Spring UI</h1>
```

**typography-display1** - Large display text

- Usage: Page titles, major headings
- Size: 1.5rem (24px)

```tsx
<h1 className="typography-display1">Page Title</h1>
```

**typography-display2** - Medium display text

- Usage: Section headers
- Size: 1.5rem (24px), semi-bold

```tsx
<h2 className="typography-display2">Section Header</h2>
```

**typography-display3** - Small display text

- Usage: Subsection headers
- Size: 1.25rem (20px)

```tsx
<h3 className="typography-display3">Subsection</h3>
```

### Title & Subtitle Typography

**typography-title** - Main titles

- Usage: Card titles, dialog titles
- Size: 1rem (16px)

```tsx
<h2 className="typography-title">Card Title</h2>
```

**typography-subtitle** - Subtitles

- Usage: Supporting titles, section labels
- Size: 0.875rem (14px)

```tsx
<h3 className="typography-subtitle">Section Label</h3>
```

**typography-subtitleBold** - Bold subtitles

- Usage: Emphasized subtitles

```tsx
<h3 className="typography-subtitleBold">Important Label</h3>
```

**typography-subtitleMini** - Small subtitles

- Usage: Compact subtitles

```tsx
<p className="typography-subtitleMini">Small label</p>
```

### Body Text Typography

**typography-mainText** - Main body text

- Usage: Primary content, paragraphs, descriptions
- Size: 0.875rem (14px)
- **This is the main body text style**

```tsx
<p className="typography-mainText">
  This is the main body text for content and descriptions.
</p>
```

### Descriptor Typography

**typography-descriptor** - Descriptive text

- Usage: Secondary information, metadata
- Size: 0.75rem (12px)

```tsx
<p className="typography-descriptor">Additional information</p>
```

**typography-descriptorMini** - Small descriptive text

- Usage: Compact metadata

```tsx
<span className="typography-descriptorMini">
  Last updated 5 min ago
</span>
```

**typography-descriptorSemiBold** - Bold descriptive text

- Usage: Emphasized metadata

```tsx
<span className="typography-descriptorSemiBold">NEW</span>
```

**typography-descriptorMiniSemiBold** - Small bold descriptive text

- Usage: Compact emphasized metadata

```tsx
<span className="typography-descriptorMiniSemiBold">BETA</span>
```

### Label Typography

**typography-label** - Form labels and UI labels

- Usage: Input labels, button text, navigation items
- Size: 0.75rem (12px), uppercase

```tsx
<label className="typography-label">Email Address</label>
```

**typography-labelSemiBold** - Bold labels

- Usage: Emphasized labels, section labels

```tsx
<label className="typography-labelSemiBold">
  Required Field
</label>
```

## Typography Hierarchy

Use typography to establish clear visual hierarchy:

```tsx
<div className="space-y-4">
  {/* Main title */}
  <h1 className="typography-display1">Page Title</h1>

  {/* Section */}
  <h2 className="typography-title">Section Heading</h2>
  <p className="typography-mainText">
    Main content paragraph text.
  </p>
  <p className="typography-descriptor">
    Supporting information.
  </p>

  {/* Subsection */}
  <h3 className="typography-subtitle">Subsection</h3>
  <p className="typography-mainText">More content here.</p>

  {/* Metadata */}
  <p className="typography-descriptor">
    Additional details or metadata.
  </p>
</div>
```

## Common Patterns

### Page Header

```tsx
<header>
  <h1 className="typography-display1">Dashboard</h1>
  <p className="typography-descriptor text-neutral-b2">
    Welcome back, here's your overview
  </p>
</header>
```

### Card with Title

```tsx
<div className="p-6 bg-neutral-base shadow rounded">
  <h3 className="typography-title mb-2">Card Title</h3>
  <p className="typography-mainText text-neutral-b2">
    Card description or content
  </p>
  <span className="typography-descriptor text-neutral-b3">
    Updated 5 min ago
  </span>
</div>
```

### Form Field

```tsx
<div className="space-y-2">
  <label className="typography-label">Email Address</label>
  <TextField />
  <p className="typography-descriptor text-neutral-b3">
    We'll never share your email
  </p>
</div>
```

### Data Display

```tsx
<div>
  <p className="typography-label text-neutral-b3">
    Total Revenue
  </p>
  <p className="typography-display1">$45,678</p>
  <p className="typography-descriptor text-success">
    +12.5% from last month
  </p>
</div>
```

### List Item

```tsx
<div className="flex items-start gap-3 p-4">
  <Avatar />
  <div className="flex-1">
    <p className="typography-subtitleBold">John Doe</p>
    <p className="typography-descriptor text-neutral-b2">
      Software Engineer
    </p>
    <p className="typography-descriptor text-neutral-b3">
      Joined 2 months ago
    </p>
  </div>
</div>
```

## Combining with Colors

Typography works seamlessly with color tokens:

```tsx
// Primary text with secondary text (use b0 for better contrast)
<div>
  <p className="typography-mainText text-neutral-b0">Main text</p>
  <p className="typography-descriptor text-neutral-b2">Secondary text</p>
</div>

// Standalone text (use b1)
<p className="typography-mainText text-neutral-b1">Standalone text</p>

// Disabled text
<p className="typography-label text-neutral-b3">Disabled label</p>

// Success message
<p className="typography-mainText text-success">Success message</p>

// Error message
<p className="typography-mainText text-danger">Error message</p>
```

## Responsive Typography

Adjust typography for different screen sizes:

```tsx
// Smaller on mobile, larger on desktop
<h1 className="typography-display2 md:typography-display1">
  Responsive Heading
</h1>

// Adjust for readability
<p className="typography-descriptor md:typography-mainText">
  Responsive body text
</p>
```

## Text Utilities

Combine typography with Tailwind text utilities:

### Text Alignment

```tsx
<p className="typography-mainText text-center">Centered text</p>
<p className="typography-mainText text-left">Left-aligned text</p>
<p className="typography-mainText text-right">Right-aligned text</p>
```

### Text Transform

```tsx
<p className="typography-label uppercase">Uppercase Label</p>
<p className="typography-title capitalize">Capitalized Heading</p>
```

### Text Decoration

```tsx
<p className="typography-mainText underline">Underlined text</p>
<p className="typography-mainText line-through">Strikethrough text</p>
```

### Text Overflow

```tsx
<p className="typography-mainText truncate">
  Long text that will be truncated with ellipsis...
</p>

<p className="typography-descriptor line-clamp-3">
  Long text that will be limited to 3 lines and then truncated
</p>
```

## Typography Best Practices

### DO

✅ Use appropriate typography for content type

```tsx
<h1 className="typography-display1">Page Title</h1>
<p className="typography-mainText">Content text</p>
<label className="typography-label">Form Label</label>
```

✅ Establish clear hierarchy

```tsx
<div className="space-y-3">
  <h2 className="typography-title">Section</h2>
  <p className="typography-mainText">Main content</p>
  <p className="typography-descriptor">Additional info</p>
</div>
```

✅ Combine with color for meaning

```tsx
<p className="typography-mainText text-danger">Error message</p>
<p className="typography-descriptor text-neutral-b3">Helper text</p>
```

### DON'T

❌ Mix too many typography styles in one section

```tsx
{
  /* Too many styles - confusing! */
}
<div>
  <h1 className="typography-display1">Title</h1>
  <p className="typography-title">Subtitle</p>
  <p className="typography-mainText">Content</p>
  <p className="typography-label">More content</p>
</div>;
```

❌ Use display typography for body content

```tsx
{
  /* Wrong - display is for titles only */
}
<p className="typography-display1">
  This is body content that should use typography-mainText
</p>;
```

❌ Override typography with inline font-size

```tsx
{
  /* Wrong - breaks design system */
}
<p className="typography-mainText text-2xl">Don't do this</p>;

{
  /* Correct - use appropriate typography class */
}
<p className="typography-title">Use this instead</p>;
```

## Accessibility

### Semantic HTML

Always use semantic HTML elements with typography:

```tsx
// ✅ Good - semantic HTML
<h1 className="typography-display1">Page Title</h1>
<p className="typography-mainText">Content</p>

// ❌ Bad - wrong semantic elements
<div className="typography-display1">Page Title</div>
<span className="typography-mainText">Content</span>
```

### Reading Order

Maintain logical heading hierarchy (h1 → h2 → h3):

```tsx
<h1 className="typography-display1">Main Title</h1>
<h2 className="typography-title">Section</h2>
<h3 className="typography-subtitle">Subsection</h3>
{/* Don't skip levels! */}
```

### Contrast

Ensure text has sufficient contrast with its background:

- Use `text-neutral-b0` for primary text when paired with secondary text (better contrast)
- Use `text-neutral-b1` for standalone text on light backgrounds
- Use high-contrast variants when needed
- Avoid light gray text on white backgrounds for important content

## Font Weights

Typography utilities include appropriate font weights, but you can adjust if needed:

```tsx
<p className="typography-mainText font-medium">Medium weight</p>
<p className="typography-mainText font-semibold">Semibold weight</p>
<p className="typography-mainText font-bold">Bold weight</p>
```

**Available font weights (ONLY use these):**

- `font-normal` (400) - Regular text
- `font-medium` (500) - Medium emphasis
- `font-semibold` (600) - Semi-bold emphasis
- `font-bold` (700) - Strong emphasis

**IMPORTANT**: Spring UI only supports these 4 font weights. Do not use other Tailwind font weight utilities like `font-light` (300), `font-extrabold` (800), or `font-black` (900). These weights are not loaded and will not render correctly.

**Best Practice**: Always use typography utility classes (like `typography-mainText`, `typography-subtitle`) instead of manually setting font weights. Typography utilities automatically apply the correct font weight.

## Line Heights

Typography utilities include optimized line heights. For custom needs:

```tsx
<p className="typography-mainText leading-relaxed">Relaxed line height</p>
<p className="typography-mainText leading-tight">Tight line height</p>
```

Use sparingly - typography classes already have optimal line heights.