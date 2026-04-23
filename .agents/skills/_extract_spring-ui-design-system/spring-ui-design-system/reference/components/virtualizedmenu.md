# VirtualizedMenu

Virtualized menu for large lists

## Import

```tsx
import { VirtualizedMenu } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"paper"`, `"paper-content-container"`

### `maxHeight`

**Type**: `number`

The maximum height of the Menu list. If no value is provided, the Menu will
not have a max height. The underlying Popover component will take care of
ensuring the Menu is resized to fit within the available space in the viewport.

**Default**: `undefined`

### `onClose`

**Type**: `() => void`

Triggered when focus leaves the menu and the menu should close.

### `open`

**Type**: `boolean`

Controls whether the menu is displayed.

### `initialFocus`

**Type**: `number | boolean | (() => number | boolean)`

If true, focus first focusable item. If no focusable item, focus to list.
If number, focus item by index. If it is no focusable, focus to list.
If function, like others, but get index lazy.

### `VirtualizedListProps`

**Type**: `Omit<VirtualizedMenuListProps<unknown>, "children" | "maxHeight" | "initialFocus">`

### `popperActions`

**Type**: `Ref<PopperActions>`

### `data`

**Type**: `readonly unknown[]`

The data items to be rendered. If data is set, the total count will be inferred from the length of the array.

### `actions`

**Type**: `Ref<VirtualizedListActions>`

A ref with virtualized list actions

### `totalCount`

**Type**: `number`

The total amount of items to be rendered.

### `isItemDisabled`

**Type**: `(index: number) => boolean`

### `container`

**Type**: `Element | (() => Element)`

An HTML element or function that returns one.
The `container` will have the portal children appended to it.

You can also provide a callback, which is called in a React layout effect.
This lets you set the container from a ref, and also makes server-side rendering possible.

By default, it uses the body of the top-level document object,
so it's simply `document.body` most of the time.

### `variant`

**Type**: `"standard" | "pointed"`

**Default**: `standard`

**Options**: `"standard"`, `"pointed"`

### `placement`

**Type**: `"top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start"`

**Options**: `"top"`, `"left"`, `"right"`, `"bottom"`, `"top-end"`, `"top-start"`, `"left-end"`, `"left-start"`, `"right-end"`, `"right-start"`, `"bottom-end"`, `"bottom-start"`

### `disablePortal`

**Type**: `boolean`

The `children` will be under the DOM hierarchy of the parent component.

**Default**: `false`

### `anchorEl`

**Type**: `ReferenceType | (() => ReferenceType)`

An HTML element, [virtualElement](https://floating-ui.com/docs/virtual-elements),
or a function that returns either.
It's used to set the position of the popper.
The return value will passed as the reference object of the Popper instance.

❗️If anchor is `VirtualElement`, pls set container by yourself or disable portal

### `PopperProps`

**Type**: `Omit<PopperProps, "className" | "placement" | "anchorEl" | "actions"> & HTMLDataAttribute`

Props applied to Popper

### `PopperPaperProps`

**Type**: `Partial<PopperPaperProps>`

Props passed to the underlying PopperPaper component.

### `motionProps`

**Type**: `MotionProps`

props apply animation element

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

### `transformOrigin`

**Type**: `{ vertical: VerticalTransformOrigin; horizontal: HorizontalTransformOrigin; }`

force transform origin for default animation

### `shadow`

**Type**: `boolean`

If true, show border

**Default**: `true`

### `bordered`

**Type**: `boolean`

If true, show border

**Default**: `true`

### `onAvailableHeightChange`

**Type**: `(height: number) => void`

Callback fired when the available viewport height changes.

### `popperRef`

**Type**: `Ref<HTMLDivElement>`

