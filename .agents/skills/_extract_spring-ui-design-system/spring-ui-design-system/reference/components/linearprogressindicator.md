# LinearProgressIndicator

Linear progress bar

## Import

```tsx
import { LinearProgressIndicator } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"slim"`, `"determinate"`, `"label"`, `"details-label"`, `"track"`, `"bar"`, `"details-container"`

### `variant`

**Type**: `"determinate"`

### `slim`

**Type**: `boolean`

Shows a slim and more compact indicator.

**Default**: `false`

### `label`

**Type**: `ReactNode`

The label shown above the progress bar.

### `details`

**Type**: `ReactNode`

The progress details shown below the progress bar (i.e. 0.2mb of 8mb).

**Default**: `false`

### `showPercentage`

**Type**: `boolean`

Shows the current percentage of the indicator. Only applies when `showDetails` is true

**Default**: `false`

### `value`

**Type**: `number`

Sets the value of the indicator.

### `min`

**Type**: `number`

Sets the minimum value of the indicator.. Defaults to `0`

**Default**: `0`

### `max`

**Type**: `number`

Sets the maximum value of the indicator. Used to calculate the current percentage.

### `progressBarProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref" | "role">`

Sets the props that are applied to the `role="progressbar"` element

