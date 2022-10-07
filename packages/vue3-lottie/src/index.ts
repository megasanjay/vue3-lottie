import { App } from 'vue'
import type { Plugin } from 'vue'
import Vue3Lottie from './vue3-lottie.vue'
export * from './types'

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

const plugin: Plugin = {
  install,
}

export { Vue3Lottie }
export default plugin
