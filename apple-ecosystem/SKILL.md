---
name: apple-ecosystem
description: Route local Apple app tasks on macOS. Route Apple Notes to apple-notes, Apple Reminders to apple-reminders, and every Apple Mail or email task to the Himalaya-first apple-mail skill.
---

# Apple Ecosystem

Use the supported local Apple app toolchain already available on macOS.

Use this routing:

- Notes or Apple Notes app -> `apple-notes`
- Reminders or Apple Reminders app -> `apple-reminders`
- Mail.app, Apple Mail, inbox triage, draft/send/search email -> `apple-mail` with Himalaya first

Use the `apple-use` plugin for Notes and Reminders when installed. Email always routes to the standalone `apple-mail` skill; Himalaya is primary and `macos-use` handles only native Mail edge behavior.

Shared tool policy:

- `memo` for Apple Notes
- `remindctl` for Apple Reminders
- `himalaya` for protocol-level email work
- `macos-use` only for native Mail review or Apple-Mail-only behavior

Rules:

- Prefer supported local Apple app workflows over browser automation.
- Keep data local-first. Do not introduce third-party APIs or OAuth when the request can be completed through configured Apple apps.
- For Mail, do not use `fruitmail`, legacy `apple_mail_*` tools, AppleScript, `osascript`, private APIs, or direct Mail database access.
- Confirm destructive or ambiguous Notes and Reminders writes before executing them.
- For Mail, follow `apple-mail` for send authorization, bounded traversal, and sent-state verification.
- Read [../docs/agent-contract.md](../docs/agent-contract.md) when you need the shared cross-agent invariants for this skill pack.
