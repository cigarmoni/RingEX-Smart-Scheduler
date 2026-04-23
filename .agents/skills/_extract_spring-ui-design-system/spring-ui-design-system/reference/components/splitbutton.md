# SplitButton

Button with dropdown menu

## Import

```tsx
import { SplitButton } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"bg"`, `"action-button-root"`, `"menu-button-root"`

### `ActionButtonProps`

**Type**: `{ startIcon?: ComponentType<any> | ReactNode; endIcon?: ComponentType<any> | ReactNode; fullWidth?: boolean; size?: ButtonSize; ... 4 more ...; CircularProgressIndicatorProps?: CircularProgressIndicatorProps; } & ... 5 more ... & { ...; }`

Props applied to the Button component used to trigger the selected action
of the SplitButton. See the `children` prop for how the content of the
action button is set.

### `MenuProps`

**Type**: `MenuProps`

Props applied to the Menu component.

### `MenuButtonProps`

**Type**: `IconButtonProps<"button">`

Props applied to the IconButton component used to
display the dropdown menu of the SplitButton.

### `children`

**Type**: `(ReactElement<ForwardRefExoticComponent<Pick<MenuItemProps, "slot" | "style" | "title" | "classes" | "key" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | ... 254 more ... | "autoClose"> & RefAttributes<...>>, string | JSXElementConstructor<...>> | ReactElement<....`

The MenuItems to render. The first MenuItem will not be displayed in the
Menu and will instead be used as the action button. If an Icon component
is passed as children it will automatically have its size set based on the
size of the button. If the passed children is not an Icon, the `title` prop
will be used as the text of the action button if `ActionButtonProps.title`
is not provided. The `onClick` prop of the MenuItem will be called when
the action button is clicked.

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall"`

The size of the component.

**Default**: `'medium'`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`

### `variant`

**Type**: `"text" | "outlined" | "contained" | "inverted"`

The variant to use.

**Default**: `'contained'`

**Options**: `"text"`, `"outlined"`, `"contained"`, `"inverted"`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `loading`

**Type**: `boolean`

### `background`

**Type**: `boolean`

Controls whether the component should have a background in its resting state.
Does not apply to the "text" variant.

**Default**: `true`

### `color`

**Type**: `"neutral" | "success" | "primary" | "secondary" | "warning"`

**Options**: `"neutral"`, `"success"`, `"primary"`, `"secondary"`, `"warning"`

### `TooltipProps`

**Type**: `Omit<TooltipProps, "children">`

