# TextField

```tsx
import { TextField } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outlined' \| 'standard' \| 'quiet'` | `'outlined'` | Visual style |
| `size` | `string` | — | Input size |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `helperText` | `ReactNode` | — | Helper/error text below input |
| `error` | `boolean` | — | Error state (via rest props) |
| `type` | `string` | `'text'` | Input type (text, password, email, etc.) |
| `value` | `string` | — | Controlled value |
| `onChange` | `(e: ChangeEvent) => void` | — | Change handler |
| `clearBtn` | `boolean` | `true` | Show clear button |
| `clearText` | `string` | `'clear'` | Accessibility text for clear button |
| `onClear` | `() => void` | — | Clear button callback |
| `showCharacterCount` | `boolean` | `false` | Show character count |
| `fullWidth` | `boolean` | — | Expands to container width |
| `startAdornment` | `ReactNode` | — | Content before input (icon, text) |
| `endAdornment` | `ReactNode` | — | Content after input (icon, text) |
| `readOnly` | `boolean` | — | Read-only state |
| `autoFocus` | `boolean` | — | Auto-focus on mount |
| `inputComponent` | `ElementType` | `'input'` | Custom input component |
| `inputProps` | `object` | — | Props passed to the input element |
| `showMaskValueToggleButton` | `boolean` | `type === 'password'` | Show/hide password toggle |
| `maskValue` | `boolean` | — | Controlled mask state |
| `ClearButtonProps` | `object` | — | Props for clear button |
| `FormHelperTextProps` | `object` | — | Props for helper text element |
| `RootProps` | `object` | — | Props for root element |
| `id` | `string` | — | Input element ID |
| `focused` | `boolean` | — | Controlled focus state |
| `disabled` | `boolean` | — | Disabled state (via rest props) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |
| `useNativeClearBtn` | `boolean` | `false` | Use browser native clear button |

## Variants

### Outlined (default)
```tsx
<TextField variant="outlined" label="Email" placeholder="Enter email" />
```

### Standard
```tsx
<TextField variant="standard" label="Name" />
```

### Quiet
Minimal style, no border.
```tsx
<TextField variant="quiet" placeholder="Search..." />
```

## With Adornments

```tsx
import { SearchMd, EmailMd } from '@ringcentral/spring-icon';

<TextField
  startAdornment={<Icon symbol={SearchMd} size="small" />}
  placeholder="Search..."
/>

<TextField
  label="Email"
  startAdornment={<Icon symbol={EmailMd} size="small" />}
  endAdornment={<span>@example.com</span>}
/>
```

## Password Field

```tsx
<TextField
  type="password"
  label="Password"
  showMaskValueToggleButton
/>
```

## With Character Count

```tsx
<TextField
  label="Bio"
  showCharacterCount
  inputProps={{ maxLength: 200 }}
/>
```

## Error State

```tsx
<TextField
  label="Email"
  error
  helperText="Please enter a valid email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

## With react-hook-form

```tsx
import { Controller } from 'react-hook-form';

<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      label="Email"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      fullWidth
      data-testid="input-email"
    />
  )}
/>
```

## Complete Example

```tsx
import { TextField } from '@ringcentral/spring-ui';
import { SearchMd } from '@ringcentral/spring-icon';
import { useState } from 'react';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <TextField
      variant="outlined"
      placeholder="Search items..."
      startAdornment={<Icon symbol={SearchMd} size="small" />}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => {
        setQuery('');
        onSearch('');
      }}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
      fullWidth
      data-testid="input-search"
    />
  );
}
```
