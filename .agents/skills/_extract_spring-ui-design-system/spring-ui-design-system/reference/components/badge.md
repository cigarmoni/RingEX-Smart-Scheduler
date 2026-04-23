# Badge

Badge indicator

## Import

```tsx
import { Badge } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"absolute"`, `"standard"`, `"dot"`, `"content"`, `"contained"`, `"outlined"`, `"danger"`, `"primary"`, `"success"`, `"warning"`, `"secondary"`, `"small"`, `"medium"`, `"rectangular"`, `"circular"`

### `variant`

**Type**: `"outlined" | "contained"`

The variant to use.

**Default**: `'contained'`

**Options**: `"outlined"`, `"contained"`

### `type`

**Type**: `"standard" | "dot"`

The count type to use.

**Default**: `'standard'`

**Options**: `"standard"`, `"dot"`

### `count`

**Type**: `string | number`

The integer to display. Undefined count with dot type can be used to show a dot.

### `color`

**Type**: `"success" | "danger" | "primary" | "secondary" | "warning"`

The color of the component.

**Default**: `'primary'`

**Options**: `"success"`, `"danger"`, `"primary"`, `"secondary"`, `"warning"`

### `size`

**Type**: `"small" | "medium"`

The size of the component.

**Default**: `'small'`

**Options**: `"small"`, `"medium"`

### `overlap`

**Type**: `"circular" | "rectangular"`

Wrapped shape the badge should overlap.
Note: Automatically take effect when there are child elements.

**Default**: `'rectangular'`

**Options**: `"circular"`, `"rectangular"`

### `forceOverlap`

**Type**: `boolean`

Use the overlap position when there are no child elements.
Note: If true, please give the parent element a position relative or absolute to make the badge work.

**Default**: `false`

### `anchorOrigin`

**Type**: `"topLeft" | "topRight" | "bottomLeft" | "bottomRight"`

The anchor of the badge.

**Default**: `'topRight'`

**Options**: `"topLeft"`, `"topRight"`, `"bottomLeft"`, `"bottomRight"`

### `max`

**Type**: `number`

Max count to show.

**Default**: `99`

### `invisible`

**Type**: `boolean`

If `true`, the badge is invisible.

**Default**: `false`

### `showZero`

**Type**: `boolean`

Controls whether the badge is hidden when `badgeContent` is zero.

**Default**: `false`

