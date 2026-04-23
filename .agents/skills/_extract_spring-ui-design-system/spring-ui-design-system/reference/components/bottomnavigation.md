# BottomNavigation

Bottom navigation bar

## Import

```tsx
import { BottomNavigation } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"full-width"`, `"item-wrapper"`, `"description"`, `"empty-slot"`

### `defaultValue`

**Type**: `string & (string | number | readonly string[])`

The default value. Use when the component is not controlled.

### `value`

**Type**: `string`

The value of the activated navigation item.

### `defaultData`

**Type**: `{ visible: string[]; more?: string[]; }`

The default data of navigation items. Use when the component is not controlled.

### `data`

**Type**: `{ visible: string[]; more?: string[]; }`

The data of navigation items.
The max count of visible items is **6**,
it would be **5** due to the appearance of more button when there are items in more section.

### `onChange`

**Type**: `(event: SyntheticEvent<Element, Event>, value: string) => void`

Callback invoked when new value is being set.

### `renderItem`

**Type**: `(value: string) => ReactNode`

Used when rendering the navigation items.
@param value value of current navigation item
@returns

### `MoreProps`

**Type**: `Omit<BottomNavigationItemProps<string>, "symbol">`

Props applied to the more button (which only appears when there are items in the more section.)

### `description`

**Type**: `ReactNode`

Shows up at the bottom when more section expanded.

### `onCollapse`

**Type**: `(event: SyntheticEvent<Element, Event>, reason: CollapseReason) => void`

Invoke when more section collapsed.

### `fullWidth`

**Type**: `boolean`

If `true`, the bottom navigation will take up the full width of its container.

### `slot`

**Type**: `string`

### `title`

**Type**: `string`

### `defaultChecked`

**Type**: `boolean`

### `suppressContentEditableWarning`

**Type**: `boolean`

### `suppressHydrationWarning`

**Type**: `boolean`

### `accessKey`

**Type**: `string`

### `className`

**Type**: `string`

className for `root` slot

### `contentEditable`

**Type**: `Booleanish | "inherit"`

### `contextMenu`

**Type**: `string`

### `dir`

**Type**: `string`

### `draggable`

**Type**: `Booleanish`

### `hidden`

**Type**: `boolean`

### `id`

**Type**: `string`

### `lang`

**Type**: `string`

### `placeholder`

**Type**: `string`

### `spellCheck`

**Type**: `Booleanish`

### `tabIndex`

**Type**: `number`

### `translate`

**Type**: `"yes" | "no"`

**Options**: `"yes"`, `"no"`

### `radioGroup`

**Type**: `string`

### `role`

**Type**: `string`

### `about`

**Type**: `string`

### `datatype`

**Type**: `string`

### `inlist`

**Type**: `any`

### `prefix`

**Type**: `string`

### `property`

**Type**: `string`

### `resource`

**Type**: `string`

### `typeof`

**Type**: `string`

### `vocab`

**Type**: `string`

### `autoCapitalize`

**Type**: `string`

### `autoCorrect`

**Type**: `string`

### `autoSave`

**Type**: `string`

### `color`

**Type**: `string`

### `itemProp`

**Type**: `string`

### `itemScope`

**Type**: `boolean`

### `itemType`

**Type**: `string`

### `itemID`

**Type**: `string`

### `itemRef`

**Type**: `string`

### `results`

**Type**: `number`

### `security`

**Type**: `string`

### `unselectable`

**Type**: `"on" | "off"`

**Options**: `"on"`, `"off"`

### `inputMode`

**Type**: `"text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"`

