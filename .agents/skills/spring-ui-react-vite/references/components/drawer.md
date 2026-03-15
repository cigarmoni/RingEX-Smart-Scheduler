# Drawer / SwipeableDrawer

```tsx
import { Drawer, SwipeableDrawer } from '@ringcentral/spring-ui';
```

## Drawer Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls drawer visibility |
| `onClose` | `() => void` | — | Called when drawer should close |
| `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Slide direction |
| `variant` | `'temporary' \| 'persistent' \| 'permanent'` | `'temporary'` | Drawer behavior |
| `blocking` | `boolean` | `true` | Block interaction with content behind |
| `header` | `ReactNode` | — | Drawer header content |
| `footer` | `ReactNode` | — | Drawer footer content |
| `headerProps` | `object` | — | Props for header element |
| `bodyProps` | `object` | — | Props for body container |
| `measurementRefs` | `object` | — | Refs for measuring header/footer |
| `children` | `ReactNode` | — | Drawer body content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## SwipeableDrawer Props

Same as Drawer, plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `gestureControlsProps` | `object` | — | Props for swipe gesture handling |

## Variants

### Temporary (default)
Overlays content, dismissed by clicking backdrop.
```tsx
<Drawer open={open} onClose={onClose} anchor="left">
  <nav className="w-64 p-4">Sidebar content</nav>
</Drawer>
```

### Persistent
Pushes content aside, stays open until explicitly closed.
```tsx
<Drawer open={open} onClose={onClose} variant="persistent" anchor="left">
  <nav className="w-64 p-4">Sidebar content</nav>
</Drawer>
```

### Permanent
Always visible, cannot be dismissed.
```tsx
<Drawer open variant="permanent" anchor="left">
  <nav className="w-64 p-4">Always visible sidebar</nav>
</Drawer>
```

## Anchor Positions

```tsx
<Drawer anchor="left" open={open} onClose={onClose}>Left drawer</Drawer>
<Drawer anchor="right" open={open} onClose={onClose}>Right drawer</Drawer>
<Drawer anchor="top" open={open} onClose={onClose}>Top drawer</Drawer>
<Drawer anchor="bottom" open={open} onClose={onClose}>Bottom drawer</Drawer>
```

## With Header and Footer

```tsx
<Drawer
  open={open}
  onClose={onClose}
  anchor="right"
  header={<h2 className="typography-heading-2 p-4">Filters</h2>}
  footer={
    <div className="flex justify-end gap-2 p-4 border-t border-neutral-b4">
      <Button variant="outlined" onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={applyFilters}>Apply</Button>
    </div>
  }
>
  <div className="p-4">
    {/* Filter controls */}
  </div>
</Drawer>
```

## SwipeableDrawer (Mobile)

```tsx
<SwipeableDrawer
  open={open}
  onClose={onClose}
  anchor="bottom"
>
  <div className="p-4">
    Swipeable content for mobile
  </div>
</SwipeableDrawer>
```

## Sidebar Navigation Pattern

```tsx
import { Drawer, ListNavigation } from '@ringcentral/spring-ui';
import { HomeMd, SettingsMd } from '@ringcentral/spring-icon';

function AppSidebar({ open, onClose }) {
  const [location, navigate] = useLocation();

  return (
    <Drawer open={open} onClose={onClose} anchor="left" variant="persistent">
      <div className="w-60 h-full">
        <ListNavigation
          items={[
            { label: 'Home', value: '/', icon: <Icon symbol={HomeMd} size="medium" /> },
            { label: 'Settings', value: '/settings', icon: <Icon symbol={SettingsMd} size="medium" /> },
          ]}
          selectedValue={location}
          onChange={(val) => navigate(val)}
        />
      </div>
    </Drawer>
  );
}
```
