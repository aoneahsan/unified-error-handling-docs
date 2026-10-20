# Unified Error Handling public docs guidance

**Last context pass:** 2026-10-20. **Next routine context pass:** 2026-11-19.

This public `aoneahsan/unified-error-handling-docs` repository documents the public npm package in `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/unified-error-handling`. The site deploys from `main` through `.github/workflows/deploy-pages.yml` to `https://unified-error-handling-docs.aoneahsan.com`. GitHub Pages and `static/CNAME` are the hosting authority.

Use package source, exports, changelog, and open issue records for every technical claim. Do not claim the Firebase adapter works while package ISSUE-002 is open, do not describe multi-adapter fan-out, and do not promise persistent offline storage. Public copy must contain no private source details, credentials, or unverified compatibility claims.

`docs/` contains published pages plus excluded maintenance records. `src/` contains the Docusaurus home page and styles; `static/` contains public assets and discovery files. Keep internal guides and trackers excluded in `docusaurus.config.ts`.

Use Yarn only. Never install owner-created client packages. Run `yarn install --immutable`, `yarn typecheck`, and `yarn build`; inspect the exact `build/` output in controlled desktop and mobile Chrome before pushing. A `main` push deploys, so check the Pages run, the live domain, representative routes, `robots.txt`, and `llms.txt` afterward.

Context optimization is complete for this pass. Do not repeat before 2026-11-19 unless the owner requests it, the tree changes materially, a hard cap is breached, or a stale instruction can cause wrong work.
