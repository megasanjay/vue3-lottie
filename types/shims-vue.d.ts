declare module '*.vue' {
  import type { ref, onMounted, computed, watch } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
