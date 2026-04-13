# Popper

```tsx
import { Popper } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `anchorEl` | `Element \| null` | — | Element to position relative to |
| `placement` | `Placement` | — | Floating UI placement string |
| `middlewares` | `Middleware[]` | — | Floating UI middleware array |
| `offset` | `number \| [number, number]` | — | Offset from anchor |
| `padding` | `number` | — | Padding for flip/shift |
| `arrowHeight` | `number` | — | Arrow height for offset calculation |
| `arrowPadding` | `number` | — | Arrow padding |
| `autoUpdate` | `boolean \| AutoUpdateOptions` | — | Auto-update position on scroll/resize |
| `whileElementsMounted` | `function` | — | Floating UI lifecycle |
| `matchAnchorWidth` | `boolean` | — | Match the anchor element width |
| `container` | `Element` | — | Portal container |
| `disablePortal` | `boolean` | — | Render in-place (no portal) |
| `style` | `CSSProperties` | — | Inline styles |
| `actions` | `ref` | — | Imperative actions |
| `children` | `ReactNode \| (props) => ReactNode` | — | Content or render function |

## Usage

Popper is a low-level positioning primitive built on Floating UI. Most of the time you'll use higher-level components like `Tooltip`, `Popover`, or `Menu` instead.

```tsx
<Popper anchorEl={anchorRef.current} placement="bottom">
  <div className="bg-neutral-base shadow-md rounded-sm p-2">
    Positioned content
  </div>
</Popper>
```

## With Offset

```tsx
<Popper anchorEl={anchorEl} placement="bottom" offset={8}>
  <div>Offset by 8px from anchor</div>
</Popper>
```

## Match Anchor Width

```tsx
<Popper anchorEl={anchorEl} matchAnchorWidth>
  <div>Same width as anchor element</div>
</Popper>
```

## Important Notes

- Popper renders via a React portal by default (can be disabled with `disablePortal`)
- Uses `@floating-ui/react-dom` under the hood
- Prefer `Popover`, `Tooltip`, or `Menu` for most use cases
