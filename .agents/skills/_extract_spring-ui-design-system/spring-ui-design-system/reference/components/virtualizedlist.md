# VirtualizedList

Virtualized list for performance

## Import

```tsx
import { VirtualizedList } from '@ringcentral/spring-ui';
```

## Props

### `isReady`

**Type**: `boolean`

Flag to indicate if the VirtualizedList is ready and can process actions. If set to `false`
and the `focusByIndex` action is called, the component will wait for the `isReady` flag to be
true before processing the action.

**Default**: `true`

### `infinite`

**Type**: `boolean`

If true, will disable some keyboard navigation logic that cannot implement in infinite list

### `virtuosoActions`

**Type**: `Ref<VirtuosoHandle>`

A ref with virtuoso actions

### `actions`

**Type**: `Ref<VirtualizedListActions>`

A ref with virtualized list actions

### `keepInvisibleItems`

**Type**: `number[]`

An array of indexes to make certain items don't be unmount.
This prop must be used with prop `computeItemKey`.

### `isItemDisabled`

**Type**: `(index: number) => boolean`

### `ListProps`

**Type**: `ListProps`

### `firstFocusIndex`

**Type**: `number`

The index of the item to automatically focus on when the list is focused.

**Default**: `0`

### `data`

**Type**: `readonly unknown[]`

The data items to be rendered. If data is set, the total count will be inferred from the length of the array.

### `isScrolling`

**Type**: `(isScrolling: boolean) => void`

Called when the list starts/stops scrolling.

### `scrollerRef`

**Type**: `(ref: HTMLElement | Window) => any`

Provides access to the root DOM element

### `computeItemKey`

**Type**: `ComputeItemKey<unknown, Omit<{}, "data" | "searchAndFocusItemHandler" | "isScrolling" | "scrollerRef" | "listRef" | "listActions" | "ListProps" | "computeItemKey" | "itemContentRenderer" | "keepInvisibleItems"> & { ...; } & Pick<...>>`

If specified, the component will use the function to generate the `key` property for each list item.

### `totalCount`

**Type**: `number`

The total amount of items to be rendered.

### `context`

**Type**: `Omit<{}, "data" | "searchAndFocusItemHandler" | "isScrolling" | "scrollerRef" | "listRef" | "listActions" | "ListProps" | "computeItemKey" | "itemContentRenderer" | "keepInvisibleItems"> & { ...; } & Pick<...>`

Additional context available in the custom components and content callbacks

### `overscan`

**Type**: `number | { main: number; reverse: number; }`

*The property accepts pixel values.*

Set the overscan property to make the component "chunk" the rendering of new items on scroll.
The property causes the component to render more items than the necessary, but reduces the re-renders on scroll.
Setting `{ main: number, reverse: number }` lets you extend the list in both the main and the reverse scrollable directions.
See the `increaseViewportBy` property for a similar behavior (equivalent to the `overscan` in react-window).

### `increaseViewportBy`

**Type**: `number | { top: number; bottom: number; }`

*The property accepts pixel values.*

Set the increaseViewportBy property to artificially increase the viewport size, causing items to be rendered before outside of the viewport.
The property causes the component to render more items than the necessary, but can help with slow loading content.
Using `{ top?: number, bottom?: number }` lets you set the increase for each end separately.

### `topItemCount`

**Type**: `number`

Set the amount of items to remain fixed at the top of the list.

For a header that scrolls away when scrolling, check the `components.Header` property.

### `initialTopMostItemIndex`

**Type**: `number | IndexLocationWithAlign`

Set to a value between 0 and totalCount - 1 to make the list start scrolled to that item.
Pass in an object to achieve additional effects similar to `scrollToIndex`.

### `initialScrollTop`

**Type**: `number`

Set this value to offset the initial location of the list.
Warning: using this property will still run a render cycle at the scrollTop: 0 list window.
If possible, avoid using it and stick to `initialTopMostItemIndex` instead.

### `initialItemCount`

**Type**: `number`

Use for server-side rendering - if set, the list will render the specified amount of items
regardless of the container / item size.

### `components`

**Type**: `Components<unknown, Omit<{}, "data" | "searchAndFocusItemHandler" | "isScrolling" | "scrollerRef" | "listRef" | "listActions" | "ListProps" | "computeItemKey" | "itemContentRenderer" | "keepInvisibleItems"> & { ...; } & Pick<...>>`

Use the `components` property for advanced customization of the elements rendered by the list.

