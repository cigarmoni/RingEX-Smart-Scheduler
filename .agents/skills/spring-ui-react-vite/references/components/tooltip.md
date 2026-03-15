# Tooltip

```tsx
import { Tooltip } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string \| ReactNode` | — | Tooltip content |
| `children` | `ReactElement` | — | Trigger element (must accept ref) |
| `open` | `boolean` | — | Controlled open state |
| `delay` | `boolean \| number` | `false` | Delay before showing |
| `onOpenStateChange` | `(open: boolean) => void` | — | Open state callback |
| `triggerWhenDisabled` | `boolean` | — | Show tooltip on disabled elements |
| `triggerWrapperProps` | `object` | — | Props for the wrapper element |
| `disableFocusListener` | `boolean` | — | Disable focus trigger |
| `describeChild` | `boolean` | `false` | Use aria-describedby instead of aria-label |
| `tooltipId` | `string` | — | Custom tooltip ID |
| `renderTooltip` | `(props) => ReactNode` | — | Custom tooltip render function |

Note: `placement` is set via `PopperProps` or the underlying Popper.

## Basic Usage

```tsx
<Tooltip title="Save changes">
  <Button>Save</Button>
</Tooltip>
```

## On IconButton

```tsx
<Tooltip title="Edit item">
  <IconButton symbol={EditMd} aria-label="Edit" />
</Tooltip>
```

Many Spring UI components accept a `title` prop directly which renders as a tooltip (via the `withTooltip` HOC). You don't always need to wrap in `<Tooltip>` explicitly:

```tsx
<Button title="Save your changes">Save</Button>
<IconButton symbol={EditMd} title="Edit" aria-label="Edit" />
```

## With Delay

```tsx
<Tooltip title="More info" delay>
  <Icon symbol={InfoMd} size="medium" />
</Tooltip>
```

## On Disabled Elements

```tsx
<Tooltip title="You don't have permission" triggerWhenDisabled>
  <Button disabled>Submit</Button>
</Tooltip>
```

## Custom Content

```tsx
<Tooltip
  title={
    <div>
      <strong>Keyboard Shortcut</strong>
      <br />
      Ctrl + S
    </div>
  }
>
  <Button>Save</Button>
</Tooltip>
```
