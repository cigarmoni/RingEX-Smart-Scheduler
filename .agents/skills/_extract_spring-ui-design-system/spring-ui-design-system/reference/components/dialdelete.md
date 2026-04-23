# DialDelete

Delete button for dialer

## Import

```tsx
import { DialDelete } from '@ringcentral/spring-ui';
```

## Props

### `children`

**Type**: `ReactElement<any, string | JSXElementConstructor<any>> & ReactNode`

that children for host delete behaviors

### `onDelete`

**Type**: `(e: MouseEvent<unknown, MouseEvent> | TouchEvent<unknown> | KeyboardEvent<unknown>, reason: DialPadOnChangeReason) => void`

trigger when delete

### `onClear`

**Type**: `(e: MouseEvent<unknown, MouseEvent> | TouchEvent<unknown> | KeyboardEvent<unknown>, reason: DialPadOnChangeReason) => void`

trigger when clear

### `externalWindow`

**Type**: `Window`

