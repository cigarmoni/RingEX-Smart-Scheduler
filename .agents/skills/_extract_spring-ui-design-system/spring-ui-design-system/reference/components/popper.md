# Popper

Positioning wrapper for popovers

## Import

```tsx
import { Popper } from '@ringcentral/spring-ui';
```

## Props

### `anchorEl`

**Type**: `ReferenceType | (() => ReferenceType)`

An HTML element, [virtualElement](https://floating-ui.com/docs/virtual-elements),
or a function that returns either.
It's used to set the position of the popper.
The return value will passed as the reference object of the Popper instance.

❗️If anchor is `VirtualElement`, pls set container by yourself or disable portal

### `middlewares`

**Type**: `Middleware[] | ((presetMiddlewares: Middleware[]) => Middleware[])`

### `offset`

**Type**: `number`

displaces the floating element from its core placement along the specified axes.

**Default**: `0`

### `padding`

**Type**: `Padding`

The surrounding gap between the content and window edge. Can be set to a number or { top, right, bottom, left }.
Padding applies to shift and flip props.

**Default**: `0`

### `arrowHeight`

**Type**: `number`

Set arrow height. If unset or 0, not show arrow.
⚠️ **Note**: For the arrow to be rendered, `children` must be a function that receives `arrowRef` and `arrowStyle` props.

**Default**: `0`

### `arrowPadding`

**Type**: `number`

This describes the padding between the arrow and the edges of the floating element.
If your floating element has border-radius, this will prevent it from overflowing the corners.

**Default**: `0`

### `actions`

**Type**: `Ref<PopperActions>`

A ref with imperative actions.
It allows to update position of popper.

### `autoUpdate`

**Type**: `boolean | AutoUpdateOptions`

To improve performance about auto update popper position.
If true, use default config.
If false, disable auto update.

**Default**: `true`

### `matchAnchorWidth`

**Type**: `boolean`

If true, the popper will match the width of the anchor element.

### `children`

**Type**: `(ReactNode | ((props: { placement: Placement; arrowRef: RefObject<HTMLDivElement>; arrowStyle: CSSProperties; }) => ReactNode)) & ReactNode`

The content of the popper. Can be a ReactNode or a function.
When using `arrowHeight`, `children` must be a function that receives:
- `placement`: The computed placement of the popper
- `arrowRef`: A ref to attach to the arrow element
- `arrowStyle`: Style object to apply to the arrow element for positioning

### `placement`

**Type**: `"top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start"`

**Options**: `"top"`, `"left"`, `"right"`, `"bottom"`, `"top-end"`, `"top-start"`, `"left-end"`, `"left-start"`, `"right-end"`, `"right-start"`, `"bottom-end"`, `"bottom-start"`

### `platform`

**Type**: `Platform`

### `whileElementsMounted`

**Type**: `(reference: ReferenceType, floating: HTMLElement, update: () => void) => () => void`

A callback invoked when both the reference and floating elements are
mounted, and cleaned up when either is unmounted. This is useful for
setting up event listeners (e.g. pass `autoUpdate`).

### `elements`

**Type**: `{ reference?: ReferenceType; floating?: HTMLElement; }`

Object containing the reference and floating elements.

### `open`

**Type**: `boolean`

The `open` state of the floating element to synchronize with the
`isPositioned` value.

**Default**: `false`

### `transform`

**Type**: `boolean`

Whether to use `transform` for positioning instead of `top` and `left`
(layout) in the `floatingStyles` object.

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

