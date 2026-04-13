# CircularProgressIndicator

```tsx
import { CircularProgressIndicator } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'indeterminate' \| 'determinate'` | `'indeterminate'` | Animation mode |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'large'` | Spinner size |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Spinner color |
| `value` | `number` | — | Progress value (0-100, for determinate) |
| `progressBarProps` | `object` | — | Props for the progress bar SVG |
| `children` | `ReactNode` | — | Content inside the circle |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Indeterminate (Loading Spinner)

```tsx
<CircularProgressIndicator />
<CircularProgressIndicator size="small" />
<CircularProgressIndicator size="medium" color="neutral" />
```

## Determinate (Progress)

```tsx
<CircularProgressIndicator variant="determinate" value={75} />
```

## With Label

```tsx
<CircularProgressIndicator variant="determinate" value={progress}>
  <span className="text-sm">{progress}%</span>
</CircularProgressIndicator>
```

## Loading State Pattern

```tsx
function LoadingOverlay() {
  return (
    <div className="flex items-center justify-center h-64">
      <CircularProgressIndicator size="large" />
    </div>
  );
}
```
