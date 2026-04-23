# Button

Primary button component with variants

## Import

```tsx
import { Button } from '@ringcentral/spring-ui';
```

## Props

### `startIcon`

**Type**: `ComponentType<any> | ReactNode`

Icon placed before the children.

### `endIcon`

**Type**: `ComponentType<any> | ReactNode`

Icon placed after the children.

### `fullWidth`

**Type**: `boolean`

If `true`, the button will take up the full width of its container.

**Default**: `false`

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall"`

The size of the component.

**Default**: `'medium'`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`

### `variant`

**Type**: `"text" | "outlined" | "contained" | "inverted"`

The variant to use.

**Default**: `'contained'`

**Options**: `"text"`, `"outlined"`, `"contained"`, `"inverted"`

### `color`

**Type**: `"neutral" | "success" | "danger" | "primary" | "secondary" | "warning"`

The color of the component.

**Default**: `'primary'`

**Options**: `"neutral"`, `"success"`, `"danger"`, `"primary"`, `"secondary"`, `"warning"`

### `background`

**Type**: `boolean`

Controls whether the component should have a background in its resting state.
Does not apply to the "text" variant.

**Default**: `true`

### `loading`

**Type**: `boolean`

### `CircularProgressIndicatorProps`

**Type**: `CircularProgressIndicatorProps`

Sets the props that are applied to the CircularProgressIndicator if `loading` is `true`.

### `tabIndex`

**Type**: `number`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `focusableWhenDisabled`

**Type**: `boolean`

If `true`, allows a disabled button to receive focus.

**Default**: `false`

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

### `to`

**Type**: `string`

### `rootElementName`

**Type**: `enum`

The HTML element, e.g.'button', 'a' etc

**Default**: `''`

### `TooltipProps`

**Type**: `Omit<TooltipProps, "children">`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"loading"`, `"loading-indicator"`, `"content"`, `"start-slot"`, `"end-slot"`, `"full-width"`, `"hide-background"`, `"has-start-slot"`, `"has-end-slot"`, `"text"`, `"contained"`, `"outlined"`, `"inverted"`, `"xlarge"`, `"large"`, `"medium"`, `"small"`, `"xsmall"`, `"primary"`, `"secondary"`, `"danger"`, `"warning"`, `"success"`, `"neutral"`

### `component`

**Type**: `"button"`

The component used for the root node.
Either a string to use a HTML element or a component.

