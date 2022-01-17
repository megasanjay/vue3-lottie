<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    "
  >
    <Vue3Lottie :animationData="DogJSON" :height="200" :width="200" />
  </div>
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
