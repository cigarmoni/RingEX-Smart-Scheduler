# Dashboard Workflow

Dashboard-specific workflow steps. The common bootstrap in `common-bootstrap.md` covers Phase 1 (sprint to subagent launch). This file provides the subagent task template and post-build steps.

## Dashboard Subagent Task Template

**Launch this IMMEDIATELY after codegen — it is step 4 in the bootstrap. Do not read files, explore, or call presentArtifact before this.**

```javascript
await startAsyncSubagent({
    specialization: "GENERAL",
    task: `You are a subagent. Read the spring-ui-react-vite skill (SKILL.md) and the general docs + component docs for every component you use.

Build the data visualization dashboard.

The app uses generated React Query hooks from @workspace/api-client-react for data fetching. The generated hooks return data typed as T directly.

Please treat the design guidance in the reference files as strict specs. The goal is to ensure the consistent look, feel, and operation of all dashboards.

Key reminders:
- Import React Query hooks from "@workspace/api-client-react" (NOT from a generated path).
- Response data is wrapped: use \`data?.data\` (not just \`data\`) when reading from React Query hooks.
- Use \`twMerge()\` from "@ringcentral/spring-ui" instead of \`cn()\`.
- Use <Option> not <SelectItem> for Select children.
- ThemeProvider is already mounted at the app root — do not add another one.

Features needed:
- [describe the dashboard features, KPIs, charts, data tables based on user requirements]
- Every chart card must include a CSV export button
- Split refresh button with auto-refresh dropdown
- PDF export via window.print()
- Dark mode toggle

Backend info:
- [describe available API endpoints and what data they return]
- Hook imports from @workspace/api-client-react (NOT just api-client-react)`,
    relevantFiles: [
        ".agents/skills/spring-ui-react-vite/SKILL.md",
        ".agents/skills/spring-ui-data-visualization/references/dashboard-page-structure.md",
        ".agents/skills/spring-ui-data-visualization/references/common-chart-types.md",
        ".agents/skills/spring-ui-data-visualization/references/common-chart-patterns.md",
        ".agents/skills/spring-ui-data-visualization/references/dashboard-layout.md",
        ".agents/skills/spring-ui-data-visualization/references/common-data-tables.md",
        ".agents/skills/spring-ui-data-visualization/references/common-controls.md",
        ".agents/skills/spring-ui-data-visualization/references/dashboard-controls.md",
        ".agents/skills/spring-ui-data-visualization/references/common-color-guide.md",
        ".agents/skills/spring-ui-data-visualization/references/common-loading-states.md",
        "lib/api-client-react/src/generated/api.ts",
        "lib/api-client-react/src/generated/api.schemas.ts",
        "artifacts/<slug>/src/index.css",
    ],
});
```

## Post-Build: Present the Dashboard and Analyze

After the subagent finishes and the backend is ready (Phase 3 in bootstrap):

```javascript
await presentArtifact({artifactId: result.artifactId});
await screenshot({ path: "/my-dashboard/" });
```

**CRITICAL RULES:**

- Your NEXT action after `presentArtifact` MUST be calling `screenshot`. No text output, no confirmation questions, no pauses.
- Do NOT ask "Does the dashboard look good?" or any confirmation question.
- Do NOT trigger code review yet.

### Data Analysis Summary

After taking the screenshot, write a short summary (3-5 sentences) in chat that:

- Directly answers the user's original question using the data shown
- Highlights the top 2-3 insights or findings (specific numbers, trends, comparisons)
- References what the charts and KPIs reveal, not how the dashboard looks

**Example:** If the user asked "Why are my users churning?":
> Your churn analysis dashboard is ready. Based on the data, the primary churn drivers are lack of engagement in the first 7 days (42% of churned users never returned after day 1) and pricing sensitivity in the mid-tier plan. Monthly churn has been trending upward from 4.2% to 5.8% over the last quarter.

**Keep it brief** -- the dashboard is the detailed view. Your summary is an executive takeaway.

## Offer Detailed Analysis

After delivering the brief analysis summary, ask the user if they want a deeper analysis. Use the user_query tool (NOT plain text) to present the question.

```javascript
await user_query({
    queries: [{
        question: "Would you like me to generate a detailed analysis report with findings and recommendations based on this data?",
        confirm_text: "Yes, generate a detailed report",
        reject_text: "No, the summary is enough"
    }]
});
```

**You are required to use the user_query tool for this step — do NOT ask as plain text in chat.**

**If the user declines:** Proceed to code review. The dashboard delivery is complete.

**If the user accepts:** Generate a comprehensive analysis report. See `references/detailed-analysis.md` for the full guide.

Quick summary:

1. **Gather data** -- curl the dashboard's API endpoints for raw JSON data
2. **Write the report** -- use `write` tool to create `.agents/outputs/<topic>-analysis.md`
3. **Present as asset** -- call `present_asset` with `await_user_input: false`
4. **Summarize in chat** -- 1-2 sentences highlighting the most important finding

After this step, call `suggestDeploy()` so the user knows their dashboard is ready to publish.

## Dashboard Requirements Checklist

Every dashboard must include these features:

- [ ] **CSV export per chart** -- Every chart card (not KPI cards) has a `CSVLink` download button in `CardHeader`
- [ ] **Split refresh button** -- With auto-refresh dropdown
- [ ] **Export/PDF button** -- `window.print()` icon button
- [ ] **Dark mode toggle** -- Sun/Moon toggle in header
- [ ] **Loading skeletons** -- Use `isLoading || isFetching` for all query-dependent UI
