# Divider

```tsx
import { Divider } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'full' \| 'middle'` | `'full'` | Divider style (`full` = full width, `middle` = indented from both sides) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `flexItem` | `boolean` | `false` | For use in flex containers |
| `title` | `string` | — | Text label in the divider |
| `component` | `ElementType` | `'hr'` | Root element type |
| `children` | `ReactNode` | — | Content within divider |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Divider />
```

## With Text

```tsx
<Divider>OR</Divider>
```

## Vertical (in flex container)

```tsx
<div className="flex items-center gap-4">
  <span>Option A</span>
  <Divider orientation="vertical" flexItem />
  <span>Option B</span>
</div>
```

## Variants

```tsx
<Divider variant="full" />    {/* Full width (default) */}
<Divider variant="middle" />  {/* Indented from both sides */}
```
