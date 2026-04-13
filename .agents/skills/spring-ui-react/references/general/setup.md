# Setup

**CRITICAL: The subagent is the #1 bottleneck. Your ONLY goal before launching it is: create artifact, convert, write OpenAPI, run codegen. Do NOTHING else first — no presentArtifact, no reading files, no exploring, no backend work.**

## Approach

Use the `pnpm-workspace` skill as the source of truth for shared monorepo rules. When you touch backend code, follow the `pnpm-workspace` skill's references:

- `references/openapi.md` for contract-first OpenAPI + codegen
- `references/server.md` for `artifacts/api-server/src/routes/` conventions
- `references/db.md` for `lib/db/src/schema/` and Drizzle guidance

## Rules

- **NEVER call `generateFrontend()`** — it outputs shadcn + Tailwind v4 unconditionally and is incompatible with Spring UI.
- Do NOT read or explore any files before the subagent is launched.
- Do NOT call presentArtifact before the subagent is launched.
- For subsequent design iterations or visual fixes after the initial build, use the design subagent (`subagent(specialization="DESIGN")`).

## Build Order

### Phase 1 — Sprint to subagent launch (do these steps back-to-back, no detours)

1. Create the artifact with `createArtifact()`, then immediately run the conversion script:
   ```bash
   bash .agents/skills/spring-ui-react-vite/scripts/convert-to-spring-ui.sh artifacts/<slug>
   ```

2. Write the OpenAPI spec — define all endpoints and request/response schemas in `lib/api-spec/openapi.yaml`.

3. Run codegen: `pnpm run --filter @workspace/api-spec codegen`

4. **Launch the subagent IMMEDIATELY — this is the very next thing you do after codegen finishes. No reading files, no exploring, no presenting artifacts.**
```
await startAsyncSubagent({
  specialization: "GENERAL",
  task: `You are a subagent. Read the spring-ui-react-vite skill (SKILL.md) and the general docs + component docs for every component you use.
Key reminders:
- Import React Query hooks from "@workspace/api-client-react" (NOT from a generated path).
- Response data is wrapped: use \`data?.data\` (not just \`data\`) when reading from React Query hooks.
- Use \`twMerge()\` from "@ringcentral/spring-ui" instead of \`cn()\`.
- Use <Option> not <SelectItem> for Select children.
- ThemeProvider is already mounted at the app root — do not add another one.
- CONTENT RULES: All visible UI text MUST follow the RingCentral Content Companion rules. Read .agents/skills/rc-content-companion/SKILL.md. Key points: use contractions always, plain language ("Turn on" not "Enable", "Sign in" not "Log in"), no filler words ("successfully", "unfortunately"), be positive and direct, use active voice, preferred terms ("dropdown" one word, "WiFi", "text" not "SMS", "coworker" not "colleague").

<frontend prompt>`,
  relevantFiles: [
  ".agents/skills/spring-ui-react-vite/SKILL.md",
  ".agents/skills/rc-content-companion/SKILL.md"
  ],
});
```

### Phase 2 — Backend + present (while subagent works)

5. Call `presentArtifact()` so the user sees the loading screen.

6. Build the backend while the subagent runs:
   - Run `grep "^export const" lib/api-zod/src/generated/api.ts` to see the exact Zod schema export names. Never assume or guess generated names.
   - Create the DB model in `lib/db/src/models/` when needed, then run `pnpm --filter @workspace/db run push`.
   - Implement the API handlers in `artifacts/api-server/src/handlers/`.
   - Seed example data if the app needs it.

### Phase 3 — Converge

7. Wait for the subagent to finish — by this point your backend is done too.

8. Fix any integration issues (restart workflow and refresh logs).

9. Present the artifact — show the finished app to the user.
