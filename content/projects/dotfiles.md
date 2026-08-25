---
title: Dotfiles
draft: false
description: My personal development environment configuration.
---

My personal development environment, managed as code. This repo bootstraps a
consistent setup across macOS and Linux using [Task](https://taskfile.dev/) and a
handful of well-chosen tools.

Platform-specific configs live under `darwin/` and `linux/`, while shared
settings sit in `home/`. A simple `bootstrap.sh` gets a new machine from bare
OS to fully configured workspace.

The core of my setup:

- [WezTerm](https://wezfurlong.org/wezterm/) — GPU-accelerated terminal emulator
- [Helix](https://helix-editor.com/) — post-modern modal editor
- [Yazi](https://github.com/sxyazi/yazi) — terminal file manager
- [opencode](https://opencode.ai) — AI-powered coding assistant
- [lazygit](https://github.com/jesseduffield/lazygit) — terminal UI for git

Source: [github.com/acramsay/dotfiles](https://github.com/acramsay/dotfiles)
