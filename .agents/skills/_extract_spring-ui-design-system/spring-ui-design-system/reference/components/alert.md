# Alert

Alert message component

## Import

```tsx
import { Alert } from '@ringcentral/spring-ui';
```

## Props

### `action`

**Type**: `ReactNode`

The action to display. It renders after the message, at the end of the alert.

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

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"icon"`, `"body"`, `"content"`, `"action"`, `"close"`, `"info"`, `"error"`, `"warning"`, `"success"`, `"neutral"`

### `component`

**Type**: `"div"`

The component used for the root node.
Either a string to use a HTML element or a component.

