# Block / BlockHeader

```tsx
import { Block, BlockHeader } from '@ringcentral/spring-ui';
```

## Block Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `row` | `boolean` | `false` | Horizontal layout (flex-direction: row) |
| `padding` | `boolean` | `true` | Enable internal padding |
| `bordered` | `boolean` | `true` | Show border |
| `borderRadius` | `'none' \| 'xsmall' \| 'small' \| 'medium'` | `'medium'` | Border radius size |
| `color` | `'default' \| 'neutral'` | `'default'` | Background color variant |
| `background` | `boolean` | `true` | Show background color |
| `component` | `ElementType` | `'div'` | Root element type |
| `children` | `ReactNode` | — | Block content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## BlockHeader Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `endSlot` | `ReactNode` | — | Right-side content (buttons, etc.) |
| `divider` | `boolean` | — | Show bottom divider |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Header title/content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage (Card replacement)

```tsx
<Block bordered borderRadius="medium">
  <BlockHeader endSlot={<IconButton symbol={OverflowMd} aria-label="More" />}>
    Card Title
  </BlockHeader>
  <p className="text-neutral-b2">Card content goes here.</p>
</Block>
```

## Without Padding

```tsx
<Block bordered padding={false}>
  <img src="/banner.jpg" alt="Banner" className="w-full" />
  <div className="p-4">
    <p>Content with custom padding</p>
  </div>
</Block>
```

## With Neutral Background

```tsx
<Block bordered borderRadius="medium" color="neutral">
  <h3 className="typography-heading-3 mb-2">Statistics</h3>
  <div className="grid grid-cols-3 gap-4">
    <div>
      <p className="text-neutral-b2 text-sm">Users</p>
      <p className="typography-heading-1">1,234</p>
    </div>
    <div>
      <p className="text-neutral-b2 text-sm">Revenue</p>
      <p className="typography-heading-1">$45.6K</p>
    </div>
    <div>
      <p className="text-neutral-b2 text-sm">Growth</p>
      <p className="typography-heading-1">+12%</p>
    </div>
  </div>
</Block>
```

## Horizontal Layout

```tsx
<Block row bordered borderRadius="medium">
  <Avatar src="/photo.jpg" alt="User" />
  <div>
    <p className="text-neutral-b0">John Doe</p>
    <p className="text-neutral-b2 text-sm">john@example.com</p>
  </div>
</Block>
```

## With BlockHeader Actions

```tsx
<Block bordered borderRadius="medium">
  <BlockHeader
    divider
    endSlot={
      <div className="flex gap-1">
        <Button variant="text" size="small">Edit</Button>
        <Button variant="text" size="small" color="danger">Delete</Button>
      </div>
    }
  >
    Project Settings
  </BlockHeader>
  <div className="pt-4">
    Settings content...
  </div>
</Block>
```

## No Background / Border

```tsx
<Block bordered={false} background={false}>
  <p>Content without any container styling</p>
</Block>
```

## Important Notes

- Block replaces shadcn's Card component
- `padding` is a boolean (on/off), not a size value — use additional Tailwind padding classes if you need specific sizing
- `borderRadius` values are `none`, `xsmall`, `small`, `medium` — there is no `large`
- Default state is: `bordered={true}`, `padding={true}`, `background={true}`, `borderRadius="medium"`
