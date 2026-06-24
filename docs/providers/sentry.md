---
id: sentry
title: Sentry Adapter
sidebar_label: Sentry
description: Route unified-error-handling errors to Sentry. Install @sentry/browser, then useAdapter('sentry', { dsn }).
keywords: [sentry adapter, "@sentry/browser", sentry dsn, error tracking sentry]
---

# Sentry Adapter

Send captured errors, messages, breadcrumbs, and user context to [Sentry](https://sentry.io).

## Install

```bash
yarn add @sentry/browser
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('sentry', {
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  environment: 'production',
  release: '1.4.2',
});
```

## Config

Pass the options your Sentry project expects. The most common:

| Field | Purpose |
|-------|---------|
| `dsn` | Your Sentry project DSN (required). |
| `environment` | Environment label (e.g. `production`). |
| `release` | Release identifier for grouping. |

The adapter forwards your config to the Sentry SDK on initialize, then maps each `NormalizedError`, message, breadcrumb, and context update onto the corresponding Sentry call.

## Notes

- The `@sentry/browser` SDK is loaded with a dynamic `import()` only when you activate this adapter — it never reaches a bundle that does not use Sentry.
- If `@sentry/browser` is not installed, activation throws `Failed to load Sentry SDK…` with the original import error preserved as `cause`.
- Use the store's `beforeSend` hook (in `initialize()`) to scrub PII before it reaches Sentry.

See the [adapters guide](/guides/adapters) for switching and the [core API](/api/core) for `setUser` / `addBreadcrumb`, which the adapter forwards.
