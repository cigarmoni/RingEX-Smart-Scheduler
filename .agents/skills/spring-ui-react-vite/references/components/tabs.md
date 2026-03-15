# Tabs / Tab / TabPanel / TabContext

```tsx
import { Tabs, Tab, TabPanel, TabContext } from '@ringcentral/spring-ui';
```

## TabContext Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Currently active tab value |
| `children` | `ReactNode` | — | Tabs and TabPanel elements |

## Tabs Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Accessible label for the tab group |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Tab elements |

## Tab Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Tab label text |
| `value` | `string` | — | Tab identifier (matches TabPanel value) |
| `variant` | `'label' \| 'icon' \| 'label-icon'` | `'label'` | Display variant |
| `color` | `string` | — | Tab color |
| `symbol` | `IconSymbol` | — | Icon symbol |
| `disabled` | `boolean` | — | Disabled state |
| `TooltipProps` | `object` | — | Props for tooltip |
| `BadgeProps` | `object` | — | Props for tab badge |
| `title` | `string` | — | Tooltip title |
| `style` | `CSSProperties` | — | Inline styles |
| `action` | `ref` | — | Action ref |
| `onChange` | `(value) => void` | — | Change handler (from TabContext) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## TabPanel Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Matches the active TabContext value to show |
| `keepMounted` | `boolean` | `false` | Keep content in DOM when inactive |
| `id` | `string` | — | Panel ID |
| `children` | `ReactNode` | — | Panel content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { Tabs, Tab, TabPanel, TabContext } from '@ringcentral/spring-ui';
import { useState } from 'react';

function MyTabs() {
  const [value, setValue] = useState('general');

  return (
    <TabContext value={value}>
      <Tabs label="Settings">
        <Tab label="General" value="general" onClick={() => setValue('general')} />
        <Tab label="Security" value="security" onClick={() => setValue('security')} />
        <Tab label="Notifications" value="notifications" onClick={() => setValue('notifications')} />
      </Tabs>
      <TabPanel value="general">
        <div className="p-4">General settings content</div>
      </TabPanel>
      <TabPanel value="security">
        <div className="p-4">Security settings content</div>
      </TabPanel>
      <TabPanel value="notifications">
        <div className="p-4">Notification settings content</div>
      </TabPanel>
    </TabContext>
  );
}
```

## With Icons

```tsx
import { HomeMd, SettingsMd, ProfileMd } from '@ringcentral/spring-icon';

<Tabs label="Navigation">
  <Tab label="Home" symbol={HomeMd} value="home" onClick={() => setValue('home')} />
  <Tab label="Profile" symbol={ProfileMd} value="profile" onClick={() => setValue('profile')} />
  <Tab label="Settings" symbol={SettingsMd} value="settings" onClick={() => setValue('settings')} />
</Tabs>
```

## With Badge

```tsx
<Tab
  label="Messages"
  value="messages"
  BadgeProps={{ count: 5, color: 'primary' }}
  onClick={() => setValue('messages')}
/>
```

## Keep Mounted

```tsx
<TabPanel value="editor" keepMounted>
  {/* Editor state preserved when switching tabs */}
  <CodeEditor />
</TabPanel>
```

## Important Notes

- Wrap everything in `TabContext` with the active `value`
- `Tab` changes are handled via `onClick` on each Tab — set the new value in state
- `TabPanel` renders when its `value` matches the `TabContext` value
- Structure: `TabContext > [Tabs > [Tab, Tab, ...], TabPanel, TabPanel, ...]`
- Do NOT use shadcn's `TabsList`, `TabsTrigger`, `TabsContent` — those don't exist