### `defaultItemHeight`

**Type**: `number`

By default, the component assumes the default item height from the first rendered item (rendering it as a "probe").

If the first item turns out to be an outlier (very short or tall), the rest of the rendering will be slower,
as multiple passes of rendering should happen for the list to fill the viewport.

Setting `defaultItemHeight` causes the component to skip the "probe" rendering and use the property
value as default height instead.

### `itemSize`

**Type**: `SizeFunction`

Allows customizing the height/width calculation of `Item` elements.

The default implementation reads `el.getBoundingClientRect().height` and `el.getBoundingClientRect().width`.

### `fixedItemHeight`

**Type**: `number`

Can be used to improve performance if the rendered items are of known size.
Setting it causes the component to skip item measurements.

### `scrollSeekConfiguration`

**Type**: `false | ScrollSeekConfiguration`

Use to display placeholders if the user scrolls fast through the list.

Set `components.ScrollSeekPlaceholder` to change the placeholder content.

### `followOutput`

**Type**: `FollowOutput`

If set to `true`, the list automatically scrolls to bottom if the total count is changed.
Set to `"smooth"` for an animated scrolling.

By default, `followOutput` scrolls down only if the list is already at the bottom.
To implement an arbitrary logic behind that, pass a function:

```tsx
<Virtuoso
 followOutput={(isAtBottom: boolean) => {
   if (expression) {
     return 'smooth' // can be 'auto' or false to avoid scrolling
   } else {
     return false
   }
 }} />
```

### `headerFooterTag`

**Type**: `string`

Set to customize the wrapper tag for the header and footer components (default is `div`).

### `firstItemIndex`

**Type**: `number`

Use when implementing inverse infinite scrolling - decrease the value this property
in combination with  `data` or `totalCount` to prepend items to the top of the list.

Warning: the firstItemIndex should **be a positive number**, based on the total amount of items to be displayed.

### `endReached`

**Type**: `(index: number) => void`

Gets called when the user scrolls to the end of the list.
Receives the last item index as an argument. Can be used to implement endless scrolling.

### `startReached`

**Type**: `(index: number) => void`

Called when the user scrolls to the start of the list.

### `rangeChanged`

**Type**: `(range: ListRange) => void`

Called with the new set of items each time the list items are rendered due to scrolling.

### `atBottomStateChange`

**Type**: `(atBottom: boolean) => void`

Called with true / false when the list has reached the bottom / gets scrolled up.
Can be used to load newer items, like `tail -f`.

### `atTopStateChange`

**Type**: `(atTop: boolean) => void`

Called with `true` / `false` when the list has reached the top / gets scrolled down.

### `totalListHeightChanged`

**Type**: `(height: number) => void`

Called when the total list height is changed due to new items or viewport resize.

### `itemsRendered`

**Type**: `(items: ListItem<unknown>[]) => void`

Called with the new set of items each time the list items are rendered due to scrolling.

### `alignToBottom`

**Type**: `boolean`

Setting `alignToBottom` to `true` aligns the items to the bottom of the list if the list is shorter than the viewport.
Use `followOutput` property to keep the list aligned when new items are appended.

### `useWindowScroll`

**Type**: `boolean`

Uses the document scroller rather than wrapping the list in its own.

### `customScrollParent`

**Type**: `HTMLElement`

Pass a reference to a scrollable parent element, so that the list won't wrap in its own.

### `atTopThreshold`

**Type**: `number`

*The property accepts pixel values.*

By default `0`. Redefine to change how much away from the top the scroller can be before the list is not considered not at top.

### `atBottomThreshold`

**Type**: `number`

*The property accepts pixel values.*

By default `4`. Redefine to change how much away from the bottom the scroller can be before the list is not considered not at bottom.

### `logLevel`

**Type**: `"0" | "1" | "2" | "3"`

set to LogLevel.DEBUG to enable various diagnostics in the console, the most useful being the item measurement reports.

Ensure that you have "all levels" enabled in the browser console too see the messages.

**Options**: `"0"`, `"1"`, `"2"`, `"3"`

### `restoreStateFrom`

**Type**: `StateSnapshot`

pass a state obtained from the getState() method to restore the list state - this includes the previously measured item sizes and the scroll location.
Notice that you should still pass the same data and totalCount properties as before, so that the list can match the data with the stored measurements.
This is useful when you want to keep the list state when the component is unmounted and remounted, for example when navigating to a different page.

