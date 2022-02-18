import { createApp } from 'vue'

// @ts-ignore
import ServeDev from './serve.vue'

const app = createApp(ServeDev)
app.mount('#app')
