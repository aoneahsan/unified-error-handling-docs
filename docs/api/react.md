---
id: react
title: React API
sidebar_label: React API
description: Everything exported from unified-error-handling/react — ErrorBoundary, withErrorBoundary, and the hooks.
keywords: [unified-error-handling react api, ErrorBoundary, useErrorHandler, useAsyncOperation, withErrorBoundary]
---

# React API

Import from the `unified-error-handling/react` subpath. React 19+ is an optional peer dependency.

```ts
import {
  ErrorBoundary,
  withErrorBoundary,
  useErrorStore,
  useErrorHandler,
  useAsyncError,
  useAsyncOperation,
  useErrorTracking,
  useComponentError,
  usePerformanceMonitor,
  useExtendedErrorHandler,
  type ErrorFallbackProps,
} from 'unified-error-handling/react';
```

## Components

### `ErrorBoundary`

Class component that catches render errors, reports them to the store, and renders a fallback. Props: `fallback`, `onError`, `level`, `context`, `tags`, `isolate`, `resetOnPropsChange`, `resetKey`, `children`. See the [React guide](/guides/react#errorboundary) for the prop table.

### `withErrorBoundary(Component, options?)`

HOC that wraps a component in an `ErrorBoundary` with the given options.

### `ErrorFallbackProps`

The props a custom fallback receives: `error: Error`, `errorInfo: ErrorInfo`, `errorId: string | null`, and a reset handler.

## Hooks

### `useErrorStore()`

Returns the store surface (`captureError`, `captureMessage`, `setUser`, `setContext`, `addBreadcrumb`, `clearBreadcrumbs`, `useAdapter`, `removeAdapter`, `flush`, `reset`) plus reactive `initialized`, `offline`, and `activeAdapter` via `useSyncExternalStore`.

### `useErrorHandler()`

Returns a stable `(error: Error | string, context?: Partial<ErrorContext>) => void`. Adds `extra.source = 'react-hook'`.

### `useAsyncError()`

Returns `(error: Error | string) => void` pre-tagged `extra.source = 'async-error'`.

### `useAsyncOperation(operation, deps?)`

Runs an async operation and tracks its state.

```ts
const { data, loading, error, execute } = useAsyncOperation(
  () => fetch('/api/data').then((r) => r.json()),
  [dep],
);
```

Returns `{ data, loading, error, execute }`. On failure it captures the error (tagged `source: 'async-operation'`) and re-throws.

### `useErrorTracking(componentName)`

Adds `mounted` / `unmounted` navigation breadcrumbs for a component.

### `useComponentError(componentName)`

Returns `{ logComponentError(error, phase, context?) }` — tags the error with `component` and `phase`.

### `usePerformanceMonitor()`

Returns `{ measurePerformance(name, fn) }` — times a synchronous function with `performance.now()` and records a `performance` breadcrumb (also on throw, then re-throws).

### `useExtendedErrorHandler()`

Returns `{ logError, logNavigation, logUserAction, setTags }`:

- `logError(error, context?)` — capture with extra context.
- `logNavigation(from, to, metadata?)` — navigation breadcrumb.
- `logUserAction(action, metadata?)` — user-action breadcrumb.
- `setTags(tags)` — merge tags into the store context.

To listen for every captured error inside a component, use the core [`subscribe()`](/api/core#subscribelistener) in an effect (remember to call the returned unsubscribe on cleanup).

## Higher-order components

Beyond `withErrorBoundary`, the React entry re-exports a family of HOCs for wrapping components with error handling. Each accepts an options object:

| HOC | Wraps a component with |
|-----|------------------------|
| `withErrorBoundary` | An `ErrorBoundary` (the canonical wrapper). |
| `withErrorHandler` | An injected error-handler + boundary. |
| `withAsyncErrorHandler` | Async-error handling. |
| `withErrorHandling` | Boundary + handler combined. |
| `withCompleteErrorHandling` | The full set (boundary + handler + async). |
| `createErrorHandlingHOC(defaults)` | A factory that returns a pre-configured HOC. |
| `withPageErrorHandling` | Page-level preset (from the factory). |
| `withApiErrorHandling` | API-call preset. |
| `withFormErrorHandling` | Form preset. |
| `withCriticalErrorHandling` | Critical-path preset. |

```tsx
import { withPageErrorHandling } from 'unified-error-handling/react';

export default withPageErrorHandling(DashboardPage);
```

See the [React guide](/guides/react) for runnable examples.
