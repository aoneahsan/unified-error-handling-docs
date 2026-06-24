import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: 'One API, many services',
    body: 'Route errors to Sentry, Firebase Crashlytics, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, a built-in console adapter, or your own backend — all behind the same captureError() call.',
  },
  {
    title: 'Zero dependencies',
    body: 'The core ships with no production dependencies. Each service SDK is loaded with a dynamic import() only when you call useAdapter() for it, so the SDKs you never use never reach your bundle.',
  },
  {
    title: 'Provider-less store',
    body: 'A singleton store (no React context, no wrapper component) means you can capture errors from any module — a util, a worker, a Vue component, or plain JavaScript — not just inside the React tree.',
  },
  {
    title: 'Rich context built in',
    body: 'Automatic device info, user context, tags, extra data, and a rolling breadcrumb trail. A beforeSend hook lets you filter or scrub any error before it leaves the browser.',
  },
  {
    title: 'Offline & interceptors',
    body: 'Errors raised while offline are queued and flushed when the connection returns. Optional interceptors capture console.error and failed fetch/XHR requests; global handlers catch uncaught errors and rejections.',
  },
  {
    title: 'Optional React layer',
    body: 'A separate unified-error-handling/react entry adds an ErrorBoundary, a withErrorBoundary HOC, and hooks (useErrorHandler, useAsyncOperation, and more). React is an optional peer — the core never imports it.',
  },
];

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/getting-started/quick-start">
            Quick Start — 5 min
          </Link>
          <Link className="button button--secondary button--lg" to="/getting-started/installation">
            Installation
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://www.npmjs.com/package/unified-error-handling"
          >
            View on npm
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresWrap}>
      <div className="container">
        <div className="row">
          {FEATURES.map((f) => (
            <div key={f.title} className="col col--4" style={{ marginBottom: '1.5rem' }}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorStrip(): ReactNode {
  return (
    <section className={styles.authorStrip}>
      <div className="container">
        <p>
          Built and maintained by{' '}
          <Link href="https://aoneahsan.com">Ahsan Mahmood</Link> —{' '}
          <Link href="https://linkedin.com/in/aoneahsan">LinkedIn</Link> ·{' '}
          <Link href="https://github.com/aoneahsan">GitHub</Link> ·{' '}
          <Link href="https://www.npmjs.com/~aoneahsan">npm</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Zero-dependency error tracking`}
      description="Documentation for unified-error-handling: route errors to Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, or your own backend through one zero-dependency, provider-less API."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AuthorStrip />
      </main>
    </Layout>
  );
}
