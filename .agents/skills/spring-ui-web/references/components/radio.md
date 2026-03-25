# Radio / RadioGroup

```tsx
import { Radio, RadioGroup } from '@ringcentral/spring-ui';
```

## RadioGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled default value |
| `onChange` | `(event) => void` | — | Change handler |
| `name` | `string` | — | Form field name |
| `row` | `boolean` | — | Horizontal layout |
| `children` | `ReactNode` | — | Radio elements |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Radio Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Radio value |
| `name` | `string` | — | Form field name (from RadioGroup) |
| `disabled` | `boolean` | — | Disabled state |
| `inputRef` | `ref` | — | Ref for the input element |
| `inputProps` | `object` | — | Props for the input element |
| `rootProps` | `object` | — | Props for the root element |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
  <label className="flex items-center gap-2">
    <Radio value="free" />
    <span>Free Plan</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio value="pro" />
    <span>Pro Plan</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio value="enterprise" />
    <span>Enterprise Plan</span>
  </label>
</RadioGroup>
```

## Horizontal Layout

```tsx
<RadioGroup value={size} onChange={(e) => setSize(e.target.value)} row>
  <label className="flex items-center gap-2">
    <Radio value="small" /><span>Small</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio value="medium" /><span>Medium</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio value="large" /><span>Large</span>
  </label>
</RadioGroup>
```

## With react-hook-form

```tsx
<Controller
  name="plan"
  control={form.control}
  render={({ field }) => (
    <RadioGroup value={field.value} onChange={(e) => field.onChange(e.target.value)}>
      <label className="flex items-center gap-2">
        <Radio value="free" /><span>Free</span>
      </label>
      <label className="flex items-center gap-2">
        <Radio value="pro" /><span>Pro</span>
      </label>
    </RadioGroup>
  )}
/>
```
