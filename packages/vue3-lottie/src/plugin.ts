import type { App, Component, Plugin } from 'vue'

export interface PluginOptions {
  name?: string
}

export const createPlugin = (component: Component): Plugin => ({
  install(app: App, options?: PluginOptions) {
    const name = options?.name ?? 'Vue3Lottie'
    app.component(name, component)
  },
})
