import { App } from 'vue'
import SampleComponent from './src/index.vue'

SampleComponent.install = (app: App): void => {
  app.component(SampleComponent.name, SampleComponent)
}

export default SampleComponent
