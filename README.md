# derekwelty.com

Personal website of Derek Welty — [derekwelty.com](https://derekwelty.com)

## Stack
- [Hugo](https://gohugo.io/) v0.161.1 (extended)
- [Congo](https://jpanther.github.io/congo/) theme (git submodule, stable branch)
- Tailwind CSS (via Congo's asset pipeline)
- Hosted on GitHub Pages via GitHub Actions

## Local Development
```bash
hugo server --buildDrafts
```

Requires Hugo extended v0.161.1+ and Dart Sass.

## Deploy
Push to `hugo-migration` branch. GitHub Actions builds and deploys automatically via `.github/workflows/hugo.yml`.

> **Note:** If this branch is ever merged into `main`, update the workflow trigger from `hugo-migration` to `main`.

## Theme
Congo is managed as a git submodule at `themes/congo/`. To update:
```bash
git submodule update --remote --merge
```

Local overrides live in `layouts/_partials/` — these take precedence over theme templates.

## Structure
```
assets/css/custom.css       # CSS overrides (button contrast, hr spacing, header border)
config/_default/            # Hugo config split by concern
layouts/_partials/
  profile.html              # Custom profile card with greeting + divider
  home/custom.html          # Custom homepage layout (centered profile)
content/
  _index.md                 # Homepage
  resume/index.md           # Résumé page
```
