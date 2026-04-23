# Tab

Tab component for use within TabContext and Tabs.

**IMPORTANT**: It is strongly recommended to provide a unique `id` prop for each Tab.
- Unique ids are required for accessibility and correct tab-panel linking
- If no `id` is provided, each Tab element will be cloned to provide an auto-generated id, which may have a performance cost
- The warning "Tab component missing recommended 'id' prop" will be shown when `id` is not provided

## Import

```tsx
import { Tab } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"label"`, `"icon"`, `"container"`, `"pill"`, `"pill-badge"`, `"badge-root"`, `"badge"`, `"text"`

### `variant`

**Type**: `"label" | "icon"`

The variant to use.

**Default**: `'label'`

**Options**: `"label"`, `"icon"`

### `color`

**Type**: `"default" | "cobranding"`

The color scheme to use for tabs. Overrides the color from Tabs component.
- 'default': Uses cobranding colors for non-pill tabs, grey colors for pill tabs
- 'cobranding': Uses cobranding colors for all tab types

**Default**: `'default'`

**Options**: `"default"`, `"cobranding"`

### `label`

**Type**: `ReactNode`

Text displayed when variant is 'label', also used as title if it is string.

### `title`

**Type**: `string`

title on Tab
**Should pass this if label is not string.**

### `symbol`

**Type**: `ComponentType<{}>`

Icon symbol used when variant is 'icon'

### `BadgeProps`

**Type**: `BadgeProps`

Props applied to Badge component

### `TooltipProps`

**Type**: `Omit<TooltipProps, "title" | "children"> & HTMLDataAttribute`

Props applied to Tooltip component when variant is 'icon'

### `action`

**Type**: `Ref<{ focusVisible(): void; }>`

A ref for imperative actions. It currently only supports `focusVisible()` action.

### `id`

**Type**: `string`

The id of the tab.
If not provided, it will be automatically generated.

### `onClick`

**Type**: `MouseEventHandler<Element>`

Callback fired when the tab is clicked.

### `value`

**Type**: `string | number`

The value of the tab.
It's used to associate the tab with a tab panel(s) with the same value.
If the value is not provided, it falls back to the position index.

