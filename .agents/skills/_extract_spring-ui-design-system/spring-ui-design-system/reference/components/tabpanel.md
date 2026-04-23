# TabPanel

Content panel for tabs

## Import

```tsx
import { TabPanel } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `children`

**Type**: `ReactNode`

The content of the component.

### `value`

**Type**: `string | number`

The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.

### `keepMounted`

**Type**: `boolean`

false: will unmount children whenever hidden
true: keep displayed children mounted when hidden

