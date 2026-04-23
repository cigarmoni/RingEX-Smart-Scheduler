# Tag

Tag label component

## Import

```tsx
import { Tag } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"has-start-icon"`, `"outlined"`, `"label"`, `"start-icon"`, `"default"`, `"neutral"`, `"secondary"`, `"primary"`, `"danger"`, `"success"`, `"warning"`

### `variant`

**Type**: `"outlined" | "inverted" | "filled"`

The variant to use.

**Default**: `'outlined'`

**Options**: `"outlined"`, `"inverted"`, `"filled"`

### `color`

**Type**: `"neutral" | "success" | "danger" | "primary" | "secondary" | "warning" | "default"`

The color of the component.

**Default**: `'default'`

**Options**: `"neutral"`, `"success"`, `"danger"`, `"primary"`, `"secondary"`, `"warning"`, `"default"`

### `startIcon`

**Type**: `ComponentType<any>`

Icon placed before the label.

### `label`

**Type**: `ReactNode`

@deprecated Use "children" instead.

