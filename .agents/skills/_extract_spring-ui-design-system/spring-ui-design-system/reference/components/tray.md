# Tray

Bottom tray container

## Import

```tsx
import { Tray } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `value`

**Type**: `TrayValue`

The value of the currently selected `TrayPanel`.

### `defaultValue`

**Type**: `TrayValue`

The default value. Use when the component is not controlled.

### `onChange`

**Type**: `(event: SyntheticEvent<Element, Event>, value: TrayValue) => void`

Callback invoked when new value is being set.

### `actions`

**Type**: `Ref<TrayActions>`

A ref with imperative actions.
It allows to navigate to other panel

