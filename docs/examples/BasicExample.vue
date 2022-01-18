<template>
  <Vue3Lottie :animationData="DogJSON" :height="200" :width="200" />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import DogJSON from './lotties/dog.json'

export default {
  name: 'BasicExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      DogJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
