# TableContainer

Scrollable table container

## Import

```tsx
import { TableContainer } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

The content of the component, normally `Table`.

### `border`

**Type**: `"standard" | "none" | "rounded"`

Specify the border type.

**Default**: `'standard'`

**Options**: `"standard"`, `"none"`, `"rounded"`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"standard"`, `"none"`, `"rounded"`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

