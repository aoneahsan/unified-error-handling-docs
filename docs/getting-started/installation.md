---
id: installation
title: Installation
sidebar_label: Installation
description: Install unified-error-handling and the optional per-service SDKs. The core has zero dependencies; you add only the SDK for the adapter you use.
keywords: [install unified-error-handling, npm, yarn, sentry sdk, firebase sdk]
---

# Installation

## Install the package

```bash
# npm
npm install unified-error-handling

# yarn
yarn add unified-error-handling
```

The core has **zero production dependencies**, so this single install adds nothing else to your tree.

## Install the SDK for the adapter you use

Service SDKs are **not** bundled. Each adapter loads its SDK with a dynamic `import()` at runtime, so you install only the one(s) you actually use. The built-in `console` adapter and any custom adapter need no extra package.

| Adapter | Install |
|---------|---------|
| `console` | — (built-in) |
| `custom` | — (you provide the callbacks) |
| `sentry` | `yarn add @sentry/browser` |
| `firebase` | `yarn add firebase` |
| `datadog` | `yarn add @datadog/browser-rum @datadog/browser-logs` |
| `bugsnag` | `yarn add @bugsnag/js` |
| `rollbar` | `yarn add rollbar` |
| `logrocket` | `yarn add logrocket` |
| `raygun` | `yarn add raygun4js` |
| `appcenter` | `yarn add appcenter-crashes appcenter-analytics` |

If you call `useAdapter('sentry')` without `@sentry/browser` installed, the library throws a clear error telling you exactly what to install — and preserves the original module-resolution error as the thrown error's `cause`.

## React (optional)

The React layer lives at the `unified-error-handling/react` subpath. React 19+ is an **optional** peer dependency — the core never imports it:

```json
{
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  }
}
```

If you do not use React, ignore the subpath entirely; nothing React-related reaches your bundle.

## Entry points

```ts
// Core — works in any framework or vanilla JS / Node.js
import { initialize, captureError, useAdapter } from 'unified-error-handling';

// React layer — only if you use React
import { ErrorBoundary, useErrorHandler } from 'unified-error-handling/react';
```

Both ESM and CommonJS builds ship, along with full TypeScript declarations.

## Next step

Continue to the [Quick Start](/getting-started/quick-start).
