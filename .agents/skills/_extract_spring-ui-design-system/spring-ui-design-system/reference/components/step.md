# Step

Individual step in stepper

## Import

```tsx
import { Step } from '@ringcentral/spring-ui';
```

## Props

### `active`

**Type**: `boolean`

Sets the step as active. Is passed to child components.

### `children`

**Type**: `ReactNode`

Should be `Step` sub-components such as `StepLabel`, `StepContent`.

### `completed`

**Type**: `boolean`

Mark the step as completed. Is passed to child components.

### `disabled`

**Type**: `boolean`

If `true`, the step is disabled, will also disable the button if
`StepButton` is a child of `Step`. Is passed to child components.

### `expanded`

**Type**: `boolean`

Expand the step.

**Default**: `false`

### `index`

**Type**: `number`

The position of the step.
The prop defaults to the value inherited from the parent Stepper component.

### `last`

**Type**: `boolean`

If `true`, the Step is displayed as rendered last.
The prop defaults to the value inherited from the parent Stepper component.

### `variant`

**Type**: `"outlined" | "contained"`

The variant to use.

**Default**: `'contained'`

**Options**: `"outlined"`, `"contained"`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"horizontal"`, `"vertical"`, `"vertical-hide-connector"`, `"completed"`, `"fixed-width"`

### `component`

**Type**: `"li"`

The component used for the root node.
Either a string to use a HTML element or a component.

