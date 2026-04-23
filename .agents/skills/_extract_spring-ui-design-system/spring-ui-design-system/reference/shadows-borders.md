# Shadows, Borders, and Effects

Spring UI provides design tokens for shadows, border radius, and focus rings to create consistent visual effects.

## Box Shadows

### Shadow Utilities

**shadow-xs** - Extra small shadow

- Usage: Subtle elevation, hover states
- Example: Small buttons, chips

```tsx
<div className="shadow-xs bg-neutral-base p-4">
  Extra small shadow
</div>
```

**shadow-sm** - Small shadow

- Usage: Cards, dropdowns, popovers
- Most commonly used shadow

```tsx
<div className="shadow-sm bg-neutral-base p-6">
  Card with small shadow
</div>
```

**shadow-md** - Medium shadow

- Usage: Elevated cards, modals, drawers
- For components that need more prominence

```tsx
<div className="shadow-md bg-neutral-base p-6">
  Elevated card with medium shadow
</div>
```

### Semantic Shadow Colors

Shadows are also available in semantic colors for custom elements:

```tsx
// Primary blue shadow
<button className="bg-primary-b text-neutral-w0 px-4 py-2 rounded-sm shadow-xs-primary">
  Primary Custom Button
</button>

// Success green shadow
<button className="bg-success text-neutral-w0 px-4 py-2 rounded-sm shadow-xs-success">
  Success Custom Button
</button>

// Danger red shadow
<button className="bg-danger text-neutral-w0 px-4 py-2 rounded-sm shadow-xs-danger">
  Danger Custom Button
</button>

// Warning orange shadow
<button className="bg-warning text-neutral-b0 px-4 py-2 rounded-sm shadow-xs-warning">
  Warning Custom Button
</button>

// AI accent shadow
<div className="shadow-sm-ai p-4 rounded-sm">AI Feature</div>
```

### Shadow Best Practices

**Elevation Hierarchy:**

- No shadow: Flat, inline elements
- shadow-xs: Slightly elevated, hover states
- shadow-sm: Standard cards, floating elements
- shadow-md: Modals, dropdowns, important overlays

```tsx
{
  /* Base level - no shadow */
}
<div className="bg-neutral-b5 p-4">Background element</div>;

{
  /* Level 1 - subtle elevation */
}
<div className="bg-neutral-base shadow-xs p-4">
  Slightly raised
</div>;

{
  /* Level 2 - standard elevation */
}
<div className="bg-neutral-base shadow-sm p-6">Card</div>;

{
  /* Level 3 - prominent elevation */
}
<div className="bg-neutral-base shadow-md p-6">
  Modal or drawer
</div>;
```

## Border Radius

### Radius Utilities

**rounded-xs** - Extra small radius (4px)

- Usage: Compact UI, tags, badges

```tsx
<div className="rounded-xs bg-primary-b p-2">Tag</div>
```

**rounded-sm** - Small radius (10px)

- Usage: Buttons, inputs, small cards

```tsx
<div className="rounded-sm bg-neutral-base p-4">Small card</div>
```

**rounded-md** - Medium radius (14px)

- Usage: Standard cards, dialogs

```tsx
<div className="rounded-md bg-neutral-base p-6">
  Standard card
</div>
```

**rounded-lg** - Large radius (16px)

- Usage: Large cards, prominent containers

```tsx
<div className="rounded-lg bg-neutral-base p-8">Large card</div>
```

**rounded-full** - Fully rounded (9999px)

- Usage: Pills, avatars, circular buttons

```tsx
<div className="rounded-full bg-primary-b p-3">
  <Icon symbol={PlusMd} />
</div>
```

### Specific Corner Radius

Round specific corners only:

```tsx
// Top corners
<div className="rounded-t-md">Rounded top</div>

// Bottom corners
<div className="rounded-b-md">Rounded bottom</div>

// Left corners
<div className="rounded-l-md">Rounded left</div>

// Right corners
<div className="rounded-r-md">Rounded right</div>

// Individual corners
<div className="rounded-tl-md">Top-left rounded</div>
<div className="rounded-tr-md">Top-right rounded</div>
<div className="rounded-bl-md">Bottom-left rounded</div>
<div className="rounded-br-md">Bottom-right rounded</div>
```

## Borders

### Border Width

**border** - Standard border (1px)

```tsx
<div className="border border-neutral-b0-t20">
  Standard border
</div>
```

**border-2** - Thick border (2px)

```tsx
<div className="border-2 border-primary-f">
  Emphasized border
</div>
```

**border-0** - No border

```tsx
<div className="border-0">No border</div>
```

### Border Sides

```tsx
// Specific sides
<div className="border-t border-neutral-b0-t20">Top border</div>
<div className="border-b border-neutral-b0-t20">Bottom border</div>
<div className="border-l border-neutral-b0-t20">Left border</div>
<div className="border-r border-neutral-b0-t20">Right border</div>

// Horizontal and Vertical
<div className="border-x border-neutral-b0-t20">Left and right borders</div>
<div className="border-y border-neutral-b0-t20">Top and bottom borders</div>
```

### Border Colors

Use with color tokens:

```tsx
// Neutral borders (always use neutral-b0 with opacity)
<div className="border border-neutral-b0-t10">Subtle border</div>
<div className="border border-neutral-b0-t20">Standard border</div>

// Semantic borders
<div className="border border-primary-f">Primary border</div>
<div className="border border-success-f">Success border</div>
<div className="border border-danger-f">Danger border</div>
```

## Transition Effects

Add smooth transitions for shadows and borders:

```tsx
// Shadow transition
<div className="shadow-xs hover:shadow-sm transition-shadow duration-200">
  Smooth shadow transition
</div>

// Border transition
<div className="border border-neutral-b0-t20 hover:border-primary-f transition-colors duration-200">
  Smooth border color transition
</div>

// Multiple transitions
<div className="shadow-xs hover:shadow-sm border border-neutral-b0-t20 hover:border-primary-f transition-all duration-200">
  Smooth all transitions
</div>
```

## Best Practices

### DO

✅ Use consistent shadow levels

```tsx
<div className="shadow-sm">Card</div>
<div className="shadow-sm">Another card</div>
```

✅ Match border radius across similar custom elements

```tsx
<div className="rounded-sm p-4">Card 1</div>
<div className="rounded-sm p-4">Card 2</div>
```

✅ Always include focus rings for accessibility on custom interactive elements

```tsx
<button className="px-4 py-2 rounded-sm focus-ring-normal">
  Accessible Custom Button
</button>
```

### DON'T

❌ Mix different shadow levels on similar elements

```tsx
<div className="shadow-xs">Card</div>
<div className="shadow-md">Card</div>  {/* Inconsistent! */}
```

❌ Use extreme border radius inconsistently

```tsx
<div className="rounded-xs">Card</div>
<div className="rounded-lg">Card</div>  {/* Too different! */}
```

## CSS Variables

For advanced use, these are available as CSS variables:

```css
/* Shadows */
box-shadow: var(--sui-box-shadow-xs);
box-shadow: var(--sui-box-shadow-sm);
box-shadow: var(--sui-box-shadow-md);

/* Border radius */
border-radius: var(--sui-border-radius-xs);
border-radius: var(--sui-border-radius-sm);
border-radius: var(--sui-border-radius-md);
border-radius: var(--sui-border-radius-lg);

/* Focus ring */
outline: var(--sui-focus-ring-normal-width) solid
  var(--sui-focus-ring-normal-color);
outline-offset: var(--sui-focus-ring-normal-offset);
```

Prefer Tailwind utilities for better maintainability.