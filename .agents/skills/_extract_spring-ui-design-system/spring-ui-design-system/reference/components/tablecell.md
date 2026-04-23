# TableCell

The component renders a `<th>` element when the parent context is a header
or otherwise a `<td>` element.

## Import

```tsx
import { TableCell } from '@ringcentral/spring-ui';
```

## Props

### `align`

**Type**: `"inherit" | "left" | "right" | "center" | "justify"`

Set the text-align on the table cell content.

Monetary or generally number fields **should be right aligned** as that allows
you to add them up quickly in your head without having to worry about decimals.

**Default**: `'inherit'`

**Options**: `"inherit"`, `"left"`, `"right"`, `"center"`, `"justify"`

### `padding`

**Type**: `"none" | "normal" | "checkbox"`

Sets the padding applied to the cell.

**Options**: `"none"`, `"normal"`, `"checkbox"`

### `scope`

**Type**: `string`

Set scope attribute.

### `sortDirection`

**Type**: `SortDirection`

Set aria-sort direction.

### `initialSortIconDirection`

**Type**: `SortDirection`

Set the initial sort icon direction.

**Default**: `'asc'`

### `showSortIndicator`

**Type**: `boolean`

If `true`, a sortable or non-sortable icon will be shown according to the column's sortable state.

**Default**: `false`

### `SortIconProps`

**Type**: `IconProps`

Props applied to the icon rendered when `sortDirection` is set.

### `variant`

**Type**: `"body" | "footer" | "head"`

Specify the cell type.
The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.

**Options**: `"body"`, `"footer"`, `"head"`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"head"`, `"body"`, `"sortable"`, `"sorted"`, `"footer"`, `"padding-checkbox"`, `"padding-none"`, `"align-left"`, `"align-center"`, `"align-right"`, `"align-justify"`, `"sticky-header-default-bg"`, `"content"`, `"content-padding-checkbox"`, `"content-align-right"`, `"content-align-center"`, `"content-align-justify"`, `"content-sortable"`, `"sort-icon"`, `"sort-icon-sorted"`, `"sort-indicator"`, `"column-divider"`

### `component`

**Type**: `"td"`

The component used for the root node.
Either a string to use a HTML element or a component.

