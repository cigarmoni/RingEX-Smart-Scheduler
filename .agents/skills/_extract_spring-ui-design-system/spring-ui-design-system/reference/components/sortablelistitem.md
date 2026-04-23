# SortableListItem

Sortable list item

## Import

```tsx
import { SortableListItem } from '@ringcentral/spring-ui';
```

## Props

### `dragId`

**Type**: `UniqueIdentifier`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

### `hoverActions`

**Type**: `ReactNode`

### `size`

**Type**: `"small" | "large" | "auto"`

**Options**: `"small"`, `"large"`, `"auto"`

### `divider`

**Type**: `boolean`

If true, show listItem divider

**Default**: `true`

### `dragged`

**Type**: `boolean`

If true, show dragged style

**Default**: `false`

### `selected`

**Type**: `boolean`

If true, show selected style

**Default**: `false`

### `focused`

**Type**: `boolean`

If true, shows the focused state of the item by default.

**Default**: `undefined`

### `autoFocus`

**Type**: `boolean`

Auto focus item when mounted.

### `clickable`

**Type**: `boolean`

If false, no style about `active`.

If unset and no click handler, it will be false.

### `hoverable`

**Type**: `boolean`

If false, no style about `active`

**Default**: `true`

### `highlighted`

**Type**: `boolean`

If true, shows the hover state of the item by default.

**Default**: `undefined`

### `alwaysShowHoverActions`

**Type**: `boolean`

If true, hover actions will always show

**Default**: `false`

### `instantHoverActions`

**Type**: `boolean`

If true, the transition of the hover actions will show instantly.
If false or unset, it will use the default transition.

**Default**: `false`

