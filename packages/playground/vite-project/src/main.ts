import { createApp } from 'vue'
import App from './App.vue'

import Vue3Lottie from 'vue3-lottie'

let app = createApp(App)

app.use(Vue3Lottie, { name: 'Vue3Lottie' })
app.mount('#app')
