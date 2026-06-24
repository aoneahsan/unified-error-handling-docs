# Unified Error Handling — Documentation

Public documentation site for the [`unified-error-handling`](https://www.npmjs.com/package/unified-error-handling) npm package — a zero-dependency error-handling library with dynamic adapter loading for Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, and custom services.

Built with [Docusaurus 3](https://docusaurus.io/). Deployed to Firebase Hosting / GitHub Pages.

- Live site: https://unified-error-handling-docs.aoneahsan.com
- Package: https://www.npmjs.com/package/unified-error-handling
- Package source: https://github.com/aoneahsan/unified-error-handling

## Local development

This repo is **yarn-only** (Yarn Berry, node-modules linker). Do not use npm or pnpm.

```bash
yarn install      # install dependencies
yarn start        # local dev server (http://localhost:5970)
yarn build        # production build → ./build
yarn typecheck    # tsc --noEmit
yarn serve        # preview the built site (http://localhost:5971)
```

## Deployment

Two hosting options are wired; pick one for the custom domain `unified-error-handling-docs.aoneahsan.com`:

- **GitHub Pages** (free): enable Pages (Source: GitHub Actions). `.github/workflows/deploy.yml` builds and publishes; `static/CNAME` pins the domain.
- **Firebase Hosting**: `yarn firebase:deploy` (target `unified-error-handling-docs`; see `firebase.json` + `.firebaserc`).

Only one host should own the DNS record at a time.

## Content accuracy

Every API fact in these docs comes from the package's real `src/`. No invented function names or parameters. Honest framing: the docs state what the library does NOT do (it is not an error-tracking backend; it does not install service SDKs for you; it dispatches to the single active adapter, not all adapters at once; the browser interceptors and global handlers need `window`).

## License

MIT © [Ahsan Mahmood](https://aoneahsan.com)
