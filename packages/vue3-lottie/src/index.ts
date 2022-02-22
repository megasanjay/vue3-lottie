import { App } from 'vue'
import Vue3Lottie from './vue3-lottie.vue'

export { Vue3Lottie }

export function install(app: App, options: { name: string }) {
  const finalOptions = Object.assign(
    {},
    {
      name: 'Vue3Lottie',
    },
    options,
  )

  app.component(`${finalOptions.name}`, Vue3Lottie)
}

const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
}

export default plugin
