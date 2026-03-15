# Table / TableContainer / TableHead / TableBody / TableFooter / TableRow / TableCell / TablePagination

```tsx
import {
  Table, TableContainer, TableHead, TableBody, TableFooter,
  TableRow, TableCell, TablePagination
} from '@ringcentral/spring-ui';
```

## TableContainer Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `border` | `boolean` | — | Show border around container |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Table element |

## Table Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `stickyHeader` | `boolean` | — | Sticky table header |
| `stickyFooter` | `boolean` | — | Sticky table footer |
| `columnDivider` | `boolean` | — | Show column dividers |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | TableHead, TableBody, TableFooter |

## TableHead Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `useDefaultBgColor` | `boolean` | — | Apply default background color |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | TableRow elements |

## TableBody Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | TableRow elements |

## TableFooter Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | TableRow elements |

## TableRow Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `hoverable` | `boolean` | — | Show hover state |
| `clickable` | `boolean` | — | Show click cursor |
| `selected` | `boolean` | — | Selected state |
| `role` | `string` | — | ARIA role |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | TableCell elements |

## TableCell Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'head' \| 'body' \| 'footer'` | auto | Cell variant |
| `align` | `'left' \| 'center' \| 'right'` | — | Text alignment |
| `padding` | `'normal' \| 'checkbox' \| 'none'` | — | Cell padding |
| `sortDirection` | `'asc' \| 'desc' \| false` | — | Sort indicator |
| `showSortIndicator` | `boolean` | — | Show sort arrow |
| `initialSortIconDirection` | `'asc' \| 'desc'` | — | Default sort icon direction |
| `scope` | `string` | — | HTML scope attribute |
| `SortIconProps` | `object` | — | Props for sort icon |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Cell content |

## TablePagination Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | — | Total row count |
| `page` | `number` | — | Current page (0-indexed) |
| `rowsPerPage` | `number` | — | Rows per page |
| `onPageChange` | `(event, page) => void` | — | Page change handler |
| `onRowsPerPageChange` | `(event) => void` | — | Rows per page change handler |
| `rowsPerPageOptions` | `number[]` | — | Options for rows per page selector |

## Basic Usage

```tsx
<TableContainer border>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} hoverable>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell align="right">
            <IconButton symbol={EditMd} aria-label="Edit" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

## With Sticky Header

```tsx
<TableContainer border>
  <Table stickyHeader>
    <TableHead useDefaultBgColor>
      <TableRow>
        <TableCell>Column A</TableCell>
        <TableCell>Column B</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* rows */}
    </TableBody>
  </Table>
</TableContainer>
```

## Sortable Columns

```tsx
function SortableTable({ data, sortBy, sortDir, onSort }) {
  return (
    <TableContainer border>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sortDirection={sortBy === 'name' ? sortDir : false}
              showSortIndicator={sortBy === 'name'}
              onClick={() => onSort('name')}
              style={{ cursor: 'pointer' }}
            >
              Name
            </TableCell>
            <TableCell
              sortDirection={sortBy === 'date' ? sortDir : false}
              showSortIndicator={sortBy === 'date'}
              onClick={() => onSort('date')}
              style={{ cursor: 'pointer' }}
            >
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

## With Pagination

```tsx
function PaginatedTable({ data, total }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <TableContainer border>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
            <TableRow key={row.id} hoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell><Tag label={row.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </TableContainer>
  );
}
```

## Selectable Rows

```tsx
<TableRow
  hoverable
  clickable
  selected={selectedIds.includes(row.id)}
  onClick={() => toggleSelection(row.id)}
>
  <TableCell padding="checkbox">
    <Checkbox checked={selectedIds.includes(row.id)} />
  </TableCell>
  <TableCell>{row.name}</TableCell>
</TableRow>
```

## Important Notes

- Always wrap `Table` in `TableContainer`
- Use `hoverable` on TableRow for hover effects
- Sort direction is visual only — implement sort logic yourself
- `TablePagination` sits outside the `<Table>` but inside `<TableContainer>`
