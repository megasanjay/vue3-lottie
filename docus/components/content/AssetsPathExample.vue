<template>
  <ClientOnly>
    <Vue3Lottie
      animation-link="https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json"
      assets-path="https://source.unsplash.com/user/wsanter"
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
