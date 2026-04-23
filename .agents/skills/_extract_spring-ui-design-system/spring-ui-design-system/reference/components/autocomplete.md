# Autocomplete

Searchable dropdown with autocomplete

## Import

```tsx
import { Autocomplete } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"error"`, `"chevron"`, `"clear"`, `"form-field-content"`, `"chip"`, `"input-container"`, `"input"`, `"end-adornment"`

### `variant`

**Type**: `"autocomplete" | "tags"`

Determines the variant of the Autocomplete component.
display mode,
when be `autocomplete`, that `multiple` will be `false`

**Default**: `tags`

**Options**: `"autocomplete"`, `"tags"`

### `fullWidth`

**Type**: `boolean`

If true, the component will take up the full width of its container.
If true, the input will take up the full width of its container.

**Default**: ``true``

### `inputVariant`

**Type**: `"standard" | "outlined" | "quiet" | "contained"`

Specifies the variant of the input field.

**Options**: `"standard"`, `"outlined"`, `"quiet"`, `"contained"`

### `toggleButton`

**Type**: `boolean`

Enables the toggle button for the dropdown menu.

### `ToggleButtonProps`

**Type**: `Partial<IconButtonProps<"button">> & HTMLDataAttribute`

Props applied to the toggle button.

### `ClearButtonProps`

**Type**: `Partial<IconButtonProps<"button">> & HTMLDataAttribute & { symbol?: ComponentType<{}>; variant?: IconButtonVariant; ... 5 more ...; iconSize?: IconSize; } & ... 4 more ... & Omit<...>`

Props applied to the underlying IconButton component used for the clear button.
Allows customization of appearance and behavior.
props apply on default clear button
@example ```tsx
ClearButtonProps={{
  size: 'xsmall',
  'aria-label': 'Clear input',
}}
```

### `getToggleButtonProps`

**Type**: `(isOpen: boolean) => Partial<IconButtonProps<"button">> & HTMLDataAttribute`

Function to get custom props for the toggle button based on the menu's open state.
Useful for customizing the toggle button icon.

### `action`

**Type**: `Ref<AutocompleteRef<SuggestionListItemData>>`

A ref for imperative actions.

- `getActiveIndex`: get current active index
- `setActiveIndex`: set current active index;
- `getFilterResultItems`: get current filter result option items;
- `getHighlightedIndex`: get current highlight index;
- `setHighlightedIndex`: set current highlight index;
- `openMenu`: open the listbox menu
- `closeMenu`: close the listbox menu
- `focus`: focus on text field input
- `reset(isFocus)`: reset whole downshift, `isFocus` default is `false`

### `renderOption`

**Type**: `(option: SuggestionListItemData, state: AutocompleteRenderOptionState) => ReactNode`

Custom rendering function for options Uses `getOptionLabel` by default.
@param option The option to render.
@param state The state of the component.
@returns A ReactNode representing the rendered option.

### `PopperComponent`

**Type**: `ComponentType<PopperProps>`

Custom component for rendering the popper. Defaults to Popper.

**Default**: `Popper`

### `PopperProps`

**Type**: `Omit<Partial<PopperProps>, "classes" | "open" | "anchorEl" | "keepMounted"> & { anchorElType?: "input" | "root"; } & ClassesProp<AutocompletePopperClassesKey>`

Configuration props for the Popper component.

### `SuggestionListProps`

**Type**: `AutocompleteSuggestionListProps<SuggestionListItemData>`

Props for the suggestion list, supporting virtualized lists.

### `renderInput`

**Type**: `(params: Partial<AutoCompleteTextFieldInputProps>) => ReactElement<any, string | JSXElementConstructor<any>>`

Custom rendering function for the input field, default is `RcTextField`

### `freeSolo`

**Type**: `boolean`

If true, allows free solo input not bound to provided options.
If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.

### `showPlaceholderWithTags`

**Type**: `boolean`

If `true`, the placeholder will be displayed when multiple value is allowed and tags are present.

**Default**: `false`

### `renderTags`

**Type**: `(selectedItems: SuggestionListItemData[], getTagProps: (selectedItem: SuggestionListItemData, index: number) => Omit<GetTagProps<SuggestionListItemData>, "children" | ... 1 more ... | "selectedItem"> & { ...; }) => ReactNode`

