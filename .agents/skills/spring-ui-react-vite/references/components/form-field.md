# FormField / FormLabel

```tsx
import { FormField, FormLabel } from '@ringcentral/spring-ui';
```

## FormField

FormField is a layout wrapper for form controls that provides consistent spacing and label alignment.

```tsx
<FormField>
  <FormLabel>Email Address</FormLabel>
  <TextField placeholder="Enter email" fullWidth />
</FormField>
```

## FormLabel Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | — | Disabled styling |
| `id` | `string` | — | Label element ID |
| `value` | `string` | — | Label value |

## Usage

```tsx
<FormLabel>Field Label</FormLabel>
```

## Form Layout Example

```tsx
function UserForm() {
  return (
    <form className="flex flex-col gap-4">
      <FormField>
        <FormLabel>Full Name</FormLabel>
        <TextField placeholder="Enter full name" fullWidth />
      </FormField>
      <FormField>
        <FormLabel>Email</FormLabel>
        <TextField type="email" placeholder="Enter email" fullWidth />
      </FormField>
      <FormField>
        <FormLabel>Role</FormLabel>
        <Select label="" placeholder="Select role">
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </FormField>
    </form>
  );
}
```

## Important Notes

- `TextField` and `Select` have built-in `label` props — you don't always need a separate `FormLabel`
- Use `FormField` + `FormLabel` when you need custom label positioning or when combining non-standard form controls
- For most cases, just use the `label` prop on `TextField` or `Select` directly
