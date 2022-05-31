declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    LottieAnimation: typeof import('vue3-lottie')['Vue3Lottie']
  }
}
export {}
