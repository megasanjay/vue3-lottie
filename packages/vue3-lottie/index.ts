import { App } from 'vue'
import Vue3Lottie from './src/index.vue'

Vue3Lottie.install = (app: App): void => {
  app.component(Vue3Lottie.name, Vue3Lottie)
}

export default Vue3Lottie
