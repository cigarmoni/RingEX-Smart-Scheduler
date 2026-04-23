# Dropdown

Generic dropdown component

## Import

```tsx
import { Dropdown } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"value"`, `"chevron"`, `"activated"`, `"button"`, `"label"`, `"colon"`, `"root"`

### `defaultValue`

**Type**: `string`

The default selected value. Use when the component is uncontrolled.

### `value`

**Type**: `string`

The selected value.
Set to `null` to deselect all options.

### `onChange`

**Type**: `(value: string) => void`

Callback fired when an option is selected.

### `placeholder`

**Type**: `ReactNode`

Text to show when there is no selected value.

### `rootProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref" | "className"> & HTMLDataAttribute`

props applied to root

### `buttonProps`

**Type**: `Omit<Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "key" | keyof ButtonHTMLAttributes<...>> & { ...; }, "className"> & HTMLDataAttribute & Pick<...>`

props applied to button

### `MenuProps`

**Type**: `(Omit<MenuProps, "children" | "open" | "anchorEl" | "onClose"> | Omit<VirtualizedMenuProps<unknown>, "data" | "children" | "open" | "anchorEl" | "onClose" | "initialFocus">) & HTMLDataAttribute`

props applied to menu

### `buttonRef`

**Type**: `Ref<HTMLButtonElement>`

### `virtualize`

**Type**: `boolean`

When enabled, the menu items will be rendered in a virtualized list.
Set this prop to `true` when you have a large number of options to render.
Please note that this prop will default to `false` in the next major version.

**Default**: `true`

### `renderValue`

**Type**: `(value: string) => ReactNode`

Render the selected value.
@param value The `value` provided to the component.
@returns

### `autoFocus`

**Type**: `boolean`

If `true`, the select element is focused during the first mount

**Default**: `false`

### `disabled`

**Type**: `boolean`

If `true`, the select is disabled.

**Default**: `false`

### `defaultOpen`

**Type**: `boolean`

If `true`, the select will be initially open.

**Default**: `false`

### `open`

**Type**: `boolean`

Controls the open state of the select's menu.

**Default**: `undefined`

### `name`

**Type**: `string`

Name of the element. For example used by the server to identify the fields in form submits.
If the name is provided, the component will render a hidden input element that can be submitted to a server.

### `onOpenChange`

**Type**: `(isOpen: boolean) => void`

Callback fired when the component requests to be opened.

### `label`

**Type**: `string`

label for component

### `data`

**Type**: `unknown[]`

### `getSelectedIndex`

**Type**: `(value: string) => number`

Get selected item index to focus item when open dropdown.
If no provide this handler, will compare value with `data` by default.

### `className`

**Type**: `string`

className for `root` slot

