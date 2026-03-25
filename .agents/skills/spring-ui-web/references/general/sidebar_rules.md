# Spring UI Sidebar

## General Rules

- Do NOT use shadcn sidebar components. There is no `SidebarProvider`, `SidebarTrigger`, `SidebarMenu`, `SidebarMenuButton`, or `SidebarMenuItem` in Spring UI.
- Spring UI's ListNavigation is hooks-based — use `useListNavigation` and `useItemNavigation` for keyboard navigation. There is no `<ListNavigation>` component to render.
- Build sidebar navigation with standard elements, `twMerge` for conditional classes, and `Icon` for icons.
- Or use Spring UI's `<Drawer>` for collapsible sidebars.

## Basic Sidebar Setup

```tsx
import { twMerge, Icon } from '@ringcentral/spring-ui';
import { HomeMd, SettingsMd, ProfileMd } from '@ringcentral/spring-icon';
import { useLocation } from 'wouter';

function AppSidebar() {
  const [location, navigate] = useLocation();

  const items = [
    { label: 'Home', value: '/', icon: HomeMd },
    { label: 'Profile', value: '/profile', icon: ProfileMd },
    { label: 'Settings', value: '/settings', icon: SettingsMd },
  ];

  return (
    <nav className="w-60 h-screen border-r border-neutral-b4 p-2" data-testid="sidebar-navigation">
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

## Width Control

Set sidebar width via CSS on the nav container — not via CSS custom properties like `--sidebar-width`:

```tsx
// Good - width on the nav element
<nav className="w-60 h-screen border-r border-neutral-b4 p-2">

// Bad - shadcn-style CSS custom properties
<SidebarProvider style={{ "--sidebar-width": "20rem" }}>
```

## App Layout with Sidebar

```tsx
import { Switch, Route } from 'wouter';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-2 border-b border-neutral-b4">
            <h1 className="text-neutral-b0 font-semibold">My App</h1>
          </header>
          <main className="flex-1 overflow-auto">
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
```

## Collapsible Sidebar with Drawer

For a collapsible sidebar, use Spring UI's `<Drawer>`:

```tsx
import { Drawer, IconButton } from '@ringcentral/spring-ui';
import { MenuMd } from '@ringcentral/spring-icon';
import { useState } from 'react';

function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        <AppSidebar />
      </Drawer>
      <div className="flex flex-col flex-1">
        <header className="flex items-center gap-2 p-2 border-b border-neutral-b4">
          <IconButton symbol={MenuMd} aria-label="Toggle menu" onClick={() => setDrawerOpen(true)} />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
```
