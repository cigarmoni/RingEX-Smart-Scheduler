# Dialog

Dialog/modal window

## Import

```tsx
import { Dialog } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"body"`, `"left"`, `"right"`, `"close-button"`

### `size`

**Type**: `"small" | "large" | "medium" | "fullHeight" | "fullScreen"`

The size of the dialog.

**Default**: `"medium"`

**Options**: `"small"`, `"large"`, `"medium"`, `"fullHeight"`, `"fullScreen"`

### `placement`

**Type**: `"left" | "right"`

The placement of the dialog. Only applies to size `fullHeight`.

**Default**: `"right"`

**Options**: `"left"`, `"right"`

### `bodyProps`

**Type**: `GroupedMotionProps<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & { ...; } & HTMLDataAttribute>`

The props passed to the body slot of body.

### `open`

**Type**: `boolean`

### `onClose`

**Type**: `(event: SyntheticEvent<HTMLElement | HTMLButtonElement, Event>, reason: DialogCloseReason) => void`

### `container`

**Type**: `Element | (() => Element)`

An HTML element or function that returns one.
The `container` will have the portal children appended to it.

You can also provide a callback, which is called in a React layout effect.
This lets you set the container from a ref, and also makes server-side rendering possible.

By default, it uses the body of the top-level document object,
so it's simply `document.body` most of the time.

### `disablePortal`

**Type**: `boolean`

The `children` will be under the DOM hierarchy of the parent component.

**Default**: `false`

### `motionProps`

**Type**: `MotionProps`

Override the motion applied to the component

### `disableBackdropAnimation`

**Type**: `boolean`

### `disableRestoreFocus`

**Type**: `boolean`

If `true`, the focus trap will not restore focus to previously focused element once
focus trap is hidden or unmounted.

**Default**: `false`

### `disableAutoFocus`

**Type**: `boolean`

If `true`, the focus trap will not automatically shift focus to itself when it opens, and
replace it to the last focused element when it closes.
This also works correctly with any focus trap children that have the `disableAutoFocus` prop.

Generally this should never be set to `true` as it makes the focus trap less
accessible to assistive technologies, like screen readers.

**Default**: `false`

### `disableEnforceFocus`

**Type**: `boolean`

If `true`, the focus trap will not prevent focus from leaving the focus trap while open.

Generally this should never be set to `true` as it makes the focus trap less
accessible to assistive technologies, like screen readers.

**Default**: `false`

### `isEnabled`

**Type**: `() => boolean`

This prop extends the `open` prop.
It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
This prop should be memoized.
It can be used to support multiple focus trap mounted at the same time.

**Default**: `function defaultIsEnabled(): boolean {
return true;
}`

### `hideBackdrop`

**Type**: `boolean`

### `disableBackdropClick`

**Type**: `boolean`

### `onBackdropClick`

**Type**: `MouseEventHandler<HTMLElement>`

### `disableEscapeKeyDown`

**Type**: `boolean`

### `onEscapeKeyDown`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `backdropProps`

**Type**: `BackdropProps`

### `blocking`

**Type**: `boolean`

If true, the modal will block interaction with the rest of the page.
When false, aria-hidden and focus trapping are disabled.

**Default**: `true`

### `onExitComplete`

**Type**: `() => void`

Called when the modal's exit animation has finished playing

### `disableScrollLock`

**Type**: `boolean`

If true, the modal will not lock body scrolling

Popover overrides this to `true` to avoid scroll lock conflicts
with parent modals. If you’re using Popover as a dialog-like
component and want to re-enable scroll lock, pass `disableScrollLock={false}`.

**Default**: `false`

