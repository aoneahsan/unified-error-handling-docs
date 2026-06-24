---
id: rollbar
title: Rollbar Adapter
sidebar_label: Rollbar
description: Route unified-error-handling errors to Rollbar. Install rollbar, then useAdapter('rollbar', { accessToken }).
keywords: [rollbar adapter, rollbar accessToken, error tracking rollbar]
---

# Rollbar Adapter

Send captured errors to [Rollbar](https://rollbar.com).

## Install

```bash
yarn add rollbar
```

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('rollbar', {
  accessToken: 'your-post-client-item-access-token',
  environment: 'production',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `accessToken` | Your Rollbar `post_client_item` access token (required). |
| `environment` | Environment label. |

The adapter dynamically imports `rollbar`, initializes it with your config, and forwards each captured error.

## Notes

- If `rollbar` is not installed, activation throws `Failed to load Rollbar SDK…` with the original import error preserved as `cause`.
- Use a client-side (`post_client_item`) token, not a server token, in browser code.
