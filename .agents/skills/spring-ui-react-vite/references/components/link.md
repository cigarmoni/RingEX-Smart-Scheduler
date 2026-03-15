# Link

```tsx
import { Link } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `underline` | `'none' \| 'hover' \| 'always'` | — | Underline behavior |
| `variant` | `string` | — | Typography variant |
| `component` | `ElementType` | `'a'` | Root element type |
| `href` | `string` | — | Link URL |
| `children` | `ReactNode` | — | Link text |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Link href="/about">About Us</Link>
```

## Underline Variants

```tsx
<Link href="/page" underline="none">No underline</Link>
<Link href="/page" underline="hover">Underline on hover</Link>
<Link href="/page" underline="always">Always underlined</Link>
```

## With wouter

```tsx
import { Link as SpringLink } from '@ringcentral/spring-ui';
import { Link as WouterLink } from 'wouter';

<SpringLink component={WouterLink} href="/dashboard">
  Dashboard
</SpringLink>
```

## External Link

```tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</Link>
```
