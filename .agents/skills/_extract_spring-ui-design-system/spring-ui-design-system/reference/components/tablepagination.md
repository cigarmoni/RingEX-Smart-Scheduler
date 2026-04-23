# TablePagination

Pagination controls for tables

## Import

```tsx
import { TablePagination } from '@ringcentral/spring-ui';
```

## Props

### `variant`

**Type**: `"range" | "select-page" | "page-size"`

The variant to use.
`range` displays the current range of rows shown with no page size controls.
`page` displays the current page with a control to select which page to show.
`page-size` displays the current page with a control to change the page size.

**Default**: `'range'`

**Options**: `"range"`, `"select-page"`, `"page-size"`

### `page`

**Type**: `number`

The zero-based index of the current page.

### `count`

**Type**: `number`

The total number of rows.

**Default**: `-1`

### `rowsPerPage`

**Type**: `number`

The total number of rows to show per page.

**Default**: `10`

### `rowsPerPageLabel`

**Type**: `string`

The label to show to the left of the page size control that sets the number of rows per page.
Only applies to variant `page-size`

**Default**: `'Rows per page'`

### `rowsPerPageOptions`

**Type**: `number[]`

The options to be shown in the Select input for the number of rows to show per page.
Required for variants `page-size` and `select-page`

**Default**: `'[10, 25, 50, 100]'`

### `onRowsPerPageChange`

**Type**: `(e: ChangeEvent<HTMLInputElement>, child: ReactNode) => void`

Callback fires when the number of rows to show per page is changed.
Required for variants `page-size` and `select-page`

### `rangeSeparatorLabel`

**Type**: `string`

The label to use to separate the range of rows shown or page numbers.
Used in `range` variant: `1-10 ${rangeSeparatorLabel} 147`
Used in `select-page` variant: `1 ${rangeSeparatorLabel} 15`

**Default**: `'of'`

### `previousPageButtonProps`

**Type**: `IconButtonProps<"button">`

Props applied to the `IconButton` component for the previous page button.

### `nextPageButtonProps`

**Type**: `IconButtonProps<"button">`

Props applied to the `IconButton` component for the next page button.

### `onPageChange`

**Type**: `(e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void`

Callback fired when the current page is changed.

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"content"`, `"range-container"`, `"rows-per-page-controls"`, `"rows-per-page-label"`, `"range-label"`, `"current-page-controls"`

### `component`

**Type**: `"td"`

The component used for the root node.
Either a string to use a HTML element or a component.

