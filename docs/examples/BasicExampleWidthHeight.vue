<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    "
  >
    <Vue3Lottie :animationData="VinylJSON" :height="300" :width="300" />
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import VinylJSON from './lotties/vinyl.json'

export default {
  name: 'BasicExampleWidthHeight',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      VinylJSON,
    }
  },
}
</script>
