# FormLabel

Label component for form elements

## Import

```tsx
import { FormLabel } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"full-width"`, `"label"`, `"end"`, `"start"`

### `label`

**Type**: `ReactNode`

label text for input element

### `labelRef`

**Type**: `Ref<HTMLLabelElement>`

The ref to the label element

### `fullWidth`

**Type**: `boolean`

If `true`, the `Label` will take up the full width of its container.

**Default**: `false`

### `placement`

**Type**: `"end" | "start"`

The placement of the label in relation to the input.

**Default**: `end`

**Options**: `"end"`, `"start"`

### `rootProps`

**Type**: `Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & HTMLDataAttribute`

### `disabled`

**Type**: `boolean`

### `value`

**Type**: `string`

### `id`

**Type**: `string`

