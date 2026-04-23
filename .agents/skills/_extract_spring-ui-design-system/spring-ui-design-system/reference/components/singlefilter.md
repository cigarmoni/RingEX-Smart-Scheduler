# SingleFilter

Single filter component

## Import

```tsx
import { SingleFilter } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"more"`

### `defaultValue`

**Type**: `FilterButtonValue`

The default value. Use when the component is not controlled.

### `value`

**Type**: `FilterButtonValue`

The value of the selected filter.

### `defaultData`

**Type**: `FilterItemData[]`

The default data of filters. Use when the component is not controlled.

### `data`

**Type**: `FilterItemData[]`

The data of filters.

### `onSelect`

**Type**: `(value: FilterButtonValue) => void`

Callback fired when current selected filter is changed.
@param value The value of current selected filter.

### `onDataChange`

**Type**: `(data: FilterItemData[]) => void`

Callback fired when data of filters is changed.
@param data Current data of filters.

### `visibleCount`

**Type**: `number`

The max count of visible filters

**Default**: `2`

### `MoreButtonProps`

**Type**: `Omit<IconButtonProps<"button">, "size" | "variant"> & HTMLDataAttribute`

