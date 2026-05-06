# 🤖 AUTONOMY CONFIGURATION

> This file defines how autonomously the care team operates on this project.
> It is produced at admission by `@Triage` and enforced by `@Conductor` on every handoff decision.
> The attending physician is only paged when this file says so — nothing else.

---

## Patient
- **Project:** [Project Name]
- **Autonomy Level:** [Full / Phase-Gated / Task-Gated / Manual]
- **Set By:** [Your name]
- **Date:** [Date]

---

## Autonomy Levels Defined

| Level | What It Means |
|:------|:--------------|
| **Full** | System executes entire treatment plan autonomously. Pages only on failures, escalations, and phase completions requiring sign-off. |
| **Phase-Gated** | System executes within a phase autonomously. Pauses and pages at every phase boundary for approval before continuing. |
| **Task-Gated** | System executes one task at a time. Pages after every task for approval before the next. |
| **Manual** | No autonomous execution. Every step requires explicit user command. Equivalent to FORGE 1.0 behavior. |

---

## This Project's Autonomy Level

**Level:** [Full / Phase-Gated / Task-Gated / Manual]

**Rationale:** [Why this level was chosen — e.g., "Established codebase, high trust in agents" or "New domain, want visibility into every decision"]

---

## Page Me When (Always, Regardless of Autonomy Level)

> These conditions always interrupt autonomous execution and require attending input.
> @Conductor must stop and wait for response before proceeding.

- [ ] A phase completes and the next phase begins — require sign-off
- [ ] Any agent enters a second fix loop on the same task
- [ ] @Sentinel finds a Critical security finding
- [ ] @Architect flags a schema change or API contract change
- [ ] A new external dependency is proposed
- [ ] STATE.md and actual filesystem are significantly out of sync
- [ ] A task fails after 2 fix loops — escalate to attending
- [ ] @Debugger discovers additional bugs beyond the current session scope
- [ ] Any agent hits an escalation condition defined in its template

---

## Page Me When (Project-Specific)

> Additional conditions specific to this project that require attending input.

- [ ] [e.g., "Any change to the core data model"]
- [ ] [e.g., "Any new n8n workflow added that wasn't in the original plan"]
- [ ] [e.g., "Any change to authentication logic"]
- [ ] [Add project-specific conditions or remove section if none]

---

## Never Proceed Without Me

> Hard blocks. The system stops completely and waits, no matter the autonomy level.
> These are not notifications — they are full stops.

- Schema changes to the primary database
- API contract changes that affect external consumers
- Deletion of any file not explicitly planned for removal
- Security audit verdict of BLOCKED
- Any action outside the scope of the current ROADMAP.md phase
- Discharge — final sign-off always requires attending

---

## Autonomous Decision Authority

> What the care team can decide without paging, within their defined roles.

| Decision Type | Autonomous? | Notes |
|:--------------|:------------|:------|
| Implementation approach within a plan | ✅ Yes | @Builder decides, logs in handoff |
| Library version selection (patch/minor) | ✅ Yes | @Builder decides, logs in handoff |
| QA test case design | ✅ Yes | @Inspector owns this |
| Git commit message wording | ✅ Yes | Follows forge commit format |
| Stage execution order | ✅ Yes | @Conductor owns this |
| New library / major dependency | ❌ No | Page attending |
| Scope change beyond current plan | ❌ No | Page attending |
| Blueprint modification | ❌ No | Page attending, route to @Architect |
| Security finding remediation approach | ⚠️ Conditional | Minor findings autonomous, High/Critical page attending |
| Task splitting when scope too large | ⚠️ Conditional | @Conductor decides split, logs decision, pages if it affects stage structure |

---

## Notification Preferences

> How to surface pages and notifications to the attending.

- **Page Format:** Inline in conversation with `🚨 ATTENDING PAGE:` prefix
- **Non-blocking Update Format:** Inline with `📋 UPDATE:` prefix
- **Rounds Summary:** Delivered via `/forge:rounds` — not pushed mid-session unless critical
- **Response Required:** Pages wait for explicit response before proceeding. Updates do not.

---

## Model Routing (Optional)

**Default:** All agents use premium model (Claude).

For cost optimization, specify which agent roles use reduced-cost model (GLM via z.ai):

```yaml
model_routing:
  planning: premium        # @Architect, @Strategist, @Triage — complex reasoning
  execution: reduced-cost  # @Builder, @FlowBuilder — follows plan
  qa: premium              # @Inspector, @Sentinel — judgment calls
  orchestration: reduced-cost  # @Conductor, @Monitor — routine state management
  debugging: premium       # @Debugger — root cause analysis requires reasoning
```

Omit section to keep all phases on premium (default, recommended if unsure).

**Rationale:**
- Planning phases involve novel design decisions → Claude
- Execution phases follow a pre-made plan → GLM sufficient, 5-10x cheaper
- QA needs judgment on edge cases → Claude
- Orchestration is state management → GLM sufficient
- Debugging needs reasoning for root cause → Claude

**Setup:** Requires z.ai API credentials configured. See `docs/COST_OPTIMIZATION.md` for setup.

---

## Autonomy Override

> The attending can override autonomy level mid-session at any time.
> Commands:
> - `"pause autonomy"` — switches to Manual mode for the current session only
> - `"resume autonomy"` — restores configured level
> - `"autonomy: task-gated"` — temporary level change for current session
> Changes to this file are permanent. Session overrides are temporary.
