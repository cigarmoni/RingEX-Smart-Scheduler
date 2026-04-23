# DatePicker

Date selection input

## Import

```tsx
import { DatePicker } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"calendar"`, `"header"`, `"header-action"`, `"switch-year-action"`, `"switch-year-action-caret"`, `"switch-month-actions-group"`, `"switch-month-action"`, `"date-button"`, `"current-date"`, `"day"`, `"year"`, `"years-panel"`, `"days-panel"`, `"days-grid"`, `"weekdays"`, `"weekday"`, `"loading-container"`, `"today-button"`

### `onChange`

**Type**: `(date: Date, fromUserSelect?: boolean) => void`

Calendar onChange
@param date update date value
@param fromUserSelect is that change come from user select day, when `false` mean that is come from range limitation

### `locale`

**Type**: `string`

i18n locale country

### `value`

**Type**: `Date`

value for picker

### `screenReaderProps`

**Type**: `ScreenReaderProps`

Customize aria-labels for DatePicker components.
Pass this prop for localization or custom accessibility labels.
If not provided, default English labels will be used.

### `formatString`

**Type**: `string`

Date format string, default with 'MM/DD/YYYY'

### `clearBtn`

**Type**: `boolean`

when hover on the textField, if show the clearBtn. With default is true.

### `min`

**Type**: `Date | Dayjs`

Min date

### `max`

**Type**: `Date | Dayjs`

Max date

### `todayButtonText`

**Type**: `string`

Text label for Today button

### `loadingIndicator`

**Type**: `Element`

Custom loading indicator

### `disablePast`

**Type**: `boolean`

Disable past dates

### `disableFuture`

**Type**: `boolean`

Disable future dates

### `renderDay`

**Type**: `(day: Dayjs, selectedDate: Dayjs, dayInCurrentMonth: boolean, dayComponent: Element) => Element`

Custom renderer for day @DateIOType

### `shouldDisableDate`

**Type**: `(day: Dayjs) => boolean`

Disable specific date @DateIOType

### `onMonthChange`

**Type**: `(date: Dayjs) => void | Promise<void>`

Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType

### `onSelectDay`

**Type**: `(day: Dayjs, fromUserSelect?: boolean) => void`

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

