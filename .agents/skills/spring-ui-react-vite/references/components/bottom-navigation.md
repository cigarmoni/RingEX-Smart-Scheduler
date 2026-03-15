# BottomNavigation / BottomNavigationItem

```tsx
import { BottomNavigation, BottomNavigationItem } from '@ringcentral/spring-ui';
```

## BottomNavigation Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Currently selected item value |
| `defaultValue` | `string` | — | Default selected value |
| `data` | `{ visible: Item[], more?: Item[] }` | — | Controlled data (visible + overflow items) |
| `defaultData` | `{ visible: Item[], more?: Item[] }` | — | Default data |
| `onChange` | `(value: string) => void` | — | Selection change handler |
| `renderItem` | `(item) => ReactNode` | — | Custom item renderer |
| `fullWidth` | `boolean` | — | Full width layout |
| `description` | `string` | — | Description text |
| `MoreProps` | `object` | — | Props for the "More" overflow menu |
| `children` | `ReactNode` | — | BottomNavigationItem elements (alternative to data) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## BottomNavigationItem Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Item label text |
| `value` | `string` | — | Item value |
| `symbol` | `IconSymbol` | — | Icon symbol (inactive state) |
| `activatedSymbol` | `IconSymbol` | — | Icon symbol (active state) |
| `selected` | `boolean` | — | Selected state |
| `disabled` | `boolean` | — | Disabled state |
| `onClick` | `() => void` | — | Click handler |

## Basic Usage with Children

```tsx
import { BottomNavigation, BottomNavigationItem } from '@ringcentral/spring-ui';
import { HomeMd, HomeFilledMd, SearchMd, ProfileMd, ProfileFilledMd, SettingsMd, SettingsFilledMd } from '@ringcentral/spring-icon';

function MobileNav({ activeTab, onTabChange }) {
  return (
    <BottomNavigation value={activeTab} onChange={onTabChange}>
      <BottomNavigationItem
        label="Home"
        value="home"
        symbol={HomeMd}
        activatedSymbol={HomeFilledMd}
      />
      <BottomNavigationItem
        label="Search"
        value="search"
        symbol={SearchMd}
      />
      <BottomNavigationItem
        label="Profile"
        value="profile"
        symbol={ProfileMd}
        activatedSymbol={ProfileFilledMd}
      />
      <BottomNavigationItem
        label="Settings"
        value="settings"
        symbol={SettingsMd}
        activatedSymbol={SettingsFilledMd}
      />
    </BottomNavigation>
  );
}
```

## With Data Prop (for overflow handling)

When you have more items than can fit, use the `data` prop with `visible` and `more` arrays. Items in `more` go into an overflow "More" menu:

```tsx
<BottomNavigation
  value={activeTab}
  onChange={onTabChange}
  data={{
    visible: [
      { label: 'Home', value: 'home', symbol: HomeMd },
      { label: 'Search', value: 'search', symbol: SearchMd },
      { label: 'Messages', value: 'messages', symbol: MessageMd },
    ],
    more: [
      { label: 'Settings', value: 'settings', symbol: SettingsMd },
      { label: 'Profile', value: 'profile', symbol: ProfileMd },
    ],
  }}
/>
```

## Important Notes

- BottomNavigation supports both `children` pattern and `data` prop pattern
- The `data` prop enables automatic overflow handling with a "More" button
- Use `symbol` and `activatedSymbol` for icon state changes (unfilled → filled when active)
- Icons are passed as **symbol references** (not JSX elements): `symbol={HomeMd}` not `icon={<HomeMd />}`
- Designed for mobile/responsive layouts — place at the bottom of the viewport
- Max 5 visible items when using overflow, 6 without overflow
