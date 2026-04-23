# List

List container

## Import

```tsx
import { List } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `preventContainerScroll`

**Type**: `boolean`

If true, will prevent list container scroll when move focus via press
ArrowDown or ArrowUp.

**Default**: `true`

### `searchAndFocusItemHandler`

**Type**: `SearchAndFocusItemHandler`

Custom focus item logic. It is useful for virtual list.
Because virtual list will not render full dom element.

### `actions`

**Type**: `Ref<UseListNavigationActions>`

