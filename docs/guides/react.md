---
id: react
title: React Integration
sidebar_label: React
description: Use unified-error-handling/react — ErrorBoundary, withErrorBoundary HOC, and hooks (useErrorHandler, useAsyncOperation, useErrorStore, and more) with no context provider.
keywords: [react error boundary, useErrorHandler, useAsyncOperation, withErrorBoundary, provider-less]
---

# React Integration

The optional `unified-error-handling/react` entry point adds an error boundary, an HOC, and hooks. Because the store is a singleton, **no context provider is required** — hooks work in any component.

```ts
import {
  ErrorBoundary,
  withErrorBoundary,
  useErrorHandler,
  useErrorStore,
  useAsyncError,
  useAsyncOperation,
  useErrorTracking,
  useComponentError,
  usePerformanceMonitor,
  useExtendedErrorHandler,
} from 'unified-error-handling/react';
```

React 19+ is an optional peer dependency. Initialize the core store and activate an adapter exactly as you would elsewhere.

## `ErrorBoundary`

A class component that catches render errors in its subtree, reports them to the store, and renders a fallback.

```tsx
<ErrorBoundary
  fallback={MyFallback}
  level="error"
  tags={{ area: 'dashboard' }}
  resetOnPropsChange
>
  <Dashboard />
</ErrorBoundary>
```

| Prop | Type | Purpose |
|------|------|---------|
| `fallback` | `React.ComponentType<ErrorFallbackProps>` | Custom fallback UI. |
| `onError` | `(error, errorInfo) => void` | Extra callback alongside store reporting. |
| `level` | `'debug' \| 'info' \| 'warning' \| 'error' \| 'fatal'` | Severity reported with the error. |
| `context` | `Record<string, any>` | Extra context attached to the error. |
| `tags` | `Record<string, string>` | Tags attached to the error. |
| `isolate` | `boolean` | Prevent propagation to a parent boundary. |
| `resetOnPropsChange` | `boolean` | Reset the boundary when props change. |
| `resetKey` | `string \| number` | Change this value to reset the boundary manually. |

The `fallback` receives `ErrorFallbackProps` (`error`, `errorInfo`, `errorId`, and a reset handler) so you can show a friendly message and a "Try again" button.

## `withErrorBoundary`

Wrap any component without nesting JSX:

```tsx
const SafeWidget = withErrorBoundary(Widget, {
  level: 'error',
  tags: { widget: 'pricing' },
});
```

## Hooks

| Hook | Returns / does |
|------|----------------|
| `useErrorHandler()` | A stable `(error, context?) => void` for imperative reporting. Adds `source: 'react-hook'`. |
| `useErrorStore()` | The store surface (`captureError`, `setUser`, `addBreadcrumb`, …) plus reactive `initialized`, `offline`, `activeAdapter`. |
| `useAsyncError()` | A reporter pre-tagged `source: 'async-error'` for caught async failures. |
| `useAsyncOperation(op, deps?)` | `{ data, loading, error, execute }` — runs an async op, tracks state, and auto-captures failures. |
| `useErrorTracking(componentName)` | Adds mount/unmount navigation breadcrumbs for a component. |
| `useComponentError(componentName)` | `{ logComponentError(error, phase, context?) }` — tags errors with component + phase. |
| `usePerformanceMonitor()` | `{ measurePerformance(name, fn) }` — times a sync fn and records a performance breadcrumb (and on throw). |
| `useExtendedErrorHandler()` | `{ logError, logNavigation, logUserAction, setTags }` — breadcrumb + tag helpers. |

### `useErrorHandler`

```tsx
function RiskyButton() {
  const handleError = useErrorHandler();
  return (
    <button
      onClick={() => {
        try {
          doRiskyThing();
        } catch (e) {
          handleError(e as Error, { tags: { button: 'risky' } });
        }
      }}
    >
      Run
    </button>
  );
}
```

### `useAsyncOperation`

```tsx
function Profile() {
  const { data, loading, error, execute } = useAsyncOperation(
    () => fetch('/api/profile').then((r) => r.json()),
  );

  if (loading) return <Spinner />;
  if (error) return <button onClick={execute}>Retry</button>;
  return <ProfileCard data={data} />;
}
```

A rejected operation is automatically captured (tagged `source: 'async-operation'`) and re-thrown so your own logic can also react.

See the [React API reference](/api/react) for exact signatures.
