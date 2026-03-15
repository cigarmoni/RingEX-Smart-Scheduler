# Explorer Workflow

Explorer-specific workflow steps. The common bootstrap in `common-bootstrap.md` covers Phase 1 (sprint to subagent launch). This file provides the subagent task template and post-build steps.

## Explorer Subagent Task Template

**Launch this IMMEDIATELY after codegen — it is step 4 in the bootstrap. Do not read files, explore, or call presentArtifact before this.**

```javascript
await startAsyncSubagent({
    specialization: "GENERAL",
    task: `You are a subagent. Read the spring-ui-react-vite skill (SKILL.md) and the general docs + component docs for every component you use.

Build a dataset explorer.

The app uses generated React Query hooks from @workspace/api-client-react for data fetching. The generated hooks return data typed as T directly.

Please treat the design guidance in the reference files as strict specs. The goal is to ensure the consistent look, feel, and operation of all dataset explorers.

Key reminders:
- Import React Query hooks from "@workspace/api-client-react" (NOT from a generated path).
- Response data is wrapped: use \`data?.data\` (not just \`data\`) when reading from React Query hooks.
- Use \`twMerge()\` from "@ringcentral/spring-ui" instead of \`cn()\`.
- Use <Option> not <SelectItem> for Select children.
- ThemeProvider is already mounted at the app root — do not add another one.

Features needed:
- [describe the dataset, what fields are available, what's filterable]
- Filter sidebar with text search, category dropdown, value range filters, reset button
- Sortable paginated data table as primary element (TanStack React Table)
- Reactive summary stat cards derived from filtered data
- 2 reactive charts that update when filters change
- "X of Y rows" indicator in table header
- Simple refresh, CSV export of filtered data, PDF export, dark mode toggle

Backend info:
- [describe available API endpoints and what data they return]
- Hook imports from @workspace/api-client-react (NOT just api-client-react)`,
    relevantFiles: [
        ".agents/skills/spring-ui-react-vite/SKILL.md",
        ".agents/skills/spring-ui-data-visualization/references/explorer-page-structure.md",
        ".agents/skills/spring-ui-data-visualization/references/common-chart-patterns.md",
        ".agents/skills/spring-ui-data-visualization/references/explorer-layout.md",
        ".agents/skills/spring-ui-data-visualization/references/common-data-tables.md",
        ".agents/skills/spring-ui-data-visualization/references/common-controls.md",
        ".agents/skills/spring-ui-data-visualization/references/common-color-guide.md",
        ".agents/skills/spring-ui-data-visualization/references/common-loading-states.md",
        "lib/api-client-react/src/generated/api.ts",
        "lib/api-client-react/src/generated/api.schemas.ts",
        "artifacts/<slug>/src/index.css",
    ],
});
```

## Post-Build: Present the Explorer

After the subagent finishes and the backend is ready (Phase 3 in bootstrap):

```javascript
await presentArtifact({artifactId: result.artifactId});
await screenshot({ path: "/my-explorer/" });
```

After this step, call `suggestDeploy()` so the user knows their explorer is ready to publish.

## Explorer Requirements Checklist

Every dataset explorer must include:

- [ ] **Filters working** -- Text search, range, and/or category filters apply correctly
- [ ] **Table sortable** -- All columns sortable, pagination working
- [ ] **Charts reactive** -- Charts update when filters change
- [ ] **Row count indicator** -- "X of Y rows" shown in table header
- [ ] **Summary stats** -- Total, average, min, max from filtered data
- [ ] **CSV export** -- Export filtered data + per-chart CSV export buttons
- [ ] **Simple refresh button** -- No auto-refresh dropdown
- [ ] **PDF export** -- `window.print()` button
- [ ] **Dark mode toggle** -- Sun/Moon toggle
- [ ] **Loading skeletons** -- `isLoading || isFetching` for all query-dependent UI
- [ ] **Wide layout** -- `max-w-[1600px]` container
- [ ] **Reset filters** -- Button to clear all filters
