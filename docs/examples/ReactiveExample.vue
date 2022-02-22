<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    "
  >
    <Vue3Lottie
      :animationData="CarJSON"
      :height="200"
      :width="200"
      :pauseAnimation="playState"
    />
    <button @click="playState = !playState" style="margin-left: 20px">
      Play/Pause Animation
    </button>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import CarJSON from './lotties/car.json'

export default {
  name: 'ReactiveExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      playState: false,
      CarJSON,
    }
  },
}
</script>

<style scoped>
button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border: 1px solid transparent;
  min-width: 160px;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  background-color: #15883e;
  height: 48px;
}

button:hover {
  background-color: #1db954;
}
</style>
