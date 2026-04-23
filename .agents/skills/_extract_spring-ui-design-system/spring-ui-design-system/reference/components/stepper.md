# Stepper

Step-by-step navigation

## Import

```tsx
import { Stepper } from '@ringcentral/spring-ui';
```

## Props

### `activeStep`

**Type**: `number`

Set the active step (zero based index).
Set to -1 to disable all the steps.

**Default**: `0`

### `children`

**Type**: `ReactNode`

Two or more `<Step />` components.

### `connector`

**Type**: `ReactElement<any, any>`

An element to be placed between each step.

**Default**: `<StepConnector />`

### `nonLinear`

**Type**: `boolean`

If set the `Stepper` will not assist in controlling steps for linear flow.
Root component will be a `ul` element if set to `true` and `ol` if `false`.

**Default**: `false`

### `orientation`

**Type**: `"horizontal" | "vertical"`

The component orientation (layout flow direction).

**Default**: `'horizontal'`

**Options**: `"horizontal"`, `"vertical"`

### `fixedStepWidth`

**Type**: `boolean`

If set to true, each Step will have the same width, collectively taking up the full width of the container.
If set to false, each Step will have its own width based on its content, with even gaps between each Step.
Only works when `orientation` is 'horizontal'.

**Default**: `true`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"horizontal"`, `"vertical"`, `"fixed-step-width"`

### `component`

**Type**: `"ol"`

The component used for the root node.
Either a string to use a HTML element or a component.

