---
title: opencode-veil
draft: false
description: opencode plugin that redacts secrets from prompts via local gitleaks scanning.
---

An [opencode](https://opencode.ai) plugin that redacts secrets before they
reach the model. Tool outputs leak the most. `cat .env`, `gh auth token`, PEM
files all arrive as completed tool parts rather than typed prompts, so each
user text part and completed tool output gets scanned once and matches are
replaced with `[REDACTED:<rule-id>]`.

Detection is fully local. [gitleaks](https://github.com/gitleaks/gitleaks)
runs as a stdin subprocess, around 25 to 35ms per span, with no network calls
and no generative model involved. The assistant's own text is never scanned,
and nothing ever blocks a prompt. A scanner error fails open with a log line.
Every scan appends an audit record to a JSONL file, carrying rule IDs only,
never the secret itself.

Written in TypeScript, published as
[@acramsay/opencode-veil](https://github.com/acramsay/opencode-veil) on npm.
