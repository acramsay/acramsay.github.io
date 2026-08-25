---
title: Utter
draft: false
description: Offline push-to-talk voice dictation powered by NVIDIA Parakeet-TDT.
---

Local, no-cloud push-to-talk dictation for macOS and Linux. Hold a key, speak,
release — the transcription appears in whatever text field is focused. Powered by
[NVIDIA Parakeet-TDT 0.6B v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3)
(INT8 ONNX), it runs entirely on-device. No cloud, no API keys, no telemetry.

A 4-second utterance transcribes in ~150 ms on a modern laptop CPU — roughly
50x faster than real-time.

My main contribution was stripping out many of the project's external
dependencies for Linux, dramatically simplifying the install process. I added
Homebrew distribution — a [cask](https://github.com/acramsay/utter/blob/main/Casks/utter.rb)
for macOS and a [formula](https://github.com/acramsay/utter/blob/main/Formula/utter.rb)
for Linux — so installation is a single `brew install` or `brew install --cask`
command. Other work includes fixing session lifecycle bugs on Linux (voice
control sessions are now lazy-loaded and reused instead of spawning new ones per
transcription) and switching text insertion from clipboard paste to character-by-character input.

Written in Rust. Source: [github.com/acramsay/utter](https://github.com/acramsay/utter)
