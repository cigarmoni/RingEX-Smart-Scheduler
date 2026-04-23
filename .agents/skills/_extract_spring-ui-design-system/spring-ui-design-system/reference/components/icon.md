# Icon

Icon component

## Import

```tsx
import { Icon } from '@ringcentral/spring-ui';
```

## Props

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"svg"`, `"xsmall"`, `"small"`, `"medium"`, `"large"`, `"xlarge"`, `"xxlarge"`, `"xxxlarge"`

### `symbol`

**Type**: `ComponentType<any>`

Component for render, higher priority than `children`

### `children`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>> & ReactNode`

Element for render

### `size`

**Type**: `"small" | "xlarge" | "large" | "medium" | "xsmall" | "xxlarge" | "xxxlarge"`

Size of the icon.
@remarks The available sizes are:
- `"xsmall": 12px`
- `"small": 16px`
- `"medium": 20px`
- `"large": 24px`
- `"xlarge": 32px`
- `"xxlarge": 36px`
- `"xxxlarge": 40px`

**Options**: `"small"`, `"xlarge"`, `"large"`, `"medium"`, `"xsmall"`, `"xxlarge"`, `"xxxlarge"`