**Options**: `"text"`, `"none"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, `"search"`

### `is`

**Type**: `string`

### `aria-activedescendant`

**Type**: `string`

### `aria-atomic`

**Type**: `boolean | "true" | "false"`

### `aria-autocomplete`

**Type**: `"none" | "inline" | "list" | "both"`

**Options**: `"none"`, `"inline"`, `"list"`, `"both"`

### `aria-busy`

**Type**: `boolean | "true" | "false"`

### `aria-checked`

**Type**: `boolean | "true" | "false" | "mixed"`

### `aria-colcount`

**Type**: `number`

### `aria-colindex`

**Type**: `number`

### `aria-colspan`

**Type**: `number`

### `aria-controls`

**Type**: `string`

### `aria-current`

**Type**: `boolean | "time" | "true" | "false" | "page" | "step" | "location" | "date"`

### `aria-describedby`

**Type**: `string`

### `aria-details`

**Type**: `string`

### `aria-disabled`

**Type**: `boolean | "true" | "false"`

### `aria-dropeffect`

**Type**: `"link" | "none" | "copy" | "execute" | "move" | "popup"`

**Options**: `"link"`, `"none"`, `"copy"`, `"execute"`, `"move"`, `"popup"`

### `aria-errormessage`

**Type**: `string`

### `aria-expanded`

**Type**: `boolean | "true" | "false"`

### `aria-flowto`

**Type**: `string`

### `aria-grabbed`

**Type**: `boolean | "true" | "false"`

### `aria-haspopup`

**Type**: `boolean | "dialog" | "menu" | "true" | "false" | "listbox" | "tree" | "grid"`

### `aria-hidden`

**Type**: `boolean | "true" | "false"`

### `aria-invalid`

**Type**: `boolean | "true" | "false" | "grammar" | "spelling"`

### `aria-keyshortcuts`

**Type**: `string`

### `aria-label`

**Type**: `string`

### `aria-labelledby`

**Type**: `string`

### `aria-level`

**Type**: `number`

### `aria-live`

**Type**: `"off" | "assertive" | "polite"`

**Options**: `"off"`, `"assertive"`, `"polite"`

### `aria-modal`

**Type**: `boolean | "true" | "false"`

### `aria-multiline`

**Type**: `boolean | "true" | "false"`

### `aria-multiselectable`

**Type**: `boolean | "true" | "false"`

### `aria-orientation`

**Type**: `"horizontal" | "vertical"`

**Options**: `"horizontal"`, `"vertical"`

### `aria-owns`

**Type**: `string`

### `aria-placeholder`

**Type**: `string`

### `aria-posinset`

**Type**: `number`

### `aria-pressed`

**Type**: `boolean | "true" | "false" | "mixed"`

### `aria-readonly`

**Type**: `boolean | "true" | "false"`

### `aria-relevant`

**Type**: `"text" | "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals"`

**Options**: `"text"`, `"additions"`, `"additions removals"`, `"additions text"`, `"all"`, `"removals"`, `"removals additions"`, `"removals text"`, `"text additions"`, `"text removals"`

### `aria-required`

**Type**: `boolean | "true" | "false"`

### `aria-roledescription`

**Type**: `string`

### `aria-rowcount`

**Type**: `number`

### `aria-rowindex`

**Type**: `number`

### `aria-rowspan`

**Type**: `number`

### `aria-selected`

**Type**: `boolean | "true" | "false"`

### `aria-setsize`

**Type**: `number`

### `aria-sort`

**Type**: `"none" | "ascending" | "descending" | "other"`

**Options**: `"none"`, `"ascending"`, `"descending"`, `"other"`

### `aria-valuemax`

**Type**: `number`

### `aria-valuemin`

**Type**: `number`

### `aria-valuenow`

**Type**: `number`

### `aria-valuetext`

**Type**: `string`

### `dangerouslySetInnerHTML`

**Type**: `{ __html: string; }`

### `onCopy`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onCopyCapture`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onCut`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onCutCapture`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onPaste`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onPasteCapture`

**Type**: `ClipboardEventHandler<HTMLDivElement>`

### `onCompositionEnd`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onCompositionEndCapture`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onCompositionStart`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onCompositionStartCapture`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onCompositionUpdate`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onCompositionUpdateCapture`

**Type**: `CompositionEventHandler<HTMLDivElement>`

### `onFocus`

**Type**: `FocusEventHandler<HTMLDivElement>`

