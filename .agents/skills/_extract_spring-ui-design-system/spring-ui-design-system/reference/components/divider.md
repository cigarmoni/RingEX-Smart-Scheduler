# Divider

Visual separator line

## Import

```tsx
import { Divider } from '@ringcentral/spring-ui';
```

## Props

### `variant`

**Type**: `"full" | "middle"`

**Default**: `'full'`

**Options**: `"full"`, `"middle"`

### `orientation`

**Type**: `"horizontal" | "vertical"`

**Default**: `'horizontal'`

**Options**: `"horizontal"`, `"vertical"`

### `title`

**Type**: `string`

The title of the Divider. Only used for horizontal Dividers.
Make sure to pass an `after:bg-color` className.

### `flexItem`

**Type**: `boolean`

If true, a vertical divider will have the correct height when used in flex container.
(By default, a vertical divider will have a calculated height of 0px
if it is the child of a flex container.)

**Default**: `false`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"flex-item"`, `"has-title"`, `"full"`, `"middle"`, `"horizontal"`, `"vertical"`

### `component`

**Type**: `"hr"`

The component used for the root node.
Either a string to use a HTML element or a component.

