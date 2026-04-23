# StepButton

Button for stepper navigation

## Import

```tsx
import { StepButton } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

Can be a `StepLabel` or a node to place inside `StepLabel` as children.

### `icon`

**Type**: `ReactNode`

Override the default label of the step icon in the step label.

### `symbol`

**Type**: `ComponentType<{}>`

The symbol displayed in the step icon.

### `optional`

**Type**: `ReactNode`

The optional node to display.

### `StepLabelProps`

**Type**: `StepLabelProps`

Props applied to the underlying StepLabel component.

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"vertical"`, `"horizontal"`, `"fixed-width"`, `"highlighted"`, `"hide-connector"`

### `component`

**Type**: `"button"`

The component used for the root node.
Either a string to use a HTML element or a component.

