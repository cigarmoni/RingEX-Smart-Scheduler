# Tray / TrayMenu

```tsx
import { Tray, TrayMenu } from '@ringcentral/spring-ui';
```

## Tray

Tray is a mobile-oriented bottom sheet component.

## TrayMenu Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Selected value |
| `defaultValue` | `string` | — | Default selected value |
| `onChange` | `(value: string) => void` | — | Selection change handler |
| `children` | `ReactNode` | — | Menu items |

## Basic Usage

```tsx
import { TrayMenu } from '@ringcentral/spring-ui';

<TrayMenu value={selected} onChange={setSelected}>
  <MenuItem value="option1">Option 1</MenuItem>
  <MenuItem value="option2">Option 2</MenuItem>
  <MenuItem value="option3">Option 3</MenuItem>
</TrayMenu>
```

## Important Notes

- Tray is designed for mobile interfaces — it creates a bottom sheet experience
- TrayMenu adds selectable menu behavior to the tray
- For desktop, prefer `Menu` or `Drawer anchor="bottom"` instead
