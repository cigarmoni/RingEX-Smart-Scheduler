# Spring UI Implementation Guide

Step-by-step workflow for implementing UI designs using Spring UI components.

## Design Input Sources

Your design context may come from:
- **Figma MCP**: Structured component metadata from Figma (when Vibma MCP is available)
- **Screenshot**: Visual interpretation of a design image
- **Text description**: Written specification of the UI

---

## Phase 1: Design Analysis (BEFORE writing any code)

### Step 1: Identify Design Source

Determine the input type and extraction method:
- **Figma MCP**: Extract component data from structured metadata (proceed to Step 2)
- **Screenshot/Text**: Visually interpret UI elements (skip to Step 3)

### Step 2: Extract Explicit Component Data (Figma MCP only)

**⚠️ This step applies ONLY when using Figma MCP data. Skip this step for Screenshot/Text inputs.**

When Figma MCP data is available:
- Identify components from `componentId` and `componentName` in metadata
- **MANDATORY: For each VISUAL ELEMENT** (icon, button, label, divider - something you can SEE):
  1. Find its controlling property in `componentProperties` (e.g., `Clear Btn?: true`, `Label?: false`, or nested component like `Expand Collapse Caret`)
  2. **Query Spring UI API** to find the matching prop name
  3. List in Key Props column **ONLY if differs from default**
  4. **Check controlling flags** - a value existing doesn't mean it should render. Visibility toggles take precedence over values

### Step 3: Create Component Mapping Table (MANDATORY for all input types)

Before writing ANY code, output a Component Mapping table:

| Design Element | Spring UI Component | Key Props to Configure |
|----------------|---------------------|------------------------|

**Rules for Component Mapping Table:**

**Design Element Column:**
- **When using Figma MCP data**: Extract the exact Component Name from Figma metadata (e.g., "Autocomplete", "ListItem", "Dialog") and use it as the Design Element
- **When using Screenshot/Text description**: Describe the visually identified UI element (e.g., "Search input with dropdown", "Navigation list item", "Modal dialog")

**Spring UI Component Column:**
- **When using Figma MCP data**: Use the EXACT same component name extracted from Figma data in Design Element Column as the Spring UI component (e.g., Figma "Autocomplete" → Spring UI "Autocomplete"). Only use a different component if no matching component name exists in Spring UI's component list.
- **When using Screenshot/Text description**: Select the appropriate Spring UI component based on visual interpretation and functional requirements
- **⚠️ MANDATORY: Use the component list as a verification checklist**: Before mapping any design element to a component, check `reference/components.md` to verify if a specialized component exists for that pattern. The components are organized by category (Form & Input, Buttons & Actions, Layout & Structure, Navigation, Data Display, Feedback & Status, Specialized).

**Key Props to Configure Column:**
- Check actual prop definitions in `reference/component-{name}.md` files — Figma props are for reference only and may not match Spring UI's actual API
- **Only list props where the design requirement differs from the component's default value**
- For each prop listed, verify it exists in the actual component API by reading the corresponding `reference/component-{name}.md` file before using it
- **When Figma data is available**: Before configuring a prop, verify the prop's actual state by cross-checking ALL related Figma properties. A prop value existing in the data does NOT mean it should be rendered. Always check for controlling flags (visibility toggles, enabled/disabled states, show/hide booleans) — these flags take precedence over values.

**Example**: `HelpText` value is "Enter email addresses" but `helpText` boolean is `false` → do NOT configure the helperText prop.

### Step 4: Review Accessibility Requirements (WCAG 2.2 Level AA)

Before implementation, confirm these requirements:
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Indicators**: Visible focus states for all interactive elements
- **ARIA Labels**: Proper labels for screen readers
- **Semantic HTML**: Use appropriate elements (button, nav, main, etc.)

### Step 5: Review Responsive Requirements

Follow the design's layout specifications. Implement responsive layouts if the design shows responsive behavior.

---

## Phase 2: Implementation (NOW start writing code)

### Step 6: Map to Spring UI Components & Import

After completing the mapping table, import ALL mapped components at once:

```tsx
import { ComponentA, ComponentB, ComponentC /* all from mapping table */ } from '@ringcentral/spring-ui';
```

### Step 7: Use Spring UI Component Library

**Components**: Use `@ringcentral/spring-ui`. Check component props in `reference/component-{name}.md` files (e.g., `reference/component-button.md` for Button component).

**Icons**: Use `@ringcentral/spring-icon`. Browse available icons in `reference/icons.md` (558 icons organized alphabetically).

**Styling**: Prefer Spring Tailwind utilities from SKILL.md (colors, spacing, typography, shadows). Use standard Tailwind only when Spring utilities don't cover the need. For detailed token information, see:
- `reference/colors.md` - Full color palette
- `reference/spacing.md` - Spacing scale
- `reference/typography.md` - Typography classes
- `reference/shadows-borders.md` - Shadows and borders

**⚠️ Style Override Rule**: Only add `className`, `classes`, or `style` overrides when the design source (Figma data, screenshot, or text description) **explicitly specifies** that styling property. Do NOT add styles based on assumptions, visual consistency, or inference from other elements. If the design source does not specify a styling property, use the component's default styling.

**⚠️ Before Applying Styling**:
- **Apply to correct element**: Always apply styling to the component's root element or appropriate slot, NOT to wrapper divs you create. Avoid creating unnecessary wrapper divs.

### Override Component Styles

Spring UI components support multiple methods to override default styles (use these when styling is needed):

1. **Prefer Tailwind arbitrary values** for exact pixel/design token values:
   - `rounded-[7px]`, `gap-[7px]`, `p-[var(--spacing/1,4px)]`

2. **`className` prop**: **Use for root element styling only**
   ```tsx
   <DialogActions className="pt-5 px-6 flex items-center gap-2">
     {/* children */}
   </DialogActions>
   ```

3. **`classes` prop**: **Use for non-root layers/slots**
   ```tsx
   // For non-root layers
   <ListItem classes={{ content: 'p-2', container: 'rounded-sm' }} />

   // Only use classes.root if className not supported
   <DialogActions classes={{ root: 'pt-5 px-6' }}>
     {/* children */}
   </DialogActions>
   ```

4. **❌ DO NOT create wrapper divs**
   ```tsx
   // ❌ WRONG - creating wrapper div
   <DialogActions>
     <div className="pt-5 px-6">
       {/* buttons */}
     </div>
   </DialogActions>

   // ✅ CORRECT - using className on component
   <DialogActions className="pt-5 px-6">
     {/* buttons */}
   </DialogActions>
   ```

