# Alert

```tsx
import { Alert } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `severity` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type/color |
| `onClose` | `() => void` | — | Shows close button, called on dismiss |
| `action` | `ReactNode` | — | Custom action element (replaces close button position) |
| `startSlot` | `ReactNode` | — | Custom content in icon slot |
| `icon` | `ReactNode \| false` | — | Custom icon, or `false` to hide icon |
| `closeText` | `string` | `'close'` | Accessibility text for close button |
| `CloseButtonProps` | `object` | — | Props for the close button |
| `component` | `ElementType` | `'div'` | Root element type |
| `children` | `ReactNode` | — | Alert content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Alert severity="info">This is an informational alert.</Alert>
<Alert severity="success">Operation completed successfully!</Alert>
<Alert severity="warning">Please review before continuing.</Alert>
<Alert severity="error">An error occurred. Please try again.</Alert>
```

## Dismissible

```tsx
<Alert severity="info" onClose={() => setVisible(false)}>
  You have 3 new notifications.
</Alert>
```

## With Action

```tsx
<Alert
  severity="warning"
  action={<Button variant="text" size="small">Undo</Button>}
>
  Item was deleted.
</Alert>
```

## With Custom Icon

```tsx
import { RocketMd } from '@ringcentral/spring-icon';

<Alert severity="info" icon={<Icon symbol={RocketMd} size="medium" />}>
  New feature available!
</Alert>

<Alert severity="info" icon={false}>
  Alert without icon.
</Alert>
```

## Complete Example

```tsx
function StatusBanner({ status }) {
  if (status === 'trial') {
    return (
      <Alert
        severity="info"
        action={
          <Button variant="text" size="small" color="primary">
            Upgrade
          </Button>
        }
      >
        You are on a free trial. 7 days remaining.
      </Alert>
    );
  }
  return null;
}
```
