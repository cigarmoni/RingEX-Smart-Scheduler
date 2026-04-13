# Visual Style and Contrast

## DOM Usage

Never nest interactive elements (buttons, links, inputs) inside other interactive elements. If a clickable area must contain another clickable element, restructure so they are siblings or use a non-interactive wrapper with an `onClick` handler and appropriate ARIA role.

## Emoji

**Never use emoji.** Not for application UI, not for test/mock data. If you need something like a "reaction" in a social/chat application, use Spring icons from `@ringcentral/spring-icon` instead because those can be styled with theme color tokens. Do not replace emojis with text—use a proper icon instead.

## Text Color

- **Never** use `text-primary-b` for primary colored body text unless it is over a hero image or special branding case.
- Use three levels of text color to convey hierarchy:
  - **Default:** `text-neutral-b0` — most text
  - **Secondary:** `text-neutral-b2` — additional information
  - **Tertiary:** `text-neutral-b3` — least important information

Text colors must always take into account the surface they're rendered on. Light text should never appear on a light background, and darker text should never appear on a dark background. Double or triple check this requirement. Verify readability in both the `suiLight` and `suiDark` themes.

## Hero Images

Landing pages often have large hero images. The challenge is maintaining readable text in both light and dark modes.

**Solution:** Create a dark "wash" gradient over the image so light text renders well regardless of the hero image color or the current theme mode.

- Always render lighter text over hero images (regardless of dark vs. light mode)
- Use `variant="contained"` buttons or `variant="outlined"` buttons with blurred backgrounds over the image
- This approach works with ThemeProvider theme switching

## Drop Shadows

Use drop shadows sparingly and subtly. Valid use cases:

1. On elements/surfaces that have the same exact background color as the background they sit on
2. To convey a sense of "floating" (e.g., modals or toast notifications)

Use Spring shadow tokens: `shadow-sm`, `shadow-md` (these are Spring's token values, not standard Tailwind).

## Borders and Background Colors

### Border Radius

- Border radii should **always** be small unless creating a perfect circle or perfect "pill" shape (which require border radius to be exactly half the element height).
- Use `rounded-sm` or `rounded-md`. Note: these are Spring's token values (e.g., `rounded-sm` = `0.625rem`), not standard Tailwind values.

### Border Necessity

- If there's enough contrast between the background and an element, a border is not necessary.
- If you include a border when not necessary, it should be one perceivable shade darker than the darkest color it touches (light mode) or one shade lighter than the lightest color it touches (dark mode).

### Container Styling

Some elements act as "panes," "panels," or "containers" to group child elements. Four approaches:

| Method | Description |
|--------|-------------|
| **A** | White space and font size + headings to convey hierarchy |
| **B** | Background color of the container |
| **C** | Borders/shadows around the container with no background color (or same as parent) |
| **D** | Background color and border around the container |

Guidelines:
- Use the same approach consistently throughout the application, only deviating with good justification.
- **Method B:** Use `bg-neutral-b5` or similar for barely perceivable elevation.
- **Method C:** Use `border-neutral-b4` for subtle borders, or `shadow-sm` for subtle shadows.
- **Method D:** Border color should have barely perceivable contrast to the container background.

### Color Selection

- Use Spring UI color tokens: `text-danger`, `border-neutral-b4`, `bg-neutral-base`, `bg-neutral-b5`
- **Never use `bg-primary-b` for section or container backgrounds.** Primary blue is for interactive elements (buttons, links, active states) — not for decorating layout sections. Use `bg-neutral-b5` or `bg-neutral-base` for section backgrounds instead.
- **Standard Tailwind colors (`red-500`, `blue-200`, etc.) are NOT available** when override mode is on (the default).
- Do not manually select background colors like `bg-yellow-400` — they don't exist in Spring's token set.
- All Spring color tokens automatically adapt to dark/light themes via ThemeProvider — no manual `dark:` variants needed.
