---
title: "BLOG The 'tools.go' Pattern"
draft: false
description: How the tools.go pattern went from a Makefile hack to an official Go feature.
---

A post for the Liatrio blog about the `tools.go` pattern, the idiom where you
list development tools as blank imports in a file so `go.mod` versions them
next to your real dependencies. It works well enough that Kubernetes and the
OpenTelemetry collector both grep their own `tools.go` inside Makefiles to get
the tool names out. Nobody enjoys that part. The post covers why the pattern
stuck around despite itself, and the Go proposal that eventually replaced it
with `go.mod` tool directives and `go tool` subcommands.

Read the full post at
[liatrio.ai](https://www.liatrio.ai/resources/blog/tools-go-pattern-modern-go-development).
