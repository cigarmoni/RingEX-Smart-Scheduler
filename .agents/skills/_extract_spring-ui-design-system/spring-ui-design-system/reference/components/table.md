# Table

Data table component

## Import

```tsx
import { Table } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

The content of the table, normally `TableHead` and `TableBody`.

### `stickyHeader`

**Type**: `boolean`

Set the header sticky.

⚠️ It doesn't work with IE11.

**Default**: `false`

### `stickyFooter`

**Type**: `boolean`

Set the footer sticky.

⚠️ It doesn't work with IE11.

**Default**: `false`

### `columnDivider`

**Type**: `boolean`

Show vertical dividers between columns.

**Default**: `false`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"sticky-header"`, `"sticky-footer"`

### `component`

**Type**: `"table"`

The component used for the root node.
Either a string to use a HTML element or a component.

