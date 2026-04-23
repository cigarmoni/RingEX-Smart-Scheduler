# Block

Container block with padding

## Import

```tsx
import { Block } from '@ringcentral/spring-ui';
```

## Props

### `row`

**Type**: `boolean`

If `true`, flex direction is set to 'row'.

**Default**: `false`

### `padding`

**Type**: `boolean`

If `false`, container padding is set to 0.

**Default**: `true`

### `bordered`

**Type**: `boolean`

If `false`, the border is hidden.

**Default**: `true`

### `borderRadius`

**Type**: `"small" | "medium" | "none" | "xsmall"`

The border radius of the component.

**Default**: `'medium'`

**Options**: `"small"`, `"medium"`, `"none"`, `"xsmall"`

### `color`

**Type**: `"neutral" | "default"`

The color of the component.

**Default**: `'default'`

**Options**: `"neutral"`, `"default"`

### `background`

**Type**: `boolean`

If `false`, the background is hidden.

**Default**: `true`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"row"`, `"padding"`, `"bordered"`, `"hide-background"`, `"default"`, `"neutral"`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

