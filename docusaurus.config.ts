import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// Unified Error Handling — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// Source package: https://www.npmjs.com/package/unified-error-handling
// ---------------------------------------------------------------------------

const SITE_URL = 'https://unified-error-handling-docs.aoneahsan.com';
const NPM_URL = 'https://www.npmjs.com/package/unified-error-handling';
const REPO_URL = 'https://github.com/aoneahsan/unified-error-handling';
const DOCS_REPO_URL = 'https://github.com/aoneahsan/unified-error-handling-docs';

const config: Config = {
  title: 'Unified Error Handling Docs',
  tagline:
    'Zero-dependency error handling with dynamic adapter loading — one API for Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, and your own service.',
  favicon: 'img/favicon.svg',

  // Production URL — served from Firebase Hosting / GitHub Pages at the custom domain.
  url: SITE_URL,
  baseUrl: '/',

  // GitHub metadata (drives OG tags + edit-this-page links)
  organizationName: 'aoneahsan',
  projectName: 'unified-error-handling-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. JSON-LD payloads (WebSite, Organization,
  // SoftwareSourceCode) help Google Rich Results, Perplexity, ChatGPT, and
  // Claude extract structured entity data when citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'Unified Error Handling Docs' },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'Unified Error Handling Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#e11d48' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Unified Error Handling Documentation',
        url: SITE_URL,
        description:
          'Documentation for unified-error-handling, a lightweight zero-dependency error-handling library with dynamic adapter loading for multiple error-tracking services (Sentry, Firebase Crashlytics, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter) plus a built-in console adapter and custom adapters. Provider-less store API for React, Vue, Angular, Node.js, and vanilla JS. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'unified-error-handling',
        codeRepository: REPO_URL,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Web, Node.js, React Native',
        url: NPM_URL,
        sameAs: NPM_URL,
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
        description:
          'Zero-dependency error-handling library with dynamic, tree-shakeable adapter loading for Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, and custom services. Provider-less store API plus optional React error boundary and hooks. MIT-licensed.',
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: { '@type': 'Person', name: 'Ahsan Mahmood' },
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  trailingSlash: false,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: `${DOCS_REPO_URL}/edit/main/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: 'date',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for unified-error-handling — a zero-dependency error-handling library with dynamic adapter loading for Sentry, Firebase, Datadog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter, and custom services. Provider-less store API + optional React boundary/hooks. Maintained by Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'error handling, error tracking, crash reporting, sentry, firebase crashlytics, bugsnag, rollbar, datadog rum, logrocket, raygun, appcenter, react error boundary, error monitoring, zero dependency, tree shakeable, typescript, breadcrumbs, offline error queue',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Unified Error Handling Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Unified Error Handling',
      logo: {
        alt: 'Unified Error Handling logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/getting-started/quick-start', label: 'Quick Start', position: 'left' },
        { to: '/api/core', label: 'API', position: 'left' },
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: NPM_URL, label: 'npm', position: 'right' },
        { href: REPO_URL, label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Installation', to: '/getting-started/installation' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'API Reference', to: '/api/core' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'npm package', href: NPM_URL },
            { label: 'Source repository', href: REPO_URL },
            { label: 'Docs source', href: DOCS_REPO_URL },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. unified-error-handling is MIT-licensed.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
