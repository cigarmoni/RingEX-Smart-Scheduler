# Switch

Toggle switch for on/off states

## Import

```tsx
import { Switch } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"track"`, `"dot"`, `"input"`

### `autoFocus`

**Type**: `boolean`

If `true`, the Switch will be automatically focused on mount.

**Default**: `false`

### `inputRef`

**Type**: `Ref<HTMLInputElement>`

Pass a ref to the `input` element.

### `inputProps`

**Type**: `Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref" | "className">`

Attributes applied to `input` element

### `rootProps`

**Type**: `ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement>`

Attributes applied to root

### `defaultChecked`

**Type**: `boolean`

The default checked state. Use when the component is not controlled.

### `onFocus`

**Type**: `FocusEventHandler<Element>`

### `onBlur`

**Type**: `FocusEventHandler<Element>`

### `onChange`

**Type**: `ChangeEventHandler<HTMLInputElement>`

Callback fired when the state is changed.
@param event The event source of the callback.
You can pull out the new value by accessing `event.target.value` (string).
You can pull out the new checked state by accessing `event.target.checked` (boolean).

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

### `required`

**Type**: `boolean`

If `true`, the `input` element is required.

### `checked`

**Type**: `boolean`

If `true`, the component is checked.

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

### `className`

**Type**: `string`

className for `root` slot

