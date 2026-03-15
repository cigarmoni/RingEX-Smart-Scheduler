# Button

```tsx
import { Button } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'contained' \| 'outlined' \| 'text' \| 'inverted'` | `'contained'` | Visual style |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Color scheme |
| `size` | `'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall'` | `'medium'` | Button size |
| `startIcon` | `ReactElement \| IconSymbol` | — | Icon before text |
| `endIcon` | `ReactElement \| IconSymbol` | — | Icon after text |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `fullWidth` | `boolean` | `false` | Expands to container width |
| `disabled` | `boolean` | `false` | Disabled state |
| `focusableWhenDisabled` | `boolean` | — | Keep focusable when disabled (accessibility) |
| `background` | `boolean` | `true` | Show background. Set `false` for no-bg text buttons |
| `component` | `ElementType` | `'button'` | Root element type |
| `title` | `string` | — | Tooltip text (via withTooltip HOC) |
| `CircularProgressIndicatorProps` | `object` | — | Props for the loading spinner |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |
| `href` | `string` | — | Renders as anchor when provided |

Also accepts all native `<button>` attributes via rest props.

## Variants

### Contained (default)
Solid background — primary action.
```tsx
<Button variant="contained" color="primary">Save</Button>
```

### Outlined
Border only — secondary action.
```tsx
<Button variant="outlined" color="primary">Cancel</Button>
```

### Text
No background or border — tertiary/inline action.
```tsx
<Button variant="text" color="neutral">Learn More</Button>
```

### Inverted
For use on dark/colored backgrounds.
```tsx
<Button variant="inverted" color="primary">Sign Up</Button>
```

## Colors

```tsx
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="neutral">Neutral</Button>
<Button color="danger">Delete</Button>
<Button color="warning">Warn</Button>
<Button color="success">Confirm</Button>
```

## Sizes

```tsx
<Button size="xlarge">XLarge</Button>
<Button size="large">Large</Button>
<Button size="medium">Medium</Button>
<Button size="small">Small</Button>
<Button size="xsmall">XSmall</Button>
```

## With Icons

ALWAYS pass icons as symbol references (the component itself), NOT as JSX elements.
Symbol references get wrapped in `<Icon>` internally for proper sizing and color.
JSX elements bypass the `<Icon>` wrapper and render as oversized, black SVGs.

```tsx
import { PlusMd, ArrowRightMd } from '@ringcentral/spring-icon';

// CORRECT — symbol reference:
<Button startIcon={PlusMd}>Add Item</Button>
<Button endIcon={ArrowRightMd}>Next</Button>
<Button startIcon={PlusMd} endIcon={ArrowRightMd}>Add & Continue</Button>

// BAD — JSX element (renders oversized/black icon):
// <Button startIcon={<PlusMd />}>Add Item</Button>
```

## Loading State

```tsx
<Button loading>Saving...</Button>
<Button loading variant="outlined">Processing</Button>
```

When `loading` is `true`, a `CircularProgressIndicator` replaces the `startIcon` and the button becomes non-interactive.

## Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

## As Link

```tsx
<Button component="a" href="/dashboard">Go to Dashboard</Button>
```

## Complete Example

```tsx
import { Button } from '@ringcentral/spring-ui';
import { SaveMd, TrashMd } from '@ringcentral/spring-icon';

function FormActions({ onSave, onDelete, isSaving }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="contained"
        color="primary"
        startIcon={SaveMd}
        loading={isSaving}
        onClick={onSave}
        data-testid="button-save"
      >
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
      <Button
        variant="outlined"
        color="danger"
        startIcon={TrashMd}
        onClick={onDelete}
        data-testid="button-delete"
      >
        Delete
      </Button>
      <Button variant="text" color="neutral" data-testid="button-cancel">
        Cancel
      </Button>
    </div>
  );
}
```

## Important Notes

- Do NOT apply `hover:bg-*` classes — Button has built-in hover/active states
- Do NOT control padding or height manually — use the `size` prop
- Do NOT use `className` to change colors — use the `color` prop
- The `title` prop is rendered as a tooltip (Button is wrapped with `withTooltip`)
