# Avatar

User avatar image

## Import

```tsx
import { Avatar } from '@ringcentral/spring-ui';
```

## Props

### `alt`

**Type**: `string`

Used in combination with `src` or `srcSet` to
provide an alt attribute for the rendered `img` element.

### `children`

**Type**: `ReactNode`

Used to render text elements inside the Avatar if `src` or `srcSet` is not set.
This can be an element, or just a string.

### `imgProps`

**Type**: `Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "alt" | "src" | "srcSet">`

[Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
It can be used to listen for the loading error event.

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxsmall"`

The size of the component.

**Default**: `'xlarge'`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxsmall"`

### `src`

**Type**: `string`

The `src` attribute for the `img` element.
If an error occurs while loading the avatar image, it will fallback to alternatives in the following order:
1. The provided children string.
2. The first letter of the alt text.
3. A generic icon. (**Only applies to variant 'circle'**)

### `srcSet`

**Type**: `string`

The `srcSet` attribute for the `img` element.
Use this attribute for responsive image display.

### `symbol`

**Type**: `ComponentType<{}>`

Icon symbol.

### `variant`

**Type**: `"circle" | "squircle"`

The variant to use.

**Default**: `'circle'`

**Options**: `"circle"`, `"squircle"`

### `color`

**Type**: `"primary" | "default"`

The color of the component.

**Default**: `'default'`

**Options**: `"primary"`, `"default"`

### `component`

**Type**: `"div"`

This will apply to the avatar shape node
The component used for the root node.
Either a string to use a HTML element or a component.

**Default**: `div`

### `clickable`

**Type**: `boolean`

If this component is clickable. When enabled hover, pressed and focus states are triggered.

### `avatarShapeRef`

**Type**: `Ref<HTMLButtonElement | HTMLDivElement>`

Props of the avatar shape

### `showStatusIndicator`

**Type**: `boolean`

If `true`, the Avatar will show a StatusIndicator component. Does not apply to the `xxsmall`/`xsmall` sizes.

### `IndicatorProps`

**Type**: `StatusIndicatorProps`

Props passed to the StatusIndicator component. Only applicable if `showStatusIndicator` is `true`.

### `rootProps`

**Type**: `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "classes" | "className"> & Partial<...>`

Attributes applied to root

### `disabled`

**Type**: `boolean`

If `true`, the component is disabled.

### `onFocusVisible`

**Type**: `FocusEventHandler<Element>`

invoke when focusVisiable or focusVisibleWithin is true

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"clickable"`, `"indicator"`, `"circle"`, `"squircle"`, `"content"`, `"img"`, `"hover-tint"`, `"shape"`, `"xxlarge"`, `"xlarge"`, `"large"`, `"medium"`, `"small"`, `"xsmall"`, `"xxsmall"`, `"default"`, `"primary"`

