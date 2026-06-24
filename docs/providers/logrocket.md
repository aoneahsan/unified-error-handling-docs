---
id: logrocket
title: LogRocket Adapter
sidebar_label: LogRocket
description: Route unified-error-handling errors to LogRocket. Install logrocket, then useAdapter('logrocket', { appId }).
keywords: [logrocket adapter, session replay, error tracking logrocket]
---

# LogRocket Adapter

Send captured errors to [LogRocket](https://logrocket.com), which pairs them with session replay.

## Install

```bash
yarn add logrocket
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('logrocket', {
  appId: 'your-org/your-app',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `appId` | Your LogRocket app id, in the `org/app` form (required). |

The adapter dynamically imports `logrocket`, initializes it with your `appId`, and forwards each captured error so it is attached to the recorded session.

## Notes

- If `logrocket` is not installed, activation throws `Failed to load LogRocket SDK…` with the original import error preserved as `cause`.
- Pair LogRocket with `setUser()` so replays are identified — the store forwards user context to adapters that support it.
