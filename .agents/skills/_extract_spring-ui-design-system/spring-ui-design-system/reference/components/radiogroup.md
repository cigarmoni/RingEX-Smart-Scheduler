# RadioGroup

Container for radio button groups

## Import

```tsx
import { RadioGroup } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"row"`

### `row`

**Type**: `boolean`

Display group of elements in a compact row.

### `name`

**Type**: `string`

The name of radio group.

### `defaultValue`

**Type**: `string`

The default value for uncontrolled radio group.

### `children`

**Type**: `ReactNode`

The children for radio group.

### `onChange`

**Type**: `ChangeEventHandler<HTMLInputElement>`

Callback fired when the state is changed.
@param event The event source of the callback.
You can pull out the new value by accessing `event.target.value` (string).
You can pull out the new checked state by accessing `event.target.checked` (boolean).

### `value`

**Type**: `string`

The value to be used in radio group.

