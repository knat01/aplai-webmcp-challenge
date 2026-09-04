# APLAI WebMCP Challenge Edition

APLAI’s challenge edition is a dependency-free, synthetic demonstration of a human and an agent sharing one visible job-application preparation workspace. Five page-level WebMCP tools let an agent inspect the demo state, load fixed fictional role fixtures, choose one, create a synthetic package manifest, and stop at a human-review handoff.

Nothing in this repository can submit a job application, contact an employer, reveal a hidden contact, handle credentials, or make a network request. All candidate, employer, role, score, and document-status data in the demo is fictional.

> Submission status: this directory is a local release candidate. Add the authorized public demo, repository, and narrated video URLs to [CHALLENGE_EVIDENCE.md](CHALLENGE_EVIDENCE.md) before submitting it to Devpost.

## Judge path (about 60 seconds)

1. Open the hosted challenge page in ChatGPT’s in-app browser, or in Chrome 149+ with `chrome://flags/#enable-webmcp-testing` enabled.
2. Ask the agent:

   > Find remote AI product roles in Canada, choose the strongest match, prepare the application package, and stop for my review.

3. Confirm that the page exposes the five challenge-only tools listed below.
4. Watch the same visible workspace move from role fixtures to selection, package manifest, and `HUMAN_REVIEW_REQUIRED`.
5. Confirm that the final page says **Nothing was submitted**.

No account, API key, candidate file, or test credential is required. If WebMCP is unavailable, choose **Run the same flow manually**. That button runs the exact same local tool handlers and is a progressive-enhancement fallback, not proof of host-side tool discovery.

## Challenge tools

The page registers exactly five local tools through `document.modelContext.registerTool(...)`:

| Tool | Purpose | Changes page state? |
| --- | --- | --- |
| `aplai_read_workspace` | Read the synthetic workspace and current revision. | No |
| `aplai_find_jobs` | Load three fixed fictional role fixtures for the supported demo query. | Yes |
| `aplai_select_job` | Select one returned fixture at the current revision. | Yes |
| `aplai_prepare_package` | Create a synthetic package manifest from the fixture state. | Yes |
| `aplai_prepare_review` | Show the human-review handoff and stop. | Yes |

Every mutation requires `expected_revision`. A stale call returns `REVISION_CONFLICT` without changing state. Tools have explicit read-only and untrusted-content annotations, concise schemas, and lifecycle cleanup through `AbortSignal`.

## Important scope separation

These are three different surfaces. Do not combine their tool counts or capabilities.

| Surface | Page-level WebMCP tools | Data and purpose |
| --- | ---: | --- |
| This local challenge edition | **5** | Fixed synthetic fixtures; no authentication, persistence, generation service, or network calls. |
| Production APLAI `/generator` | **Exactly 2** | `aplai_read_visible_workspace_v1` and `aplai_update_visible_job_target_v1` on the authenticated, human-visible generator page. Production source is not included here. |
| APLAI remote MCP | Not page-level WebMCP | A separate, complementary product integration with its own transport and tool surface. It is not registered by this page and is not evidence for this demo’s five tools. |

The challenge edition demonstrates the interaction contract in isolation. It is not a copy of the production service and must not be described as a production application executor.

## Run locally

Requirements: Python 3 for the static server. Node.js 18+ is optional and is used only for the repository checks.

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open [http://127.0.0.1:8080](http://127.0.0.1:8080).

For local WebMCP discovery in Chrome 149+:

1. Open `chrome://flags/#enable-webmcp-testing`.
2. Set the flag to **Enabled** and relaunch Chrome.
3. Open the local URL and inspect the Application → WebMCP panel in DevTools.

WebMCP is a progressive enhancement. The page remains usable without it.

## Verify

No dependency install or build step is needed.

```bash
npm test
```

The check compiles the inline JavaScript, verifies the exact five-tool contract and production/demo wording, checks the key accessibility and mobile markers, confirms the MIT license and evidence ledger, and scans the release files for common credential signatures.

## Safety and privacy boundary

- The demo performs no `fetch`, XHR, WebSocket, form submission, navigation, storage, upload, or download.
- It contains no real resume text, identity, employer record, recruiter data, hidden contact, account, secret, or credential.
- “Prepare package” creates a deterministic synthetic manifest; it does not call an LLM or generate a real resume or cover letter.
- Role fixtures and fit percentages are illustrative synthetic data, visibly labeled as such.
- The source contains no production implementation. Production and remote MCP behavior are described only to prevent scope confusion.

## Accessibility and mobile behavior

The page uses semantic headings and an ordered workflow, a skip link, keyboard-visible focus, status live regions, 48-pixel controls, reduced-motion handling, and responsive layouts for narrow screens. The manual flow locks its control while running so repeated activation cannot race revisions.

## Repository layout

```text
.
├── CHALLENGE_EVIDENCE.md  # pre-submission evidence ledger and placeholders
├── LICENSE                # MIT license
├── README.md              # setup, scope, judge path, and limitations
├── favicon.svg            # small local APLAI demo mark
├── index.html             # complete dependency-free demo
├── package.json           # dependency-free verification command
└── scripts/verify.mjs     # static contract and safety checks
```

## Challenge-period work

APLAI predates the challenge. Only the challenge-period WebMCP extension should be judged as new work. [CHALLENGE_EVIDENCE.md](CHALLENGE_EVIDENCE.md) separates the pre-existing baseline from the new WebMCP work and deliberately leaves commit, deployment, and video proof as visible placeholders until the submission owner supplies verifiable public URLs.

## Known limitations

- State is in memory and resets on reload.
- The three roles and all package fields are hard-coded fictional fixtures.
- The fallback proves the handler flow, but only a supported WebMCP host can prove discovery and invocation.
- This repository does not include APLAI’s private production code, remote MCP implementation, authentication, storage, job submission, or outreach.

## License

Released under the [MIT License](LICENSE).
