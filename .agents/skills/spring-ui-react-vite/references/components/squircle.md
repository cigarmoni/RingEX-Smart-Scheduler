# Squircle

```tsx
import { Squircle } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `interactive` | `boolean` | `true` | Enable hover/click states |
| `fillShape` | `boolean` | `false` | Fill the shape with color |
| `focusVisible` | `boolean` | — | Focus visible state |
| `active` | `boolean` | — | Active/pressed state |
| `component` | `ElementType` | `'div'` | Root element type |
| `children` | `ReactNode` | — | Content inside squircle |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

Squircle is a container with superellipse (rounded square) shape — commonly used for app icons and interactive tiles:

```tsx
<Squircle>
  <Icon symbol={HomeMd} size="medium" />
</Squircle>
```

## Non-Interactive

```tsx
<Squircle interactive={false} fillShape>
  <img src="/logo.png" alt="Logo" />
</Squircle>
```

## Important Notes

- Squircle provides the iOS-style rounded square shape
- Used internally by some Spring UI components (Avatar, Button shapes)
- For most cases, use `rounded-*` Tailwind utilities instead
