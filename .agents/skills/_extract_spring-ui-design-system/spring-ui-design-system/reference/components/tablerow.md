# TableRow

Table row

## Import

```tsx
import { TableRow } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

Should be valid `<tr>` children such as `TableCell`.

### `hoverable`

**Type**: `boolean`

If `true`, the table row will shade on hover.
Noted: hover style will not be applied to rows in the head (TableHead).

**Default**: `false`

### `clickable`

**Type**: `boolean`

If `true`, cursor will be pointer on hover and hover style will be applied.
It will be set to `true` automatically when onClick prop is defined.
Noted: clickable style will not be applied to rows in the head (TableHead).

### `selected`

**Type**: `boolean`

If `true`, the table row will have the selected shading.

**Default**: `false`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"body"`, `"footer"`, `"head"`, `"hoverable"`, `"clickable"`, `"focusVisible"`

### `component`

**Type**: `"tr"`

The component used for the root node.
Either a string to use a HTML element or a component.

