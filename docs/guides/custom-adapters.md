---
id: custom-adapters
title: Custom Adapters
sidebar_label: Custom adapters
description: Send errors to your own backend with createAdapter / createCustomAdapter — a zero-SDK adapter built from a single send callback.
keywords: [createAdapter, createCustomAdapter, CustomAdapterConfig, custom error backend]
---

# Custom Adapters

When none of the built-in services fit — for example you POST errors to your own API — write a **custom adapter**. It needs no SDK; you supply a `send` callback and any optional lifecycle hooks.

## The quick way: `createAdapter()`

`createAdapter(name, config)` builds a custom adapter and registers it under `name` in one call:

```ts
import { createAdapter, useAdapter, captureError } from 'unified-error-handling';

createAdapter('my-backend', {
  async initialize() {
    // optional one-time setup
  },
  async send(error, context) {
    await fetch('https://api.example.com/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error, context }),
    });
  },
});

await useAdapter('my-backend');     // activate it
captureError(new Error('Boom'));    // now POSTed to your API
```

## The explicit way: `createCustomAdapter()`

`createCustomAdapter(config)` returns an `ErrorAdapter` instance you register yourself:

```ts
import { createCustomAdapter, registerAdapter, useAdapter } from 'unified-error-handling';

const adapter = createCustomAdapter({
  async send(error, context) {
    navigator.sendBeacon('/log', JSON.stringify({ error, context }));
  },
});

registerAdapter('beacon', adapter);
await useAdapter('beacon');
```

## `CustomAdapterConfig`

```ts
interface CustomAdapterConfig {
  send: (error: NormalizedError, context: ErrorContext) => Promise<void>; // required
  initialize?: () => Promise<void>;
  setContext?: (context: ErrorContext) => Promise<void>;
  addBreadcrumb?: (breadcrumb: Breadcrumb) => Promise<void>;
  flush?: () => Promise<void>;
  close?: () => Promise<void>;
}
```

| Field | Required | Called when |
|-------|----------|-------------|
| `send` | yes | The store dispatches an error to this adapter. Receives the normalized error plus the merged context. |
| `initialize` | no | The adapter is activated via `useAdapter()`. |
| `setContext` | no | `setUser()` / `setContext()` updates the store context. |
| `addBreadcrumb` | no | `addBreadcrumb()` is called. |
| `flush` | no | `flush()` is called. |
| `close` | no | The adapter is removed or the store is reset. |

The custom adapter keeps its own copy of the latest context and breadcrumbs internally and merges the stored context with each error's context before calling `send`, so you always receive the full picture.

## Tips

- Keep `send` resilient — a throw inside it is caught and logged by the store, but you should still handle your own network failures (retry, beacon, or drop).
- Use `beforeSend` (in `initialize()`) to scrub sensitive fields before they ever reach your `send` callback.
- A custom adapter is the zero-cost way to fan error data into any HTTP endpoint, log pipeline, or message queue you control.
