# SingleFilter

```tsx
import { SingleFilter } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Filter label |
| `value` | `string` | — | Current filter value |
| `selected` | `boolean` | — | Selected/active state |
| `disabled` | `boolean` | — | Disabled state |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Filter content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<SingleFilter
  title="Status"
  value="Active"
  selected={filter === 'active'}
  onClick={() => setFilter('active')}
/>
```

## Filter Bar Example

```tsx
function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'archived', label: 'Archived' },
    { key: 'draft', label: 'Draft' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <SingleFilter
          key={f.key}
          title={f.label}
          selected={activeFilter === f.key}
          onClick={() => onFilterChange(f.key)}
        />
      ))}
    </div>
  );
}
```
