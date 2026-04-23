# MenuList

List container for menu items

## Import

```tsx
import { MenuList } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `widget`

**Type**: `"menu" | "select"`

**Default**: `'menu'`

**Options**: `"menu"`, `"select"`

### `selectMode`

**Type**: `"multiple" | "single"`

The select mode of the menu items.

**Default**: `'single'`

**Options**: `"multiple"`, `"single"`

### `value`

**Type**: `unknown`

The selected value.

### `onChange`

**Type**: `SingleModeOnChange<unknown>`

Callback fired when an option is selected.

### `autoFocus`

**Type**: `boolean`

If true, auto focus to selected item when mounted
auto focus when component mounted

**Default**: `true
true`

### `onClose`

**Type**: `() => void`

Callback fired when the menu should be closed.
Fired when an already selected item is selected again in single select mode.

### `nowrap`

**Type**: `boolean`

When primary text of menu item is longer than one line,
if nowrap is true, text will be truncated,
if false, text will wrap into multiple lines.

**Default**: `true`

