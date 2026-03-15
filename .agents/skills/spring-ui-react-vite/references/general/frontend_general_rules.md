# Frontend General Rules

## Frontend Routing

- Use `wouter` for routing on the frontend.
  - If you need to add a new page, add them to the `src/pages` directory and register them in `App.tsx`.
  - If there are multiple pages, use a sidebar for navigation. Use the `Link` component or the `useLocation` hook from `wouter` instead of modifying the window directly.
- For sidebar navigation, build with `twMerge`, `Icon`, and route hooks. Spring UI's ListNavigation is hooks-based (`useListNavigation`, `useItemNavigation`) — there is no `<ListNavigation>` component. Or use `Drawer` for collapsible sidebars. See `references/sidebar_rules.md`.

## Forms

Use `react-hook-form` with `zodResolver` from `@hookform/resolvers/zod` for form state management. Use Spring UI form controls (`TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch`) with react-hook-form's `Controller` component.

Do NOT use shadcn's `Form` component or `useForm` wrapper from `@/components/ui/form`.

```tsx
import { TextField, Select, Option, Checkbox, Button } from '@ringcentral/spring-ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', name: '' },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            data-testid="input-email"
          />
        )}
      />
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            data-testid="input-name"
          />
        )}
      />
      <Button type="submit" variant="contained" data-testid="button-submit">
        Submit
      </Button>
    </form>
  );
}
```

- When appropriate, use `.extend` to add validation rules to insert schemas from `@shared/schema.ts`.
- Remember that the form is controlled — ensure you pass `defaultValues` to `useForm`.
- If a form is failing to submit, log `form.formState.errors` to check for validation errors on fields that might not have associated form controls.

## Data Fetching

- Always use `@tanstack/react-query` when fetching data.
  - When appropriate, ensure you strongly type the query using the appropriate select type from `@shared/schema.ts`.
  - Queries should not define their own `queryFn` as the default fetcher is already set up to work with the backend.
  - Mutations should use `apiRequest` from `@lib/queryClient` to make POST/PATCH/DELETE requests to the backend.
    - Always make sure to invalidate the cache by `queryKey` after a mutation is made. Don't forget to import `queryClient` from `@lib/queryClient`!
    - For hierarchical or variable query keys use an array for cache segments so cache invalidation works properly. That is, do `queryKey: ['/api/recipes', id]` instead of `queryKey: [`/api/recipes/${id}`]`.
  - Show a loading or `<Skeleton>` state while queries (via `.isLoading`) or mutations (via `.isPending`) are being made.
  - The template uses TanStack Query v5 which only allows the object form for query related functions. e.g. `useQuery({ queryKey: ['key'] })` instead of `useQuery(['key'])`

## Toast Notifications

Do NOT use shadcn `useToast` or Sonner. Use Spring UI's `Snackbar`:

```tsx
import { Snackbar, Button } from '@ringcentral/spring-ui';
import { useState } from 'react';

function MyComponent() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const showToast = (message: string) => {
    setSnackbar({ open: true, message });
  };

  return (
    <>
      <Button onClick={() => showToast('Item saved successfully')}>
        Save
      </Button>
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
        autoHideDuration={4000}
        data-testid="snackbar-notification"
      />
    </>
  );
}
```

## Styling and Theming

- Do NOT define custom CSS properties in `index.css` with `H S% L%` format — Spring UI handles all design tokens via ThemeProvider.
- Do NOT use `@`-prefixed paths to import shadcn components — import from `@ringcentral/spring-ui`.
- Use Spring color tokens in Tailwind classes: `bg-primary-b`, `text-neutral-b2`, `border-danger`.
- Use `twMerge()` from `@ringcentral/spring-ui` instead of `cn()` from `@/lib/utils`:

```tsx
import { twMerge } from '@ringcentral/spring-ui';

<div className={twMerge('flex items-center', isActive && 'bg-primary-b text-primary-f')}>
```

- No `tailwindcss-animate` — Spring UI uses framer-motion internally for all component animations.
- User may attach assets (images, etc.) in their request. Reference them with the `@assets/...` import syntax: `import img from "@assets/example.png"`.

## Dark Mode

Dark mode is handled by swapping the theme object in ThemeProvider — NOT by class-based dark mode.

Do NOT:
- Set `darkMode: ["class"]` in tailwind config
- Define `:root` and `.dark` CSS classes
- Toggle a `.dark` class on `document.documentElement`
- Use `dark:` Tailwind variants

