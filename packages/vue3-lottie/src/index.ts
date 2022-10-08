import type { App, Plugin } from 'vue'
import Vue3Lottie from './vue3-lottie.vue'
export * from './types'

export interface PluginOptions {
  name?: string
}

const plugin: Plugin = {
  install(app: App, options: PluginOptions) {
    const name = options?.name ?? 'Vue3Lottie'
    app.component(name, Vue3Lottie)
  },
}

export { Vue3Lottie }
export default plugin
