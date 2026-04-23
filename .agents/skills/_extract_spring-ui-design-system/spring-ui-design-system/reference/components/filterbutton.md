# FilterButton

Button for filtering actions

## Import

```tsx
import { FilterButton } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `children`

**Type**: `string & ReactNode`

Text of filter button will be transformed to upper case

### `onClick`

**Type**: `(event: MouseEvent<HTMLElement, MouseEvent>, value: FilterButtonValue) => void`

Callback fired when the button is clicked.
@param event The event source of the callback.
@param value of the selected button.

### `selected`

**Type**: `boolean`

If `true`, the button is rendered in an active state.

### `value`

**Type**: `FilterButtonValue`

The value to associate with the button when selected in Filters.
Defaults to use children if not provided.

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

### `rootElementName`

**Type**: `enum`

The HTML element, e.g.'button', 'a' etc

**Default**: `''`

