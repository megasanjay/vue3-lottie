import { createApp } from 'vue'
import App from './App.vue'

import Vue3Lottie, { PluginOptions } from '@reslear/vue3-lottie'

let app = createApp(App)
app.use(Vue3Lottie)

app.mount('#app')
