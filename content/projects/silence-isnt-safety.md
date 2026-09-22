---
title: "BLOG Vetting AI Skills in a pipeline"
draft: false
description: What two months of vetting AI skills taught us.
---

A post for the Liatrio blog, co-written with Amber Beasley, about building a
security pipeline to vet AI skills before our teams install them. Skills look
like READMEs, but the agent follows every line with real filesystem, shell,
and network access. That makes them programs, not documents.

We tested three ways to evaluate them. Static pattern scanners caught nothing
the other layers didn't, buried us in false positives, and got removed. Two
LLM scanners (Cisco AI Defense and Snyk) run in parallel, and a skill has to
trip both before a merge is blocked. Sandboxed behavior tests with seeded
credentials and LLM judges caught the one thing no scanner could predict: a
skill reading a fake `.env` file in a way nothing in its text mentioned.

The lesson behind the title: when a model refuses to run a malicious fixture,
the empty trace looks exactly like a clean pass. An unexercised skill is a
failure, not a pass.

Read the full post at
[liatrio.ai](https://www.liatrio.ai/resources/blog/silence-isnt-safety).
