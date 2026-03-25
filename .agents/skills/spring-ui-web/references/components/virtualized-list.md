# VirtualizedList / VirtualizedMenu

```tsx
import { VirtualizedList, VirtualizedMenu } from '@ringcentral/spring-ui';
```

## VirtualizedList Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | List items |
| `context` | `object` | — | Context passed to items |
| `style` | `CSSProperties` | — | Container styles |

## VirtualizedMenu Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Menu items |
| `actions` | `ref` | — | Imperative actions |
| `initialFocus` | `number` | — | Initial focused index |
| `totalListHeightChanged` | `(height: number) => void` | — | Height change callback |

## Usage

VirtualizedList is built on `react-virtuoso` and is used for rendering large lists efficiently:

```tsx
import { VirtualizedList } from '@ringcentral/spring-ui';

<VirtualizedList style={{ height: 400 }}>
  {items.map((item) => (
    <div key={item.id} className="p-2 border-b border-neutral-b4">
      {item.name}
    </div>
  ))}
</VirtualizedList>
```

## VirtualizedMenu Usage

For large dropdown menus with many options:

```tsx
<Select virtualize VirtualizedMenuProps={{ style: { height: 300 } }}>
  {options.map((opt) => (
    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
  ))}
</Select>
```

## Important Notes

- Requires `react-virtuoso` as a peer dependency (included in Spring UI's peers)
- Use for lists with 100+ items where rendering all items hurts performance
- For most lists under 100 items, standard rendering is fine
- VirtualizedMenu integrates with Select's `virtualize` prop
