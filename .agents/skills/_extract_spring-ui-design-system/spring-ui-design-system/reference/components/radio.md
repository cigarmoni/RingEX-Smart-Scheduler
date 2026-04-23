# Radio

Radio button for single selection from options

## Import

```tsx
import { Radio } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"input"`, `"dot"`

### `value`

**Type**: `string`

The value to be used in radio group.

### `name`

**Type**: `string`

The name of the group which the radio stay in.

### `inputRef`

**Type**: `Ref<HTMLInputElement>`

Pass a ref to the `input` element.

### `rootProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "className"> & HTMLDataAttribute`

Attributes applied to root

### `inputProps`

**Type**: `Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref" | "className" | "type">`

Attributes applied to `input` element

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

