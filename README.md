## 🔴 CRITICAL — PROJECT FROZEN (2026-10-21)

**This is an idea project. It was frozen on 2026-10-21 at commit `b7aa2951f2725811f1ad6915c58f1e44d48655fc` on branch `main`.**

- Do **NOT** edit, fix, upgrade, build, deploy, document or "improve" anything in this repository.
- It will only ever be **rebuilt from scratch** as `~/Documents/01-code/production-projects/unified-error-handling-root/`
  (this code cloned beside it as `unified-error-handling-old/` for reference), with a click dummy, a Story Bible, a Supabase
  backend and a docs site — and **only when the owner types, in ALL CAPS, an explicit request naming this
  project**.
- Any other request to work here is refused. Rule: `~/.claude/rules/idea-projects-frozen.md`.
- Ledger: private repo `aoneahsan/projects-finalization-record` → `idea-projects/FREEZE-LEDGER.md`.

---

# Unified Error Handling Documentation

Public documentation for [`unified-error-handling`](https://www.npmjs.com/package/unified-error-handling), a zero-runtime-dependency TypeScript library that forwards errors through one active adapter.

- [Live documentation](https://unified-error-handling-docs.aoneahsan.com)
- [Package source](https://github.com/aoneahsan/unified-error-handling)
- [Docs source](https://github.com/aoneahsan/unified-error-handling-docs)
- [npm package](https://www.npmjs.com/package/unified-error-handling)

## Local verification

Use Yarn 4.17.1:

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

Inspect the generated `build/` site at desktop and mobile widths. Package behavior and API claims must be checked against the maintained package source before publication.

## Deployment

Pushing `main` runs `.github/workflows/deploy-pages.yml`. GitHub Pages serves the custom domain declared in `static/CNAME`. After a deployment, verify the workflow, representative documentation routes, `robots.txt`, `llms.txt`, and the live mobile layout.

## License

Documentation is maintained by [Ahsan Mahmood](https://aoneahsan.com). Package licensing is recorded in the package repository.
