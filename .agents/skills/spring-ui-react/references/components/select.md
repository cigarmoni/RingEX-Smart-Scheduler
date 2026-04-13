# Select / Option

```tsx
import { Select, Option, useSelect } from '@ringcentral/spring-ui';
```

## Select Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| string[] \| null` | — | Controlled value |
| `defaultValue` | `string \| string[] \| null` | `null` (single) / `[]` (multiple) | Default value |
| `onChange` | `(value, event) => void` | — | Change handler |
| `selectMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `helperText` | `ReactNode` | — | Helper/error text |
| `error` | `boolean` | — | Error state |
| `disabled` | `boolean` | — | Disabled state |
| `required` | `boolean` | — | Required field |
| `variant` | `'standard' \| 'outlined'` | `'standard'` | Visual style |
| `size` | `'xlarge' \| 'large' \| 'medium' \| 'small'` | `'xlarge'` | Select size |
| `displayEmpty` | `boolean` | — | Show value when empty |
| `renderValue` | `(value) => ReactNode` | — | Custom value renderer |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initially open |
| `onOpen` | `() => void` | — | Open callback |
| `onClose` | `() => void` | — | Close callback |
| `virtualize` | `boolean` | `false` | Virtualize long option lists |
| `VirtualizedMenuProps` | `object` | — | Props for virtualized menu |
| `data` | `array` | — | Data for virtualized rendering |
| `MenuProps` | `object` | — | Props passed to the dropdown Menu |
| `selectorProps` | `object` | — | Props passed to the selector element |
| `inputProps` | `object` | — | Props passed to the hidden input |
| `FormHelperTextProps` | `object` | — | Props for helper text |
| `name` | `string` | — | Form field name |
| `id` | `string` | — | Element ID |
| `children` | `ReactNode` | — | Option elements |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Option Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | — | Option value (required) |
| `children` | `ReactNode` | — | Display label |
| `onClick` | `() => void` | — | Click handler |
| `autoClose` | `boolean` | — | Auto-close on select |
| `disabled` | `boolean` | — | Disabled option |

## Basic Usage

```tsx
<Select label="Country" value={country} onChange={(val) => setCountry(val)}>
  <Option value="us">United States</Option>
  <Option value="uk">United Kingdom</Option>
  <Option value="ca">Canada</Option>
</Select>
```

## With Placeholder

```tsx
<Select label="Status" placeholder="Select a status..." value={status} onChange={setStatus}>
  <Option value="active">Active</Option>
  <Option value="inactive">Inactive</Option>
  <Option value="pending">Pending</Option>
</Select>
```

## Multiple Selection

```tsx
<Select
  label="Tags"
  selectMode="multiple"
  value={selectedTags}
  onChange={(val) => setSelectedTags(val)}
>
  <Option value="bug">Bug</Option>
  <Option value="feature">Feature</Option>
  <Option value="docs">Documentation</Option>
</Select>
```

## Custom Value Renderer

```tsx
<Select
  label="Priority"
  value={priority}
  onChange={setPriority}
  renderValue={(value) => (
    <span className="flex items-center gap-1">
      <span className={`w-2 h-2 rounded-full ${priorityColors[value]}`} />
      {value}
    </span>
  )}
>
  <Option value="high">High</Option>
  <Option value="medium">Medium</Option>
  <Option value="low">Low</Option>
</Select>
```

## With react-hook-form

```tsx
<Controller
  name="role"
  control={form.control}
  render={({ field, fieldState }) => (
    <Select
      label="Role"
      value={field.value}
      onChange={(val) => field.onChange(val)}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      data-testid="select-role"
    >
      <Option value="admin">Admin</Option>
      <Option value="editor">Editor</Option>
      <Option value="viewer">Viewer</Option>
    </Select>
  )}
/>
```

## useSelect Hook

For custom select implementations:

```tsx
import { useSelect } from '@ringcentral/spring-ui';

function CustomSelect() {
  const { open, handleOpen } = useSelect();
  // Build custom UI around select behavior
}
```

## Important Notes

- Use `<Option>` not `<SelectItem>` — Spring UI does not have SelectItem
- `onChange` receives the value directly, not an event object
- Default size is `'xlarge'` which may look large — consider using `'medium'` or `'small'`
