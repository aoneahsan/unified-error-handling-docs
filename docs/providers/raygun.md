---
id: raygun
title: Raygun Adapter
sidebar_label: Raygun
description: Route unified-error-handling errors to Raygun. Install raygun4js, then useAdapter('raygun', { apiKey }).
keywords: [raygun adapter, raygun4js, crash reporting raygun]
---

# Raygun Adapter

Send captured errors to [Raygun](https://raygun.com) crash reporting.

## Install

```bash
yarn add raygun4js
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('raygun', {
  apiKey: 'your-api-key',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `apiKey` | Your Raygun API key (required). |

The adapter dynamically imports `raygun4js`, initializes it with your API key, and forwards each captured error.

## Notes

- If `raygun4js` is not installed, activation throws `Failed to load Raygun SDK…` with the original import error preserved as `cause`.
- Combine with breadcrumbs and `setUser()` for richer crash reports — the adapter forwards both when supported.
