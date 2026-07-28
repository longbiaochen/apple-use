# Contributing

## Contract

- Keep `SKILL.md` files as the public behavior source.
- Keep root adapters, plugin metadata, and docs aligned with the skills.
- Preserve the local-first Notes and Reminders design.
- Route every email task to `apple-mail` with Himalaya as the primary execution surface.
- Do not add legacy Mail helpers, `fruitmail`, AppleScript/`osascript` Mail automation, Mail database access, or provider APIs.

## Checks

```bash
npm --prefix apple-use install
npm --prefix apple-use run check
npm --prefix apple-use run doctor
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-mail
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-ecosystem
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-use/skills/apple-use
```

Also verify that `apple-use/src/server.mjs` contains no `apple_mail_*` registrations and every `agents/openai.yaml` matches its skill.
