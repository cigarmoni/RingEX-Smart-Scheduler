# DialPadButton

Button for dial pad

## Import

```tsx
import { DialPadButton } from '@ringcentral/spring-ui';
```

## Props

### `value`

**Type**: `string & (string | number | readonly string[])`

output value when press

### `longPressValue`

**Type**: `string`

output value when long press

### `longPressDelay`

**Type**: `number`

time for long press delay trigger

**Default**: `1000ms`

### `onKeyEffect`

**Type**: `(value: string, reason: DialPadOnChangeReason) => void`

emit effect when trigger number enter

### `iconSize`

**Type**: `"large" | "medium"`

the inner icon size of the Icon container

- medium: `32.25%`;
- large: `64.5%`;
Overrides the default icon size.

**Options**: `"large"`, `"medium"`

### `symbol`

**Type**: `ComponentType<{}>`

The icon to render. If children are provided the icon will not be rendered.

### `label`

**Type**: `string`

The label text. Only applies to XXXLarge/XXLarge sizes.

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"medium"`, `"large"`, `"label-container"`

### `tabIndex`

**Type**: `number`

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

The size of the component.

**Default**: `"large"`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

### `variant`

**Type**: `"outlined" | "contained" | "icon" | "inverted"`

The variant of the component.

**Default**: `"outlined"`

**Options**: `"outlined"`, `"contained"`, `"icon"`, `"inverted"`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `component`

**Type**: `"button"`

The component used for the root node.
Either a string to use a HTML element or a component.

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

### `background`

**Type**: `boolean`

Controls whether the component should have a background in its resting state.
Does not apply to the "icon" variant.

**Default**: `true`

### `TooltipProps`

**Type**: `Omit<TooltipProps, "children">`

### `shape`

**Type**: `"circular" | "squircle" | "rectangular"`

The shape of the component.

**Default**: `"circular"`

**Options**: `"circular"`, `"squircle"`, `"rectangular"`

