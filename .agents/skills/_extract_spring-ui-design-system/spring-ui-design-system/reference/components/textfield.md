# TextField

Single-line text input field

## Import

```tsx
import { TextField } from '@ringcentral/spring-ui';
```

## Props

### `placeholder`

**Type**: `string`

The placeholder text in input element

### `RootProps`

**Type**: `ClassesProp<FormFieldClassesKey> & { label?: ReactNode; labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>; ... 10 more ...; required?: boolean; } & Omit<...> & HTMLDataAttribute`

The root props for the form field component

### `fullWidth`

**Type**: `boolean`

If true, the input will take up the full width of its container.

### `clearBtn`

**Type**: `boolean`

Show clear button when text input has valid content.

**Default**: `true`

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

### `onClear`

**Type**: `MouseEventHandler<HTMLButtonElement>`

Trigger when click clear button.

### `value`

**Type**: `string`

### `defaultValue`

**Type**: `string`

### `startAdornment`

**Type**: `ReactNode`

### `endAdornment`

**Type**: `ReactNode`

### `onBlur`

**Type**: `FocusEventHandler<HTMLInputElement>`

### `onFocus`

**Type**: `FocusEventHandler<HTMLInputElement>`

### `onClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onKeyDown`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyUp`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `label`

**Type**: `ReactNode`

The label on the form element

### `helperText`

**Type**: `ReactNode`

The help text under the form element

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

### `error`

**Type**: `boolean`

If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `onChange`

**Type**: `ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `required`

**Type**: `boolean`

If `true`, the `input` element is required.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `inputRef`

**Type**: `Ref<HTMLInputElement | HTMLTextAreaElement>`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"clear"`, `"root"`, `"full-width"`, `"hide-native-clear"`, `"input"`, `"end-adornment"`, `"start-adornment"`, `"form-field-content"`, `"outlined"`, `"standard"`, `"quiet"`, `"helper-text"`, `"mask-value-button"`

### `inputComponent`

**Type**: `"input"`

The component used for the `input` element.
Either a string to use a HTML element or a component.

**Default**: `'input'`

### `inputProps`

**Type**: `Omit<InputComponentProps & InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> & HTMLDataAttribute`

Attributes applied to the `input` element .

### `type`

**Type**: `"number" | "text" | "tel" | "url" | "email" | "search" | "password"`

Type of the `input` element.

**Default**: `'text'`

**Options**: `"number"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"search"`, `"password"`

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

