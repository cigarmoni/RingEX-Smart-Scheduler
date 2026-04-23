# Select

Dropdown selection component

## Import

```tsx
import { Select } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"chevron"`, `"placeholder"`, `"value"`, `"error"`, `"content"`, `"menu"`, `"native-input"`, `"quiet"`, `"selector"`

### `variant`

**Type**: `"standard" | "outlined" | "contained"`

The variant of the Select.

**Default**: `'standard'`

**Options**: `"standard"`, `"outlined"`, `"contained"`

### `selectMode`

**Type**: `"multiple" | "single"`

The selection mode of the Select.

**Default**: `'single'`

**Options**: `"multiple"`, `"single"`

### `defaultValue`

**Type**: `string | number | readonly string[]`

The default selected value(s). Use when the component is uncontrolled.
- When `selectMode` is `'single'`, this should be a single value or `null`.
- When `selectMode` is `'multiple'`, this should be an array (default: `[]`).

### `value`

**Type**: `unknown`

The selected value.

### `onChange`

**Type**: `(e: ChangeEvent<HTMLInputElement>, child: ReactNode) => void`

Callback fired when an option is selected.

### `placeholder`

**Type**: `ReactNode & string`

Text to show when there is no selected value.

### `renderValue`

**Type**: `(value: unknown) => ReactNode`

Renders the selected value. If displayEmpty is enabled, the value
argument will be null.
@param value The `value` provided to the component.
@returns

**Default**: `(value) => (Array.isArray(value) ? value.join(', ') : String(value))`

### `displayEmpty`

**Type**: `boolean`

Displays a value instead of a placeholder, even if no value is selected.
Make sure to return a meaningful value in the `renderValue` prop.

### `open`

**Type**: `boolean`

Controls whether the Select is open. If unset, the Select will be closed
by default until the user interacts to open it. By setting this property,
the Select will be in controlled mode, meaning you are responsible for
setting the open state using the `onOpen` and `onClose` callbacks.

### `defaultOpen`

**Type**: `boolean`

Controls whether the Select is open by default. If unset or `false`, the
Select will be closed by default until the user interacts to open it.

**Default**: `false`

### `virtualize`

**Type**: `boolean`

When enabled, the menu items will be rendered in a virtualized list.
Set this prop to `true` when you have a large number of options to render.

### `data`

**Type**: `unknown[]`

The data to render when the `virtualize` prop is `true`.

### `getSelectedIndex`

**Type**: `(value: unknown) => number`

A handler that should return the index of the selected item in the `data` array.
This prop is not used when the `virtualize` prop is `false`.

**Default**: `(value) => data.findIndex((v) => v === value)`

### `onOpen`

**Type**: `() => void`

Callback fired when the Select is opened. When in controlled mode and using
the `open` prop this will be called when the user requests to open the Select,
when in uncontrolled mode this will be called when the Select is opened.

### `onClose`

**Type**: `() => void`

Callback fired when the Select is closed. When in controlled mode and using
the `open` prop this will be called when the user requests to close the Select,
when in uncontrolled mode this will be called when the Select is closed.

### `selectorProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>`

Props applied to selector.

### `MenuProps`

**Type**: `Omit<MenuProps, "children" | "open" | "anchorEl" | "onClose"> & HTMLDataAttribute`

Props applied to the underlying Menu component.
If `virtualize` is `true`, use the `VirtualizedMenuProps` prop instead.

### `VirtualizedMenuProps`

**Type**: `Omit<VirtualizedMenuProps<unknown>, "children" | "open" | "onClose"> & HTMLDataAttribute`

Props applied to the underlying VirtualizedMenu component.
If `virtualize` is `false`, use the `MenuProps` prop instead.

### `inputProps`

**Type**: `InputHTMLAttributes<HTMLInputElement>`

Props applied to the underlying <input> element.
You can pass the `name` prop directly to the Select component.

### `label`

**Type**: `ReactNode`

The label on the form element

### `error`

**Type**: `boolean`

### `helperText`

**Type**: `ReactNode`

The help text under the form element

### `labelProps`

**Type**: `ClassAttributes<HTMLLabelElement> & LabelHTMLAttributes<HTMLLabelElement>`

Props passed to the <label> element

### `focused`

**Type**: `boolean`

If true, always show focused style

**Default**: `false`

### `size`

**Type**: `"xlarge" | "large" | "medium"`

The size of the form element

**Default**: `'xlarge'`

**Options**: `"xlarge"`, `"large"`, `"medium"`

### `contentRef`

**Type**: `Ref<HTMLDivElement>`

Pass ref to the content node

### `contentProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "className"> & HTMLDataAttribute`

Pass props to the content node

### `FormHelperTextProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & HTMLDataAttribute`

Pass props to the helperText node

### `htmlFor`

**Type**: `string`

### `disabled`

**Type**: `boolean`

### `required`

**Type**: `boolean`

