# Apple Use Workflows

## Install

Install this plugin only for Apple Notes and Reminders:

```bash
cd /path/to/apple-use/apple-use
./scripts/install-local-plugin.sh
```

## Tool routing

- `apple_doctor`: Notes/Reminders dependency and permission checks
- `apple_notes_*`: Apple Notes operations
- `apple_reminders_*`: Apple Reminders operations
- any Mail or email request: standalone `apple-mail` skill with Himalaya first; `macos-use` only for native Mail edge behavior

The retired `apple_mail_*` tools and their `fruitmail`, AppleScript, and Mail database implementations must not be restored as fallbacks.

## Safety

- Confirm destructive or ambiguous Notes and Reminders actions.
- Follow `apple-mail` for all Mail authorization and verification rules.
