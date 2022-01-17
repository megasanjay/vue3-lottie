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
      :animationData="ClockJSON"
      :height="200"
      :width="200"
      @onLoopComplete="completed++"
    />
    <span style="margin-left: 20px"> This animation has completed {{ completed }} times. </span>
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import ClockJSON from './lotties/clock.json'

export default {
  name: 'EventExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      ClockJSON,
      completed: 0,
    }
  },
}
</script>
