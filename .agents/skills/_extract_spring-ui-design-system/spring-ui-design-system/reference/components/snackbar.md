# Snackbar

Toast notification

## Import

```tsx
import { Snackbar } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `open`

**Type**: `boolean`

To control whether to display the snackbar. It can be toggled when receive the close event.

**Default**: `true`

### `autoHideDuration`

**Type**: `number`

The number of milliseconds to wait before automatically calling the
`onClose` function. `onClose` should then set the state of the `open`
prop to hide the Snackbar. This behavior is disabled when it is `null`.

The close button is not shown when a snackbar is set to hide automatically.

**Default**: `5000`

### `closeButton`

**Type**: `boolean`

is show closeButton or not,

default will base on `onClose` be set or not

### `disablePortal`

**Type**: `boolean`

The `children` will be under the DOM hierarchy of the parent component.

**Default**: `false`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

### `icon`

**Type**: `boolean | ComponentType<{}>`

@deprecated Use startSlot instead. Will be removed in the next major version.
Override the icon displayed before the children.
Unless provided, the icon is mapped to the value of the `severity` prop.

**Default**: `false`

### `startSlot`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<{}>`

The content to display at the start of the alert, before the message.
If not provided and severity is set, a default icon will be shown.

### `onClose`

**Type**: `() => void`

Callback fired when the component requests to be closed.

When this callback is set, a close icon button is displayed that triggers the callback when clicked.

### `action`

**Type**: `ReactNode`

The action to display. It renders after the message, at the end of the alert.

### `closeText`

**Type**: `string`

Override the default label for the *close popup* icon button.

For localization purposes, you can use the provided [translations](/guides/localization/).

### `severity`

**Type**: `"error" | "neutral" | "success" | "warning" | "info"`

The severity of the alert. This defines the color and icon used.

**Default**: `"info"`

**Options**: `"error"`, `"neutral"`, `"success"`, `"warning"`, `"info"`

### `CloseButtonProps`

**Type**: `IconButtonProps<"button">`

Props applied to the IconButton component used for the close button.

