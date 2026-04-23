# DialPad

DialPad component for entering phone numbers with keypad buttons.

**Usage**: DialPad is typically used within a Dialer component along with DialTextField for a complete dialing experience.

## Import

```tsx
import { DialPad } from '@ringcentral/spring-ui';
```

## Props

### `onChange`

**Type**: `(value: string, reason: DialPadOnChangeReason) => void`

trigger when value change, `reason` for trigger from what event

`reason` will be `customKeyboard` when it trigger by `useDiaKeyboard`.

### `sounds`

**Type**: `DialPadSoundMap`

keypad sounds

By default, we not have any sound for best file size for you can define when and what audio you need
should pass sound map when you want play sound.
@example ```ts
import { DialerPadSoundsMPEG } from '@ringcentral/spring-ui';
import { DialerPadSoundsOGG } from '@ringcentral/spring-ui';
```

### `volume`

**Type**: `number`

volume of keypad sound

### `muted`

**Type**: `boolean`

is keypad sound muted

### `sinkId`

**Type**: `string`

sinkId of keypad sound
@important Safari is not supported the `setSinkId` method
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility

### `longPressDelay`

**Type**: `number`

long press '0' time to typing '+'

**Default**: `1000ms`

### `persistBgTime`

**Type**: `number`

time of persist button background when manual trigger by 'actionRef'
button background will not persist if persistBgTime less than 0

**Default**: `200`

### `autoSize`

**Type**: `boolean`

make that dialPad size auto fixed container width

**Default**: `true`

### `action`

**Type**: `Ref<DialPadAction>`

can manual trigger audio by ref

### `control`

**Type**: `Ref<DialPadControl>`

control inner action,
### you should use with `useDialKeyboard`

### `getDialPadButtonProps`

**Type**: `(value: DIALER_PAD_ICON_VALUES) => Omit<IconButtonProps<"button">, "onFocus" | "onKeyDown" | "value"> & HTMLDataAttribute`

method to get addition props for below each `DialPadButton`

### `size`

**Type**: `"large" | "medium"`

size of dialPad

**Default**: `'large'`

**Options**: `"large"`, `"medium"`

### `classes`

**Type**: `ClassesOverride`

Override or extend the styles applied to the component

**Available keys**: `"root"`, `"auto-size"`

