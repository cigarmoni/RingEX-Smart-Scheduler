# Dropdown

```tsx
import { Dropdown } from '@ringcentral/spring-ui';
```

## Props

Dropdown is a utility wrapper that manages open/close state for dropdown patterns.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `(props) => ReactNode` | — | Render function receiving dropdown state |

## Basic Usage

```tsx
import { Dropdown, Button, Menu, MenuItem } from '@ringcentral/spring-ui';

<Dropdown>
  {({ open, handleOpen, handleClose, anchorRef }) => (
    <>
      <Button ref={anchorRef} onClick={handleOpen}>
        Options
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <MenuItem onClick={() => { handleAction(); handleClose(); }}>Action 1</MenuItem>
        <MenuItem onClick={() => { handleAction2(); handleClose(); }}>Action 2</MenuItem>
      </Menu>
    </>
  )}
</Dropdown>
```

## Important Notes

- Dropdown is a headless utility — it provides state management but no UI
- For most dropdown menus, use `Menu` directly with your own `useState` and `useRef`
- Dropdown simplifies the boilerplate of managing open state and anchor refs
