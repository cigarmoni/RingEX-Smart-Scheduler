# ListItemText

Text content for list items

## Import

```tsx
import { ListItemText } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"primary"`, `"secondary"`, `"primary-text"`, `"secondary-text"`

### `primaryText`

**Type**: `ReactNode`

The primary content element. This is used in the same way as the `children` prop.
@deprecated Use the `primary` prop instead.

### `primary`

**Type**: `ReactNode`

The primary content element. This is used in the same way as the `children` prop.

### `children`

**Type**: `ReactNode`

The primary content element. This is used in the same way as the `primary` prop.

### `secondaryText`

**Type**: `ReactNode`

The secondary content element.
@deprecated Use the `secondary` prop instead.

### `secondary`

**Type**: `ReactNode`

The secondary content element.

### `variant`

**Type**: `"primary" | "secondary"`

The variant of the component. When the variant is `secondary`, only the `primary` prop is supported.

**Default**: `primary`

**Options**: `"primary"`, `"secondary"`

