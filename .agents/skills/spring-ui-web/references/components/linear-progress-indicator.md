# LinearProgressIndicator

```tsx
import { LinearProgressIndicator } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'indeterminate' \| 'determinate' \| 'buffer'` | — | Progress mode |
| `slim` | `boolean` | — | Thin variant |
| `value` | `number` | — | Progress value (0-100) |
| `min` | `number` | — | Minimum value |
| `max` | `number` | — | Maximum value |
| `label` | `string` | — | Progress label |
| `details` | `string` | — | Additional details text |
| `showPercentage` | `boolean` | — | Show percentage text |
| `progressBarProps` | `object` | — | Props for the progress bar |
| `children` | `ReactNode` | — | Custom content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Indeterminate

```tsx
<LinearProgressIndicator variant="indeterminate" />
```

## Determinate

```tsx
<LinearProgressIndicator variant="determinate" value={65} />
```

## With Label

```tsx
<LinearProgressIndicator
  variant="determinate"
  value={progress}
  label="Uploading files..."
  showPercentage
/>
```

## Slim Variant

```tsx
<LinearProgressIndicator variant="determinate" value={80} slim />
```

## With Details

```tsx
<LinearProgressIndicator
  variant="determinate"
  value={45}
  label="Processing"
  details="23 of 50 items"
  showPercentage
/>
```
