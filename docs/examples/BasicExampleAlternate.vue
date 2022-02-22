<template>
  <Vue3Lottie
    :animationData="StarJSON"
    :height="300"
    :width="300"
    direction="alternate"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import StarJSON from './lotties/star.json'

export default {
  name: 'BasicExampleAlternate',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      StarJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
