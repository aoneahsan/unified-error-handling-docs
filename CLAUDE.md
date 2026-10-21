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

# Unified Error Handling public docs guidance

**Last Updated:** 2026-10-20

**Last context pass:** 2026-10-20. **Next routine context pass:** 2026-11-19.

This public `aoneahsan/unified-error-handling-docs` repository documents the public npm package in `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/unified-error-handling`. The site deploys from `main` through `.github/workflows/deploy-pages.yml` to `https://unified-error-handling-docs.aoneahsan.com`. GitHub Pages and `static/CNAME` are the hosting authority.

Use package source, exports, changelog, and open issue records for every technical claim. Do not claim the Firebase adapter works while package ISSUE-002 is open, do not describe multi-adapter fan-out, and do not promise persistent offline storage. Public copy must contain no private source details, credentials, or unverified compatibility claims.

`docs/` contains published pages plus excluded maintenance records. `src/` contains the Docusaurus home page and styles; `static/` contains public assets and discovery files. Keep internal guides and trackers excluded in `docusaurus.config.ts`.

Use Yarn only. Never install owner-created client packages. Run `yarn install --immutable`, `yarn typecheck`, and `yarn build`; inspect the exact `build/` output in controlled desktop and mobile Chrome before pushing. A `main` push deploys, so check the Pages run, the live domain, representative routes, `robots.txt`, and `llms.txt` afterward.

Context optimization is complete for this pass. Do not repeat before 2026-11-19 unless the owner requests it, the tree changes materially, a hard cap is breached, or a stale instruction can cause wrong work.

## Stop-work Git gate

<!-- RULE:stop-work-git-gate v2026-10-20 -->

Before stopping, commit every legitimate change and work-progress checkpoint in this repository and each independent nested repository, fetch and merge the designated upstream, push the documented working branch, then verify an empty worktree and `0 0` ahead/behind. Never stash, discard, reset, rebase, or force-push. If synchronization is blocked, report the exact repository, branch, blocker, and next action instead of calling the work complete. The full workflow remains authoritative in `~/.claude/rules/git-workflow.md`.
