# StepLabel

Label for step

## Import

```tsx
import { StepLabel } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"current"`, `"error"`, `"current-label"`, `"error-label"`, `"error-label-container"`, `"label"`, `"icon-container"`, `"label-container"`

### `children`

**Type**: `ReactNode`

In most cases will simply be a string containing a title for the label.

### `error`

**Type**: `boolean`

If `true`, the step is marked as failed.

**Default**: `false`

### `icon`

**Type**: `ReactNode`

Override the default label of the step icon.

### `optional`

**Type**: `ReactNode`

The optional node to display.

### `labelProps`

**Type**: `HTMLProps<HTMLSpanElement>`

Props applied to the label element.

**Default**: `{}`

### `StepIconComponent`

**Type**: `ElementType<StepIconProps>`

The component to render in place of the `StepIcon`

### `StepIconProps`

**Type**: `Partial<StepIconProps>`

Props applied to the `StepIcon` element.

