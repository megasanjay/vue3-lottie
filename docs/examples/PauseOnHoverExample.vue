<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    "
  >
    <Vue3Lottie
      :animationData="RocketJSON"
      :height="200"
      :width="200"
      :pauseOnHover="true"
    />
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
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
