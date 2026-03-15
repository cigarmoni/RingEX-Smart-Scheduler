# Chip

```tsx
import { Chip } from '@ringcentral/spring-ui';
```

## Props

Chip extends Button props with additional chip-specific behavior:

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Chip label text |
| `variant` | `'contained' \| 'outlined'` | — | Visual style |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'danger'` | — | Color scheme |
| `size` | `'medium' \| 'small'` | — | Chip size |
| `onDelete` | `() => void` | — | Shows delete icon, called on delete |
| `startIcon` | `ReactNode` | — | Icon before label |
| `disabled` | `boolean` | — | Disabled state |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Chip label="React" />
<Chip label="TypeScript" />
<Chip label="Spring UI" />
```

## Deletable

```tsx
<Chip label="Filter: Active" onDelete={() => removeFilter('active')} />
```

## With Icon

```tsx
import { ProfileMd } from '@ringcentral/spring-icon';

<Chip label="John Doe" startIcon={ProfileMd} />
```

## Variants

```tsx
<Chip label="Contained" variant="contained" />
<Chip label="Outlined" variant="outlined" />
```

## Colors

```tsx
<Chip label="Primary" color="primary" />
<Chip label="Danger" color="danger" />
<Chip label="Neutral" color="neutral" />
```

## Interactive Chip

```tsx
<Chip label="Clickable" onClick={() => handleClick()} />
```

## Filter Chips Example

```tsx
function FilterChips({ filters, onRemove }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Chip
          key={filter.id}
          label={filter.label}
          onDelete={() => onRemove(filter.id)}
          variant="outlined"
        />
      ))}
    </div>
  );
}
```
