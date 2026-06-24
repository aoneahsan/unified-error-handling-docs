---
id: core
title: Core API
sidebar_label: Core API
description: Every function exported from unified-error-handling — initialize, captureError, captureMessage, setUser, setContext, addBreadcrumb, useAdapter, and more.
keywords: [unified-error-handling api, captureError, useAdapter, initialize, subscribe, registerAdapter]
---

# Core API

All of these are exported from the package root: `import { ... } from 'unified-error-handling'`.

## `initialize(config?)`

Initialize the store. Idempotent — a second call while initialized warns and returns. See [Configuration](/getting-started/configuration) for the full `ErrorStoreConfig`.

```ts
initialize({ enableGlobalHandlers: true, environment: 'production' });
```

## `captureError(error, additionalContext?)`

Capture an `Error` or string. The error is normalized, enriched, passed through `beforeSend`, queued if offline, dispatched to the active adapter, and broadcast to listeners.

```ts
captureError(new Error('Oops'), {
  tags: { feature: 'checkout' },
  extra: { orderId: '12345' },
});
```

- `error`: `Error | string`
- `additionalContext`: `Partial<ErrorContext>` merged on top of the stored context for this error only.

If the store is not initialized, it warns and skips.

## `captureMessage(message, level?)`

Capture a plain message as an error of type `CapturedMessage`.

```ts
captureMessage('User completed onboarding', 'info');
```

- `level`: defaults to `'info'`.

## `setUser(user)`

Set or clear the user context. Forwarded to the active adapter's `setContext` if supported.

```ts
setUser({ id: '42', email: 'user@example.com' });
setUser(null); // clear
```

- `user`: `UserContext | null`

## `setContext(context)`

Deep-merge context (`user`, `device`, `custom`, `tags`, `extra`). Forwarded to the active adapter when supported.

```ts
setContext({ tags: { tier: 'pro' }, extra: { route: '/home' } });
```

## `addBreadcrumb(breadcrumb)`

Append a breadcrumb (timestamp added automatically). Trimmed to `maxBreadcrumbs`. Forwarded to the active adapter when supported.

```ts
addBreadcrumb({ message: 'Clicked save', category: 'ui', level: 'info' });
```

- `breadcrumb`: `Omit<Breadcrumb, 'timestamp'>`

## `clearBreadcrumbs()`

Empty the breadcrumb trail.

## `useAdapter(name, config?)`

Activate an adapter (async — dynamically imports the SDK). Replays context + breadcrumbs and flushes the offline queue. See the [adapters guide](/guides/adapters).

```ts
await useAdapter('sentry', { dsn: '...' });
```

## `removeAdapter(name)`

Close and unregister an adapter. If it was active, there is no active adapter afterwards.

## `flush()`

Async. Flush the active adapter's buffered events (if it implements `flush`).

```ts
await flush();
```

## `reset()`

Tear everything down: close adapters, clear context/breadcrumbs/queue, remove global-handler flag, disable interceptors, and mark the store uninitialized.

## `subscribe(listener)`

Register a listener called with every captured `NormalizedError` after dispatch. Returns an unsubscribe function.

```ts
const off = subscribe((err) => console.warn(err.message));
off();
```

## `registerAdapter(name, adapter)`

Register an adapter instance under a name without activating it. Registration is idempotent (same name replaces).

```ts
import { registerAdapter, SentryAdapter } from 'unified-error-handling';
registerAdapter('sentry', new SentryAdapter());
```

## `createAdapter(name, config)`

Build a [custom adapter](/guides/custom-adapters) from a `CustomAdapterConfig` and register it under `name`.

## `createCustomAdapter(config)`

Return a custom `ErrorAdapter` instance (you register it yourself).

## `errorStore`

The singleton store instance. The standalone functions above are bound methods of it; you rarely need the instance directly, but it is exported for advanced use.

## Adapter classes

`SentryAdapter`, `FirebaseAdapter`, and `CustomAdapter` are exported for advanced scenarios (e.g. pre-registering an instance with `registerAdapter`).
