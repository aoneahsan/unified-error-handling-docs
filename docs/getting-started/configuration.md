---
id: configuration
title: Configuration
sidebar_label: Configuration
description: The full ErrorStoreConfig passed to initialize() — breadcrumbs, global handlers, console + network capture, offline queue, beforeSend, environment, and release.
keywords: [ErrorStoreConfig, initialize options, beforeSend, breadcrumbs, enableGlobalHandlers]
---

# Configuration

`initialize(config?)` takes an `ErrorStoreConfig`. Every field is optional; the defaults below are what the store starts with.

```ts
import { initialize } from 'unified-error-handling';

initialize({
  maxBreadcrumbs: 100,
  enableGlobalHandlers: true,
  enableOfflineQueue: true,
  enableConsoleCapture: true,
  enableNetworkCapture: false,
  debug: false,
  environment: 'production',
  release: '1.4.2',
  beforeSend: (error) => error,
});
```

## Options

| Option | Type | Default | What it does |
|--------|------|---------|--------------|
| `maxBreadcrumbs` | `number` | `100` | Maximum breadcrumbs retained. When exceeded, the oldest are trimmed. |
| `enableGlobalHandlers` | `boolean` | `true` | Install `window` listeners for uncaught errors and unhandled promise rejections. Browser-only. |
| `enableOfflineQueue` | `boolean` | `true` | Queue errors raised while offline and flush them when the connection returns. |
| `enableConsoleCapture` | `boolean` | `true` | Capture `console.error` calls as errors via the console interceptor. |
| `enableNetworkCapture` | `boolean` | `false` | Capture failed `fetch` and `XHR` requests via the network interceptor. Off by default. |
| `beforeSend` | `(error: NormalizedError) => NormalizedError \| null` | — | Inspect, modify, or drop each error before dispatch. Return `null` to skip it entirely. |
| `environment` | `string` | — | A free-form environment label (e.g. `production`, `staging`) attached to the store config. |
| `release` | `string` | — | A release/version identifier attached to the store config. |
| `debug` | `boolean` | `false` | When `true`, the store logs diagnostics (e.g. "no active adapter") to the console. |

:::note
`initialize()` is idempotent in the sense that a second call while already initialized is ignored (it warns). Call `reset()` first if you need to re-initialize.
:::

## The `beforeSend` hook

`beforeSend` runs after the error is normalized and enriched, but before it is queued or dispatched. Use it to scrub PII, drop noisy errors, or add fields:

```ts
initialize({
  beforeSend: (error) => {
    // Drop a known-noisy error
    if (error.message.includes('ResizeObserver loop limit exceeded')) {
      return null;
    }

    // Redact an email from the message
    error.message = error.message.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[redacted]');

    return error;
  },
});
```

Returning `null` stops the error completely — it is neither queued nor sent to the adapter, and listeners are not notified.

## Device context

When running in a browser, `initialize()` automatically records a device context (`platform: 'web'`, user agent, language, and viewport size) into the store. You can override or extend it any time with [`setContext()`](/api/core#setcontextcontext).

## What `initialize()` triggers

1. Merges your config over the defaults.
2. Installs global handlers if `enableGlobalHandlers` and `window` exists.
3. Enables the console interceptor if `enableConsoleCapture`.
4. Enables the network interceptor if `enableNetworkCapture`.
5. Records the browser device context (browser only).

See [Offline & interceptors](/guides/offline-and-interceptors) for details on capture behaviour.
