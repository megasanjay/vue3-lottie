<template>
  <Vue3Lottie
    :animationData="RocketJSON"
    :height="200"
    :width="200"
    :pauseOnHover="true"
  />
</template>

<script>
import {Vue3Lottie} from 'vue3-lottie'
import RocketJSON from './lotties/rocket.json'

export default {
  name: 'PauseOnHoverExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      RocketJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
