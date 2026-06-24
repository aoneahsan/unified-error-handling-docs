---
id: context-and-breadcrumbs
title: Context & Breadcrumbs
sidebar_label: Context & breadcrumbs
description: Attach user, tags, and extra data with setUser/setContext, and record a navigation trail with addBreadcrumb in unified-error-handling.
keywords: [setUser, setContext, addBreadcrumb, clearBreadcrumbs, breadcrumbs, error context]
---

# Context & Breadcrumbs

Context and breadcrumbs make a raw error actionable. Both are stored centrally and attached to every error you capture, then pushed to the active adapter (if it supports them).

## User context

```ts
import { setUser } from 'unified-error-handling';

setUser({
  id: '12345',
  email: 'user@example.com',
  username: 'ahsan',
  plan: 'premium', // any extra fields are allowed
});

// Clear the user on sign-out
setUser(null);
```

`UserContext` allows `id`, `email`, `username`, and any additional custom keys. Passing `null` removes the user from the context.

## Tags, extra, and custom data

```ts
import { setContext } from 'unified-error-handling';

setContext({
  tags: { release: '1.4.2', tier: 'pro' },     // string → string
  extra: { lastRoute: '/checkout', cartSize: 3 }, // any values
  custom: { experiment: 'B' },
});
```

`setContext()` deep-merges nested objects (`user`, `device`, `custom`, `tags`, `extra`), so calling it repeatedly accumulates rather than replaces. The merged context is attached to every captured error and forwarded to the adapter's `setContext()` if it implements one.

You can also attach per-error context inline:

```ts
captureError(error, {
  tags: { feature: 'search' },
  extra: { query: 'shoes' },
});
```

Per-error context is merged on top of the stored context for that single error only.

## Breadcrumbs

Breadcrumbs are a rolling trail of what happened before an error — clicks, navigations, network calls. Add one with `addBreadcrumb()`:

```ts
import { addBreadcrumb } from 'unified-error-handling';

addBreadcrumb({
  message: 'User clicked Checkout',
  category: 'ui',
  level: 'info',
  data: { buttonId: 'checkout' },
});
```

You do not pass a `timestamp` — the store stamps each breadcrumb with `Date.now()` automatically. The trail is trimmed to `maxBreadcrumbs` (default 100), keeping the most recent. Each captured error carries a snapshot of the current trail.

Clear the trail with:

```ts
import { clearBreadcrumbs } from 'unified-error-handling';
clearBreadcrumbs();
```

### Automatic breadcrumbs

The store adds breadcrumbs for some events on its own:

- Going **offline** / coming back **online** (browser).
- React helpers like `useErrorTracking()`, `usePerformanceMonitor()`, and `useExtendedErrorHandler()` add navigation, user-action, and performance breadcrumbs (see the [React guide](/guides/react)).

## Device context

In a browser, `initialize()` records a `device` context automatically (`platform: 'web'`, user agent, language, viewport). Override or extend it with `setContext({ device: { ... } })` — useful in React Native or Capacitor where you may want `platform`, `model`, `osVersion`, and `appVersion`.
