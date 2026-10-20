---
id: firebase
title: Firebase Adapter Status
sidebar_label: Firebase
description: The Firebase adapter in unified-error-handling 2.1.1 cannot load because the Firebase JavaScript SDK has no Crashlytics subpath.
keywords: [firebase adapter, firebase crashlytics, adapter limitation]
---

# Firebase Adapter Status

The `firebase` adapter is present in package version `2.1.1`, but it cannot be activated.

Its implementation imports `firebase/crashlytics`. The Firebase JavaScript SDK does not export that
module, so `useAdapter('firebase', config)` rejects during SDK loading. Installing `firebase` does not
resolve the failure.

Use another supported service adapter or a [custom adapter](/providers/custom) for a web application.
Do not use the `firebase` adapter until a package release replaces or removes the unsupported import.

This limitation concerns the package adapter. It does not require any change to an application's existing
Firebase backend.
