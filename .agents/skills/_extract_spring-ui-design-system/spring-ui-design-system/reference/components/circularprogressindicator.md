# CircularProgressIndicator

Circular loading spinner

## Import

```tsx
import { CircularProgressIndicator } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"outer-circle"`, `"progress-circle"`, `"inner-circle"`, `"indeterminate"`, `"determinate"`, `"xlarge"`, `"large"`, `"medium"`, `"small"`, `"xsmall"`, `"primary"`, `"neutral"`, `"danger"`, `"success"`, `"warning"`

### `variant`

**Type**: `"indeterminate" | "determinate"`

The variant of the indicator.

**Default**: `indeterminate`

**Options**: `"indeterminate"`, `"determinate"`

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall"`

Sets the size of the indicator.

**Default**: `large`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`

### `color`

**Type**: `"neutral" | "success" | "danger" | "primary" | "warning"`

Sets the color of the indicator.

**Default**: `primary`

**Options**: `"neutral"`, `"success"`, `"danger"`, `"primary"`, `"warning"`

### `value`

**Type**: `number`

Sets the value of the indicator.
Only applies to variant `determinate`

### `progressBarProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref" | "role">`

Sets the props that are applied to the `role="progressbar"` element

