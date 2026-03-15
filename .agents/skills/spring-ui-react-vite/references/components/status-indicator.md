# StatusIndicator

```tsx
import { StatusIndicator } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'available' \| 'busy' \| 'dnd' \| 'offline' \| 'away'` | `'available'` | Status type |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Indicator size |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<StatusIndicator variant="available" />
<StatusIndicator variant="busy" />
<StatusIndicator variant="dnd" />
<StatusIndicator variant="offline" />
<StatusIndicator variant="away" />
```

## With Avatar

```tsx
<Avatar
  src="/photo.jpg"
  alt="User"
  showStatusIndicator
  IndicatorProps={{ variant: 'available' }}
/>
```

## In User List

```tsx
function UserStatus({ user }) {
  return (
    <div className="flex items-center gap-2">
      <StatusIndicator variant={user.status} size="small" />
      <span>{user.name}</span>
    </div>
  );
}
```
