# TimePicker

Time selection input

## Import

```tsx
import { TimePicker } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"picker-root"`, `"time-button"`, `"number-picker"`, `"picker-view"`, `"main-view"`, `"minute-selection-view"`, `"hour-selection-view"`, `"twelve-hour"`

### `isTwelveHourSystem`

**Type**: `boolean`

Sets if a 12 hour clock is being used.

### `value`

**Type**: `number`

A Date object or number that represents the duration in milliseconds since the start of the day.

### `dateMode`

**Type**: `false`

When all using date, this props will be remove,

### `min`

**Type**: `number`

The minimum time that can be set.

### `max`

**Type**: `number`

The maximum time that can be set.

### `defaultPickerValue`

**Type**: `number`

The default value to show in the picker when the input field is empty.

**Default**: `null 00:00`

### `screenReaderProps`

**Type**: `PickerViewScreenReaderProps`

Props containing functions for getting attributes of the target element

### `onChange`

**Type**: `(time: number) => void`

Callback fired when the user changes the time.

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

### `onClose`

**Type**: `(event: SyntheticEvent<HTMLElement, Event>, reason: ModalCloseReason) => void`

### `action`

**Type**: `Ref<PickerTextFieldActions>`

can manual trigger close by ref

### `inputRef`

**Type**: `Ref<HTMLInputElement | HTMLTextAreaElement>`

### `inputProps`

**Type**: `Omit<InputComponentProps & InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> & HTMLDataAttribute`

[Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
announcementText for screen reader read

### `endAdornment`

**Type**: `ReactNode`

### `startAdornment`

**Type**: `ReactNode`

### `RootProps`

**Type**: `ClassesProp<FormFieldClassesKey> & { label?: ReactNode; labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>; ... 10 more ...; required?: boolean; } & Omit<...> & HTMLDataAttribute`

The root props for the form field component

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

**Type**: `(event: MouseEvent<HTMLElement, MouseEvent>) => void`

trigger when user click the clear button

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

### `announcementText`

**Type**: `string`

announcementText announced by screen reader when textField focused

### `PopoverProps`

**Type**: `Omit<PopoverProps, "open" | "anchorEl" | "onClose" | "transformOrigin" | "anchorOrigin">`

props for hourPicker component

### `endIconSymbol`

**Type**: `ComponentType<any>`

end adornment icon

### `textInputClasses`

**Type**: `Partial<Record<"focused" | "disabled" | "required" | "active" | "checked" | "completed" | "expanded" | "focusVisible" | "focusVisibleWithin" | "selected" | "dragged" | TextFieldClassesKey, string>>`

