# Checkbox

Checkbox input for binary choices

## Import

```tsx
import { Checkbox } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"inner"`, `"input"`, `"rectangular"`, `"squircle"`

### `indeterminate`

**Type**: `boolean`

If `true`, the component appears indeterminate.

**Default**: `false`

### `autoFocus`

**Type**: `boolean`

If `true`, the Checkbox will be automatically focused on mount.

**Default**: `false`

### `inputRef`

**Type**: `Ref<HTMLInputElement>`

Pass a ref to the `input` element.

### `rootProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "className">`

Attributes applied to root

### `inputProps`

**Type**: `Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref" | "className" | "type">`

Attributes applied to `input` element

### `shape`

**Type**: `"squircle" | "rectangular"`

The shape of the checkbox.

**Default**: `'rectangular'`

**Options**: `"squircle"`, `"rectangular"`

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

### `readOnly`

**Type**: `boolean`

If `true`, the component is read only.

### `className`

**Type**: `string`

className for `root` slot

