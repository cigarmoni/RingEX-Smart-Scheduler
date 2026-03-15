# ListNavigation (Hooks)

```tsx
import { useListNavigation, useItemNavigation, ListNavigationContext } from '@ringcentral/spring-ui';
```

## Overview

ListNavigation is a **hooks-based** system for building keyboard-navigable lists and sidebar navigation. There is no `<ListNavigation>` component — you build navigation UIs using `List`, `ListItem`, and these hooks.

## useListNavigation

Provides keyboard navigation (arrow keys, Home, End) for a list container.

```tsx
import { useListNavigation } from '@ringcentral/spring-ui';

const listNav = useListNavigation({
  preventContainerScroll: true,
});
```

## useItemNavigation

Used on individual items within a navigable list. Provides Tab/Shift+Tab handling and focus management.

```tsx
import { useItemNavigation } from '@ringcentral/spring-ui';

function NavItem({ label, value, selected, onClick }) {
  const { keyboardNavHandlers } = useItemNavigation();

  return (
    <div
      {...keyboardNavHandlers}
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={twMerge(
        'flex items-center gap-2 p-2 rounded-sm cursor-pointer',
        selected ? 'bg-primary-b text-primary-f' : 'hover:bg-neutral-b5'
      )}
    >
      {label}
    </div>
  );
}
```

## Sidebar Navigation Pattern

Build sidebar navigation using `List`, `ListItem`, or plain divs with navigation hooks:

```tsx
import { twMerge } from '@ringcentral/spring-ui';
import { HomeMd, SettingsMd, ProfileMd, AnalyticsMd } from '@ringcentral/spring-icon';
import { Icon } from '@ringcentral/spring-ui';
import { useLocation } from 'wouter';

function Sidebar() {
  const [location, navigate] = useLocation();

  const items = [
    { label: 'Home', value: '/', icon: HomeMd },
    { label: 'Analytics', value: '/analytics', icon: AnalyticsMd },
    { label: 'Profile', value: '/profile', icon: ProfileMd },
    { label: 'Settings', value: '/settings', icon: SettingsMd },
  ];

  return (
    <nav className="w-60 h-full border-r border-neutral-b4 p-2">
      <div className="flex flex-col gap-1" role="listbox">
        {items.map((item) => (
          <div
            key={item.value}
            role="option"
            aria-selected={location === item.value}
            onClick={() => navigate(item.value)}
            className={twMerge(
              'flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer transition-colors',
              location === item.value
                ? 'bg-primary-t10 text-primary-b'
                : 'text-neutral-b1 hover:bg-neutral-b5'
            )}
          >
            <Icon symbol={item.icon} size="medium" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
```

## With Badge

```tsx
import { Badge, Icon, twMerge } from '@ringcentral/spring-ui';
import { InboxMd, SendMd, EditMd } from '@ringcentral/spring-icon';

function MailSidebar() {
  const [location, navigate] = useLocation();

  const items = [
    { label: 'Inbox', value: '/inbox', icon: InboxMd, badge: 3 },
    { label: 'Sent', value: '/sent', icon: SendMd },
    { label: 'Drafts', value: '/drafts', icon: EditMd, badge: 1 },
  ];

  return (
    <nav className="w-60 p-2">
      {items.map((item) => (
        <div
          key={item.value}
          onClick={() => navigate(item.value)}
          className={twMerge(
            'flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer',
            location === item.value
              ? 'bg-primary-t10 text-primary-b'
              : 'text-neutral-b1 hover:bg-neutral-b5'
          )}
        >
          <div className="flex items-center gap-3">
            <Icon symbol={item.icon} size="medium" />
            <span>{item.label}</span>
          </div>
          {item.badge > 0 && <Badge count={item.badge} size="small" />}
        </div>
      ))}
    </nav>
  );
}
```

## With Nested Items

```tsx
function NestedNav() {
  const [location, navigate] = useLocation();
  const [expanded, setExpanded] = useState({ settings: false });

  return (
    <nav className="w-60 p-2 flex flex-col gap-1">
      <NavItem
        icon={HomeMd}
        label="Dashboard"
        active={location === '/'}
        onClick={() => navigate('/')}
      />
      <div>
        <NavItem
          icon={SettingsMd}
          label="Settings"
          active={location.startsWith('/settings')}
          onClick={() => setExpanded(e => ({ ...e, settings: !e.settings }))}
          endIcon={<Icon symbol={expanded.settings ? CaretUpMd : CaretDownMd} size="small" />}
        />
        {expanded.settings && (
          <div className="ml-8 flex flex-col gap-1 mt-1">
            <NavItem label="General" active={location === '/settings/general'} onClick={() => navigate('/settings/general')} />
            <NavItem label="Security" active={location === '/settings/security'} onClick={() => navigate('/settings/security')} />
          </div>
        )}
      </div>
    </nav>
  );
}
```

## Important Notes

- There is no `<ListNavigation>` component — navigation is built with hooks + standard elements
- Use `twMerge` from Spring UI for conditional class merging
- Use `Icon` component with `symbol` prop for icons in navigation items
- For sidebar navigation, use `wouter`'s `useLocation` for route-based active states
- Do NOT use shadcn's `SidebarProvider`/`SidebarMenu` — those don't exist
- Set width via CSS on the container
