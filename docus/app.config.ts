export default defineAppConfig({
  docus: {
    title: 'Vue 3 Lottie',
    description:
      'A simple component library that will add support for Lottie animations in your Vue 3/Nuxt 3 applications.    ',
    image:
      'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      twitter: 'megasanjay',
      github: 'megasanjay/vue3-lottie',
    },
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'vue3-lottie',
      owner: 'megasanjay',
      edit: true,
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev',
      },
      textLinks: [
        {
          text: 'Made with ❤️ by Sanjay Soundarajan',
          href: 'https://sanjaysoundarajan.dev',
        },
      ],
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'simple-icons:nuxtdotjs',
        },
      ],
    },
  },
})
