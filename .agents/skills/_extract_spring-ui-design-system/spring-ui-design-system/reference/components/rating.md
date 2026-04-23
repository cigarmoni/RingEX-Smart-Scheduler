# Rating

Star rating input component

## Import

```tsx
import { Rating } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"squircle"`, `"icon-hover"`, `"read-only"`, `"decimal"`, `"label"`, `"label-container"`, `"label-empty-value"`, `"empty-value-focused"`, `"visually-hidden"`, `"icon"`, `"icon-empty"`, `"icon-filled"`, `"icon-focus"`, `"squircle-content"`, `"icon-active"`

### `defaultValue`

**Type**: `number`

The default value. Use when the component is not controlled.

**Default**: `null`

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

**Default**: `false`

### `icon`

**Type**: `ReactNode`

The icon to display.

**Default**: `<Icon symbol={StarFilledMd} size="large" />`

### `emptyIcon`

**Type**: `ReactNode`

The icon to display when empty.

**Default**: `<Icon symbol={StarMd} size="large" />`

### `emptyLabelText`

**Type**: `ReactNode`

The label read when the rating input is empty.

**Default**: `'Empty'`

### `getLabelText`

**Type**: `(value: number) => string`

Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
This is important for screen reader users.

For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
@param value The rating label's value to format.
@returns

**Default**: `function defaultLabelText(value) {
return `${value || '0'} Star${value !== 1 ? 's' : ''}`;
}`

### `highlightSelectedOnly`

**Type**: `boolean`

If `true`, only the selected icon will be highlighted.

**Default**: `false`

### `IconContainerComponent`

**Type**: `ElementType<any>`

The component containing the icon.

**Default**: `'div'`

### `max`

**Type**: `number`

Maximum rating.

**Default**: `5`

### `name`

**Type**: `string`

The name attribute of the radio `input` elements.
This input `name` should be unique within the page.
Being unique within a form is insufficient since the `name` is used to generated IDs.

### `onChange`

**Type**: `(event: SyntheticEvent<Element, Event>, value: number) => void`

Callback fired when the value changes.
@param event The event source of the callback.
@param value The new value.

### `onChangeActive`

**Type**: `(event: SyntheticEvent<Element, Event>, value: number) => void`

Callback function that is fired when the hover state changes.
@param event The event source of the callback.
@param value The new value.

### `precision`

**Type**: `number`

The minimum increment value change allowed.

**Default**: `1`

### `readOnly`

**Type**: `boolean`

Removes all hover effects and pointer events.

**Default**: `false`

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

The size of the Icon component.

**Default**: `'large'`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

### `value`

**Type**: `number`

The rating value.

