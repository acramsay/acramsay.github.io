# AGENTS.md

Hugo personal site deployed to GitHub Pages. Two purposes: building and
maintaining my resume, and showing my software experience and capabilities. The
projects back up the resume, and the resume gives context to the projects.

This site is how I'm choosing to represent myself to the world of software
development. Content should feel personal and a little quirky, yet professional.

## Build

Hugo is built from source via Go modules. The binary lives at `.tools/hugo`.

```sh
task install    # build hugo binary (requires Go)
task start      # dev server with drafts
task stop       # kill dev server
task cibuild    # production build
```

Or run hugo directly: `.tools/hugo server -D` (dev), `.tools/hugo --gc --minify` (prod).

All versions must be pinned: Hugo version in `go.mod`, theme modules, Go
toolchain, CI action versions. When upgrading, edit the pin and verify the build.

## Theme

Uses [hugo-coder](https://github.com/luizdepra/hugo-coder) imported as a Hugo module (not vendored).
The module cache is at `~/.cache/hugo_cache/modules/`.

The theme supports light and dark mode (auto or manual toggle). Customizations
should be tested in both modes. Verify `body.colorscheme-auto` with
`prefers-color-scheme: dark` and `body.colorscheme-dark`.

Theme templates can be overridden in `layouts/`. Current overrides:

- `layouts/projects/list.html` — custom card-based project listing
- `layouts/resume.html` + `layouts/_partials/resume/` — CV layout adapted from Almeida CV theme
- `layouts/_shortcodes/years-since.html`
- `layouts/_partials/head/extensions.html`

Custom CSS: `assets/css/avatar.css`, `assets/css/projects.css`. Referenced in `hugo.yaml` under
`params.customCSS`.

## Deployment

GitHub Actions builds and deploys to GitHub Pages on push to `main`. The workflow runs
`task install`, `task update`, then `task cibuild`.
