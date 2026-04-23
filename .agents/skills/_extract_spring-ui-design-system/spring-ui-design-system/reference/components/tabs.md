# Tabs

Tab navigation container

## Import

```tsx
import { Tabs } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"scroller"`, `"scrollable"`, `"tab-list"`, `"underline"`, `"indicator"`, `"compact"`, `"pill"`, `"floating-underline"`, `"scroll-left"`, `"scroll-right"`, `"scroll-both"`, `"medium"`, `"large"`, `"small"`

### `children`

**Type**: `ReactNode`

A set of tabs

### `variant`

**Type**: `"standard" | "scrollable" | "moreMenu"`

If 'scrollable', tabs will be scrollable.
All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift mouse wheel, etc.)

**Default**: `'standard'`

**Options**: `"standard"`, `"scrollable"`, `"moreMenu"`

### `pill`

**Type**: `boolean`

If set to `true`, the tab will adopt a pill shape.

### `color`

**Type**: `"default" | "cobranding"`

The color scheme to use for tabs.
- 'default': Uses cobranding colors for non-pill tabs, grey colors for pill tabs
- 'cobranding': Uses cobranding colors for all tab types

**Default**: `'default'`

**Options**: `"default"`, `"cobranding"`

### `pillGap`

**Type**: `number`

Specifies the gap between tabs when in pill mode. Unit: px.
Important for 'moreMenu' variant to calculate the width of tabs accurately.

**Default**: `4`

### `onGroupInfoUpdate`

**Type**: `(visibleItemValues: (string | number)[], hiddenItemValues: (string | number)[]) => void`

Callback invoked when using variant 'moreMenu' and the group info is updated.

### `MoreMenuProps`

**Type**: `MoreMenuProps`

Props applied to TabMoreMenu when variant is 'moreMenu'

### `ScrollButtonStartProps`

**Type**: `Omit<IconButtonProps<"button">, "className" | "onClick" | "variant"> & HTMLDataAttribute`

Props applied to the TabScrollButtonStart when variant is 'scrollable' and pill is `true`

### `ScrollButtonEndProps`

**Type**: `Omit<IconButtonProps<"button">, "className" | "onClick" | "variant"> & HTMLDataAttribute`

Props applied to the TabScrollButtonEnd when variant is 'scrollable' and pill is `true`

### `enableScrollButtons`

**Type**: `boolean`

Whether to enable scroll buttons when variant is 'scrollable' and pill is `true`

**Default**: `true`

### `size`

**Type**: `"small" | "large" | "medium"`

The size of the tabs.
- For standard tabs: 'medium' (48px, default) | 'large' (52px)
  - Compact mode: 28px (overrides both)
- For pill tabs: 'medium' (36px, default) | 'small' (32px)
  - Compact mode: 32px (overrides medium only)

**Default**: `'medium'`

**Options**: `"small"`, `"large"`, `"medium"`

