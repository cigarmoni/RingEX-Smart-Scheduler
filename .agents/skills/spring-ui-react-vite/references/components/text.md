# Text

```tsx
import { Text } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `noWrap` | `boolean` | — | Prevent text wrapping (truncate with ellipsis) |
| `highlight` | `string` | — | Substring to highlight |
| `title` | `string` | — | Tooltip text |
| `titleWhenOverflow` | `boolean` | — | Only show tooltip when text is truncated |
| `useTooltip` | `boolean` | — | Enable tooltip functionality |
| `TooltipProps` | `object` | — | Props for the tooltip |
| `flexFull` | `boolean` | — | Take full flex width |
| `component` | `ElementType` | `'span'` | Root element type |
| `children` | `ReactNode` | — | Text content |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Text>Regular text content</Text>
```

## Truncated with Tooltip

```tsx
<Text noWrap titleWhenOverflow useTooltip style={{ maxWidth: 200 }}>
  This is a very long text that will be truncated with an ellipsis and show a tooltip on hover
</Text>
```

## Highlighted Search

```tsx
<Text highlight={searchQuery}>
  This text will highlight matching search terms
</Text>
```

## Important Notes

- Text is a utility component for common text display patterns
- Use `noWrap` + `titleWhenOverflow` for truncated text that shows full content on hover
- Use `highlight` for search result highlighting
- For most text, standard HTML elements with Tailwind classes work fine
