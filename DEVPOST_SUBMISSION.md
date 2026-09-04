# Devpost submission draft

## Project name

APLAI — The Human-Visible Job Application Workspace

## Tagline

An agent-native path from one resume to a truthful, review-ready application.

## Links

- Live challenge demo: https://knat01.github.io/aplai-webmcp-challenge/
- Source: https://github.com/knat01/aplai-webmcp-challenge
- Demo video: `TODO`
- Live APLAI product: https://www.apl.ai/generator

## Gallery image

- Image: [`submission-assets/chatgpt-aplai-plugin-connected.jpg`](submission-assets/chatgpt-aplai-plugin-connected.jpg)
- Caption: **APLAI connected inside ChatGPT, exposing its bounded job-application preparation actions with review controls.**

## Inspiration

Job applications are repetitive, but handing the entire process to an invisible agent creates a trust problem: people cannot easily see which facts were used, what changed, or where the agent stopped. We built APLAI around a simpler idea. The person and the agent should work from the same visible page, with the same current revision, and the page—not a hidden automation—should remain the source of truth.

## What it does

The challenge edition exposes five page-level WebMCP tools from one synthetic job-application workspace: read, find, select, prepare package, and prepare review. An agent can move through that sequence while every state change appears on the page. Each mutation requires the page's current revision, so a stale agent action is rejected rather than overwriting a newer human edit. The flow deliberately ends at `HUMAN_REVIEW_REQUIRED` and visibly states that nothing was submitted.

The hosted demo uses only fictional fixtures. It needs no login, API key, resume, or credential, and it cannot contact an employer or submit an application.

## How we built it

The page registers its tools imperatively with `document.modelContext.registerTool(...)`. Tool handlers and the manual progressive-enhancement path call the same local state-transition functions, so the visible experience remains consistent with or without a supported WebMCP host. State is revisioned in memory; write tools accept `expected_revision`; tool annotations declare read-only and untrusted-content behavior; and `AbortSignal` cleanup removes registrations when the page lifecycle ends.

We also use this pattern in the live authenticated APLAI Generator, where production exposes exactly two narrower page-local tools: a masked workspace read and a visible job-target update. A separate remote MCP connector exists for the broader product workflow, but it is complementary and is not counted as page-level WebMCP in this submission.

## Challenges we ran into

The hardest product decision was subtraction. A job-application platform could expose dozens of actions, but that would make authority and state harder to reason about. We reduced the public demo to five bounded preparation tools, removed network and submission surfaces entirely, and made revision conflicts visible. We also separated the challenge edition, the two-tool production page surface, and the remote MCP connector so each claim can be independently verified.

## Accomplishments that we're proud of

- One visible page is shared by the human and the agent.
- Every mutation is revision-bound and fails closed on stale state.
- The complete five-tool flow reaches a review-ready synthetic manifest and handoff without real personal data.
- The final boundary—nothing submitted—is explicit in both the UI and tool result.
- The demo is dependency-free, keyboard accessible, responsive on phones, and testable without an account.

## What we learned

WebMCP is most useful when it is not merely a second API surface. The strongest pattern is to expose the page's real interaction model and current visible state, then let the host reason over those tools while the person retains a legible control surface. Revision tokens are a small primitive with an outsized effect: they turn a page shared by a person and an agent into a safer collaboration boundary.

## What's next

We plan to carry the same visible-state contract through APLAI's broader preparation workflow: confirmed candidate facts, job selection, tailored artifacts, and final human review. The goal is not hidden submission. It is to let agents handle repetition while people keep control over identity, claims, and consequential action.

## Built with

WebMCP, HTML, CSS, JavaScript, ChatGPT Work, Codex

## Testing instructions

1. Open the live challenge URL in ChatGPT's in-app browser, or in Chrome 149+ with WebMCP testing enabled.
2. Ask: “Find remote AI product roles in Canada, choose the strongest match, prepare the application package, and stop for my review.”
3. Confirm the host discovers exactly the five tools documented in the README.
4. Watch the same page advance through job fixtures, selection, package, and review.
5. Confirm the final state is `HUMAN_REVIEW_REQUIRED` and the page says **Nothing was submitted**.
6. To test concurrency, call a write tool with an older `expected_revision`; confirm it returns `REVISION_CONFLICT` and leaves the current page unchanged.

If WebMCP is unavailable, the manual button demonstrates the same handlers and page states, but it is not evidence of host-side tool discovery.
