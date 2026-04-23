# FabButton

Floating action button

## Import

```tsx
import { FabButton } from '@ringcentral/spring-ui';
```

## Props

### `symbol`

**Type**: `ComponentType<{}>`

Icon

### `size`

**Type**: `"small" | "large"`

The size of the component.

**Default**: `'large'`

**Options**: `"small"`, `"large"`

### `tabIndex`

**Type**: `number`

### `type`

**Type**: `"button" | "submit" | "reset"`

Type attribute applied when the `component` is `button`.

**Default**: `'button'`

**Options**: `"button"`, `"submit"`, `"reset"`

### `rootRef`

**Type**: `Ref<Element>`

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

### `rootElementName`

**Type**: `enum`

The HTML element, e.g.'button', 'a' etc

**Default**: `''`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"activated"`, `"small"`, `"large"`

### `component`

**Type**: `ComponentType<SquircleProps<"button">> & "button"`

The component used for the root node.
Either a string to use a HTML element or a component.

### `active`

**Type**: `boolean`

### `focusVisible`

**Type**: `boolean`

### `interactive`

**Type**: `boolean`

**Default**: `true`

### `fillShape`

**Type**: `boolean`

