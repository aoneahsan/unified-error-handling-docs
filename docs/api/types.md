---
id: types
title: Types
sidebar_label: Types
description: The TypeScript types exported by unified-error-handling — NormalizedError, ErrorContext, Breadcrumb, ErrorStoreConfig, ErrorAdapter, and more.
keywords: [NormalizedError, ErrorContext, Breadcrumb, ErrorStoreConfig, ErrorAdapter, typescript types]
---

# Types

These types are exported from the package root for full IntelliSense. `import type { ... } from 'unified-error-handling'`.

## `NormalizedError`

The shape every captured error is normalized to before dispatch.

```ts
interface NormalizedError {
  message: string;
  stack?: string;
  type?: string;            // e.g. the original error name
  code?: string;
  timestamp: number;        // Date.now()
  context: ErrorContext;
  breadcrumbs: Breadcrumb[];
  fingerprint?: string;     // for grouping
  level?: ErrorLevel;
  handled?: boolean;
  source?: 'manual' | 'global' | 'unhandledRejection' | 'react';
}
```

## `ErrorContext`

```ts
interface ErrorContext {
  user?: UserContext;
  device?: DeviceContext;
  custom?: Record<string, any>;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}
```

## `UserContext`

```ts
interface UserContext {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: any; // additional custom fields allowed
}
```

## `DeviceContext`

```ts
interface DeviceContext {
  platform?: string;
  model?: string;
  osVersion?: string;
  appVersion?: string;
  [key: string]: any;
}
```

## `Breadcrumb`

```ts
interface Breadcrumb {
  timestamp: number; // added by the store
  message: string;
  category?: string;
  level?: 'debug' | 'info' | 'warning' | 'error';
  data?: Record<string, any>;
}
```

When you call `addBreadcrumb`, you pass `Omit<Breadcrumb, 'timestamp'>`.

## `ErrorLevel`

```ts
type ErrorLevel = 'debug' | 'info' | 'warning' | 'error' | 'fatal';
```

## `ErrorStoreConfig`

The config accepted by `initialize()`. See [Configuration](/getting-started/configuration).

```ts
interface ErrorStoreConfig {
  maxBreadcrumbs?: number;
  enableGlobalHandlers?: boolean;
  enableOfflineQueue?: boolean;
  enableConsoleCapture?: boolean;
  enableNetworkCapture?: boolean;
  beforeSend?: (error: NormalizedError) => NormalizedError | null;
  environment?: string;
  release?: string;
  debug?: boolean;
}
```

## `ErrorAdapter`

The contract every adapter implements.

```ts
interface ErrorAdapter {
  name: string;
  initialize(config: any): Promise<void>;
  captureError(error: NormalizedError): Promise<void>;
  captureMessage?(message: string, level?: string): Promise<void>;
  setContext?(context: ErrorContext): Promise<void>;
  addBreadcrumb?(breadcrumb: Breadcrumb): Promise<void>;
  flush?(): Promise<void>;
  close?(): Promise<void>;
}
```

## `ErrorListener`

```ts
type ErrorListener = (error: NormalizedError) => void;
```

Passed to `subscribe()`.

## Other exported types

- `ErrorStore`, `ErrorStoreState`, `ErrorStoreActions` — the store's own shape.
- `StorageAdapter` — a simple `getItem`/`setItem`/`removeItem` storage contract.
- `CustomAdapterConfig` — the config for [custom adapters](/guides/custom-adapters).
