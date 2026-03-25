# IconButton / IconButtonGroup

```tsx
import { IconButton, IconButtonGroup } from '@ringcentral/spring-ui';
```

## IconButton Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'contained' \| 'outlined' \| 'text' \| 'inverted'` | `'text'` | Visual style |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'danger' \| 'warning' \| 'success'` | `'neutral'` | Color scheme |
| `size` | `'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall'` | `'medium'` | Icon button size |
| `symbol` | `IconSymbol` | — | Icon symbol (alternative to children) |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Shows spinner |
| `title` | `string` | — | Tooltip text |
| `aria-label` | `string` | — | Required accessibility label |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## IconButtonGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `border` | `boolean` | — | Show border around group |
| `component` | `ElementType` | `'div'` | Root element type |
| `children` | `ReactNode` | — | IconButton elements |

## Usage

### Basic

ALWAYS use the `symbol` prop to pass icons. Do NOT pass icon elements as children —
children bypass the `<Icon>` wrapper and render as unsized, black SVGs.

```tsx
import { IconButton } from '@ringcentral/spring-ui';
import { EditMd, TrashMd, SettingsMd } from '@ringcentral/spring-icon';

// CORRECT — symbol prop:
<IconButton symbol={EditMd} aria-label="Edit" />
<IconButton symbol={TrashMd} aria-label="Delete" color="danger" />
<IconButton symbol={SettingsMd} aria-label="Settings" />

// BAD — children bypass Icon wrapper:
// <IconButton aria-label="Edit"><EditMd /></IconButton>
```

### Variants
```tsx
<IconButton variant="contained" color="primary" symbol={PlusMd} aria-label="Add" />
<IconButton variant="outlined" color="neutral" symbol={SettingsMd} aria-label="Settings" />
<IconButton variant="text" color="neutral" symbol={OverflowMd} aria-label="More" />
```

### IconButtonGroup
```tsx
<IconButtonGroup>
  <IconButton symbol={BoldMd} aria-label="Bold" />
  <IconButton symbol={ItalicMd} aria-label="Italic" />
  <IconButton symbol={UnderlineMd} aria-label="Underline" />
</IconButtonGroup>

<IconButtonGroup orientation="vertical" border>
  <IconButton symbol={LeftAlignMd} aria-label="Align Left" />
  <IconButton symbol={CenterAlignMd} aria-label="Align Center" />
  <IconButton symbol={RightAlignMd} aria-label="Align Right" />
</IconButtonGroup>
```

## Important Notes

- Always provide `aria-label` for accessibility — icon buttons have no visible text
- Do NOT add `hover:bg-*` classes — built-in hover states
- ALWAYS use the `symbol` prop, never pass icons as children
