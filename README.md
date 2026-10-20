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
