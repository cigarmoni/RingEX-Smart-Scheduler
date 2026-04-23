# TabContext

TabContext provides the context for Tab and TabPanel components.

**IMPORTANT**: When using Tab, Tabs, and TabPanel components, you MUST wrap them with TabContext.
TabContext manages the state and coordination between tabs and their panels.

## Import

```tsx
import { TabContext } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactNode`

The content of the component.

### `value`

**Type**: `string | number`

The value of the currently selected `Tab`.
If you don't want any selected `Tab`, you can set this prop to `null`.

### `defaultValue`

**Type**: `string | number`

The default value. Use when the component is not controlled.

### `onChange`

**Type**: `(event: SyntheticEvent<Element, Event>, value: string | number) => void`

Callback invoked when new value is being set.

### `selectionFollowsFocus`

**Type**: `boolean`

If `true` the selected tab changes on focus. Otherwise it only
changes on activation.

