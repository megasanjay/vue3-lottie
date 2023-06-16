<template>
  <Vue3Lottie
    :animationData="AstronautJSON"
    :height="200"
    :width="200"
    :loop="3"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import AstronautJSON from './lotties/astronaut.json'

export default {
  name: 'LoopExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
