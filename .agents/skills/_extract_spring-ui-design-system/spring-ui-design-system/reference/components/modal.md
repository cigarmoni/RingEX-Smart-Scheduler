# Modal

Modal overlay container

## Import

```tsx
import { Modal } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`

### `open`

**Type**: `boolean`

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

### `onClose`

**Type**: `(event: SyntheticEvent<HTMLElement, Event>, reason: ModalCloseReason) => void`

### `backdropProps`

**Type**: `BackdropProps`

### `blocking`

**Type**: `boolean`

If true, the modal will block interaction with the rest of the page.
When false, aria-hidden and focus trapping are disabled.

**Default**: `true`

### `motionProps`

**Type**: `MotionProps`

Override the motion applied to the component

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

### `onExitComplete`

**Type**: `() => void`

Called when the modal's exit animation has finished playing

### `disableBackdropAnimation`

**Type**: `boolean`

### `disableScrollLock`

**Type**: `boolean`

If true, the modal will not lock body scrolling

Popover overrides this to `true` to avoid scroll lock conflicts
with parent modals. If you’re using Popover as a dialog-like
component and want to re-enable scroll lock, pass `disableScrollLock={false}`.

**Default**: `false`

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

