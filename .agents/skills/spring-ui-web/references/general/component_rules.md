# Spring UI Component Rules

## Use Spring UI Components

**Always** use Spring UI components from `@ringcentral/spring-ui` when a reusable component exists. Never create your own button, input, select, checkbox, or other standard form/UI element when Spring UI provides one.

**Exception:** When the user explicitly requests something else or needs functionality not supported by Spring UI components.

## Button Component

The built-in `<Button>` has size, variant, and color props. All variants have automatic hover/active states.

- **Never** implement different hover/active colors for buttons in headers, sidebars, or cards.
- Even with custom background colors, do **not** implement your own hover/active states.
- Use `startIcon` and `endIcon` props for icons inside buttons.

```tsx
import { Button } from '@ringcentral/spring-ui';
import { AddMd } from '@ringcentral/spring-icon';

// Standard button
<Button variant="contained" color="primary" size="medium">Submit</Button>

// Button with icon — ALWAYS use symbol reference, NOT JSX element
<Button startIcon={AddMd} variant="outlined">Add Item</Button>
```

## IconButton Component

For buttons containing only an icon, use `<IconButton>` with the `symbol` prop:

```tsx
import { IconButton } from '@ringcentral/spring-ui';
import { SearchMd, Xmd } from '@ringcentral/spring-icon';

// Good — symbol prop
<IconButton symbol={SearchMd} aria-label="Search" size="medium" variant="contained" />

// Good - ghost style
<IconButton symbol={Xmd} aria-label="Close" variant="text" />

// Bad - don't use Button with manual sizing for icon-only
<Button className="w-8 h-8 p-0"><SearchMd /></Button>
```

Do NOT add `h-*` or `w-*` classes to `<IconButton>` — use the `size` prop.

## TextField and Textarea

Spring UI `<TextField>` and `<Textarea>` handle their own padding, sizing, and focus states:

```tsx
import { TextField, Textarea } from '@ringcentral/spring-ui';

// Good
<TextField label="Email" placeholder="you@example.com" />

// Good
<Textarea label="Description" rows={4} />

// Bad - don't reset padding
<Textarea className="p-0" />
```

## Avatar Component

Use Spring UI's `<Avatar>` component. It handles initials fallback automatically when no `src` is provided:

```tsx
import { Avatar } from '@ringcentral/spring-ui';

<Avatar src="/path/to/image.jpg" alt="User Name" size="medium" />
<Avatar alt="John Doe" size="small" /> {/* Shows initials "JD" */}
```

## Select Component

Spring UI's `<Select>` uses `<Option>` children — NOT `<SelectItem>`:

```tsx
import { Select, Option } from '@ringcentral/spring-ui';

<Select label="Category" value={value} onChange={handleChange}>
  <Option value="option1">Option 1</Option>
  <Option value="option2">Option 2</Option>
</Select>
```

`<Option>` will throw an error if it has no `value` prop.

## Containers and Cards

Spring UI does not have a `<Card>` component like shadcn. Build card-like containers with standard elements and Spring color tokens:

```tsx
// Card-like container
<div className="rounded-sm border border-neutral-b4 bg-neutral-base p-4">
  <h3 className="text-neutral-b0 font-semibold">Title</h3>
  <p className="text-neutral-b2">Description</p>
</div>
```

Guidelines:
- **Never** nest card-like containers inside each other with the same background color.
- Elements with rounded corners **must** only be placed in containers with padding to prevent corners from touching the boundary.
- When nesting a card inside a sidebar/header, ensure there's at least small contrast between container background and card background.

## Borders on Rounded Elements

**Never** apply border to one, two, or three sides of a rounded element:

```tsx
// Bad - partial border on rounded element
<div className="border-l-4 border-l-primary-b rounded-sm">

// Good - no partial border on rounded element
<div className="pl-4 rounded-sm">

// Bad - partial border on a button
<Button className="border-l-4 border-l-primary-b">
```

## Badge and Chip

Use `<Badge>` for small status indicators (dots/counts) and `<Chip>` for interactive or informational tags:

```tsx
import { Badge, Chip } from '@ringcentral/spring-ui';

<Badge badgeContent={4} color="danger">
  <span>Notifications</span>
</Badge>

<Chip label="Active" color="success" size="small" />
```

## Element Dimensions

Two classes of elements should **never** have height, padding, or text size manually configured:

1. **Interactable controls:** Clickable elements, focusable text inputs, selector-style components — use the `size` prop.
2. **Chips and badges:** Visually distinguished non-interactable elements — use the `size` prop.

Chips and badges should have smaller height than interactable controls — use `size="small"`.

**Interactable controls on the same horizontal line should be the same size prop value.**
