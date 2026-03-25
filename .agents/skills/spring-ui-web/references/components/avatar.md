# Avatar / AvatarGroup

```tsx
import { Avatar, AvatarGroup } from '@ringcentral/spring-ui';
```

## Avatar Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image source URL |
| `srcSet` | `string` | — | Responsive image source set |
| `alt` | `string` | — | Alt text for image |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | — | Avatar size |
| `color` | `'default' \| 'primary' \| string` | `'default'` | Background color |
| `variant` | `'circle' \| 'square'` | `'circle'` | Shape |
| `symbol` | `IconSymbol` | — | Fallback icon when no image |
| `clickable` | `boolean` | — | Shows clickable cursor |
| `disabled` | `boolean` | — | Disabled state |
| `showStatusIndicator` | `boolean` | — | Show status indicator dot |
| `IndicatorProps` | `object` | — | Props for StatusIndicator |
| `imgProps` | `object` | — | Props passed to img element |
| `avatarShapeRef` | `ref` | — | Ref for the avatar shape |
| `rootProps` | `object` | — | Props for root element |
| `component` | `ElementType` | — | Root element type |
| `children` | `ReactNode` | — | Custom content (initials, etc.) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## AvatarGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `component` | `ElementType` | `'div'` | Root element type |
| `children` | `ReactNode` | — | Avatar elements |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

### With Image
```tsx
<Avatar src="/user-photo.jpg" alt="John Doe" />
```

### With Initials
```tsx
<Avatar alt="John Doe">JD</Avatar>
```

### With Fallback Icon
```tsx
import { ProfileMd } from '@ringcentral/spring-icon';

<Avatar symbol={ProfileMd} alt="User" />
```

## Sizes

```tsx
<Avatar src="/photo.jpg" alt="User" size="xsmall" />
<Avatar src="/photo.jpg" alt="User" size="small" />
<Avatar src="/photo.jpg" alt="User" size="medium" />
<Avatar src="/photo.jpg" alt="User" size="large" />
<Avatar src="/photo.jpg" alt="User" size="xlarge" />
```

## Variants

```tsx
<Avatar src="/photo.jpg" alt="User" variant="circle" />
<Avatar src="/photo.jpg" alt="User" variant="square" />
```

## With Status Indicator

```tsx
<Avatar
  src="/photo.jpg"
  alt="John Doe"
  showStatusIndicator
  IndicatorProps={{ variant: 'available' }}
/>
```

## AvatarGroup

```tsx
<AvatarGroup>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar alt="More">+5</Avatar>
</AvatarGroup>
```

## Clickable Avatar

```tsx
<Avatar
  src="/photo.jpg"
  alt="Profile"
  clickable
  onClick={() => navigate('/profile')}
/>
```
