# TimePicker

```tsx
import { TimePicker } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Selected time value |
| `selected` | `boolean` | — | Selected state |
| `disabled` | `boolean` | — | Disabled state |
| `children` | `ReactNode` | — | Display content |
| `onFocus` | `(event) => void` | — | Focus handler |
| `onBlur` | `(event) => void` | — | Blur handler |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { TimePicker } from '@ringcentral/spring-ui';

<TimePicker
  value={time}
  onChange={(newTime) => setTime(newTime)}
/>
```

## Important Notes

- TimePicker is a time selection component for picking hours/minutes
- Often used alongside DatePicker for date-time selection
