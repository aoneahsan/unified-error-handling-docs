---
id: changelog
title: Changelog
sidebar_label: Changelog
description: Release history for unified-error-handling — the 2.x zero-dependency rewrite and the original 1.x Capacitor plugin.
keywords: [unified-error-handling changelog, releases, version history]
---

# Changelog

This page summarizes the major milestones. For the exact per-version diff, see the package on [npm](https://www.npmjs.com/package/unified-error-handling?activeTab=versions) and the [GitHub repository](https://github.com/aoneahsan/unified-error-handling).

## 2.1.x — current

Maintenance line on top of the 2.0 rewrite. Iterative dependency upgrades (TypeScript 6, ESLint 10 flat config, esbuild) and code-quality refinements while keeping the public API stable and the core dependency-free. The most recent change preserves the original failure as the thrown error's `cause` when a service SDK fails to load dynamically.

## 2.0.0 — the zero-dependency rewrite

A complete rewrite from a Capacitor plugin into a universal, zero-dependency library.

**Added**

- Provider-less architecture — no React context required.
- Zero-dependency core; dynamic adapter loading (SDKs load only when used).
- Tree-shakeable exports; works in browsers, Node.js, and React Native.
- Singleton store; custom adapter support.
- Offline queue; automatic error enrichment (device/browser/context).
- Console and network interceptors.
- Full TypeScript definitions.

**Changed**

- Moved from a Capacitor plugin to a universal library.
- "Providers" became dynamically-loaded "adapters".
- Optional React hooks that work without context.
- Switched the build to esbuild.

**Removed**

- The Capacitor dependency and native Android/iOS code.
- Bundled provider SDKs and the React-context requirement.

### Migrating from 1.x (Capacitor plugin)

```ts
// Before
import { UnifiedErrorHandling } from 'capacitor-unified-error-handling';
await UnifiedErrorHandling.initialize({ provider: 'sentry' });
await UnifiedErrorHandling.captureError({ error });

// After
import { initialize, useAdapter, captureError } from 'unified-error-handling';
initialize();
await useAdapter('sentry', { dsn: 'your-dsn' });
captureError(error);
```

### Migrating from a React-context setup

```ts
// Before
<ErrorProvider config={config}>
  <App />
</ErrorProvider>

// After — no provider needed
initialize({ enableGlobalHandlers: true });
```

## 1.0.0 — original Capacitor plugin

- Initial release as a Capacitor plugin.
- Support for Firebase Crashlytics, Sentry, Datadog, and Bugsnag.
- React-context-based error handling with native Android and iOS implementations.
