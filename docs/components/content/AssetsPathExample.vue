<template>
  <ClientOnly>
    <Vue3Lottie
      animation-link="https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json"
      assets-path="https://images.unsplash.com/photo-1617783341868-a4515ecac732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      :height="200"
      :width="200"
    />
  </ClientOnly>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'

export default {
  name: 'AssetsPathExample',
  components: {
    Vue3Lottie,
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
