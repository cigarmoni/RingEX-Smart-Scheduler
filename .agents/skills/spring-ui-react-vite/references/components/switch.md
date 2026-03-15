# Switch

```tsx
import { Switch } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled default state |
| `disabled` | `boolean` | — | Disabled state |
| `autoFocus` | `boolean` | — | Auto-focus on mount |
| `required` | `boolean` | — | Required field |
| `onChange` | `(event) => void` | — | Change handler |
| `onBlur` | `(event) => void` | — | Blur handler |
| `onFocus` | `(event) => void` | — | Focus handler |
| `onFocusVisible` | `(event) => void` | — | Focus visible handler |
| `inputRef` | `ref` | — | Ref for the input element |
| `inputProps` | `object` | — | Props for the input element |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<label className="flex items-center gap-2">
  <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
  <span>Enable notifications</span>
</label>
```

## Disabled

```tsx
<label className="flex items-center gap-2">
  <Switch disabled checked />
  <span>Always on (locked)</span>
</label>
```

## With react-hook-form

```tsx
<Controller
  name="darkMode"
  control={form.control}
  render={({ field }) => (
    <label className="flex items-center gap-2">
      <Switch
        checked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
        data-testid="switch-dark-mode"
      />
      <span>Dark Mode</span>
    </label>
  )}
/>
```

## Settings List Example

```tsx
function SettingsList({ settings, onToggle }) {
  return (
    <div className="flex flex-col gap-4">
      {settings.map((setting) => (
        <div key={setting.id} className="flex items-center justify-between">
          <div>
            <p className="text-neutral-b0">{setting.label}</p>
            <p className="text-neutral-b2 text-sm">{setting.description}</p>
          </div>
          <Switch
            checked={setting.enabled}
            onChange={() => onToggle(setting.id)}
            data-testid={`switch-${setting.id}`}
          />
        </div>
      ))}
    </div>
  );
}
```
