# InlineEditable

```tsx
import { InlineEditable } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Current text value |
| `variant` | `string` | — | Typography variant |
| `multiline` | `boolean` | — | Multi-line editing |
| `defaultEditing` | `boolean` | — | Start in editing mode |
| `isEditing` | `boolean` | — | Controlled editing state |
| `onEditStart` | `() => void` | — | Called when editing begins |
| `onEditComplete` | `(value: string) => void` | — | Called when editing ends |
| `onEditConfirm` | `(value: string) => void` | — | Called when edit is confirmed |
| `onEditCancel` | `() => void` | — | Called when edit is cancelled |
| `disabled` | `boolean` | — | Disabled state |
| `fullWidth` | `boolean` | — | Full width input |
| `placeholder` | `string` | — | Placeholder text |
| `TooltipProps` | `object` | — | Props for edit tooltip |
| `rootProps` | `object` | — | Props for root element |
| `onFocus` | `(event) => void` | — | Focus handler |
| `onKeyDown` | `(event) => void` | — | Key down handler |
| `onBlur` | `(event) => void` | — | Blur handler |
| `children` | `ReactNode` | — | Content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<InlineEditable
  value={title}
  onEditConfirm={(newValue) => setTitle(newValue)}
  placeholder="Click to edit..."
/>
```

## Multiline

```tsx
<InlineEditable
  value={description}
  multiline
  onEditConfirm={(newValue) => setDescription(newValue)}
  placeholder="Add a description..."
/>
```

## Page Title Pattern

```tsx
function PageTitle({ title, onRename }) {
  return (
    <h1 className="typography-heading-1">
      <InlineEditable
        value={title}
        onEditConfirm={(newValue) => onRename(newValue)}
        fullWidth
      />
    </h1>
  );
}
```
