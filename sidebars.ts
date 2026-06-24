import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for unified-error-handling docs.
 * Every page below is source-accurate against the package's src/.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/adapters',
        'guides/context-and-breadcrumbs',
        'guides/offline-and-interceptors',
        'guides/custom-adapters',
        'guides/react',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      collapsed: true,
      items: [
        'providers/overview',
        'providers/console',
        'providers/sentry',
        'providers/firebase',
        'providers/datadog',
        'providers/bugsnag',
        'providers/rollbar',
        'providers/logrocket',
        'providers/raygun',
        'providers/appcenter',
        'providers/custom',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        'api/core',
        'api/react',
        'api/types',
      ],
    },
    'faq',
    'changelog',
    {
      type: 'category',
      label: 'About',
      collapsed: true,
      items: ['about-the-author'],
    },
  ],
};

export default sidebars;
