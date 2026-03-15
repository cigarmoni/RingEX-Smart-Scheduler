# SortableList / SortableListItem / SortableListDndContext

```tsx
import { SortableList, SortableListItem, SortableListDndContext } from '@ringcentral/spring-ui';
```

## SortableList Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | — | Data array to render |
| `children` | `(item, index) => ReactNode` | — | Render function for each item |

## SortableListItem Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `dragId` | `string \| number` | — | Unique ID for drag operations |
| `children` | `ReactNode` | — | Item content |
| `style` | `CSSProperties` | — | Inline styles |
| `role` | `string` | — | ARIA role |

## SortableListDndContext Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | SortableList elements |

## Basic Usage

```tsx
import { SortableList, SortableListItem, SortableListDndContext, DragHandle } from '@ringcentral/spring-ui';

function ReorderableList({ items, onReorder }) {
  return (
    <SortableListDndContext>
      <SortableList data={items}>
        {(item) => (
          <SortableListItem key={item.id} dragId={item.id}>
            <div className="flex items-center gap-2 p-2 border border-neutral-b4 rounded-sm">
              <DragHandle />
              <span>{item.name}</span>
            </div>
          </SortableListItem>
        )}
      </SortableList>
    </SortableListDndContext>
  );
}
```

## DragHandle

```tsx
import { DragHandle } from '@ringcentral/spring-ui';

<DragHandle />                          {/* Default top anchor */}
<DragHandle anchor="left" />            {/* Left side handle */}
```

### DragHandle Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `anchor` | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'` | Handle position |
| `component` | `ElementType` | `'div'` | Root element type |

## Important Notes

- Wrap everything in `SortableListDndContext` for drag-and-drop to work
- Each `SortableListItem` needs a unique `dragId`
- Include `DragHandle` inside each item for the drag grip
