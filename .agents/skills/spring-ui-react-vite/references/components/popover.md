# Popover

```tsx
import { Popover } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `anchorEl` | `Element \| null` | — | Element to anchor to |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'bottom-start' \| etc.` | — | Position relative to anchor |
| `bordered` | `boolean` | `false` | Show border |
| `shadow` | `boolean` | `true` | Show shadow |
| `transformOrigin` | `object` | — | Animation origin point |
| `motionProps` | `object` | — | Framer-motion animation props |
| `popperRef` | `ref` | — | Ref for the Popper |
| `actions` | `ref` | — | Imperative actions ref |
| `onAvailableHeightChange` | `(height: number) => void` | — | Callback when available height changes |
| `PopperProps` | `object` | — | Props for the underlying Popper |
| `PopperPaperProps` | `object` | — | Props for the paper container |
| `children` | `ReactNode` | — | Popover content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { Popover, Button } from '@ringcentral/spring-ui';
import { useState, useRef } from 'react';

function MyPopover() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <>
      <Button ref={anchorRef} onClick={() => setOpen(!open)}>
        Open Popover
      </Button>
      {open && (
        <Popover anchorEl={anchorRef.current} placement="bottom-start">
          <div className="p-4">
            <h3 className="typography-heading-3 mb-2">Popover Content</h3>
            <p className="text-neutral-b2">Some descriptive text here.</p>
          </div>
        </Popover>
      )}
    </>
  );
}
```

## Bordered

```tsx
<Popover anchorEl={anchorEl} bordered>
  <div className="p-4">Bordered popover content</div>
</Popover>
```

## Placement Options

```tsx
<Popover anchorEl={anchorEl} placement="top">Above</Popover>
<Popover anchorEl={anchorEl} placement="bottom">Below</Popover>
<Popover anchorEl={anchorEl} placement="left">Left</Popover>
<Popover anchorEl={anchorEl} placement="right">Right</Popover>
<Popover anchorEl={anchorEl} placement="bottom-start">Below, aligned start</Popover>
<Popover anchorEl={anchorEl} placement="bottom-end">Below, aligned end</Popover>
```

## Important Notes

- Popover is a single component — no `PopoverTrigger`, `PopoverContent` sub-components
- You control open/close state yourself and conditionally render Popover
- For dropdown menus, prefer `Menu` instead — it handles keyboard navigation and focus management
