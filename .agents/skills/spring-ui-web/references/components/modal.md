# Modal

```tsx
import { Modal } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls modal visibility |
| `onClose` | `() => void` | — | Close callback |
| `hideBackdrop` | `boolean` | — | Hide backdrop overlay |
| `blocking` | `boolean` | — | Block interaction with content behind |
| `disableBackdropClick` | `boolean` | — | Disable closing on backdrop click |
| `onBackdropClick` | `() => void` | — | Backdrop click handler |
| `disableEscapeKeyDown` | `boolean` | — | Disable closing on Escape key |
| `onEscapeKeyDown` | `() => void` | — | Escape key handler |
| `disableAutoFocus` | `boolean` | — | Disable auto-focus on open |
| `disableEnforceFocus` | `boolean` | — | Allow focus to leave modal |
| `disableRestoreFocus` | `boolean` | — | Don't restore focus on close |
| `isEnabled` | `boolean` | — | Enable/disable the modal |
| `motionProps` | `object` | — | Framer-motion animation props |
| `backdropProps` | `object` | — | Props for backdrop element |
| `onKeyDown` | `(event) => void` | — | Key down handler |
| `children` | `ReactNode` | — | Modal content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Usage

Modal is a low-level primitive for creating overlays. For most use cases, prefer `Dialog` which provides built-in sizing, placement, and header/footer patterns.

```tsx
<Modal open={open} onClose={onClose}>
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-neutral-base rounded-md shadow-md p-6 max-w-md">
      <h2 className="typography-heading-2 mb-4">Custom Modal</h2>
      <p>Modal content with custom positioning.</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  </div>
</Modal>
```

## Important Notes

- Use `Dialog` for standard modals — it handles sizing, placement, and animation
- Modal is the underlying primitive that Dialog, Drawer, and other overlay components use
- Modal handles focus trapping, backdrop, and escape key automatically
