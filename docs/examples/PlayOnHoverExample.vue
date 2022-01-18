<template>
  <Vue3Lottie
    :animationData="WifiJSON"
    :height="200"
    :width="200"
    :playOnHover="true"
  />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import WifiJSON from './lotties/wifi.json'

export default {
  name: 'PlayOnHoverExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      WifiJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
