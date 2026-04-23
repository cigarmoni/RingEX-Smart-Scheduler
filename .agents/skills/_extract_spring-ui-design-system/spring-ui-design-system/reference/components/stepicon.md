# StepIcon

Icon for step

## Import

```tsx
import { StepIcon } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"text"`, `"icon"`, `"contained"`, `"outlined"`, `"current"`, `"error"`, `"text-current"`, `"contained-current"`, `"contained-error"`, `"outlined-current"`, `"outlined-error"`

### `active`

**Type**: `boolean`

Whether this step is active.

**Default**: `false`

### `completed`

**Type**: `boolean`

Mark the step as completed. Is passed to child components.

**Default**: `false`

### `error`

**Type**: `boolean`

If `true`, the step is marked as failed.

**Default**: `false`

### `disabled`

**Type**: `boolean`

If `true`, the step is displayed as disabled.

**Default**: `false`

### `icon`

**Type**: `ReactNode`

The label displayed in the step icon.

### `symbol`

**Type**: `ComponentType<{}>`

The symbol displayed in the step icon.

### `variant`

**Type**: `"outlined" | "contained"`

The variant to use.

**Default**: `'contained'`

**Options**: `"outlined"`, `"contained"`

