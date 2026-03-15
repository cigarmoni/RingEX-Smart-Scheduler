# Dialog / DialogTitle / DialogContent / DialogActions

```tsx
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@ringcentral/spring-ui';
```

## Dialog Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls dialog visibility |
| `onClose` | `() => void` | — | Called when dialog should close |
| `size` | `'small' \| 'medium' \| 'large' \| 'fullHeight' \| 'fullScreen'` | `'medium'` | Dialog size |
| `placement` | `'right' \| 'left'` | `'right'` | Dialog position (slides in from side) |
| `bodyProps` | `object` | — | Props for the body container |
| `children` | `ReactNode` | — | Dialog content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

Also inherits Modal props for backdrop and escape key behavior.

## Sub-Components

### DialogTitle
Renders a styled title section within the dialog.
```tsx
<DialogTitle>Edit User</DialogTitle>
```

### DialogContent
Renders the main content area with scrollable overflow.
```tsx
<DialogContent>Form fields and content here</DialogContent>
```

### DialogActions
Renders the footer action area (buttons), right-aligned.
```tsx
<DialogActions>
  <Button variant="outlined" onClick={onClose}>Cancel</Button>
  <Button variant="contained">Save</Button>
</DialogActions>
```

## Basic Usage

```tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@ringcentral/spring-ui';
import { useState } from 'react';

function MyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} size="medium">
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <p className="text-neutral-b2">Dialog content goes here.</p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

You can also structure dialog content manually without sub-components:
```tsx
<Dialog open={open} onClose={() => setOpen(false)} size="medium">
  <div className="p-6">
    <h2 className="typography-heading-2 mb-4">Dialog Title</h2>
    <p className="text-neutral-b2 mb-6">Content.</p>
    <div className="flex justify-end gap-2">
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
    </div>
  </div>
</Dialog>
```

## Sizes

```tsx
<Dialog open={open} onClose={onClose} size="small">Small dialog</Dialog>
<Dialog open={open} onClose={onClose} size="medium">Medium dialog</Dialog>
<Dialog open={open} onClose={onClose} size="large">Large dialog</Dialog>
<Dialog open={open} onClose={onClose} size="fullHeight">Full height side panel</Dialog>
<Dialog open={open} onClose={onClose} size="fullScreen">Full screen overlay</Dialog>
```

## Placement

Dialog only supports left/right placement — it always slides in from a side:

```tsx
<Dialog placement="right" open={open} onClose={onClose}>
  Slides in from the right (default — like a side panel)
</Dialog>

<Dialog placement="left" open={open} onClose={onClose}>
  Slides in from the left
</Dialog>
```

For a centered modal (traditional dialog), use `Modal` directly instead — Dialog is designed as a side panel.

## Confirmation Dialog

For centered confirmation dialogs, use Modal or style Dialog with fullScreen + small size:

```tsx
function ConfirmDeleteDialog({ open, onClose, onConfirm, itemName }) {
  return (
    <Dialog open={open} onClose={onClose} size="small">
      <DialogTitle>Delete {itemName}?</DialogTitle>
      <DialogContent>
        <p className="text-neutral-b2">This action cannot be undone.</p>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="neutral" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="danger" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
```

## Form Dialog

```tsx
function EditUserDialog({ open, onClose, user }) {
  const form = useForm({ defaultValues: { name: user?.name, email: user?.email } });

  return (
    <Dialog open={open} onClose={onClose} size="medium" placement="right">
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => <TextField {...field} label="Name" fullWidth />}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => <TextField {...field} label="Email" fullWidth />}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
```

## Important Notes

- Dialog is a **side panel** — it slides in from left or right. There is no `placement="center"`.
- For centered modals, use the `Modal` component directly with your own centering layout.
- Dialog has sub-components (`DialogTitle`, `DialogContent`, `DialogActions`) for structured layouts — but you can also use plain divs with your own layout.
- Valid sizes: `small`, `medium`, `large`, `fullHeight`, `fullScreen` — there is no `xlarge`.
- Dialog handles backdrop click and Escape key to close automatically.
