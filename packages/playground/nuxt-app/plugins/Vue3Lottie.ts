export default defineNuxtPlugin(async (nuxtApp) => {
  const { Vue3Lottie } = await import('@reslear/vue3-lottie')
  nuxtApp.vueApp.component('Vue3Lottie', Vue3Lottie)
})
