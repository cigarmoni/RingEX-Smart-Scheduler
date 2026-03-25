# Autocomplete

```tsx
import { Autocomplete } from '@ringcentral/spring-ui';
```

## Overview

Autocomplete is a full-featured searchable input component that combines a text input with a suggestion dropdown. It supports single/multiple selection, free-form text entry (freeSolo), option grouping, and virtualized rendering for large lists.

## Key Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `any[]` | — | Array of options to display |
| `value` | `any \| any[]` | `[]` | Selected value(s) |
| `onChange` | `(value) => void` | — | Selection change handler |
| `inputValue` | `string` | — | Controlled input text |
| `onInputChange` | `(value: string) => void` | — | Input text change handler |
| `getOptionLabel` | `(option) => string` | — | Extract label from option |
| `getOptionDisabled` | `(option) => boolean` | — | Disable specific options |
| `isOptionEqualToValue` | `(option, value) => boolean` | — | Custom equality check |
| `renderOption` | `(props, option) => ReactNode` | — | Custom option renderer |
| `renderNoOptions` | `() => ReactNode` | — | Render when no options match |
| `filterOptions` | `(options, state) => options` | — | Custom filter function |
| `multiple` | `boolean` | — | Enable multi-select |
| `freeSolo` | `boolean` | — | Allow arbitrary text input |
| `variant` | `'autocomplete' \| string` | — | Input variant |
| `label` | `string` | — | Input label |
| `placeholder` | `string` | — | Input placeholder |
| `disabled` | `boolean` | — | Disabled state |
| `required` | `boolean` | — | Required field |
| `openOnFocus` | `boolean` | — | Open dropdown on focus |
| `autoSelect` | `boolean` | — | Auto-select highlighted option |
| `autoHighlight` | `boolean` | — | Auto-highlight first option |
| `disableCloseOnSelect` | `boolean` | — | Keep dropdown open on select |
| `groupBy` | `(option) => string` | — | Group options by key |
| `groupVariant` | `string` | — | Group display style |
| `open` | `boolean` | — | Controlled open state |
| `onOpen` | `() => void` | — | Open callback |
| `onClose` | `() => void` | — | Close callback |
| `onClear` | `() => void` | — | Clear callback |
| `maxFreeSolo` | `number` | — | Max free-form tags |

## Basic Usage

```tsx
import { Autocomplete } from '@ringcentral/spring-ui';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

function FrameworkPicker() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={setValue}
      getOptionLabel={(opt) => opt.label}
      label="Framework"
      placeholder="Search frameworks..."
    />
  );
}
```

## Multiple Selection

```tsx
<Autocomplete
  multiple
  options={allTags}
  value={selectedTags}
  onChange={setSelectedTags}
  getOptionLabel={(tag) => tag.name}
  label="Tags"
  placeholder="Add tags..."
/>
```

## Free-Form Input (freeSolo)

```tsx
<Autocomplete
  freeSolo
  multiple
  options={suggestions}
  value={tags}
  onChange={setTags}
  getOptionLabel={(tag) => typeof tag === 'string' ? tag : tag.label}
  label="Skills"
  placeholder="Type to add..."
/>
```

## With Grouping

```tsx
<Autocomplete
  options={countries}
  groupBy={(option) => option.continent}
  getOptionLabel={(option) => option.name}
  value={selected}
  onChange={setSelected}
  label="Country"
/>
```

## Important Notes

- Autocomplete is a **full input+dropdown component** — not just a suggestion list item
- It internally uses `TextField` for the input and `Popper` for the dropdown
- For simple fixed-option dropdowns, prefer `Select` + `Option`
- Autocomplete is best for: searchable/filterable lists, tag inputs, command palettes
- The component manages focus, keyboard navigation, and dropdown positioning automatically