Custom rendering function for selected tags.
@param selectedItems The selected items.
@param getTagProps Function to get props for each tag.
@returns A ReactNode representing the rendered tags.

### `debug`

**Type**: `boolean`

If true, the popup will ignore blur events. Useful for customization.

### `id`

**Type**: `string`

current suggestion list unique id

### `onChange`

**Type**: `(selectedItems: SuggestionListItemData[]) => void`

emit tags change event

### `onReset`

**Type**: `(e?: ChangeEvent<{}>) => void`

trigger when check free solo complete

### `onKeyDown`

**Type**: `((event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, highlightedIndex?: number) => void) & KeyboardEventHandler<HTMLDivElement>`

@param event keydown event
@param highlightedIndex current menu highlightedIndex

### `onSelect`

**Type**: `(event: ChangeEvent<{}>, selectedItems: SuggestionListItemData) => void`

emit when item be select

### `focused`

**Type**: `boolean`

current focused state
If true, always show focused style
If `true`, the component will be displayed in focused state.

**Default**: `false`

### `value`

**Type**: `SuggestionListItemData[]`

selectedItems array list

### `open`

**Type**: `boolean`

Control the popup open state.

### `onClose`

**Type**: `(event: ChangeEvent<{}>, reason: AutocompleteCloseReason) => void`

Callback fired when the popup requests to be closed.
Use in controlled mode (see open).
@param event The event source of the callback.
@param reason Can be: `"toggleInput"`, `"escape"`, `"select-option"`, `"blur"`.

### `multiple`

**Type**: `boolean`

is that can select multiple, default is `false`

### `onClear`

**Type**: `MouseEventHandler<HTMLButtonElement>`

Trigger when click clear button.

### `options`

**Type**: `SuggestionListItemData[]`

@requires options for search

### `onOpen`

**Type**: `(event: ChangeEvent<{}>) => void`

Callback fired when the popup requests to be opened.
Use in controlled mode (see open).
@param event The event source of the callback.

### `getOptionDisabled`

**Type**: `(option: SuggestionListItemData) => boolean`

Used to determine the disabled state for a given option.
@param option The option to test.
@returns

### `groupVariant`

**Type**: `"expanded" | "normal"`

group layout mode

- `normal`: use group name as group title
- `expanded`: use first-item as group title, and that is `clickable`

**Default**: `'normal'`

**Options**: `"expanded"`, `"normal"`

### `groupExpanded`

**Type**: `boolean | Record<string, boolean>`

group expanded state, you can control expanded state by that

- `true`: expand all
- `false`: collapse all
- `{key: boolean}`: control group state

### `groupDefaultExpanded`

**Type**: `boolean | Record<string, boolean>`

group default expanded state

- `true`: expand all
- `false`: collapse all
- `{key: boolean}`: control group state

### `groupBy`

**Type**: `(option: SuggestionListItemData) => string`

If provided, the options will be grouped under the returned string.
The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
@param option The options to group.
@returns The group key

### `onGroupExpanded`

**Type**: `(group: SuggestionListGroupedOption<SuggestionListItemData>, groupStateMap: Record<string, boolean>) => void`

Trigger when group item expanded state change.
@param group The state of the group.
@param groupStateMap The whole group state

### `getExpandIconProps`

**Type**: `(group: SuggestionListGroupedOption<SuggestionListItemData>) => Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "key" | keyof ButtonHTMLAttributes<...>>`

The props apply to ExpandIcon

### `getOptionLabel`

**Type**: `(option: SuggestionListItemData) => string`

Used to determine the string value for a given option.
It's used to fill the input (and the list box options if `renderOption` is not provided).
@param option
@returns

### `onInputChange`

**Type**: `(value: string) => void`

emit current input value

### `wrapperRef`

**Type**: `RefObject<HTMLDivElement>`

wrapper container ref, if you have `tag` or use in `popper`, that will be needed

### `getStopCreateFreeSolo`

**Type**: `() => boolean`

when that return `true` will ignore freeSolo create event

### `maxFreeSolo`

**Type**: `number`

max number of tags,

**Default**: `20`

### `onMaxFreeSolo`

