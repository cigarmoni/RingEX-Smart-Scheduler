# Textarea

```tsx
import { Textarea } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outlined' \| 'standard' \| 'quiet'` | `'outlined'` | Visual style |
| `size` | `string` | — | Input size |
| `rows` | `number` | — | Fixed number of rows |
| `minRows` | `number` | — | Minimum rows (auto-resize) |
| `maxRows` | `number` | — | Maximum rows (auto-resize) |
| `inputProps` | `object` | — | Props passed to the textarea element |
| `ClearButtonProps` | `object` | — | Props for clear button |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

Also accepts all TextField-like props: `label`, `helperText`, `error`, `placeholder`, `disabled`, `value`, `onChange`, `fullWidth`, etc.

## Basic Usage

```tsx
<Textarea label="Description" placeholder="Enter description..." rows={4} />
```

## Auto-Resize

```tsx
<Textarea
  label="Notes"
  minRows={3}
  maxRows={10}
  placeholder="Start typing..."
/>
```

## With react-hook-form

```tsx
<Controller
  name="description"
  control={form.control}
  render={({ field, fieldState }) => (
    <Textarea
      {...field}
      label="Description"
      minRows={3}
      maxRows={8}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      fullWidth
      data-testid="input-description"
    />
  )}
/>
```
