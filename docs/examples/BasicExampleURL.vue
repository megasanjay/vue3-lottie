<template>
  <Vue3Lottie
    animationLink="https://assets5.lottiefiles.com/packages/lf20_vmollwvl.json"
    :height="200"
    :width="200"
  />
</template>

<script>
import {Vue3Lottie} from 'vue3-lottie'

export default {
  name: 'BasicExampleURL',
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
