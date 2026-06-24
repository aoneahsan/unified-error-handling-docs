---
id: firebase
title: Firebase Adapter
sidebar_label: Firebase
description: Route unified-error-handling errors to Firebase. Install firebase, then useAdapter('firebase', { firebaseConfig }).
keywords: [firebase adapter, firebase crashlytics, firebase analytics, error tracking firebase]
---

# Firebase Adapter

Forward captured errors to a [Firebase](https://firebase.google.com) project (Firebase app + analytics events).

## Install

```bash
yarn add firebase
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('firebase', {
  firebaseConfig: {
    apiKey: 'your-api-key',
    authDomain: 'your-app.firebaseapp.com',
    projectId: 'your-app',
    appId: 'your-app-id',
    measurementId: 'G-XXXXXXX',
  },
});
```

## Config

| Field | Purpose |
|-------|---------|
| `firebaseConfig` | Your standard Firebase web config object (`apiKey`, `authDomain`, `projectId`, `appId`, `measurementId`, …). |

The adapter initializes a Firebase app and, where available, Firebase Analytics. Analytics initialization is guarded — if it is not available in the current environment, the adapter continues without it instead of failing.

## Notes

- `firebase` is loaded dynamically on activation. If it is not installed, activation throws `Failed to load Firebase SDK…` with the original error as `cause`.
- The web Firebase SDK surfaces analytics events; native crash reporting (Crashlytics) on iOS/Android is a native concern outside this web adapter's scope.
- Provide `measurementId` if you want analytics events recorded.

:::note
This adapter uses the standard `firebase` web SDK directly. It does **not** depend on `@capacitor-firebase/crashlytics` or `@capacitor-firebase/performance`.
:::
