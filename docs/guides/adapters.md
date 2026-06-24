---
id: adapters
title: Adapters
sidebar_label: Adapters
description: How dynamic adapter loading, switching, and registration work in unified-error-handling — useAdapter, removeAdapter, registerAdapter.
keywords: [useAdapter, removeAdapter, registerAdapter, dynamic import, active adapter]
---

# Adapters

An **adapter** is the bridge between the store and an error-tracking service. Each adapter knows how to load its SDK, initialize it, and forward a `NormalizedError` to it. The store keeps a registry of adapters and one **active adapter** at a time.

## Activating an adapter

```ts
import { useAdapter } from 'unified-error-handling';

await useAdapter('sentry', {
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
});
```

`useAdapter(name, config?)`:

1. Looks up an already-registered adapter by `name`, or loads the built-in one.
2. Calls `adapter.initialize(config)` — which dynamically `import()`s the service SDK.
3. Sets it as the **active** adapter.
4. Replays the current context and existing breadcrumbs into the adapter.
5. Flushes any queued offline errors through it.

Because step 2 does a dynamic import, `useAdapter()` is async. Await it so you know the adapter is ready.

## Built-in adapter names

`console`, `sentry`, `firebase`, `datadog`, `bugsnag`, `rollbar`, `logrocket`, `raygun`, `appcenter`. The `console` adapter needs no SDK; the rest dynamically import their package (see [Installation](/getting-started/installation)).

## Switching adapters

There is exactly **one** active adapter. Calling `useAdapter()` again re-points it:

```ts
await useAdapter('console');           // development
await useAdapter('sentry', sentryCfg); // now Sentry is active; console is still registered but inactive
```

This is the core mental model: the store dispatches each captured error to the single active adapter, not to every registered adapter. A failing adapter `captureError` is caught and logged inside the store, so it never throws out into your code.

## Removing an adapter

```ts
import { removeAdapter } from 'unified-error-handling';

removeAdapter('sentry'); // calls adapter.close() and unregisters it
```

If you remove the active adapter, there is no active adapter until you call `useAdapter()` again (captured errors are then just enriched + sent to listeners).

## Registering an adapter instance directly

If you have an adapter instance (for example one of the exported adapter classes, or a custom one), register it under a name without going through dynamic loading:

```ts
import { registerAdapter, SentryAdapter } from 'unified-error-handling';

registerAdapter('sentry', new SentryAdapter());
await useAdapter('sentry', { dsn: '...' }); // now activates the instance you registered
```

The package also re-exports `SentryAdapter`, `FirebaseAdapter`, and `CustomAdapter` for advanced usage.

## Creating a custom adapter

For your own backend, use [`createAdapter()`](/guides/custom-adapters) or `createCustomAdapter()` — no SDK, just a `send` callback. See the [custom adapters guide](/guides/custom-adapters).

## Adapter capabilities

Every adapter must implement `name`, `initialize`, and `captureError`. The rest are optional and the store calls them only if present:

| Method | Required | Purpose |
|--------|----------|---------|
| `captureError(error)` | yes | Forward a normalized error to the service. |
| `captureMessage(message, level?)` | no | Forward a plain message. |
| `setContext(context)` | no | Push user/tags/extra context to the service. |
| `addBreadcrumb(breadcrumb)` | no | Push a breadcrumb to the service. |
| `flush()` | no | Flush buffered events. |
| `close()` | no | Tear down the SDK / release resources. |

See the [providers overview](/providers/overview) for which optional methods each built-in adapter implements.
