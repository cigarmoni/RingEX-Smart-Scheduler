# Spacing Design Tokens

Spring UI provides a comprehensive spacing system for consistent padding, margins, and gaps throughout your application.

## Spacing Scale

Spring UI uses a spacing scale from 0 to 150, with each unit representing a specific size. The most commonly used values are 0-16.

### Common Spacing Values

| Token      | Size           | Common Use            |
| ---------- | -------------- | --------------------- |
| spacing-0  | 0px            | No space              |
| spacing-1  | 0.25rem (4px)  | Micro spacing         |
| spacing-2  | 0.5rem (8px)   | Compact spacing       |
| spacing-3  | 0.75rem (12px) | Small spacing         |
| spacing-4  | 1rem (16px)    | Base spacing unit     |
| spacing-5  | 1.25rem (20px) | Medium spacing        |
| spacing-6  | 1.5rem (24px)  | Comfortable spacing   |
| spacing-8  | 2rem (32px)    | Large spacing         |
| spacing-10 | 2.5rem (40px)  | Extra large spacing   |
| spacing-12 | 3rem (48px)    | Section spacing       |
| spacing-16 | 4rem (64px)    | Major section spacing |

### Extended Spacing (Less Common)

The scale extends to spacing-150 (37.5rem / 600px) for special cases like page layouts.

## Usage with Tailwind

Spacing tokens work with all Tailwind spacing utilities:

### Padding

```tsx
// All sides
<div className="p-4">Padding 16px on all sides</div>
<div className="p-6">Padding 24px on all sides</div>

// Specific sides
<div className="pt-4">Padding top 16px</div>
<div className="pb-6">Padding bottom 24px</div>
<div className="pl-3">Padding left 12px</div>
<div className="pr-8">Padding right 32px</div>

// Horizontal and Vertical
<div className="px-4">Padding left and right 16px</div>
<div className="py-6">Padding top and bottom 24px</div>
```

### Margin

```tsx
// All sides
<div className="m-4">Margin 16px on all sides</div>
<div className="m-6">Margin 24px on all sides</div>

// Specific sides
<div className="mt-4">Margin top 16px</div>
<div className="mb-6">Margin bottom 24px</div>
<div className="ml-3">Margin left 12px</div>
<div className="mr-8">Margin right 32px</div>

// Horizontal and Vertical
<div className="mx-4">Margin left and right 16px</div>
<div className="my-6">Margin top and bottom 24px</div>

// Auto margin for centering
<div className="mx-auto">Centered horizontally</div>
```

### Gap (Flexbox/Grid)

```tsx
// Gap between flex/grid items
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Column and row gaps
<div className="grid gap-x-4 gap-y-6">
  <div>Item</div>
</div>
```

### Space Between (Flexbox)

```tsx
// Space between child elements
<div className="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div className="flex space-x-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Spacing Guidelines

### Component Internal Spacing

**Compact UI (4-8px):** Use spacing-1 to spacing-2

```tsx
<div className="p-1">Very compact</div>
<div className="p-2">Compact</div>
```

**Standard UI (12-16px):** Use spacing-3 to spacing-4

```tsx
<div className="p-3">Standard padding small</div>
<div className="p-4">Standard padding</div>
```

**Comfortable UI (20-24px):** Use spacing-5 to spacing-6

```tsx
<div className="p-5">Comfortable padding</div>
<div className="p-6">More comfortable</div>
```

### Between Elements

**Tightly related (8-12px):** Use spacing-2 to spacing-3

```tsx
<div className="space-y-2">
  <label>Label</label>
  <input />
</div>
```

**Related elements (16px):** Use spacing-4

```tsx
<div className="space-y-4">
  <div>Card 1</div>
  <div>Card 2</div>
</div>
```

**Separate sections (24-32px):** Use spacing-6 to spacing-8

```tsx
<div className="space-y-6">
  <section>Section 1</section>
  <section>Section 2</section>
</div>
```

### Layout Spacing

**Page padding (24-32px):** Use spacing-6 to spacing-8

```tsx
<div className="p-6">Page content</div>
<div className="p-8">Comfortable page content</div>
```

**Section spacing (48-64px):** Use spacing-12 to spacing-16

```tsx
<div className="space-y-12">
  <section>Major section 1</section>
  <section>Major section 2</section>
</div>
```

## Common Patterns

### Card/Container Padding

```tsx
// Compact card
<div className="p-4 bg-neutral-base rounded shadow">
  Content
</div>

// Standard card
<div className="p-6 bg-neutral-base rounded shadow">
  Content
</div>

// Spacious card
<div className="p-8 bg-neutral-base rounded shadow">
  Content
</div>
```

### Form Layouts

```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <label>Email</label>
    <TextField />
  </div>

  <div className="space-y-2">
    <label>Password</label>
    <TextField type="password" />
  </div>

  <Button>Submit</Button>
</form>
```

### List Spacing

```tsx
// Compact list
<div className="space-y-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Standard list
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid Layouts

```tsx
// Tight grid
<div className="grid grid-cols-3 gap-2">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

// Standard grid
<div className="grid grid-cols-3 gap-4">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

// Spacious grid
<div className="grid grid-cols-3 gap-6">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

### Page Layouts

```tsx
<div className="min-h-screen p-6">
  <div className="max-w-7xl mx-auto space-y-8">
    <header className="pb-6 border-b">Header</header>
    <main>Main content</main>
    <footer className="pt-6 border-t">Footer</footer>
  </div>
</div>
```

## Responsive Spacing

Adjust spacing for different screen sizes:

```tsx
// Small on mobile, large on desktop
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

// Compact on mobile, comfortable on desktop
<div className="space-y-2 md:space-y-4 lg:space-y-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Negative Spacing

Use negative margins for overlapping effects:

```tsx
// Pull element up
<div className="-mt-4">Overlaps above element</div>

// Pull element left
<div className="-ml-2">Overlaps left</div>
```

## Spacing Best Practices

### DO

✅ Use consistent spacing throughout your app

```tsx
<div className="space-y-4">
  <div className="p-4">Item</div>
  <div className="p-4">Item</div>
</div>
```

✅ Use spacing scale values (1, 2, 3, 4, 6, 8, etc.)

```tsx
<div className="p-4 space-y-6">Content</div>
```

✅ Increase spacing for importance/hierarchy

```tsx
<div className="space-y-2">  {/* Related items */}
  <div>Item 1</div>
  <div>Item 2</div>
</div>
<div className="mt-8">  {/* New section */}
  <div>Section 2</div>
</div>
```

### DON'T

❌ Use arbitrary values unless absolutely necessary

```tsx
<div className="p-[13px]">Avoid arbitrary spacing</div>
```

❌ Mix spacing scales inconsistently

```tsx
<div className="space-y-3">
  {" "}
  {/* spacing-3 */}
  <div className="p-7">Item</div>{" "}
  {/* spacing-7 - inconsistent! */}
</div>
```

❌ Over-complicate with too many spacing values

```tsx
<div className="pt-3 pr-5 pb-4 pl-2">  {/* Too complex! */}
  Use simpler: <div className="p-4">
</div>
```

## CSS Variables

For advanced cases, spacing is available as CSS variables:

```css
padding: var(--sui-spacing-4); /* 1rem / 16px */
margin: var(--sui-spacing-6); /* 1.5rem / 24px */
gap: var(--sui-spacing-2); /* 0.5rem / 8px */
```

Always prefer Tailwind utilities over CSS variables for better maintainability.