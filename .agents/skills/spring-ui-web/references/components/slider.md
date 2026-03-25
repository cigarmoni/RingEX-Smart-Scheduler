# Slider

```tsx
import { Slider } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| number[]` | — | Current value(s) |
| `min` | `number` | — | Minimum value |
| `max` | `number` | — | Maximum value |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `scale` | `(value: number) => number` | — | Transform function for display |
| `valueLabelDisplay` | `'auto' \| 'on' \| 'off'` | — | When to show value label |
| `valueLabelFormat` | `(value: number) => string` | — | Format value label text |
| `valueLabelTooltipProps` | `object` | — | Props for value label tooltip |
| `aria-label` | `string` | — | Accessibility label |
| `aria-valuetext` | `string` | — | Accessibility value text |
| `getAriaValueText` | `(value: number) => string` | — | Dynamic aria value text |
| `disabled` | `boolean` | — | Disabled state (via rest props) |
| `transition` | `object` | — | Animation transition config |
| `dragging` | `boolean` | — | Currently being dragged |
| `axis` | `string` | — | Axis configuration |
| `axisProps` | `object` | — | Axis props |
| `focusVisible` | `boolean` | — | Focus visible state |
| `getThumbProps` | `(index: number) => object` | — | Props for thumb elements |
| `getHiddenInputProps` | `(index: number) => object` | — | Props for hidden inputs |
| `index` | `number` | — | Thumb index |
| `classes` | `object` | — | CSS class overrides |

## Basic Usage

```tsx
<Slider
  value={volume}
  onChange={(e, newValue) => setVolume(newValue)}
  min={0}
  max={100}
  aria-label="Volume"
/>
```

## With Value Label

```tsx
<Slider
  value={brightness}
  onChange={(e, newValue) => setBrightness(newValue)}
  min={0}
  max={100}
  valueLabelDisplay="auto"
  valueLabelFormat={(v) => `${v}%`}
  aria-label="Brightness"
/>
```

## Range Slider

```tsx
<Slider
  value={priceRange}
  onChange={(e, newValue) => setPriceRange(newValue)}
  min={0}
  max={1000}
  valueLabelDisplay="auto"
  valueLabelFormat={(v) => `$${v}`}
  aria-label="Price Range"
/>
```

## Important Notes

- Slider API differs from shadcn — it uses `onChange` with `(event, value)` signature similar to MUI
- For range sliders, pass an array `[min, max]` as `value`
