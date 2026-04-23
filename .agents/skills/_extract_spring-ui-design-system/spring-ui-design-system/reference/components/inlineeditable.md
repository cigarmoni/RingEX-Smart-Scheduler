# InlineEditable

Inline editable text field

## Import

```tsx
import { InlineEditable } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"full-width"`, `"input"`, `"text"`, `"textarea"`, `"standard"`, `"outlined"`

### `multiline`

**Type**: `boolean`

If `true`, a textarea element will be rendered instead of an input.

### `onEditComplete`

**Type**: `TextareaEditHandler<EditCompleteReason> | InputEditHandler<EditCompleteReason>`

Callback invoked when done editing due to reasons below:
1. User presses 'Enter'
2. User presses 'Escape'
3. User triggers 'Blur', for example: press Tab or click elsewhere

### `onEditConfirm`

**Type**: `TextareaEditHandler<"Enter" | "Blur"> | InputEditHandler<"Enter" | "Blur">`

Callback invoked when done editing due to reasons below:
1. User presses 'Enter'
2. User triggers 'Blur', for example: press Tab or click elsewhere

### `onEditCancel`

**Type**: `TextareaEditHandler<"Escape"> | InputEditHandler<"Escape">`

Callback invoked when done editing due to reasons below:
1. User presses 'Escape'

### `maxRows`

**Type**: `string | number`

Maximum number of rows to display.

### `minRows`

**Type**: `string | number`

Minimum number of rows to display.

**Default**: `1`

### `variant`

**Type**: `"standard" | "outlined"`

The variant to use.

**Default**: `'standard'`

**Options**: `"standard"`, `"outlined"`

### `defaultEditing`

**Type**: `boolean`

The default editing state. Use when the component is not controlled.

### `isEditing`

**Type**: `boolean`

The editing state. Use when the component is controlled.

### `onEditStart`

**Type**: `() => void`

Callback invoked when input/textarea is focused.

### `fullWidth`

**Type**: `boolean`

If `true`, the input will take up the full width of its container.
If `multiline` is `true`, fullWidth will be set to `true`.

### `TooltipProps`

**Type**: `Omit<TooltipProps, "children" | "open" | "onOpenStateChange">`

Props applied to Tooltip component when not editing.

### `rootProps`

**Type**: `ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & HTMLDataAttribute`

Attributes applied to root div

