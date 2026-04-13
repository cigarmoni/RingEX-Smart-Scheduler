# EmptyState

```tsx
import { EmptyState } from '@ringcentral/spring-ui';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Empty state title |
| `description` | `string` | — | Descriptive text |
| `icon` | `ReactNode` | — | Large icon/illustration |
| `actions` | `ReactNode` | — | Action buttons |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
import { EmptyState, Button } from '@ringcentral/spring-ui';
import { InboxMd } from '@ringcentral/spring-icon';

<EmptyState
  icon={<Icon symbol={InboxMd} size="xlarge" />}
  title="No messages"
  description="Your inbox is empty. Start a conversation to see messages here."
  actions={
    <Button variant="contained">Compose Message</Button>
  }
/>
```

## Search Empty State

```tsx
<EmptyState
  icon={<Icon symbol={SearchMd} size="xlarge" />}
  title="No results found"
  description={`No items match "${searchQuery}". Try a different search term.`}
  actions={
    <Button variant="outlined" onClick={() => setSearchQuery('')}>
      Clear Search
    </Button>
  }
/>
```

## No Data

```tsx
<EmptyState
  icon={<Icon symbol={FileMd} size="xlarge" />}
  title="No files yet"
  description="Upload your first file to get started."
  actions={
    <Button variant="contained" startIcon={UploadMd}>
      Upload File
    </Button>
  }
/>
```