**Type**: `(max?: number) => void`

emit when bigger than maxFreeSolo number

### `keyToTags`

**Type**: `string[]`

one of that character, also can be confirm a tag

**Default**: `[',', ';', '↵']`

### `onAddTags`

**Type**: `() => void`

trigger when addTags is called

### `inputContainerRef`

**Type**: `RefObject<HTMLDivElement>`

input container ref, if you have a scrollable input, that will be needed

### `addNoOptionItem`

**Type**: `"last" | "first"`

if you want add `freeSolo` item at `first` or `last` of options array,
set that will auto add item into options

**Options**: `"last"`, `"first"`

### `disableCloseOnSelect`

**Type**: `boolean`

If `true`, the popup won't close when a value is selected.
This prop defaults to the value of the `multiple` prop.

**Default**: `multiple`

### `initialIsOpen`

**Type**: `boolean`

This is the initial isOpen value when Autocomplete is initialized.

### `inputValue`

**Type**: `string`

current input value
current text field input value

### `autoSelect`

**Type**: `boolean`

If `true`, the selected option becomes the value of the input
when the input loses focus unless the user chooses
a different option or changes the character string in the input.

### `openOnFocus`

**Type**: `boolean`

If `true`, the popup will open on input focus.

**Default**: `true`

### `toggleWithInput`

**Type**: `boolean`

If `true`, when the input element is clicked it will toggle
the visibility of the popup.

**Default**: `true`

### `renderNoOptions`

**Type**: `(getNoOptionsProps: (additionProps: Pick<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, "key" | keyof HTMLAttributes<HTMLElement>>) => DetailedHTMLProps<...>, additionItem: SuggestionListItemData) => ReactNode`

Render when search no have any options.
@param additionItems render when not have any options,
if set that the freeSolo auto add items will not be cover

### `autoHighlight`

**Type**: `boolean`

If `true`, the first option is automatically highlighted.

**Default**: `true`

### `disabledItemsHighlightable`

**Type**: `boolean`

If `true`, will allow disabled items highlightable.

### `processFilteredResult`

**Type**: `(options: SuggestionListItemData[], inputValue: string) => SuggestionListItemData[]`

process filtered options result, let you can handle result after filter

### `filterOptions`

**Type**: `SuggestionListFilterOptions<SuggestionListItemData>`

A filter function that determines the options that are eligible.
@param options The options to render.
@param state The state of the component.
@returns

### `isOptionEqualToValue`

**Type**: `(option: SuggestionListItemData, value: SuggestionListItemData) => boolean`

Used to determine if the option represents the given value.
Uses strict equality by default (`===`).
@param option The option to test.
@param value The value to test against.
@returns `true` if the option represents the value.
@example // Compare by id
isOptionEqualToValue={(option, value) => option.id === value.id}

// Compare by custom key
isOptionEqualToValue={(option, value) => option.uuid === value.uuid}

### `inputRef`

**Type**: `RefObject<HTMLInputElement> & Ref<HTMLInputElement | HTMLTextAreaElement>`

that input ref you binding event

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

### `onKeyUp`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `size`

**Type**: `"xlarge" | "large" | "medium"`

The size of the form element

**Default**: `'xlarge'`

**Options**: `"xlarge"`, `"large"`, `"medium"`

### `FormHelperTextProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & HTMLDataAttribute`

Pass props to the helperText node

### `type`

**Type**: `"number" | "text" | "tel" | "url" | "email" | "search" | "password"`

Type of the `input` element.

**Default**: `'text'`

**Options**: `"number"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"search"`, `"password"`

### `inputProps`

**Type**: `(Omit<AutoCompleteInputProps, OmittedInputProps> | Omit<AutoCompleteInputProps & InputHTMLAttributes<HTMLInputElement>, OmittedInputProps>) & HTMLDataAttribute`

Attributes applied to the `input` element .

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

### `inputComponent`

**Type**: `ElementType<any>`

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

### `renderGroup`

**Type**: `(option: SuggestionListItemData, state: AutocompleteRenderOptionState) => ReactNode`

Render the group title item, also with for toggle button props.

> when you have set custom `renderOption`, the `renderGroup` must be set.
@param option The option to render.
@param state The state of the component.
@returns

