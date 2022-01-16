declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: typeof defineComponent & {
    install(app: App): void
  }
  export default component
}
