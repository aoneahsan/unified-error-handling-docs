---
id: console
title: Console Adapter
sidebar_label: Console
description: The built-in console adapter logs captured errors and messages to the console — no SDK required. Ideal for local development.
keywords: [console adapter, development error logging, useAdapter console]
---

# Console Adapter

The `console` adapter is built in and needs **no SDK**. It prints captured errors and messages to the console, which makes it the natural choice for local development and tests.

## Activate

```ts
import { initialize, useAdapter, captureError } from 'unified-error-handling';

initialize();
await useAdapter('console');

captureError(new Error('Something broke')); // logged via console.error
```

There is no config object — `useAdapter('console')` is enough.

## What it does

- `captureError(error)` → prints `[Error]` with the normalized error object.
- `captureMessage(message, level)` → prints `[<level>] <message>`.

It uses a saved reference to the **original** `console` (captured by the console interceptor) so that when `enableConsoleCapture` is on, printing does not re-trigger capture and cause an infinite loop.

## A common pattern

Use the console adapter in development and a real service in production:

```ts
if (import.meta.env.PROD) {
  await useAdapter('sentry', { dsn: import.meta.env.VITE_SENTRY_DSN });
} else {
  await useAdapter('console');
}
```

Your `captureError()` call sites stay identical across environments — only the adapter changes.
