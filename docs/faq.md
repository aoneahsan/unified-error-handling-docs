---
id: faq
title: FAQ
sidebar_label: FAQ
description: Frequently asked questions about unified-error-handling — bundle size, zero dependencies, multiple adapters, React, Node.js, and offline behaviour.
keywords: [unified-error-handling faq, zero dependency, bundle size, multiple adapters, react error handling]
---

# Frequently Asked Questions

### Is the core really zero-dependency?

Yes. The core has no production dependencies. Each service SDK (Sentry, Firebase, Datadog, etc.) is loaded with a dynamic `import()` only when you activate that adapter, and you install those SDKs yourself. React is an optional peer dependency used only by the `unified-error-handling/react` subpath.

### How big is it?

The published bundle targets roughly ~7 KB minified for the core entry and ~10 KB for the React entry (excluding any service SDK, which is loaded separately and on demand). Tree-shaking (`sideEffects`-friendly ESM) keeps unused adapters out of your build.

### Can I send the same error to two services at once?

Not directly — the store dispatches each error to the **single active adapter** (the last one passed to `useAdapter()`). To fan out to multiple destinations, write a [custom adapter](/guides/custom-adapters) whose `send` callback forwards to several backends, or `subscribe()` to every captured error and re-dispatch yourself.

### Do I need React?

No. The core works in any framework or in vanilla JavaScript. React is optional; import from `unified-error-handling/react` only if you want the `ErrorBoundary` and hooks.

### Does it work in Node.js?

The core store, manual `captureError()`, custom adapters, and `subscribe()` work in Node. The browser-only pieces — global `window` handlers, the offline queue's online/offline events, and the automatic browser device context — depend on `window` and only apply in the browser.

### What happens to errors raised while offline?

With `enableOfflineQueue` on (the default), they are queued in memory and flushed to the active adapter when the connection returns (or when you next activate an adapter). The queue is not persisted across a full page reload.

### What is `beforeSend` for?

It is your hook to inspect, modify, or drop each error before it is queued or sent. Return `null` to discard an error entirely. Use it to scrub PII or silence known-noisy errors. See [Configuration](/getting-started/configuration#the-beforesend-hook).

### A service SDK fails to load — what do I see?

The adapter throws a clear `Failed to load <SDK>. Please install: yarn add <package>` error, and the original module-resolution failure is preserved as the thrown error's `cause` so you can inspect the root issue.

### Is it published and maintained?

Yes — [`unified-error-handling`](https://www.npmjs.com/package/unified-error-handling) on npm, MIT-licensed, maintained by [Ahsan Mahmood](https://aoneahsan.com). Issues and PRs are welcome on [GitHub](https://github.com/aoneahsan/unified-error-handling).
