# Challenge Evidence Ledger

This ledger prevents an unfinished placeholder or an older APLAI capability from being presented as challenge evidence. **Replace every `TODO` with a verifiable public URL or mark the item not applicable before submission. A placeholder is not evidence.**

## Submission artifacts

| Required artifact | Public evidence | Status |
| --- | --- | --- |
| Working hosted challenge edition | https://knat01.github.io/aplai-webmcp-challenge/ | Published; final host check pending |
| Public source repository | https://github.com/knat01/aplai-webmcp-challenge | Published |
| MIT license visible at repository root | [`LICENSE`](LICENSE) | Present locally |
| Connected ChatGPT plugin view | [`submission-assets/chatgpt-aplai-plugin-connected.jpg`](submission-assets/chatgpt-aplai-plugin-connected.jpg) | Captured from the signed-in ChatGPT plugin page; no credentials or private application data visible |
| Narrated public demo under three minutes | TODO: add the final public YouTube URL | Open |
| Final tested source revision | Final release tag will be added after the video URL is recorded | Open |
| Final WebMCP host check | 2026-09-03, ChatGPT Work in-app browser: `aplai_read_workspace`, `aplai_find_jobs`, `aplai_select_job`, `aplai_prepare_package`, `aplai_prepare_review`; revisions 12→16; stale revision 11 rejected at revision 12 with no state change; public video timestamp pending | Passed; public proof pending |

## Pre-existing baseline versus challenge-period extension

APLAI existed before the challenge. The production application and any remote MCP connector are pre-existing or separately developed product surfaces; they are context, not evidence that this five-tool page works.

| Date or period | Scope | Evidence to attach |
| --- | --- | --- |
| Before 2026-08-25 | The production APLAI product predates the challenge and is context only; private source is not included here. | Not submitted as challenge-period evidence |
| 2026-08-25 onward | Page-level WebMCP extension: shared visible state and imperative tool registration. | Demonstrated in the narrated production Site Tools proof; public video URL pending |
| Challenge period | Revision-bound mutations, stale-state refusal, synthetic fixture workflow, and human-review stop. | https://github.com/knat01/aplai-webmcp-challenge/commit/e785132134bc4c2b7a36888929ccdf2fd49406b3 |
| Challenge period | Sanitized standalone edition, accessibility/mobile polish, truthful production/demo/remote-MCP separation, and judge documentation. | https://github.com/knat01/aplai-webmcp-challenge/commit/e785132134bc4c2b7a36888929ccdf2fd49406b3 |
| Final release candidate | Exact five-tool discovery and complete no-submit journey in a supported host. | ChatGPT Work passed on 2026-09-03; final release tag and narrated demo timestamp pending |

Do not backfill dates from file timestamps or memory. Use the authoritative version-control and deployment records supplied by the submission owner.

## Final reviewer checklist

- [ ] The hosted URL opens without a login, payment, API key, or private credential.
- [ ] A supported host discovers exactly the five challenge tools in `README.md`.
- [ ] The narrated video is public, shorter than three minutes, includes audio, and shows actual WebMCP discovery and calls.
- [ ] The public repository contains the complete functional challenge source, root README, and detectable MIT license.
- [ ] Public commit links clearly distinguish work after the challenge start from the pre-existing APLAI product.
- [ ] The README and Devpost description both say production `/generator` has exactly two page-level WebMCP tools.
- [ ] Remote MCP is described as separate and complementary, not as page-level WebMCP proof.
- [ ] No claim implies job submission, outreach, credential handling, real job discovery, or real document generation.
- [ ] No private source, real candidate/employer data, access token, secret, internal URL, or credential is present.
- [ ] The submitted repository and live site will remain unchanged during the judging freeze required by the official challenge rules.

## Suggested evidence capture

Record one continuous run that shows:

1. the final public URL and page title;
2. all five discovered tool names;
3. `aplai_read_workspace` returning the current revision;
4. the four mutation tools updating the same visible workspace;
5. one stale `expected_revision` returning `REVISION_CONFLICT` without a state change;
6. the final `HUMAN_REVIEW_REQUIRED` state and **Nothing was submitted** message;
7. the repository root with `README.md`, `LICENSE`, and the immutable final commit.
