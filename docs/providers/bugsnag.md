---
id: bugsnag
title: Bugsnag Adapter
sidebar_label: Bugsnag
description: Route unified-error-handling errors to Bugsnag. Install @bugsnag/js, then useAdapter('bugsnag', { apiKey }).
keywords: [bugsnag adapter, "@bugsnag/js", error monitoring bugsnag]
---

# Bugsnag Adapter

Send captured errors to [Bugsnag](https://www.bugsnag.com).

## Install

```bash
yarn add @bugsnag/js
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('bugsnag', {
  apiKey: 'your-api-key',
  releaseStage: 'production',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `apiKey` | Your Bugsnag API key (required). |
| `releaseStage` | Environment label (e.g. `production`, `staging`). |

The adapter dynamically imports `@bugsnag/js`, starts it with your config, and forwards each captured error.

## Notes

- If `@bugsnag/js` is not installed, activation throws `Failed to load Bugsnag SDK…` with the original import error preserved as `cause`.
- Pass any additional Bugsnag start options your project needs in the same config object.
