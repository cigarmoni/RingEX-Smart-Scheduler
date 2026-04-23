# CallButton

Specialized button for call actions

## Import

```tsx
import { CallButton } from '@ringcentral/spring-ui';
```

## Props

### `tabIndex`

**Type**: `number`

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

### `iconSize`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

Overrides the default icon size.

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

### `variant`

**Type**: `"end" | "start"`

**Options**: `"end"`, `"start"`

### `size`

**Type**: `"small" | "large" | "medium"`

The size of the component.

**Default**: `"medium"`

**Options**: `"small"`, `"large"`, `"medium"`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"end"`, `"start"`

