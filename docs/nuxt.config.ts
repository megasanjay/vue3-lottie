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
})
