# CallButton

```tsx
import { CallButton } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | — | Button variant (e.g., used for styling start/end call) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

Also accepts all native button attributes via rest props.

## Basic Usage

```tsx
<CallButton variant="start" size="large" onClick={handleStartCall} />
<CallButton variant="end" size="large" onClick={handleEndCall} />
```

## Important Notes

- CallButton is a specialized component for telephony/calling interfaces
- It renders circular action buttons with call-related icons and colors
- The `variant` controls the visual style (green for start, red for end)
- Most applications won't need this — it's specific to communication UIs
