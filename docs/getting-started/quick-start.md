---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
description: Capture your first error with unified-error-handling in five minutes — initialize, pick an adapter, and call captureError.
keywords: [unified-error-handling quick start, captureError, useAdapter, initialize]
---

# Quick Start

Three steps: **initialize** the store, **pick an adapter**, then **capture errors**.

## 1. Initialize

Call `initialize()` once at app startup. Every option is optional and has a sensible default.

```ts
import { initialize } from 'unified-error-handling';

initialize({
  enableGlobalHandlers: true,  // catch uncaught errors + unhandled rejections (browser)
  enableConsoleCapture: true,  // capture console.error calls
  environment: 'production',
  release: '1.4.2',
});
```

## 2. Pick an adapter

The active adapter is whichever one you pass to `useAdapter()` most recently. Start with the built-in `console` adapter (no SDK needed):

```ts
import { useAdapter } from 'unified-error-handling';

// Development — logs to the console
await useAdapter('console');

// Production — switch to a real service (after installing its SDK)
await useAdapter('sentry', {
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  environment: 'production',
});
```

`useAdapter()` is async because it dynamically imports the service SDK and initializes it. Awaiting it guarantees the adapter is ready before you capture.

## 3. Capture errors

```ts
import { captureError, captureMessage } from 'unified-error-handling';

try {
  riskyOperation();
} catch (error) {
  captureError(error, {
    tags: { feature: 'checkout' },
    extra: { orderId: '12345' },
  });
}

// Or capture a plain message
captureMessage('User completed onboarding', 'info');
```

That is the whole loop. Errors are normalized, enriched with device + context + breadcrumbs, passed through your optional `beforeSend` hook, queued if you are offline, and dispatched to the active adapter.

## Full minimal example

```ts
import { initialize, useAdapter, setUser, captureError } from 'unified-error-handling';

async function bootstrapErrorTracking() {
  initialize({ enableGlobalHandlers: true, environment: 'production' });

  await useAdapter('sentry', { dsn: process.env.SENTRY_DSN });

  setUser({ id: '42', email: 'user@example.com' });
}

bootstrapErrorTracking();

// later, anywhere in your code:
export function saveProfile(data: unknown) {
  try {
    // ...
  } catch (err) {
    captureError(err as Error, { tags: { area: 'profile' } });
  }
}
```

## Using it in React

```tsx
import { initialize, useAdapter } from 'unified-error-handling';
import { ErrorBoundary, useErrorHandler } from 'unified-error-handling/react';
import { useEffect } from 'react';

initialize({ enableGlobalHandlers: true });

function App() {
  useEffect(() => {
    useAdapter('sentry', { dsn: import.meta.env.VITE_SENTRY_DSN });
  }, []);

  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}

function RiskyButton() {
  const handleError = useErrorHandler(); // no provider needed
  return (
    <button onClick={() => { try { doThing(); } catch (e) { handleError(e as Error); } }}>
      Do thing
    </button>
  );
}
```

See the [React guide](/guides/react) for the full surface.

## Next steps

- [Configuration](/getting-started/configuration) — every `initialize()` option.
- [Adapters guide](/guides/adapters) — switching and registering adapters.
- [Providers overview](/providers/overview) — per-service config.
