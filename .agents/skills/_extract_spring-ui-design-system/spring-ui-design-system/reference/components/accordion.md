# Accordion

Collapsible content panel

## Import

```tsx
import { Accordion } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"panel-wrapper"`, `"panel-inner-wrapper"`

### `header`

**Type**: `ReactNode`

Slot for header of Accordion.

### `defaultExpanded`

**Type**: `boolean`

If `true`, expands the accordion by default.

**Default**: `false`

### `expanded`

**Type**: `boolean`

If `true`, expands the accordion, otherwise collapse it.
Setting this prop enables control over the accordion.

### `onChange`

**Type**: `(event: SyntheticEvent<Element, Event>, expanded: boolean) => void`

Callback fired when the expand/collapse state is changed.
@param event The event source of the callback. **Warning**: This is a generic event not a change event.
@param expanded The `expanded` state of the accordion.

### `keepMounted`

**Type**: `boolean`

false: will unmount content whenever collapsed
true: keep displayed children mounted when collapsed

