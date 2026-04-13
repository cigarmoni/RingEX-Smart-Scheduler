# Tag

```tsx
import { Tag } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Tag text |
| `variant` | `'contained' \| 'outlined'` | — | Visual style |
| `color` | `'primary' \| 'neutral' \| 'danger' \| 'warning' \| 'success' \| extra colors` | — | Tag color |
| `startIcon` | `ReactNode` | — | Icon before label |
| `title` | `string` | — | Tooltip text |
| `children` | `ReactNode` | — | Alternative to `label` |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Tag label="New" color="primary" />
<Tag label="Urgent" color="danger" />
<Tag label="Completed" color="success" />
<Tag label="In Progress" color="warning" />
```

## Variants

```tsx
<Tag label="Contained" variant="contained" color="primary" />
<Tag label="Outlined" variant="outlined" color="primary" />
```

## With Icon

```tsx
import { StarMd } from '@ringcentral/spring-icon';

<Tag label="Featured" startIcon={StarMd} color="primary" />
```

## Extra Colors

Use the `extra-*` color palette for colorful data labels:

```tsx
<Tag label="Design" color="extra-amethyst" />
<Tag label="Engineering" color="extra-denim" />
<Tag label="Marketing" color="extra-mango" />
<Tag label="Sales" color="extra-tiffany" />
```

## Status Tags Example

```tsx
function StatusTag({ status }) {
  const config = {
    active: { label: 'Active', color: 'success' },
    pending: { label: 'Pending', color: 'warning' },
    inactive: { label: 'Inactive', color: 'neutral' },
    error: { label: 'Error', color: 'danger' },
  };
  const { label, color } = config[status] || config.inactive;
  return <Tag label={label} color={color} variant="contained" />;
}
```

## Difference from Chip and Badge

- **Tag** — Static, non-interactive label. Use for status indicators, categories.
- **Chip** — Interactive, can be clicked or deleted. Use for filters, selections.
- **Badge** — Numeric/dot overlay on another element. Use for notification counts.
