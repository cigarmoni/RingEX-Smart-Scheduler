# Accordion / AccordionHeader

```tsx
import { Accordion, AccordionHeader } from '@ringcentral/spring-ui';
```

## Accordion Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `header` | `ReactNode` | — | Header content (can be AccordionHeader) |
| `defaultExpanded` | `boolean` | `false` | Initially expanded (uncontrolled) |
| `expanded` | `boolean` | — | Controlled expanded state |
| `onChange` | `(expanded: boolean) => void` | — | Called when expansion changes |
| `keepMounted` | `boolean` | `false` | Keep content in DOM when collapsed |
| `children` | `ReactNode` | — | Accordion body content |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## AccordionHeader Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Header label |
| `secondarySlot` | `ReactNode` | — | Secondary content (right side) |
| `disabled` | `boolean` | `false` | Disables expansion |
| `expandIcon` | `ReactNode` | — | Custom expand/collapse icon |
| `ExpandCollapseCaretProps` | `object` | — | Props for the default caret |
| `onClick` | `() => void` | — | Click handler |
| `classes` | `object` | — | CSS class overrides |
| `className` | `string` | — | Additional CSS classes |

## Basic Usage

```tsx
<Accordion header={<AccordionHeader>Section 1</AccordionHeader>}>
  <div className="p-4">Content for section 1</div>
</Accordion>
```

## Default Expanded

```tsx
<Accordion
  defaultExpanded
  header={<AccordionHeader>Open by Default</AccordionHeader>}
>
  <div className="p-4">This section starts expanded.</div>
</Accordion>
```

## Controlled

```tsx
const [expanded, setExpanded] = useState(false);

<Accordion
  expanded={expanded}
  onChange={(isExpanded) => setExpanded(isExpanded)}
  header={<AccordionHeader>Controlled Section</AccordionHeader>}
>
  <div className="p-4">Controlled content.</div>
</Accordion>
```

## With Secondary Slot

```tsx
<Accordion
  header={
    <AccordionHeader secondarySlot={<Badge count={5} />}>
      Notifications
    </AccordionHeader>
  }
>
  <div className="p-4">Notification list...</div>
</Accordion>
```

## Accordion Group

```tsx
function FAQSection() {
  return (
    <div className="flex flex-col gap-1">
      <Accordion header={<AccordionHeader>What is Spring UI?</AccordionHeader>}>
        <div className="p-4 text-neutral-b2">
          Spring UI is RingCentral's design system...
        </div>
      </Accordion>
      <Accordion header={<AccordionHeader>How do I install it?</AccordionHeader>}>
        <div className="p-4 text-neutral-b2">
          Install via npm: npm install @ringcentral/spring-ui
        </div>
      </Accordion>
      <Accordion header={<AccordionHeader>Is it open source?</AccordionHeader>}>
        <div className="p-4 text-neutral-b2">
          Yes, it is available on npm.
        </div>
      </Accordion>
    </div>
  );
}
```

## Important Notes

- Only two components: `Accordion` + `AccordionHeader` — no `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- The `header` prop on Accordion takes the AccordionHeader component
- Content is the direct children of Accordion
