# DialTextField

Text field for dialer

## Import

```tsx
import { DialTextField } from '@ringcentral/spring-ui';
```

## Props

### `externalWindow`

**Type**: `Window`

for custom window

### `value`

**Type**: `string`

current value

### `onChange`

**Type**: `(value: string) => unknown`

emit when value change

### `onEmit`

**Type**: `(value: string, reason: DialPadOnChangeReason) => void`

emit latest trigger value, that will be helpful when you in `keypadMode`, and `onlyAllowKeypadValue`
`reason` for trigger from what event

### `onlyAllowKeypadValue`

**Type**: `boolean`

only allow keypad value 1234567890*+#

will be enable when `keypadMode` is true by default

### `keypadMode`

**Type**: `boolean`

is that in keypad mode, keypad mode

1. only dialer keypad key can be typing 1234567890*+#
2. can't select text
3. can't delete text
4. can't change cursor position
5. keep focus position in the latest
6. non maxLength
7. when pasting a value into a TextField, the sounds emit one by one at 300ms intervals and trigger `onEmit` when intervals done.

### `label`

**Type**: `ReactNode`

The label on the form element

### `error`

**Type**: `boolean`

If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `helperText`

**Type**: `ReactNode`

The help text under the form element

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

### `defaultValue`

**Type**: `string`

### `placeholder`

**Type**: `string`

The placeholder text in input element

### `onFocus`

**Type**: `FocusEventHandler<HTMLInputElement>`

### `onBlur`

**Type**: `FocusEventHandler<HTMLInputElement>`

### `onKeyDown`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyUp`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `focused`

**Type**: `boolean`

If true, always show focused style
If `true`, the component will be displayed in focused state.

**Default**: `false`

### `size`

**Type**: `"xlarge" | "large" | "medium"`

The size of the form element

**Default**: `'xlarge'`

**Options**: `"xlarge"`, `"large"`, `"medium"`

### `FormHelperTextProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & HTMLDataAttribute`

Pass props to the helperText node

### `variant`

**Type**: `"standard" | "outlined" | "quiet" | "contained"`

**Options**: `"standard"`, `"outlined"`, `"quiet"`, `"contained"`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `required`

**Type**: `boolean`

If `true`, the `input` element is required.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `fullWidth`

**Type**: `boolean`

If true, the input will take up the full width of its container.

### `type`

**Type**: `"number" | "text" | "tel" | "url" | "email" | "search" | "password"`

Type of the `input` element.

**Default**: `'text'`

**Options**: `"number"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"search"`, `"password"`

### `inputRef`

**Type**: `Ref<HTMLInputElement | HTMLTextAreaElement>`

### `inputProps`

**Type**: `Omit<InputComponentProps & InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> & HTMLDataAttribute`

Attributes applied to the `input` element .

### `endAdornment`

**Type**: `ReactNode`

### `startAdornment`

**Type**: `ReactNode`

### `RootProps`

**Type**: `ClassesProp<FormFieldClassesKey> & { label?: ReactNode; labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>; ... 10 more ...; required?: boolean; } & Omit<...> & HTMLDataAttribute`

The root props for the form field component

### `useNativeClearBtn`

**Type**: `boolean`

When true, shows native clear button for search inputs.
if clearBtn is  also true, both buttons will be shown.

**Default**: `false`

### `clearText`

**Type**: `string`

The arial label of clear button.

**Default**: `'clear'`

### `showCharacterCount`

**Type**: `boolean`

Show the current/remaining character count. Only works for a controlled TextField where inputProps.maxLength is set.

**Default**: `false`

### `ClearButtonProps`

**Type**: `IconButtonProps<"button">`

props apply on default clear button

### `inputComponent`

**Type**: `"input"`

The component used for the `input` element.
Either a string to use a HTML element or a component.

**Default**: `'input'`

### `showMaskValueToggleButton`

**Type**: `boolean`

Controls whether the mask value button is displayed, typically used for allowing the user to see their password in plaintext

**Default**: `true when type is "password"`

### `maskValue`

**Type**: `boolean`

Controls whether or not the value is masked and not shown in plaintext.
If not provided, masking the value will be uncontrolled and will be internally managed by the TextField component when the user clicks the mask value toggle button.
If provided, masking the value will be controlled and you will need to pass an `onMaskValueChange` callback.

### `onMaskValueChange`

**Type**: `(visible: boolean) => void`

Callback when the Mask Button is toggled.
Receives the new visibility state as a boolean.

### `MaskValueButtonProps`

**Type**: `Partial<IconButtonProps<"button">>`

Additional props for customizing the appearance and behavior of the Mask Button.

### `ShowHideEyeIconProps`

**Type**: `Omit<ShowHideEyeProps, "hide">`

Additional props for customizing the appearance and behavior of the `ShowHideEye` component.

