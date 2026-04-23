# SortableList

Drag-and-drop sortable list

## Import

```tsx
import { SortableList } from '@ringcentral/spring-ui';
```

## Props

### `data`

**Type**: `(UniqueIdentifier | { id: UniqueIdentifier; })[]`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

### `actions`

**Type**: `Ref<UseListNavigationActions>`

### `preventContainerScroll`

**Type**: `boolean`

If true, will prevent list container scroll when move focus via press
ArrowDown or ArrowUp.

**Default**: `true`

### `searchAndFocusItemHandler`

**Type**: `SearchAndFocusItemHandler`

Custom focus item logic. It is useful for virtual list.
Because virtual list will not render full dom element.

