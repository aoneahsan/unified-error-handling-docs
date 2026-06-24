---
id: custom
title: Custom Adapter
sidebar_label: Custom
description: The custom adapter forwards errors to any backend you control via a send callback — no SDK. Build it with createAdapter or createCustomAdapter.
keywords: [custom adapter, createAdapter, createCustomAdapter, custom error backend]
---

# Custom Adapter

The custom adapter forwards captured errors to **any backend you control** — your own API, a log pipeline, `navigator.sendBeacon`, a message queue. It needs no SDK; you supply a `send` callback.

## Activate

The fastest path is `createAdapter()`, which builds and registers the adapter in one call:

```ts
import { createAdapter, useAdapter, captureError } from 'unified-error-handling';

createAdapter('my-backend', {
  async send(error, context) {
    await fetch('https://api.example.com/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error, context }),
    });
  },
});

await useAdapter('my-backend');
captureError(new Error('Boom')); // POSTed to your API
```

## Config (`CustomAdapterConfig`)

| Field | Required | Called when |
|-------|----------|-------------|
| `send(error, context)` | yes | The store dispatches an error here. |
| `initialize()` | no | The adapter is activated. |
| `setContext(context)` | no | The store context changes. |
| `addBreadcrumb(breadcrumb)` | no | A breadcrumb is added. |
| `flush()` | no | `flush()` is called. |
| `close()` | no | The adapter is removed or the store is reset. |

## Why it is the zero-cost option

A custom adapter lets you keep error data on infrastructure you already run — no third-party account, no extra SDK, no bundled dependency. It is also the recommended way to fan errors out to **several** destinations at once (do the multiplexing inside your `send`).

See the full [custom adapters guide](/guides/custom-adapters) for `createCustomAdapter()`, lifecycle details, and tips.
