# Text

Text display component

## Import

```tsx
import { Text } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

This prop isn't supported.
Use the `component` prop if you need to change the children structure.

### `flexFull`

**Type**: `boolean`

when set `true`, add style `flex: 1 1 auto`

### `highlight`

**Type**: `boolean`

highlight for text with color and background to be mentionMe

### `titleWhenOverflow`

**Type**: `number`

is show title only when truncated, use `number` value to truncate text at a specific number of lines.
### should not change titleWhenOverflow dynamically, keep that be same value, that will cause hook issue

### `noWrap`

**Type**: `boolean`

### `useTooltip`

**Type**: `boolean`

### `TooltipProps`

**Type**: `Omit<TooltipProps, "title" | "open" | "PopperProps" | "onOpenStateChange"> & HTMLDataAttribute`

Props applied to Tooltip component

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"no-wrap"`, `"flex-full"`, `"highlight-term"`

### `component`

**Type**: `"span"`

The component used for the root node.
Either a string to use a HTML element or a component.

