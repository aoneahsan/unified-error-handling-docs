---
id: datadog
title: Datadog Adapter
sidebar_label: Datadog
description: Route unified-error-handling errors to Datadog RUM + Logs. Install @datadog/browser-rum and @datadog/browser-logs.
keywords: [datadog adapter, datadog rum, datadog browser logs, error tracking datadog]
---

# Datadog Adapter

Send captured errors to [Datadog](https://www.datadoghq.com) using both RUM and Logs.

## Install

```bash
yarn add @datadog/browser-rum @datadog/browser-logs
```

Both packages are required — the adapter wires up RUM and Logs together.

## Activate

```ts
import { initialize, useAdapter } from 'unified-error-handling';

initialize();

await useAdapter('datadog', {
  applicationId: 'your-application-id',
  clientToken: 'your-client-token',
  site: 'datadoghq.com',
  service: 'web-app',
  env: 'production',
});
```

## Config

| Field | Purpose |
|-------|---------|
| `applicationId` | Datadog RUM application ID. |
| `clientToken` | Datadog client token. |
| `site` | Your Datadog site (e.g. `datadoghq.com`, `datadoghq.eu`). |
| `service` | Service name. |
| `env` | Environment label. |

The adapter dynamically imports `@datadog/browser-rum` and `@datadog/browser-logs`, initializes both, and forwards captured errors to them.

## Notes

- If either package is missing, activation throws `Failed to load DataDog SDK…` with the original error preserved as `cause`.
- Datadog already does its own network monitoring via RUM; you may keep the store's `enableNetworkCapture` off to avoid double-reporting failed requests.
