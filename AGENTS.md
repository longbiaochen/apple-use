# Apple-Use Runbook

## Repo Scope

- Owner/escalation: Longbiao for local macOS tooling; app-specific failures escalate to the native Apple app/CLI state.
- This legacy repo is retained for explicit maintenance only.
- It owns the local-first Apple app skill/plugin pack for macOS: `apple-ecosystem`, `apple-mail`, `apple-notes`, and `apple-reminders`.
- Do not install it into the local Codex environment by default, and do not route Codex here unless the user explicitly names this repo.

## Canonical Commands

- Repo doctor: `npm --prefix apple-use run doctor`
- Local plugin install: `bash apple-use/scripts/install-local-plugin.sh`
- Notes list/search: `memo notes` or `memo notes -s "query"`
- Reminders: `remindctl today` or `remindctl add --title "Task" --list Personal --due tomorrow`
- Mail reads: `fruitmail unread --json`
- Mail draft: `apple-mail/scripts/mail_draft.sh --to alice@example.com --subject "Hello" --body "Hi"`

## Routine Operations

| Trigger | Command | Expected Result | Failure Recovery |
| --- | --- | --- | --- |
| Verify plugin health | `npm --prefix apple-use run doctor` | Doctor confirms usable local tool wiring | Inspect the failing Apple app CLI directly before changing plugin metadata |
| Install local plugin intentionally | `bash apple-use/scripts/install-local-plugin.sh` | Local Codex/OpenClaw plugin path points to this repo | Re-run doctor and verify the expected MCP tool appears |
| Draft email | `apple-mail/scripts/mail_draft.sh --to <addr> --subject <subject> --body <body>` | Draft is created without sending by default | Use `fruitmail`/Mail.app state to locate draft before retrying |

## Troubleshooting

| Trigger | Command | Expected Result | Failure Recovery |
| --- | --- | --- | --- |
| Notes/Reminders fail | `memo notes` or `remindctl today` | Native CLI reproduces or clears the issue | Repair app permission/account state before touching skill instructions |
| Mail automation fails | `fruitmail unread --json` | Mail index and account access are readable | Fall back to metadata-only or local Mail CLI path; avoid browser automation |

## Verification

- Prefer native Apple app CLIs over browser automation.
- For repo/plugin changes, run `npm --prefix apple-use run doctor` and one live command in the affected skill area.
- Draft email before send by default.

## Release/Deploy

- This repo is not part of default Codex runtime installation.
- Only update local plugin install paths when the task explicitly targets `apple-use`.

## Guardrails

- Keep workflows local-first on macOS.
- Do not introduce third-party APIs or OAuth when the local Apple app setup already provides the needed capability.
- Treat `~/.openclaw` as separate host state unless the task is explicitly about that environment.

## Known State

- Local Codex plugin install path has historically been `~/.codex/plugins/local/apple-use`.
- Mail was previously the most reliable live verification path; Notes/Reminders can depend on machine-side permission/account state.

## Browser Automation Constraint
- Follow the global `~/.codex/AGENTS.md` official browser/GUI automation policy: Chrome plugin for signed-in browser state, Browser plugin for unauthenticated rendering, and Computer Use for native desktop boundaries. Do not bypass it with AppleScript or `osascript` unless the global exception rules are met.
- Keep only repo-specific verification surfaces here; do not copy the full global policy block into this runbook.

## Worktree Policy

- Follow the global `~/.codex/AGENTS.md` main-first development rule: work in the current Local checkout by default and use a worktree only when the global exception list applies.
- Branch names should use `codex/<repo>-<short-task>`; manual long-lived worktree directories should use `~/Projects/<repo>-<short-task>`.
- Initialize dependencies inside each worktree and keep ports, databases, device/simulator state, build outputs, and ignored local config isolated per checkout.
- Preserve existing dirty checkouts. Inspect `git status --short` before editing, and do not stash, commit, remove, or migrate user changes unless explicitly asked.
- After merge or abandonment, clean up with `git worktree remove <path>` and use `git worktree prune` only for stale metadata.
