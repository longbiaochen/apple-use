# Himalaya Mail Recipes

Use `<account>`, `<mailbox>`, and `<id>` from live bounded results.

```bash
himalaya account list --json
himalaya account check -a <account> -b imap --json
himalaya account check -a <account> -b smtp --json
himalaya mailbox list -a <account> --json
himalaya envelope search -a <account> -m INBOX -s 20 --json -- subject "keyword"
himalaya message read -a <account> -m INBOX --json <id>
```

Generate a message preview without saving or sending:

```bash
himalaya message compose -a <account> \
  --from sender@example.com \
  --to recipient@example.com \
  --subject "Subject" \
  --body "Body" \
  --attach /absolute/path/to/file.pdf
```

An authorized send adds `--send --save sent`. Replies and forwards use the same guardrail:

```bash
himalaya message reply -a <account> -m INBOX <id> --body "Reply" --send --save sent
himalaya message forward -a <account> -m INBOX <id> --to recipient@example.com --body "Forward note" --send --save sent
```

Never add `--send` during infrastructure acceptance.
