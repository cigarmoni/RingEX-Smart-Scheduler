# Rating

```tsx
import { Rating } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Current rating value |
| `defaultValue` | `number` | — | Default rating (uncontrolled) |
| `max` | `number` | `5` | Maximum stars |
| `precision` | `number` | `1` | Step precision (0.5 for half stars) |
| `size` | `'small' \| 'medium' \| 'large'` | — | Star size |
| `readOnly` | `boolean` | — | Read-only display |
| `disabled` | `boolean` | — | Disabled state |
| `name` | `string` | — | Form field name |
| `onChange` | `(event, value) => void` | — | Rating change handler |
| `onChangeActive` | `(event, value) => void` | — | Hover value change |
| `onMouseLeave` | `(event) => void` | — | Mouse leave handler |
| `onMouseMove` | `(event) => void` | — | Mouse move handler |
| `icon` | `ReactNode` | — | Custom filled icon |
| `emptyIcon` | `ReactNode` | — | Custom empty icon |
| `emptyLabelText` | `string` | — | Label for empty rating |
| `getLabelText` | `(value) => string` | — | Custom label generator |
| `highlightSelectedOnly` | `boolean` | — | Only highlight selected star |
| `IconContainerComponent` | `ElementType` | — | Custom icon container |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
```

## Read Only

```tsx
<Rating value={4.5} readOnly precision={0.5} />
```

## Half Stars

```tsx
<Rating value={rating} onChange={(e, v) => setRating(v)} precision={0.5} />
```

## Sizes

```tsx
<Rating value={3} size="small" readOnly />
<Rating value={3} size="medium" readOnly />
<Rating value={3} size="large" readOnly />
```

## Custom Max

```tsx
<Rating value={rating} max={10} onChange={(e, v) => setRating(v)} />
```

## With react-hook-form

```tsx
<Controller
  name="rating"
  control={form.control}
  render={({ field }) => (
    <Rating
      value={field.value}
      onChange={(e, newValue) => field.onChange(newValue)}
      data-testid="rating-feedback"
    />
  )}
/>
```
