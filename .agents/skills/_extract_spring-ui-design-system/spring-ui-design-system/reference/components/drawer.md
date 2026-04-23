# Drawer

Drawer Component - Base drawer without gesture support

A clean, lightweight drawer component that provides basic modal/slide functionality.
For gesture support, use SwipeableDrawer which builds on top of this component.

## Import

```tsx
import { Drawer } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"body"`, `"header"`, `"content"`, `"footer"`, `"non-blocking"`

### `anchor`

**Type**: `"top" | "left" | "right" | "bottom"`

Side from which the drawer will slide in and anchor to.

**Default**: `'left'`

**Options**: `"top"`, `"left"`, `"right"`, `"bottom"`

### `open`

**Type**: `boolean`

Controls whether the drawer is open or closed.

### `children`

**Type**: `ReactNode`

Main content of the drawer. This is the scrollable area between header and footer.

### `header`

**Type**: `ReactNode`

Header content displayed at the top of the drawer.

**Important**: With SwipeableDrawer, the header becomes the drag handle.

**Default**: `undefined`

### `footer`

**Type**: `ReactNode`

Footer content displayed at the bottom of the drawer.

**Default**: `undefined`

### `bodyProps`

**Type**: `GroupedMotionProps<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & { ...; } & HTMLDataAttribute>`

Props passed to the main drawer body container.

### `variant`

**Type**: `"temporary"`

Drawer behavior variant.

- **'temporary'**: Overlays content, closes on backdrop click, traps focus

**Default**: `'temporary'`

### `blocking`

**Type**: `boolean`

Controls whether the drawer blocks interaction with the rest of the page.

**When true (default)**:
- Focus is trapped inside drawer
- Page scrolling is disabled
- Backdrop clicks close drawer
- ESC key closes drawer
- Screen readers announce modal

**When false**:
- Users can interact with page content
- No focus trapping
- No scroll locking

**Default**: `true`

### `measurementRefs`

**Type**: `{ header?: RefObject<HTMLDivElement>; footer?: RefObject<HTMLDivElement>; content?: RefObject<HTMLDivElement>; }`

Internal measurement refs used by SwipeableDrawer.
@internal

### `headerProps`

**Type**: `HTMLAttributes<HTMLDivElement>`

Additional props to apply to the header element for gesture binding.
@internal

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

### `onClose`

**Type**: `(event: SyntheticEvent<HTMLElement, Event>, reason: ModalCloseReason) => void`

### `backdropProps`

**Type**: `BackdropProps`

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

