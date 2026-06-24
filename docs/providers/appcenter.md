---
id: appcenter
title: AppCenter Adapter
sidebar_label: AppCenter
description: Route unified-error-handling errors to Microsoft AppCenter. Install appcenter-crashes and appcenter-analytics — primarily for React Native / mobile.
keywords: [appcenter adapter, appcenter-crashes, appcenter-analytics, react native crash reporting]
---

# AppCenter Adapter

Send captured errors to [Microsoft AppCenter](https://appcenter.ms). This adapter is **primarily for React Native / mobile** apps.

## Install

```bash
yarn add appcenter-crashes appcenter-analytics
```

Both packages are required.

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('appcenter', {
  appSecret: 'your-app-secret',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `appSecret` | Your AppCenter app secret (required). |

The adapter dynamically imports `appcenter-crashes` and `appcenter-analytics` and forwards captured errors as crashes/events.

## Notes

- If either package is missing, activation throws `Failed to load AppCenter SDK…` with the original import error preserved as `cause`, plus a reminder that AppCenter targets React Native / mobile.
- For pure web apps, prefer another adapter (Sentry, Datadog, Bugsnag, Rollbar, Raygun, LogRocket) — the AppCenter SDKs are built for native mobile runtimes.
