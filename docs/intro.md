---
id: intro
title: Unified Error Handling
sidebar_label: Introduction
slug: /intro
description: unified-error-handling is a zero-dependency error-handling library with dynamic adapter loading for Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, and custom services.
keywords: [error handling, error tracking, crash reporting, sentry, firebase crashlytics, bugsnag, zero dependency, typescript]
---

# Unified Error Handling

`unified-error-handling` is a zero-dependency TypeScript library that puts multiple error-tracking services behind **one provider-less API**. You initialize the store once, pick an adapter with `useAdapter('sentry')` (or `firebase`, `datadog`, `bugsnag`, `rollbar`, `logrocket`, `raygun`, `appcenter`, the built-in `console`, or your own), and every `captureError()` call from anywhere in your app is normalized, enriched, and routed to that service.

It is published on npm as [`unified-error-handling`](https://www.npmjs.com/package/unified-error-handling) and is MIT-licensed.

## What it gives you

- **One API across services.** Switch from the console adapter in development to Sentry in production by changing a single `useAdapter()` call — your `captureError()` sites never change.
- **A zero-dependency core.** Nothing is bundled for a service you do not use. Each SDK is pulled in with a dynamic `import()` only when its adapter is activated.
- **A provider-less store.** `errorStore` is a singleton, so you can capture errors from a utility, a web worker, a Vue component, or plain JavaScript — not only from inside a React tree.
- **Rich context.** Automatic device info, a rolling breadcrumb trail, user/tags/extra context, and a `beforeSend` hook to filter or scrub errors before they leave the browser.
- **Resilience.** Errors raised while offline are queued and flushed on reconnect. Optional interceptors capture `console.error` and failed network requests; global handlers catch uncaught errors and unhandled rejections.
- **An optional React layer.** A separate `unified-error-handling/react` entry point adds an `ErrorBoundary`, a `withErrorBoundary` HOC, and hooks. React is an optional peer dependency.

## What it does NOT do

Honest framing matters more than a long feature list.

- It is **not** itself an error-tracking backend. Adapters forward your errors to a third-party service (or your own endpoint via a custom adapter); the library does not store or display errors on its own.
- It does **not** install the service SDKs for you. To use the Sentry adapter you install `@sentry/browser` yourself; the library loads it dynamically and tells you exactly what to install if it is missing.
- It dispatches each error to the **single active adapter** (the last one passed to `useAdapter()`), not to all registered adapters at once. Switching adapters re-points the active one.
- The built-in interceptors and global handlers are **browser-oriented** (they rely on `window`). In Node.js the core store, manual `captureError()`, and custom adapters work, but `window`-based capture does not.

## Where to go next

- [Installation](/getting-started/installation) — install the package and the optional per-service SDKs.
- [Quick Start](/getting-started/quick-start) — capture your first error in five minutes.
- [Configuration](/getting-started/configuration) — the full `initialize()` config shape.
- [Providers overview](/providers/overview) — the adapter capability matrix.
- [Core API](/api/core) — every exported function.

---

Built and maintained by [Ahsan Mahmood](https://aoneahsan.com) ([GitHub](https://github.com/aoneahsan) · [npm](https://www.npmjs.com/~aoneahsan)).
