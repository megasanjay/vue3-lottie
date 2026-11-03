export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: '@nuxt-themes/docus',

  app: {
    head: {
      script: [
        {
          src: 'https://umami.sanjaysoundarajan.dev/mushroom',
          async: true,
          'data-website-id': '954eb05e-76df-436f-9998-a048f6095e63',
        },
      ],
    },
  },

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
  ],

  components: {
    global: true,
    dirs: ['~/components'],
  },

  // Pinceau (used by Docus) generates `import { PinceauTheme } from 'pinceau'`
  // for type-only symbols. With Nuxt's default `verbatimModuleSyntax: true`,
  // that import is kept at runtime and breaks in the browser.
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
})
