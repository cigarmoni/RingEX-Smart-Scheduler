# DatePicker

```tsx
import { DatePicker } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Dayjs \| null` | — | Selected date (dayjs object) |
| `onChange` | `(date: Dayjs \| null) => void` | — | Date change handler |
| `disabled` | `boolean` | — | Disabled state |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `minDate` | `Dayjs` | — | Minimum selectable date |
| `maxDate` | `Dayjs` | — | Maximum selectable date |
| `error` | `boolean` | — | Error state |
| `helperText` | `string` | — | Helper/error text |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { DatePicker } from '@ringcentral/spring-ui';
import dayjs from 'dayjs';
import { useState } from 'react';

function MyDatePicker() {
  const [date, setDate] = useState(dayjs());

  return (
    <DatePicker
      label="Select Date"
      value={date}
      onChange={(newDate) => setDate(newDate)}
    />
  );
}
```

## With Min/Max

```tsx
<DatePicker
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  minDate={dayjs()}
  maxDate={dayjs().add(1, 'year')}
/>
```

## With react-hook-form

```tsx
<Controller
  name="birthDate"
  control={form.control}
  render={({ field, fieldState }) => (
    <DatePicker
      label="Birth Date"
      value={field.value ? dayjs(field.value) : null}
      onChange={(date) => field.onChange(date?.toISOString())}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      data-testid="datepicker-birth"
    />
  )}
/>
```

## Important Notes

- DatePicker uses `dayjs` — this is a required peer dependency
- Values are `Dayjs` objects, not JavaScript `Date` or ISO strings
- Convert to/from strings as needed: `dayjs(isoString)` and `dayjsObj.toISOString()`
