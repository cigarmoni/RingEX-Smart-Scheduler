# Slider

Range slider for numeric input

## Import

```tsx
import { Slider } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"rail"`, `"track"`, `"empty"`, `"track-empty"`, `"thumb"`, `"thumb-inner"`, `"marks"`, `"mark-container"`, `"mark"`, `"mark-label"`, `"has-marks"`, `"value-label"`, `"value-label-paper"`, `"show-on-hover-only"`, `"show-color-at-rest"`, `"neutral"`, `"success"`, `"warning"`, `"danger"`, `"vertical"`, `"horizontal"`

### `aria-label`

**Type**: `string`

The label of the slider.

### `aria-labelledby`

**Type**: `string`

The id of the label for the slider.

### `aria-valuetext`

**Type**: `string`

A string value that provides a user-friendly name for the current value of the slider.

### `defaultValue`

**Type**: `number`

The default value. Use when the component is not controlled.

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `getAriaValueText`

**Type**: `(value: number) => string`

Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
This is important for screen reader users.
@param value The thumb label's value to format.
@returns

### `max`

**Type**: `number`

The maximum allowed value of the slider.
Should not be equal to min.

**Default**: `100`

### `min`

**Type**: `number`

The minimum allowed value of the slider.
Should not be equal to max.

**Default**: `0`

### `name`

**Type**: `string`

Name attribute of the hidden `input` element.

### `color`

**Type**: `"neutral" | "success" | "danger" | "warning"`

The color of the slider.

**Default**: `neutral`

**Options**: `"neutral"`, `"success"`, `"danger"`, `"warning"`

### `marks`

**Type**: `boolean | (Omit<Mark, "label"> & { label: string; })[]`

Controls whether step marks will be displayed underneath the Slider.
If a boolean is passed the labels rendered for the step marks will be the numerical value of the step.
If an array of Mark is passed, the label rendered will be the label from each item of the array.

**Default**: `false`

### `showColorAtRest`

**Type**: `boolean`

Controls whether the semantic colors based on the `color` prop are shown on the track and thumb in the Slider's resting state or only when hovered.
If `true`, the track and thumb will display their semantic color in the Slider's resting state.
If `false`, the track and thumb will use their default neutral colors when the Slider isn't hovered, and will be filled with their semantic colors when the Slider is hovered.

**Default**: `false`

### `valueLabelDisplay`

**Type**: `"on" | "off" | "auto"`

Controls how the value label is displayed.
If `auto`, the value label will only display when the Slider is being hovered or focused.
If `on`, the value label will display persistently.
If `off`, the value label will not display.
You can pass a function that returns a string to customize the value label via the `valueLabelFormat` prop.

**Default**: `off`

**Options**: `"on"`, `"off"`, `"auto"`

### `valueLabelFormat`

**Type**: `string | ((value: number) => string)`

Either a string to statically set the value label or a callback function to customize how the value label is formatted.
Make sure to set the `valueLabelDisplay` prop to `on` or `auto`.

**Default**: `(value) => value`

### `valueLabelTooltipProps`

**Type**: `Omit<TooltipProps, "title" | "children" | "open">`

Props applied to Tooltip component used to display the value label.

### `onChange`

**Type**: `(event: Event, value: number, activeThumb: number) => void`

Callback function that is fired when the slider's value changed.
@param event The event source of the callback.
You can pull out the new value by accessing `event.target.value` (any).
**Warning**: This is a generic event not a change event.
@param value The new value.
@param activeThumb The index of the thumb currently being moved.

### `onChangeCommitted`

**Type**: `(event: Event | SyntheticEvent<Element, Event>, value: number) => void`

Callback function that is fired when the `mouseup` is triggered.
@param event The event source of the callback. **Warning**: This is a generic event not a change event.
@param value The new value.

### `scale`

**Type**: `(value: number) => number`

A transformation function, to change the scale of the slider.
Works on aria-valuenow, aria-valuemax, aria-valuemin of input and the value for getAriaValueText

**Default**: `(value) => value`

### `step`

**Type**: `number`

The granularity with which the slider can step through values. (A "discrete" slider.)
The `min` prop serves as the origin for the valid values.
We recommend (max - min) to be evenly divisible by the step.

**Default**: `1`

### `tabIndex`

**Type**: `number`

Tab index attribute of the hidden `input` element.

### `value`

**Type**: `number`

The value of the slider.
For range sliders, provide an array with multiple values.

### `orientation`

**Type**: `"horizontal" | "vertical"`

The orientation of the slider.

**Default**: `horizontal`

**Options**: `"horizontal"`, `"vertical"`

### `shiftStep`

**Type**: `number`

The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.

**Default**: `10`

### `disableSwap`

**Type**: `boolean`

If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.

**Default**: `false`

