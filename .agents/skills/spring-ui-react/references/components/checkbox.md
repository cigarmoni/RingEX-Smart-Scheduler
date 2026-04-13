# Checkbox

```tsx
import { Checkbox } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled default state |
| `disabled` | `boolean` | — | Disabled state |
| `indeterminate` | `boolean` | — | Indeterminate (partial) state |
| `shape` | `'round' \| 'square'` | — | Checkbox shape |
| `autoFocus` | `boolean` | — | Auto-focus on mount |
| `onChange` | `(event) => void` | — | Change handler |
| `inputRef` | `ref` | — | Ref for the input element |
| `inputProps` | `object` | — | Props for the input element |
| `rootProps` | `object` | — | Props for the root element |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Checkbox onChange={(e) => setChecked(e.target.checked)} />
```

## With Label

```tsx
<label className="flex items-center gap-2">
  <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
  <span>I agree to the terms</span>
</label>
```

## Indeterminate

```tsx
<Checkbox
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
/>
```

## With react-hook-form

```tsx
<Controller
  name="agreeToTerms"
  control={form.control}
  render={({ field }) => (
    <label className="flex items-center gap-2">
      <Checkbox
        checked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
        data-testid="checkbox-agree"
      />
      <span>I agree to the terms and conditions</span>
    </label>
  )}
/>
```

## Checkbox List

```tsx
function CheckboxList({ options, selected, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
```
