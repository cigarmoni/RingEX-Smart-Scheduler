# FormField

Wrapper for form inputs with label and helper text

## Import

```tsx
import { FormField } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"error"`, `"standard"`, `"outlined"`, `"quiet"`, `"contained"`, `"container"`, `"helper-text"`, `"focus-effect"`, `"content"`, `"label"`, `"xlarge"`, `"large"`, `"medium"`

### `label`

**Type**: `ReactNode`

The label on the form element

### `labelProps`

**Type**: `ClassAttributes<HTMLLabelElement> & LabelHTMLAttributes<HTMLLabelElement>`

Props passed to the <label> element

### `helperText`

**Type**: `ReactNode`

The help text under the form element

### `focused`

**Type**: `boolean`

If true, always show focused style

**Default**: `false`

### `size`

**Type**: `"xlarge" | "large" | "medium"`

The size of the form element

**Default**: `'xlarge'`

**Options**: `"xlarge"`, `"large"`, `"medium"`

### `contentRef`

**Type**: `Ref<HTMLDivElement>`

Pass ref to the content node

### `contentProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "className"> & HTMLDataAttribute`

Pass props to the content node

### `FormHelperTextProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & HTMLDataAttribute`

Pass props to the helperText node

### `variant`

**Type**: `"standard" | "outlined" | "quiet" | "contained"`

**Options**: `"standard"`, `"outlined"`, `"quiet"`, `"contained"`

### `htmlFor`

**Type**: `string`

### `disabled`

**Type**: `boolean`

### `error`

**Type**: `boolean`

### `required`

**Type**: `boolean`

