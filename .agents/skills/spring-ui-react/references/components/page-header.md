# PageHeader

```tsx
import { PageHeader } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | — | Header variant |
| `children` | `ReactNode` | — | Header content (title, breadcrumbs, actions) |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<PageHeader>
  <h1 className="typography-heading-2">Dashboard</h1>
</PageHeader>
```

## With Actions

```tsx
<PageHeader>
  <div className="flex items-center justify-between w-full">
    <h1 className="typography-heading-2">Projects</h1>
    <Button variant="contained" startIcon={PlusMd}>
      New Project
    </Button>
  </div>
</PageHeader>
```

## With Breadcrumbs

```tsx
<PageHeader>
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1 text-neutral-b2 text-sm">
      <Link href="/projects">Projects</Link>
      <span>/</span>
      <span>My Project</span>
    </div>
    <div className="flex items-center justify-between">
      <h1 className="typography-heading-2">My Project</h1>
      <div className="flex gap-2">
        <Button variant="outlined">Edit</Button>
        <Button variant="contained">Publish</Button>
      </div>
    </div>
  </div>
</PageHeader>
```
