---
id: overview
title: Providers Overview
sidebar_label: Overview
description: The unified-error-handling adapter capability matrix — which SDK each provider needs and how to activate it.
keywords: [error tracking providers, adapter matrix, sentry, firebase, datadog, bugsnag, rollbar, logrocket, raygun, appcenter]
---

# Providers Overview

A **provider** is an error-tracking service reachable through an adapter. You activate one with `useAdapter('<name>', config)`. The service SDK is loaded dynamically — install only the one(s) you use.

## Capability matrix

| Provider | Adapter name | SDK to install | Notes |
|----------|--------------|----------------|-------|
| [Console](/providers/console) | `console` | — built-in | Logs to the console; ideal for development. |
| [Custom](/providers/custom) | `custom` | — | Your own `send` callback (any backend). |
| [Sentry](/providers/sentry) | `sentry` | `@sentry/browser` | Errors, messages, breadcrumbs, user context. |
| [Firebase Crashlytics](/providers/firebase) | `firebase` | `firebase` | Firebase app + analytics events. |
| [Datadog](/providers/datadog) | `datadog` | `@datadog/browser-rum` + `@datadog/browser-logs` | RUM + Logs. |
| [Bugsnag](/providers/bugsnag) | `bugsnag` | `@bugsnag/js` | Error monitoring. |
| [Rollbar](/providers/rollbar) | `rollbar` | `rollbar` | Error tracking. |
| [LogRocket](/providers/logrocket) | `logrocket` | `logrocket` | Session replay + errors. |
| [Raygun](/providers/raygun) | `raygun` | `raygun4js` | Crash reporting. |
| [AppCenter](/providers/appcenter) | `appcenter` | `appcenter-crashes` + `appcenter-analytics` | Mobile / React Native oriented. |

## How activation works

```ts
import { useAdapter } from 'unified-error-handling';

await useAdapter('datadog', {
  applicationId: 'your-app-id',
  clientToken: 'your-client-token',
  site: 'datadoghq.com',
});
```

Each provider page documents its config object. Activation:

1. Dynamically imports the SDK (clear, actionable error if it is not installed — with the original failure preserved as `cause`).
2. Initializes the SDK with your config.
3. Makes the adapter active, replaying current context + breadcrumbs.

## Honest notes

- **One active adapter at a time.** The last `useAdapter()` wins; the store does not fan an error out to multiple services simultaneously. If you need that, capture into a [custom adapter](/providers/custom) that forwards to several backends, or subscribe and re-dispatch.
- **You own the credentials.** DSNs, client tokens, and API keys are passed by you and never bundled by the library.
- **Optional methods vary.** Some adapters implement `setContext`, `addBreadcrumb`, `flush`, and `close`; the store calls these only when the adapter provides them.
- **AppCenter is mobile-oriented.** Its SDKs target React Native; on the web, prefer another adapter.
