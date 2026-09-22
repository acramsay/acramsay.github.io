---
title: opencode-shield-bash
draft: false
description: opencode plugin that gates bash commands through a second-session judge.
---

An [opencode](https://opencode.ai) plugin that routes every bash tool call
through a second session before it runs. A judge agent, with tool calls
disabled and a security policy as its system prompt, returns an allow or deny
verdict covering eight denial categories: destructive deletes, disk writes,
piping remote output into an interpreter, secret exfiltration, and so on.
Whole pipelines get judged, so one bad segment denies the chain.

A few design choices I care about. The judge session is a lazily-created child
of the calling session's root, so it's reachable in the TUI, never auto-shared,
and its transcript doubles as the audit trail. Verdicts are cached per root
session in SQLite and evicted when that session is deleted. Parallel calls are
judged serially, and a judge that tries to run the command itself gets an
instructive denial instead of a re-gate.

Written in TypeScript, published as
[@acramsay/opencode-shield-bash](https://github.com/acramsay/opencode-shield-bash)
on npm.
