# Tooltip

Tooltip overlay

## Import

```tsx
import { Tooltip } from '@ringcentral/spring-ui';
```

## Props

### `disableBackdropAnimation`

**Type**: `boolean`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

### `className`

**Type**: `string`

className for `root` slot

### `color`

**Type**: `"neutral" | "success" | "danger" | "inverted"`

color for tooltip

**Options**: `"neutral"`, `"success"`, `"danger"`, `"inverted"`

### `size`

**Type**: `"small" | "medium"`

The size of the tooltip.

**Default**: `'small'`

**Options**: `"small"`, `"medium"`

### `placement`

**Type**: `"top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start"`

**Options**: `"top"`, `"left"`, `"right"`, `"bottom"`, `"top-end"`, `"top-start"`, `"left-end"`, `"left-start"`, `"right-end"`, `"right-start"`, `"bottom-end"`, `"bottom-start"`

### `icon`

**Type**: `ComponentType<any>`

icon for tooltip

### `disableInteractions`

**Type**: `boolean`

If `true`, interactions within the TooltipView will be disabled. This ensures that mouse events
on the surrounding elements will not be blocked by the Tooltip. When controlling the `open` prop
of the Tooltip component yourself, this prop will be implicitly set to `false`.

**Default**: `true`

### `PopperProps`

**Type**: `Omit<PopperProps, "className" | "anchorEl"> & HTMLDataAttribute`

Props applied to Popper

### `PopperPaperProps`

**Type**: `Partial<PopperPaperProps>`

Props passed to the underlying PopperPaper component.

### `motionProps`

**Type**: `MotionProps`

### `tooltipForceHide`

**Type**: `boolean`

If `true`, the tooltip will be hidden by setting css display to none.
This is useful when you want to hide the tooltip while the mouse is still in the anchor element.

### `title`

**Type**: `ReactNode`

Tooltip title. Zero-length titles string, undefined, null and false are never displayed.

### `children`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>> & ReactNode`

Tooltip reference element.

### `open`

**Type**: `boolean`

If `true`, the tooltip is shown.

### `onOpenStateChange`

**Type**: `(event: Event, isOpen: boolean) => void`

Callback fired when the component's open state changed.
Only for uncontrolled mode.

### `delay`

**Type**: `number | boolean`

If `true`, use a 1500ms delay.

**Default**: `false`

### `disableFocusListener`

**Type**: `boolean`

Do not respond to focus-visible events.

### `triggerWhenDisabled`

**Type**: `boolean`

If enabled, wraps the anchor element in a `span` to ensure the Tooltip
can still be triggered even if the anchor element has pointer events disabled.

**When to use:**
- Disabled buttons or controls
- Elements with `pointer-events: none`
- Custom components with disabled states

**Recommended pattern:** Control this prop with the same state that disables the child.
@example ```tsx
// ✅ Good: Control with same state
const [disabled, setDisabled] = useState(true);
<Tooltip triggerWhenDisabled={disabled} title="Upgrade required">
  <Button disabled={disabled}>Premium Feature</Button>
</Tooltip>

// ❌ Avoid: Static true on non-disabled element
<Tooltip triggerWhenDisabled title="Info">
  <Button>Active Button</Button>
</Tooltip>
```

Use `triggerWrapperProps` to customize the wrapper element attributes.

**Default**: `false`

### `triggerWrapperProps`

**Type**: `HTMLAttributes<HTMLSpanElement>`

Attributes to be applied to the wrapper `<span>` element when
`triggerWhenDisabled` is enabled.
@example ```tsx
<Tooltip
  triggerWhenDisabled
  triggerWrapperProps={{ className: 'custom-wrapper', 'data-testid': 'tooltip-wrapper' }}
>
  <Button disabled>Disabled</Button>
</Tooltip>
```

### `describeChild`

**Type**: `boolean`

Set to `true` if the `title` acts as an accessible description.
By default the `title` acts as an accessible label for the child.

**Default**: `false`

