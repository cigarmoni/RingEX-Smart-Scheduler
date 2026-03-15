# SplitButton

```tsx
import { SplitButton } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall'` | — | Button size |
| `variant` | `'contained' \| 'outlined'` | — | Visual style |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'danger'` | — | Color scheme |
| `background` | `boolean` | — | Show background |
| `loading` | `boolean` | — | Loading state |
| `disabled` | `boolean` | — | Disabled state |
| `MenuProps` | `object` | — | Props for the dropdown menu |
| `ActionButtonProps` | `object` | — | Props for the main action button |
| `MenuButtonProps` | `object` | — | Props for the dropdown trigger button |
| `children` | `ReactNode` | — | Menu items |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<SplitButton
  variant="contained"
  color="primary"
  ActionButtonProps={{
    children: 'Save',
    onClick: handleSave,
  }}
>
  <MenuItem onClick={handleSaveAsDraft}>Save as Draft</MenuItem>
  <MenuItem onClick={handleSaveAndPublish}>Save & Publish</MenuItem>
  <MenuItem onClick={handleSaveAsTemplate}>Save as Template</MenuItem>
</SplitButton>
```

## With Loading

```tsx
<SplitButton
  variant="contained"
  color="primary"
  loading={isSaving}
  ActionButtonProps={{
    children: isSaving ? 'Saving...' : 'Save',
    onClick: handleSave,
  }}
>
  <MenuItem onClick={handleSaveAsDraft}>Save as Draft</MenuItem>
  <MenuItem onClick={handleSaveAndPublish}>Save & Publish</MenuItem>
</SplitButton>
```

## Important Notes

- SplitButton combines a primary action button with a dropdown menu of alternatives
- The main action text and handler go in `ActionButtonProps`
- Menu items are direct children
