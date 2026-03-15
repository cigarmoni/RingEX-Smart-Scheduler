# Report Workflow

Report-specific workflow steps. The common bootstrap in `common-bootstrap.md` covers Phase 1 (sprint to subagent launch). This file provides the subagent task template and post-build steps.

## Report Subagent Task Template

**Launch this IMMEDIATELY after codegen — it is step 4 in the bootstrap. Do not read files, explore, or call presentArtifact before this.**

```javascript
await startAsyncSubagent({
    specialization: "GENERAL",
    task: `You are a subagent. Read the spring-ui-react-vite skill (SKILL.md) and the general docs + component docs for every component you use.

Build an analysis report.

The app uses generated React Query hooks from @workspace/api-client-react for data fetching. The generated hooks return data typed as T directly.

Please treat the design guidance in the reference files as strict specs. The goal is to ensure the consistent look, feel, and operation of all reports.

Key reminders:
- Import React Query hooks from "@workspace/api-client-react" (NOT from a generated path).
- Response data is wrapped: use \`data?.data\` (not just \`data\`) when reading from React Query hooks.
- Use \`twMerge()\` from "@ringcentral/spring-ui" instead of \`cn()\`.
- Use <Option> not <SelectItem> for Select children.
- ThemeProvider is already mounted at the app root — do not add another one.

Features needed:
- [describe the report topic, what question it answers]
- Executive summary with 3-5 bullet points
- Section cards with chart + narrative text analysis
- Recommendations section with actionable items
- Simple refresh button (no auto-refresh -- reports are snapshots)
- CSV export per chart, PDF export via window.print()
- Dark mode toggle

Backend info:
- [describe available API endpoints and what data they return]
- Hook imports from @workspace/api-client-react (NOT just api-client-react)`,
    relevantFiles: [
        ".agents/skills/spring-ui-react-vite/SKILL.md",
        ".agents/skills/spring-ui-data-visualization/references/report-page-structure.md",
        ".agents/skills/spring-ui-data-visualization/references/common-chart-types.md",
        ".agents/skills/spring-ui-data-visualization/references/common-chart-patterns.md",
        ".agents/skills/spring-ui-data-visualization/references/report-layout.md",
        ".agents/skills/spring-ui-data-visualization/references/common-controls.md",
        ".agents/skills/spring-ui-data-visualization/references/common-color-guide.md",
        ".agents/skills/spring-ui-data-visualization/references/common-loading-states.md",
        "lib/api-client-react/src/generated/api.ts",
        "lib/api-client-react/src/generated/api.schemas.ts",
        "artifacts/<slug>/src/index.css",
    ],
});
```

## Post-Build: Present the Report

After the subagent finishes and the backend is ready (Phase 3 in bootstrap):

```javascript
await presentArtifact({artifactId: result.artifactId});
await screenshot({ path: "/my-report/" });
```

After this step, call `suggestDeploy()` so the user knows their report is ready to publish.

## Report Requirements Checklist

Every analysis report must include:

- [ ] **Executive summary** -- 3-5 bullet points at the top
- [ ] **Narrative per section** -- Each chart has accompanying text analysis
- [ ] **Recommendations** -- Actionable items at the end
- [ ] **CSV export per chart** -- CSVLink download button in chart CardHeaders
- [ ] **Simple refresh button** -- No auto-refresh dropdown
- [ ] **PDF export** -- `window.print()` button
- [ ] **Dark mode toggle** -- Sun/Moon toggle
- [ ] **Loading skeletons** -- `isLoading || isFetching` for all query-dependent UI
- [ ] **Narrow layout** -- `max-w-[900px]` container
