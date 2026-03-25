# Snackbar

```tsx
import { Snackbar } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility |
| `onClose` | `() => void` | — | Close callback |
| `message` | `string \| ReactNode` | — | Snackbar message |
| `severity` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Message type/color |
| `autoHideDuration` | `number` | — | Auto-dismiss time in ms |
| `action` | `ReactNode` | — | Action element (button, link) |
| `anchorOrigin` | `{ vertical, horizontal }` | — | Position on screen |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { Snackbar, Button } from '@ringcentral/spring-ui';
import { useState } from 'react';

function MyComponent() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'neutral' });

  const showSnackbar = (message, severity = 'neutral') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <>
      <Button onClick={() => showSnackbar('Item saved!', 'success')}>Save</Button>
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={4000}
      />
    </>
  );
}
```

## Severity Variants

```tsx
<Snackbar open severity="success" message="Operation completed!" />
<Snackbar open severity="error" message="Something went wrong." />
<Snackbar open severity="warning" message="Please check your input." />
<Snackbar open severity="info" message="New update available." />
<Snackbar open severity="neutral" message="Notification." />
```

## With Action

```tsx
<Snackbar
  open={open}
  onClose={onClose}
  message="Item deleted"
  severity="neutral"
  action={
    <Button variant="text" size="small" onClick={handleUndo}>
      Undo
    </Button>
  }
  autoHideDuration={6000}
/>
```

## Toast Manager Pattern

```tsx
import { Snackbar } from '@ringcentral/spring-ui';
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'neutral' });

  const showToast = useCallback((message, severity = 'neutral') => {
    setToast({ open: true, message, severity });
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        autoHideDuration={4000}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
```

Usage:
```tsx
function SaveButton() {
  const showToast = useToast();

  const handleSave = async () => {
    try {
      await save();
      showToast('Saved successfully!', 'success');
    } catch {
      showToast('Failed to save.', 'error');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## Important Notes

- Snackbar replaces shadcn `useToast` and Sonner
- Use `severity` for different toast types — not separate `variant` or `type` props
- Always provide `autoHideDuration` for auto-dismiss behavior
- Use a context-based toast manager for app-wide access
