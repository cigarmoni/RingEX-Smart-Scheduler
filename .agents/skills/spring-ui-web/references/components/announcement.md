# Announcement

```tsx
import { Announcement } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `severity` | `'info' \| 'success' \| 'warning' \| 'error'` | — | Announcement type/color |
| `startSlot` | `ReactNode` | — | Custom content in leading slot |
| `CloseButtonProps` | `object` | — | Props for close button |
| `children` | `ReactNode` | — | Announcement content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Usage

Announcement is a banner-style notification, typically used at the top of a page for system-wide messages.

```tsx
<Announcement severity="info">
  System maintenance scheduled for tonight at 10 PM.
</Announcement>

<Announcement severity="warning">
  Your subscription expires in 3 days.
</Announcement>

<Announcement severity="error">
  Service disruption detected. Our team is investigating.
</Announcement>
```

## Difference from Alert

- `Alert` is inline, used within page content
- `Announcement` is a page-level banner, typically full-width at the top of the viewport
