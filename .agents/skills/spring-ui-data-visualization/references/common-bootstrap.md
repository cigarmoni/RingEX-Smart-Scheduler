# Bootstrap Guide

**CRITICAL: The subagent is the #1 bottleneck. Your ONLY goal before launching it is: create artifact, convert, install deps, patch CSS, write OpenAPI, run codegen. Do NOTHING else first — no presentArtifact, no reading files, no exploring, no backend work.**

## IMPORTANT: This Skill Handles Data Fetching and Visualization

**You are already in the correct skill.** When building a visualization app with data from integrations:

- DO NOT use `query-integration-data` skill first
- DO NOT write scripts to `.agents/scripts/` before creating the artifact

The workflow is:

1. Create the artifact with `createArtifact()`
2. Use `searchIntegrations()` / `proposeIntegration()` to connect data sources
3. Write integration data fetching code in api-server routes (`artifacts/api-server/src/routes/`)

## Step 0: Refining Requirements

### Data Source Discovery

1. **User mentioned specific sources** (external databases, APIs, services):
   - `searchIntegrations({ query: "Linear" })`
   - Check status: `"already_setup"`, `"not_setup"`, or `"not_added_to_repl"`
   - If not set up: `proposeIntegration({ integrationId: "connector:ccfg_..." })`
   - **Warehouse with large schema?** Read `references/common-data-sources.md` "Warehouse Schema Exploration (Parallel Pattern)" before Step 1.

2. **No data source specified**: Ask the user. Use `searchIntegrations()` to show available connectors.

3. **Data already in chat context** (CSV files, analysis output):
   - Copy files to `artifacts/api-server/data/` (for user-uploaded files) or `.agents/outputs/` (for output like detailed analysis)
   - Create routes in `artifacts/api-server/src/routes/` to serve data

### Requirements Checklist

- **Data source**: integration, CSV, or API
- **Time range**: specific period? (last quarter, last 30 days)
- **Key metrics**: revenue, users, conversions, etc.
- **Purpose**: what decisions will this inform?

## Phase 1 — Sprint to subagent launch (do these steps back-to-back, no detours)

### Step 1: Create + convert the artifact

```javascript
const result = await createArtifact({
    artifactType: "data-visualization",
    slug: "my-dashboard",
    previewPath: "/my-dashboard/",
    title: "My Dashboard"
});
```

Then immediately run the Spring UI conversion:
```bash
bash .agents/skills/spring-ui-react-vite/scripts/convert-to-spring-ui.sh artifacts/<slug>
```

**Important:** `createArtifact()` handles workflows, Node.js, and npm deps automatically. Do **not** call `configureWorkflow()`, `installProgrammingLanguage()`, or install deps manually.

### Step 2: Install data-viz packages + patch CSS

```bash
pnpm --filter @workspace/<slug> add react-csv papaparse @tanstack/react-table d3-scale-chromatic
pnpm --filter @workspace/<slug> add -D @types/react-csv @types/papaparse
```

Note: recharts and @tanstack/react-query are already in the react-vite scaffold.

Patch `artifacts/<slug>/src/index.css` for chart colors and print styles. See `references/common-css-overrides.md` for the full CSS patch instructions. **THESE MUST BE APPLIED.**

### Step 3: Write OpenAPI spec + run codegen

Use the `pnpm-workspace` skill's references as the source of truth:

- `references/openapi.md` for spec authoring and codegen
- `references/server.md` for route validation, `Promise<void>`, and route registration
- `references/db.md` for schema layout, `@workspace/db` imports, and push commands

```bash
pnpm --filter @workspace/api-spec run codegen
```

### Step 4: Launch the subagent IMMEDIATELY

**This is the very next thing you do after codegen finishes. No reading files, no exploring, no presenting artifacts.**

Use the subagent task template from the appropriate workflow file:
- Dashboard: `references/dashboard-workflow.md`
- Report: `references/report-workflow.md`
- Explorer: `references/explorer-workflow.md`

**NEVER call `generateFrontend()`** — it outputs shadcn + Tailwind v4 unconditionally and is incompatible with Spring UI.

## Phase 2 — Backend + present (while subagent works)

5. Call `presentArtifact()` so the user sees the loading screen.

6. Build the backend while the subagent runs:
   - Run `grep "^export const" lib/api-zod/src/generated/api.ts` to see the exact Zod schema export names. Never assume or guess generated names.
   - Create the DB model in `lib/db/src/models/` when needed, then run `pnpm --filter @workspace/db run push`.
   - Implement the API handlers in `artifacts/api-server/src/handlers/`.
   - Seed example data if the app needs it.

## Phase 3 — Converge

7. Wait for the subagent to finish — by this point your backend is done too.

8. Verify API endpoints. Dashboard APIs take 7-10s to respond. Screenshots capture immediately, showing loading states. **Use curl first.**

   ```bash
   curl http://localhost:80/api/{ENDPOINT} | jq '.'
   ```

   **Common issues:** 404 = check route registration in `artifacts/api-server/src/routes/index.ts` plus the OpenAPI paths. Empty data = check the route logic, generated validators, and DB state (only if using the app DB). Connection refused = check workflow + logs.
   **Slow responses (>10s):** Add DB-backed caching. See `references/common-database.md` for the `api_cache` schema and helpers.

9. Fix any integration issues (restart workflow and refresh logs).

10. Present the artifact — show the finished app to the user.

## Pre-Configured Libraries

- **Recharts** -- included in react-vite scaffold
- **react-csv** -- installed in Step 2 (CSVLink for export)
- **PapaParse** -- installed in Step 2 (CSV parsing)
- **@tanstack/react-table** -- installed in Step 2 (sorting, filtering, pagination)
- **@tanstack/react-query** -- included in react-vite scaffold
- **Spring UI** -- installed by conversion script
- **d3-scale-chromatic** -- installed in Step 2 (extended color palettes)

## Route Prefixing / API Access

Use generated hooks from `@workspace/api-client-react` for all data fetching. Do NOT use raw `fetch()` or custom query wrappers.

**Accessing response data:** Generated hooks return data typed as `T` directly:

```typescript
const { data } = useGetSalesData();
const salesRows = data;
```

**Curl testing** -- follow the shared proxy rules from the `pnpm-workspace` skill and go through `localhost:80`:

```bash
curl http://localhost:80/api/{ENDPOINT} | jq '.'
```

## Sample Data (Optional)

Place CSV files in `artifacts/api-server/data/`.

For CSV-backed endpoints, use `references/common-csv-parsing.md` for the PapaParse-specific logic and the `pnpm-workspace` skill's `references/server.md` for the route shape itself.

## Database (If Using Database)

If the visualization uses the app DB, follow `references/common-database.md` plus the `pnpm-workspace` skill's `references/db.md`.
