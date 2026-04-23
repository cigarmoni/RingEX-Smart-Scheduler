# Overlap

Overlapping content container

## Import

```tsx
import { Overlap } from '@ringcentral/spring-ui';
```

## Props

### `position`

**Type**: `OverlapPosition`

Accept two types of value:
- { top: '0px', left: '0px', right: '0px', bottom: '0px' }
- "top-left" | "top-right" | "bottom-left" | "bottom-right"

### `floater`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>>`

The component you want to position on top of children

### `showFloaterOnHoverOnly`

**Type**: `boolean`

Only shows the floater component when hovering

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"floater"`, `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`, `"show-floater-on-hover-only"`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

