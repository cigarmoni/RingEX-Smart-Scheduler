# Chip

Chip/tag component

## Import

```tsx
import { Chip } from '@ringcentral/spring-ui';
```

## Props

### `startSlot`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>>`

Slot for putting an Avatar or Icon before label

### `children`

**Type**: `null`

This prop isn't supported.
Use the `component` prop if you need to change the children structure.

### `clickable`

**Type**: `boolean`

If `true`, the chip will appear clickable,
even if the onClick prop is not defined.
If `false`, the chip will not appear clickable, even if onClick prop is defined.
This can be used, for example,
along with the component prop to indicate an anchor Chip is clickable.
Note: this controls the UI and does not affect the onClick event.

### `truncate`

**Type**: `boolean`

If `true`, there is a max-width at 144,
If `false`, there is no max-width.

**Default**: `true`

### `color`

**Type**: `"error" | "default"`

The color of the component.

**Default**: `'default'`

**Options**: `"error"`, `"default"`

### `size`

**Type**: `"small" | "large" | "medium"`

The size of the component.

**Default**: `'large'`

**Options**: `"small"`, `"large"`, `"medium"`

### `label`

**Type**: `ReactNode`

The content of the component.

### `onDelete`

**Type**: `(event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void`

Callback fired
1. when the delete icon is clicked
2. press 'Backspace' or 'Delete' when Chip is focused
If set, the delete icon will be shown.

### `DeleteIconProps`

**Type**: `Omit<IconButtonProps<"button">, "size" | "variant" | "shape">`

Attributes applied to delete icon button

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"truncate"`, `"label"`, `"large"`, `"medium"`, `"small"`, `"delete-icon"`, `"default"`, `"error"`, `"clickable"`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

