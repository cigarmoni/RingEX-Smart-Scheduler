# IconButton

Button with icon only

## Import

```tsx
import { IconButton } from '@ringcentral/spring-ui';
```

## Props

### `symbol`

**Type**: `ComponentType<{}>`

The icon to render. If children are provided the icon will not be rendered.

### `variant`

**Type**: `"outlined" | "contained" | "icon" | "inverted"`

The variant of the component.

**Default**: `"outlined"`

**Options**: `"outlined"`, `"contained"`, `"icon"`, `"inverted"`

### `label`

**Type**: `string`

The label text. Only applies to XXXLarge/XXLarge sizes.

### `color`

**Type**: `"neutral" | "success" | "danger" | "primary" | "secondary" | "warning"`

The color of the component.

**Default**: `"primary"`

**Options**: `"neutral"`, `"success"`, `"danger"`, `"primary"`, `"secondary"`, `"warning"`

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

The size of the component.

**Default**: `"large"`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

### `shape`

**Type**: `"circular" | "squircle" | "rectangular"`

The shape of the component.

**Default**: `"circular"`

**Options**: `"circular"`, `"squircle"`, `"rectangular"`

### `background`

**Type**: `boolean`

Controls whether the component should have a background in its resting state.
Does not apply to the "icon" variant.

**Default**: `true`

### `iconSize`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

Overrides the default icon size.

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

### `tabIndex`

**Type**: `number`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `type`

**Type**: `"button" | "submit" | "reset"`

Type attribute applied when the `component` is `button`.

**Default**: `'button'`

**Options**: `"button"`, `"submit"`, `"reset"`

### `rootRef`

**Type**: `Ref<Element>`

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

**Available keys**: `"root"`, `"label"`, `"contained"`, `"outlined"`, `"icon"`, `"inverted"`, `"circular"`, `"rectangular"`, `"squircle"`, `"xsmall"`, `"small"`, `"medium"`, `"large"`, `"xlarge"`, `"xxlarge"`, `"xxxlarge"`, `"hide-background"`, `"squircle-label"`, `"danger"`, `"warning"`, `"primary"`, `"success"`, `"secondary"`, `"neutral"`

### `component`

**Type**: `"button"`

The component used for the root node.
Either a string to use a HTML element or a component.

