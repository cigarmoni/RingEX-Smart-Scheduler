# MenuItem

Individual menu item

## Import

```tsx
import { MenuItem } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"container"`, `"select-indicator"`, `"nowrap"`, `"root"`, `"highlighted"`, `"selectable"`, `"select-dot"`

### `selected`

**Type**: `boolean`

If not undefined, apply selectable styling.

**Default**: `undefined`

### `highlighted`

**Type**: `boolean`

If not undefined, shows the hover state of the item by default.

**Default**: `undefined`

### `focused`

**Type**: `boolean`

If not undefined, shows the focused state of the item by default.

**Default**: `undefined`

### `autoFocus`

**Type**: `boolean`

Auto focus item when mounted.

### `autoClose`

**Type**: `boolean`

Auto close menu after click item.

**Default**: `true`

### `id`

**Type**: `string`

### `onClick`

**Type**: `MouseEventHandler<any>`

### `disabled`

**Type**: `boolean`

### `disableFocusOnHover`

**Type**: `boolean`

If `true`, the menu item won't receive focus when the mouse moves over it.

**Default**: `false`