Do:
```tsx
import { ThemeProvider, suiLight, suiDark } from '@ringcentral/spring-ui';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState(suiLight);
  const toggleTheme = () => {
    setTheme(t => {
      const next = t === suiLight ? suiDark : suiLight;
      localStorage.setItem('theme', next === suiDark ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* All components and color tokens automatically adapt */}
    </ThemeProvider>
  );
}
```

## Icons

Do NOT use `lucide-react`. Use `@ringcentral/spring-icon` for all UI icons. See the `spring-ui-react-vite` skill's `references/components/icons.md` for naming convention and full mapping.

ALWAYS pass icons as symbol references, NOT JSX elements. Symbol references get wrapped in `<Icon>` internally for proper sizing and color inheritance. JSX elements bypass the wrapper and render as oversized, black SVGs.

```tsx
import { SearchMd, AddMd } from '@ringcentral/spring-icon';
import { Button, IconButton, Icon } from '@ringcentral/spring-ui';

// CORRECT — symbol references:
<Button startIcon={AddMd}>Add Item</Button>
<IconButton symbol={SearchMd} aria-label="Search" />
<Icon symbol={SearchMd} size="medium" />

// BAD — JSX elements (renders oversized/black icons):
// <Button startIcon={<AddMd />}>Add Item</Button>
// <IconButton aria-label="Search"><SearchMd /></IconButton>
// Bare icon in JSX: <SearchMd />
```

Do NOT use `react-icons/si` for company logos — use SVG assets instead.

## Test IDs

Add a `data-testid` attribute to every HTML element that users can interact with (buttons, inputs, links, etc.) and to elements displaying meaningful information (user data, status messages, dynamic content, key values).

- Use unique, descriptive identifiers following this pattern:
  - Interactive elements: `{action}-{target}` (e.g., `button-submit`, `input-email`, `link-profile`)
  - Display elements: `{type}-{content}` (e.g., `text-username`, `img-avatar`, `status-payment`)
- For dynamically generated elements (lists, grids, repeated components), append a unique identifier: `{type}-{description}-{id}`
  - Examples: `card-product-${productId}`, `row-user-${index}`, `text-price-${itemId}`
  - The dynamic identifier can be any unique value (database ID, index, key)
- Keep test IDs stable and descriptive of the element's purpose rather than its appearance or implementation details.

## Common Pitfalls

- **Import `@ringcentral/spring-ui/index.css`** — this 300KB+ stylesheet defines ALL `sui-*` component CSS classes (icon sizing, button colors, form field styles, etc.). Without it, Spring UI components render without any styling. Import it in `main.tsx` before your own CSS:
  ```tsx
  import "@ringcentral/spring-ui/index.css";
  import "./index.css";
  ```
- **Icons: use symbol references, not JSX elements** — `startIcon={AddMd}` (correct) vs `startIcon={<AddMd />}` (broken). JSX elements bypass the `<Icon>` wrapper, rendering as oversized black SVGs. Same for `IconButton`: use `symbol={EditMd}`, not `<EditMd />` as children.
- **No `hover:bg-*` on Spring UI interactive components** — they have built-in hover states.
- **`tailwindcss` must be v3** — if builds fail, verify the version isn't resolving to catalog v4.
- **`require()` in tailwind config** — Spring's plugin is CommonJS; use `.cjs` extension if package has `"type": "module"`.
- **`@ringcentral/spring-theme` must be a direct dependency** — not just transitive through `@ringcentral/spring-ui` — because pnpm won't let `require()` find transitive deps.
- **No `@import "tailwindcss"` syntax** — use `@tailwind base; @tailwind components; @tailwind utilities;` (v3).
- **Content array** — must include `node_modules/@ringcentral/spring-ui/**/*.js` or component styles won't generate.
- **DO NOT explicitly import React** — the existing Vite setup has a JSX transformer that does it automatically.
- **Use `import.meta.env.<ENV_VAR>`** to access environment variables on the frontend instead of `process.env.<ENV_VAR>`. Variables must be prefixed with `VITE_`.
- **`<Option>` not `<SelectItem>`** — Spring UI's Select uses `<Option>` children. `<Option>` requires a `value` prop.
- **If a form is failing to submit**, try logging `form.formState.errors` to see if there are validation errors for fields that might not have associated form controls.
