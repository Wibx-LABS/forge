# /forge:verify — USER ACCEPTANCE TESTING WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to walk the user through manual acceptance testing of a completed phase.

---

## STEP 1 — Extract Testable Deliverables

Read:
1. `.forge/REQUIREMENTS.md` — which requirements this phase covers
2. `.forge/phases/XX-phase-name/XX-VERIFY.md` — automated verification results
3. `.forge/qa_report.md` — QA results

Extract a list of things the user should now be able to do:

```
Phase [N] — Testable Deliverables:
1. [You can now...] (traces to REQ-001)
2. [You can now...] (traces to REQ-002)
3. [You should see...] (traces to REQ-003)
```

---

## STEP 2 — Walk Through One at a Time

For each deliverable:
1. Present the test to the user
2. Explain what to try and what to expect
3. Ask: "Does this work as expected? (yes/no/describe what's wrong)"

**If yes:** Mark as VERIFIED. Move to next deliverable.

**If no:**
1. Capture the user's description of what's wrong
2. Diagnose: is this a code bug or a misunderstanding of the requirement?
3. If code bug: create a fix plan using `@Debugger`'s diagnostic format
4. If requirement misunderstanding: note for discussion

---

## STEP 3 — Results

Produce `.forge/phases/XX-phase-name/XX-UAT.md`:

```
## User Acceptance Testing — Phase [N]
Date: [Date]

### Results
| Deliverable | Requirement | Status | Notes |
|:------------|:------------|:-------|:------|
| [Test 1] | REQ-001 | VERIFIED / FAILED | [Notes] |
| [Test 2] | REQ-002 | VERIFIED / FAILED | [Notes] |

### Fix Plans Created
[List any fix plans created for failures]

### Overall: PASS / NEEDS FIXES
```

---

## STEP 4 — State Update

Update STATE.md with UAT results.

---

---

# ACCESSIBILITY AUDIT (Final Gate)

Before phase completion:

1. **@Inspector performs WCAG 2.1 Level AA audit:**
   - [ ] Form labels present on all inputs
   - [ ] Alerts use icon + text (not color alone)
   - [ ] Keyboard navigation complete (no mouse-only workflows)
   - [ ] Screen reader compatibility (test with NVDA/JAWS)
   - [ ] Contrast ratios meet 4.5:1 (normal) / 3:1 (large)

2. **Auto-fail criteria:**
   - Any WCAG gate fails = blocker
   - EHR applications must be accessible (regulatory + ethics)

3. **Resolution:** Remediate or escalate to @Architect for design exception

**Reference:** See Inspector_Template.md → Accessibility Gates (WCAG 2.1 Level AA) section for detailed criteria and examples.

---

## 🛑 HARD STOP

**If all tests passed:**
> "User acceptance testing complete. All deliverables verified. Phase [N] is done. Run `/forge:ship [N]` to create a PR, or `/forge:discuss [N+1]` to start the next phase."

**If fixes are needed:**
> "User acceptance testing found [count] issues. Fix plans have been created. Run `/forge:build [N]` to execute the fix plans."
