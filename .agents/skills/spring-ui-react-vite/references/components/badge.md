# Badge

```tsx
import { Badge } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | — | Badge count |
| `type` | `'standard' \| 'dot'` | `'standard'` | Badge type |
| `max` | `number` | `999` | Maximum displayed count |
| `size` | `'small' \| 'medium'` | `'small'` | Badge size |
| `color` | `'primary' \| 'danger' \| 'neutral'` | `'primary'` | Badge color |
| `variant` | `'contained' \| 'outlined'` | `'contained'` | Visual style |
| `invisible` | `boolean` | — | Hide the badge |
| `showZero` | `boolean` | — | Show badge when count is 0 |
| `overlap` | `'rectangular' \| 'circular'` | `'rectangular'` | Overlap positioning for child shape |
| `anchorOrigin` | `'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft'` | `'topRight'` | Badge position |
| `forceOverlap` | `boolean` | — | Force overlap positioning |
| `children` | `ReactNode` | — | Element to badge (icon, avatar, etc.) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Badge count={5}>
  <Icon symbol={NotificationsMd} size="medium" />
</Badge>
```

## Dot Badge

```tsx
<Badge type="dot" color="danger">
  <Icon symbol={EmailMd} size="medium" />
</Badge>
```

## Max Count

```tsx
<Badge count={1500} max={99}>
  <Icon symbol={NotificationsMd} size="medium" />
</Badge>
{/* Displays "99+" */}
```

## Colors

```tsx
<Badge count={3} color="primary"><Icon symbol={EmailMd} size="medium" /></Badge>
<Badge count={3} color="danger"><Icon symbol={EmailMd} size="medium" /></Badge>
<Badge count={3} color="neutral"><Icon symbol={EmailMd} size="medium" /></Badge>
```

## With Avatar

```tsx
<Badge count={3} overlap="circular" anchorOrigin="bottomRight">
  <Avatar src="/photo.jpg" alt="User" />
</Badge>
```

## Invisible

```tsx
<Badge count={unreadCount} invisible={unreadCount === 0}>
  <Icon symbol={NotificationsMd} size="medium" />
</Badge>
```

## Important Notes

- Badge is an overlay on its children — it positions relative to the child element
- Use `Tag` for inline text labels (not Badge)
- Use `overlap="circular"` when wrapping round elements like Avatar
