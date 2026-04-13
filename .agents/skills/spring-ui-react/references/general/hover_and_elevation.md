# Hover, Focus, and Active States

## Spring UI Built-in States

Spring UI components have built-in hover, focus, and active states. Do NOT override them with custom Tailwind classes.

**Never** apply `hover:bg-*`, `active:bg-*`, or hover/active state overrides to these Spring UI components:

- `<Button>` / `<IconButton>` / `<FabButton>`
- `<Tab>`
- `<MenuItem>`
- `<Chip>`
- `<Select>` / `<Option>`
- `<Checkbox>` / `<Radio>` / `<Switch>`

```tsx
// Bad - Button already has built-in hover states
<Button className="hover:bg-primary-b/80">Submit</Button>

// Good - just use the component
<Button variant="contained" color="primary">Submit</Button>

// Bad - adding hover states to interactive Spring UI components
<Tab className="hover:bg-neutral-b5">Settings</Tab>

// Good - Tab has built-in hover
<Tab label="Settings" />
```

## Deprecated Utility Classes

The following custom utility classes from the default react-vite scaffold do **NOT exist** in Spring UI and must never be used:

- `hover-elevate`
- `active-elevate-2`
- `toggle-elevate`
- `toggle-elevated`
- `no-default-active-elevate`

These will silently do nothing or cause build errors.

## Custom Interactive Elements

For custom interactive elements (not Spring UI components), use standard Tailwind hover utilities:

```tsx
// Good - custom clickable element with Tailwind hover
<div className="cursor-pointer hover:bg-neutral-b5 hover:shadow-sm rounded-sm p-2">
  Custom clickable element
</div>
```

## Subtle Transforms

If elements transform (scale, etc.) on hover or press down (active state), the transform should be **extremely subtle** — just enough to notice. Don't overdo it.

```tsx
// Good - subtle scale on custom element
<div className="transition-transform hover:scale-[1.01] active:scale-[0.99]">
  Subtle interaction
</div>
```

## Focus Ring

Spring UI's focus ring system handles focus indicators automatically via CSS custom properties (`--sui-focus-ring-border-radius`, `--sui-focus-ring-border-width`). Use the `sui-focus-visible:` variant for keyboard-only focus styles on custom elements.
