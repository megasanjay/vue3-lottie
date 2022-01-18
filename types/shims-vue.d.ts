declare module '*.vue' {
  import type {
    defineProps,
    defineEmits,
    ref,
    onMounted,
    computed,
    watch,
  } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