### `onFocusCapture`

**Type**: `FocusEventHandler<HTMLDivElement>`

### `onBlur`

**Type**: `FocusEventHandler<HTMLDivElement>`

### `onBlurCapture`

**Type**: `FocusEventHandler<HTMLDivElement>`

### `onChangeCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onBeforeInput`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onBeforeInputCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onInput`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onInputCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onReset`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onResetCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onSubmit`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onSubmitCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onInvalid`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onInvalidCapture`

**Type**: `FormEventHandler<HTMLDivElement>`

### `onLoad`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onError`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onErrorCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onKeyDown`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyDownCapture`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyPress`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyPressCapture`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyUp`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onKeyUpCapture`

**Type**: `KeyboardEventHandler<HTMLDivElement>`

### `onAbort`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onAbortCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onCanPlay`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onCanPlayCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onCanPlayThrough`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onCanPlayThroughCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onDurationChange`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onDurationChangeCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEmptied`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEmptiedCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEncrypted`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEncryptedCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEnded`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onEndedCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadedData`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadedDataCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadedMetadata`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadedMetadataCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadStart`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onLoadStartCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPause`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPauseCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPlay`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPlayCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPlaying`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onPlayingCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onProgress`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onProgressCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onRateChange`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onRateChangeCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSeeked`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSeekedCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSeeking`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSeekingCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onStalled`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onStalledCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSuspend`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSuspendCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onTimeUpdate`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onTimeUpdateCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onVolumeChange`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onVolumeChangeCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onWaiting`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onWaitingCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onAuxClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onAuxClickCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onClickCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onContextMenu`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onContextMenuCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onDoubleClick`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onDoubleClickCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onDragCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragEndCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragEnter`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragEnterCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragExit`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragExitCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragLeave`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragLeaveCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragOver`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragOverCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDragStartCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDrop`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onDropCapture`

**Type**: `DragEventHandler<HTMLDivElement>`

### `onMouseDown`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseDownCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseEnter`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseLeave`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseMove`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseMoveCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseOut`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseOutCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseOver`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseOverCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseUp`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onMouseUpCapture`

**Type**: `MouseEventHandler<HTMLDivElement>`

### `onSelect`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onSelectCapture`

**Type**: `ReactEventHandler<HTMLDivElement>`

### `onTouchCancel`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchCancelCapture`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchEnd`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchEndCapture`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchMove`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchMoveCapture`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchStart`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onTouchStartCapture`

**Type**: `TouchEventHandler<HTMLDivElement>`

### `onPointerDown`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerDownCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerMove`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerMoveCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerUp`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerUpCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerCancel`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerCancelCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerEnter`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerEnterCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerLeave`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerLeaveCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerOver`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerOverCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerOut`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onPointerOutCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onGotPointerCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onGotPointerCaptureCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onLostPointerCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onLostPointerCaptureCapture`

**Type**: `PointerEventHandler<HTMLDivElement>`

### `onScroll`

**Type**: `UIEventHandler<HTMLDivElement>`

### `onScrollCapture`

**Type**: `UIEventHandler<HTMLDivElement>`

### `onWheel`

**Type**: `WheelEventHandler<HTMLDivElement>`

### `onWheelCapture`

**Type**: `WheelEventHandler<HTMLDivElement>`

### `onAnimationStartCapture`

**Type**: `AnimationEventHandler<HTMLDivElement>`

### `onAnimationEnd`

**Type**: `AnimationEventHandler<HTMLDivElement>`

### `onAnimationEndCapture`

**Type**: `AnimationEventHandler<HTMLDivElement>`

### `onAnimationIteration`

**Type**: `AnimationEventHandler<HTMLDivElement>`

### `onAnimationIterationCapture`

**Type**: `AnimationEventHandler<HTMLDivElement>`

### `onTransitionEnd`

**Type**: `TransitionEventHandler<HTMLDivElement>`

### `onTransitionEndCapture`

**Type**: `TransitionEventHandler<HTMLDivElement>`

