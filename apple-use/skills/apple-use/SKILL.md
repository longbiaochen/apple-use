---
name: apple-use
description: Use the Apple Use MCP server in Codex for local Apple Notes, Reminders, and environment doctor workflows on macOS. Route every email task to the standalone Himalaya-first apple-mail skill instead of this plugin.
---

# Apple Use

Use this skill when the `apple-use` Codex plugin is installed for Notes or Reminders. Do not use it for Mail execution.

What it packages:

- an MCP server with Apple Notes, Reminders, and doctor tools
- the same local-first safety defaults as the canonical app skill folders in this repo
- the existing supported Apple CLIs for Notes and Reminders

Use the MCP server first:

- `apple_doctor` to inspect Notes and Reminders dependencies and permissions
- `apple_notes_*` for structured Apple Notes operations
- `apple_reminders_*` for Apple Reminders operations, including authorization checks

For any email request, load `apple-mail` and use Himalaya as the primary execution surface. Use `macos-use` only for Apple-Mail-only features or UI recovery. The old `apple_mail_*` tools, `fruitmail`, AppleScript helpers, and Mail database path are retired.

Rules:

- Keep workflows local-first on macOS.
- Confirm destructive or ambiguous Notes and Reminders writes before executing them.
- Use `apple_doctor` when Notes or Reminders permissions appear unhealthy.
- If the plugin is unavailable, fall back to the canonical Notes or Reminders skill folders in the repo root.

Read [../../references/workflows.md](../../references/workflows.md) for install steps and routing.
