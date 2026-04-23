# BottomNavigationItem

Item in bottom navigation

## Import

```tsx
import { BottomNavigationItem } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"button"`, `"activated"`

### `value`

**Type**: `string`

Value of the navigation item.

### `symbol`

**Type**: `ComponentType<{}>`

Icon symbol.

### `activatedSymbol`

**Type**: `ComponentType<{}>`

Icon symbol when activated is true.

### `count`

**Type**: `number`

Badge count.
The integer to display. It displays in dot mode if has not count specified.

### `activated`

**Type**: `boolean`

If true, navigation item will be displayed in an activated state.

### `expanded`

**Type**: `boolean`

If true, navigation item will be displayed in an expanded state.

### `onClick`

**Type**: `(e: MouseEvent<HTMLButtonElement, MouseEvent>) => void`

Callback fired when the button is clicked.
@param event The event source of the callback.

### `BadgeProps`

**Type**: `Omit<BadgeProps, "count"> & HTMLDataAttribute`

Props applied to Badge component

### `ButtonProps`

**Type**: `Omit<IconButtonProps<"button">, "symbol" | "color" | "onClick" | "size" | "variant" | "shape"> & HTMLDataAttribute`

Props applied to IconButton component

### `label`

**Type**: `string`

This label will be displayed in tooltip by default.

### `TooltipProps`

**Type**: `Omit<TooltipProps, "title" | "open" | "PopperProps" | "onOpenStateChange"> & HTMLDataAttribute`

Props applied to Tooltip component

### `className`

**Type**: `string`

className for `root` slot

