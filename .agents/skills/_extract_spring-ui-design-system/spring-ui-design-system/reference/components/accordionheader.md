# AccordionHeader

Header for accordion items

## Import

```tsx
import { AccordionHeader } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"content"`, `"primary-text"`, `"secondary-slot"`, `"expand-icon"`

### `children`

**Type**: `ReactNode`

If children is not string,
**should** handle truncation tooltip by adding title attribute on the actual component containing the string

### `secondarySlot`

**Type**: `ReactNode`

secondary content slot of the header.

### `disabled`

**Type**: `boolean`

If `true`, the component will be disabled.

**Default**: `false`

### `expandIcon`

**Type**: `boolean`

If `true`, the component will show an ExpandCollapseCaret icon.

**Default**: `true`

### `ExpandCollapseCaretProps`

**Type**: `Partial<ExpandCollapseCaretProps>`

Props passed to the ExpandCollapseCaret component

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

invoke when focusVisiable or focusVisibleWithin is true

