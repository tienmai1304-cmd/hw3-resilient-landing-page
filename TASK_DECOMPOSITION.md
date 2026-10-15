# HW3 — Task Decomposition

## Project Overview

**Project:** Resilient Landing Page  
**Architecture:** Vanilla HTML5, CSS3, and JavaScript ES6+  
**Repository:** `hw3-resilient-landing-page`

## Architectural Constraints

- Use native semantic HTML, modern CSS, and vanilla JavaScript.
- Do not use jQuery, Bootstrap, Tailwind, or external script CDNs.
- Use `const` by default and `let` only when reassignment is necessary.
- Never insert untrusted user input using `innerHTML`.
- Use UTC ISO 8601 timestamps for the countdown engine.
- Separate countdown logic, form state management, and security handling.
- Verify responsive behavior at a 375px viewport.
- Make interactive elements accessible by keyboard.

## Work Breakdown Structure

| Task | Scope | Verification Contract | Commit |
|---|---|---|---|
| T-01 | Define semantic HTML structure and component contracts | Correct landmarks, one primary heading, accessible controls | `docs(spec): define component contracts and WBS` |
| T-02 | Implement semantic landing page HTML | Required sections and form controls exist | `feat(html): build semantic landing page` |
| T-03 | Implement CSS design tokens and responsive styling | No horizontal overflow at 375px | `feat(css): implement design tokens and responsive layout` |
| T-04 | Implement drift-free UTC countdown engine | Remaining time is calculated from target timestamp and current time | `feat(js): implement drift-free countdown` |
| T-05 | Implement form state machine | Idle, Submitting, Success, and Error transitions are verified | `feat(js): implement form state machine` |
| T-06 | Prevent duplicate submissions and unsafe input rendering | Repeated submissions are blocked; user input is rendered safely | `fix(security): prevent duplicate submissions and XSS` |
| T-07 | Audit AI-induced defects and document fixes | Three defects have evidence, diagnosis, and verified fixes | `docs(audit): document AI failure modes` |

## Component Contracts

### Countdown Engine

- Input: A valid UTC ISO 8601 target timestamp.
- Time source: Current time from `Date.now()`.
- Output: Remaining days, hours, minutes, and seconds.
- Invariant: Remaining time is recalculated from timestamps rather than decremented as an independent counter.
- Completion: Display zero when the target time has passed.

### Form State Machine

- States: `idle`, `submitting`, `success`, `error`.
- Only valid transitions are allowed.
- The submitting state prevents concurrent submissions.
- Success and error messages must be accessible.

### Input Security

- Use native HTML validation and JavaScript validation where appropriate.
- Do not trust client-side validation as a security boundary.
- Do not render user-controlled values with `innerHTML`.
- Prevent repeated submission while an operation is in progress.

## AI Failure Audit Contract

`AI_FAILURE_AUDIT.md` must document three actual AI-induced defects discovered during review.

For each defect, record:
1. Defect description.
2. Diagnostic method and reproducible evidence.
3. Refactored solution.
4. Verification result.

Do not claim a defect was discovered or fixed without testing it.

## Verification Checklist

- [ ] Countdown uses UTC ISO 8601 timestamps.
- [ ] Countdown does not accumulate interval drift.
- [ ] Form transitions are tested independently.
- [ ] Duplicate submissions are prevented.
- [ ] Untrusted input is rendered safely.
- [ ] Layout works at a 375px viewport.
- [ ] Keyboard navigation is verified.
- [ ] Three real AI-induced defects are documented.
- [ ] At least five meaningful atomic commits are present.