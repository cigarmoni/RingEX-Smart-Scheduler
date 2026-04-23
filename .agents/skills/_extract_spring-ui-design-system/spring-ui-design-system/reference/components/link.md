# Link

Hyperlink component

## Import

```tsx
import { Link } from '@ringcentral/spring-ui';
```

## Props

### `variant`

**Type**: `"inverted" | "primary" | "secondary"`

variant of Link

**Default**: `'primary'`

**Options**: `"inverted"`, `"primary"`, `"secondary"`

### `underline`

**Type**: `"none" | "hover" | "always"`

underline behavior of Link

**Default**: `'hover'`

**Options**: `"none"`, `"hover"`, `"always"`

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

invoke when focusVisiable or focusVisibleWithin is true

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"primary"`, `"secondary"`, `"inverted"`, `"none"`, `"hover"`, `"always"`

### `component`

**Type**: `"a"`

The component used for the root node.
Either a string to use a HTML element or a component.

