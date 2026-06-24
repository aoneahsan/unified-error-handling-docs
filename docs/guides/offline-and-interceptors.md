---
id: offline-and-interceptors
title: Offline Queue & Interceptors
sidebar_label: Offline & interceptors
description: How unified-error-handling queues errors while offline and how the console + network interceptors and global handlers capture errors automatically.
keywords: [offline queue, console capture, network capture, global handlers, unhandledrejection]
---

# Offline Queue & Interceptors

Beyond manual `captureError()`, the store can capture errors automatically and survive network drops.

## Offline queue

When `enableOfflineQueue` is on (the default) and the browser reports it is offline, captured errors are pushed onto an in-memory queue instead of being dropped:

```ts
initialize({ enableOfflineQueue: true });
```

- Going offline adds a breadcrumb and starts queueing.
- Coming back online adds a breadcrumb and **flushes** the queue through the active adapter, in order.
- Activating an adapter with `useAdapter()` also flushes any pending queue.

The queue is in-memory only — it does not survive a full page reload. It is meant to bridge short connectivity gaps, not to persist across sessions.

## Global handlers

With `enableGlobalHandlers` on (the default), the store installs two `window` listeners:

| Event | Captured as |
|-------|-------------|
| `window` `error` | An uncaught error, with `extra.source = 'global'` plus `filename`, `lineno`, `colno`. |
| `window` `unhandledrejection` | The rejection reason, with `extra.source = 'unhandledRejection'`. |

These give you crash coverage without wrapping every call site. They are browser-only (they require `window`).

:::note
Because the listeners are attached anonymously, `reset()` flips the internal "installed" flag but cannot remove the specific listeners. Treat global-handler installation as a once-per-session action.
:::

## Console capture

With `enableConsoleCapture` on (the default), the console interceptor captures `console.error(...)` calls and routes them through the store. The interceptor preserves a reference to the original console so the built-in `console` adapter can still print without an infinite loop.

```ts
initialize({ enableConsoleCapture: true });
console.error('Boom'); // captured by the store
```

## Network capture

With `enableNetworkCapture` on (off by default), the network interceptor captures failed `fetch` and `XHR` requests so a failed API call becomes a tracked error:

```ts
initialize({ enableNetworkCapture: true });
```

Enable this when you want network failures in your error stream; leave it off if your service already does network monitoring (for example Datadog RUM).

## Turning capture off

All four behaviours are independent flags on `initialize()`. Disable any of them by passing `false`. `reset()` disables the console and network interceptors as part of tearing the store down.

```ts
initialize({
  enableGlobalHandlers: false,
  enableConsoleCapture: false,
  enableNetworkCapture: false,
  enableOfflineQueue: false,
});
```

## Subscribing to every captured error

Independent of adapters, you can observe every error the store processes:

```ts
import { subscribe } from 'unified-error-handling';

const unsubscribe = subscribe((error) => {
  // e.g. update an in-app error toast or a debug overlay
  console.warn('captured:', error.message);
});

// later
unsubscribe();
```

Listeners fire after the error is dispatched to the active adapter. In React, call `subscribe()` inside a `useEffect` and return its unsubscribe function for cleanup.
