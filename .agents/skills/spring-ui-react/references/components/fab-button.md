# FabButton

```tsx
import { FabButton } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `symbol` | `IconSymbol` | — | Icon to display |
| `size` | `'small' \| 'medium' \| 'large'` | — | Button size |
| `onClick` | `() => void` | — | Click handler |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { FabButton } from '@ringcentral/spring-ui';
import { PlusMd } from '@ringcentral/spring-icon';

<FabButton symbol={PlusMd} onClick={handleCreate} />
```

## Floating Action Button Pattern

```tsx
function FloatingAddButton({ onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FabButton
        symbol={PlusMd}
        size="large"
        onClick={onClick}
      />
    </div>
  );
}
```

## Sizes

```tsx
<FabButton symbol={PlusMd} size="small" onClick={onClick} />
<FabButton symbol={PlusMd} size="medium" onClick={onClick} />
<FabButton symbol={PlusMd} size="large" onClick={onClick} />
```

## Important Notes

- FabButton is a circular floating action button — typically positioned fixed in a corner
- Use for the primary action on a page (e.g., "Create new", "Compose")
- Always position with `fixed` or `absolute` and appropriate `z-index`
