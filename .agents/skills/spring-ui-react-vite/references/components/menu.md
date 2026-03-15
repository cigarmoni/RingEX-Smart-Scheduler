# Menu / MenuItem / MenuList / MenuHeader / MenuFooter / MenuActions / MenuDivider / SubMenu

```tsx
import {
  Menu, MenuItem, MenuList, MenuHeader, MenuFooter,
  MenuActions, MenuDivider, SubMenu
} from '@ringcentral/spring-ui';
```

## Menu Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Controls menu visibility |
| `onClose` | `() => void` | — | Called when menu should close |
| `anchorEl` | `Element \| null` | — | Element to anchor the menu to |
| `autoFocus` | `boolean` | `true` | Auto-focus first item |
| `PopperProps` | `object` | — | Props for the Popper positioning |
| `children` | `ReactNode` | — | MenuItem elements |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## MenuItem Props

MenuItem accepts standard HTML props plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | — | Disabled state |
| `selected` | `boolean` | — | Selected state |
| `startIcon` | `ReactNode` | — | Icon before label |
| `endIcon` | `ReactNode` | — | Icon after label |

## MenuList Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `value` | `string \| string[]` | — | Selected value(s) |
| `onChange` | `(value) => void` | — | Selection change handler |
| `nowrap` | `boolean` | — | Prevent text wrapping |
| `widget` | `string` | — | Widget type |
| `autoFocus` | `boolean` | — | Auto-focus first item |
| `children` | `ReactNode` | — | MenuItem elements |

## MenuHeader Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `start` | `ReactNode` | — | Leading content |
| `end` | `ReactNode` | — | Trailing content |
| `divider` | `boolean` | `true` | Show bottom divider |
| `children` | `ReactNode` | — | Header content |

## MenuFooter Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `divider` | `boolean` | `true` | Show top divider |
| `children` | `ReactNode` | — | Footer content |

## MenuActions Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Action elements |

## SubMenu Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Nested menu items |
| `actions` | `ref` | — | Imperative actions |

## Basic Usage

```tsx
import { Menu, MenuItem, IconButton } from '@ringcentral/spring-ui';
import { OverflowVerticalMd, EditMd, TrashMd, CopyMd } from '@ringcentral/spring-icon';
import { useState, useRef } from 'react';

function ActionsMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        aria-label="More actions"
        symbol={OverflowVerticalMd}
      />
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        <MenuItem onClick={() => { handleEdit(); setOpen(false); }}>
          <Icon symbol={EditMd} size="small" /> Edit
        </MenuItem>
        <MenuItem onClick={() => { handleCopy(); setOpen(false); }}>
          <Icon symbol={CopyMd} size="small" /> Duplicate
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => { handleDelete(); setOpen(false); }}>
          <Icon symbol={TrashMd} size="small" /> Delete
        </MenuItem>
      </Menu>
    </>
  );
}
```

## With Header and Footer

```tsx
<Menu open={open} onClose={onClose} anchorEl={anchorEl}>
  <MenuHeader>Sort By</MenuHeader>
  <MenuItem onClick={() => sort('name')}>Name</MenuItem>
  <MenuItem onClick={() => sort('date')}>Date</MenuItem>
  <MenuItem onClick={() => sort('size')}>Size</MenuItem>
  <MenuFooter>
    <Button variant="text" size="small" onClick={resetSort}>Reset</Button>
  </MenuFooter>
</Menu>
```

## With Selection

```tsx
<Menu open={open} onClose={onClose} anchorEl={anchorEl}>
  <MenuList selectMode="single" value={sortBy} onChange={setSortBy}>
    <MenuItem value="name">Name</MenuItem>
    <MenuItem value="date">Date</MenuItem>
    <MenuItem value="size">Size</MenuItem>
  </MenuList>
</Menu>
```

## With SubMenu

```tsx
<Menu open={open} onClose={onClose} anchorEl={anchorEl}>
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem>Paste</MenuItem>
  <MenuDivider />
  <SubMenu>
    <MenuItem>Share via Email</MenuItem>
    <MenuItem>Share via Link</MenuItem>
    <MenuItem>Share via Teams</MenuItem>
  </SubMenu>
</Menu>
```

## Context Menu Pattern

```tsx
function ContextMenu() {
  const [contextMenu, setContextMenu] = useState({ open: false, x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ open: true, x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <p>Right-click for context menu</p>
      <Menu
        open={contextMenu.open}
        onClose={() => setContextMenu({ ...contextMenu, open: false })}
        anchorEl={{ getBoundingClientRect: () => ({ top: contextMenu.y, left: contextMenu.x, bottom: contextMenu.y, right: contextMenu.x, width: 0, height: 0 }) }}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );
}
```
