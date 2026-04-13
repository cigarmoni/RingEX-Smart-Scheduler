# Skeleton

```tsx
import { Skeleton } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | — | Shape variant |
| `width` | `number \| string` | — | Width |
| `height` | `number \| string` | — | Height |
| `children` | `ReactNode` | — | Content to replace when loaded |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={200} />
<Skeleton variant="rounded" width="100%" height={60} />
```

## Loading State Pattern

```tsx
function UserCard({ user, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex gap-3 items-center">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex flex-col gap-1">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={180} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      <Avatar src={user.avatar} alt={user.name} />
      <div>
        <p className="text-neutral-b0">{user.name}</p>
        <p className="text-neutral-b2 text-sm">{user.email}</p>
      </div>
    </div>
  );
}
```

## Table Skeleton

```tsx
function TableSkeleton({ rows = 5 }) {
  return (
    <TableContainer border>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Skeleton variant="text" width={80} /></TableCell>
            <TableCell><Skeleton variant="text" width={120} /></TableCell>
            <TableCell><Skeleton variant="text" width={60} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" width={60} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```
