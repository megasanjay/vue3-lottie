import { App } from 'vue'
import Vue3Lottie from './vue3-lottie.vue'

export { Vue3Lottie }

function registerComponents(app: App, prefix = '') {
  app.component(`${prefix}Lottie`, Vue3Lottie)
}

export function install(app: App, options: string) {
  const finalOptions = Object.assign(
    {},
    {
      installComponents: true,
      componentsPrefix: '',
    },
    options,
  )

  if (finalOptions.installComponents) {
    registerComponents(app, finalOptions.componentsPrefix)
  }
}

const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
}

export default plugin
