# Textarea

Multi-line text input area

## Import

```tsx
import { Textarea } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"clear"`, `"variant"`, `"quiet"`, `"input"`, `"form-field-content"`

### `maxRows`

**Type**: `number`

Maximum number of rows to display.

### `minRows`

**Type**: `number`

Minimum number of rows to display.

**Default**: `1`

### `rows`

**Type**: `number`

Number of rows to display.

### `variant`

**Type**: `"standard" | "outlined" | "contained"`

The variant of textarea

**Default**: `'outlined'`

**Options**: `"standard"`, `"outlined"`, `"contained"`

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

### `error`

**Type**: `boolean`

If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
The prop defaults to the value (`false`) inherited from the parent FormControl component.

### `inputRef`

**Type**: `Ref<HTMLInputElement | HTMLTextAreaElement>`

### `inputComponent`

**Type**: `ForwardRefExoticComponent<TextareaAutosizeProps & RefAttributes<Element>>`

The component used for the `input` element.
Either a string to use a HTML element or a component.

**Default**: `'input'`

### `inputProps`

**Type**: `Omit<TextAreaInputProps, OmittedInputProps> & HTMLDataAttribute`

Attributes applied to the `input` element .

