# Apple Use Agent Contract

The canonical behavior lives in:

- `apple-ecosystem`
- `apple-mail`
- `apple-notes`
- `apple-reminders`

Root adapters and the `apple-use` plugin must mirror these skills.

## Shared invariants

- Keep workflows local-first on macOS.
- Route Notes to `apple-notes` and `memo`.
- Route Reminders to `apple-reminders` and `remindctl`.
- Route every email task to `apple-mail`; use Himalaya for protocol operations, Apple Mail for review, and `macos-use` only for native Mail edge behavior.
- The plugin must not expose `apple_mail_*` tools or use `fruitmail`, AppleScript/`osascript` Mail helpers, private APIs, or direct Mail databases.
- Follow `apple-mail` for send authorization, bounded traversal, compose-window counting, attachments, and sent-state verification.
- Confirm destructive or ambiguous Notes and Reminders actions.
