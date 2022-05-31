<template>
  <Vue3Lottie :animationData="DogJSON" :height="300" />
  <Vue3Lottie
    :animationData="DogJSON"
    :height="300"
    ref="lottieContainer"
    :pauseOnHover="true"
  />

  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// import { Vue3Lottie } from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'

import DogJSON from './assets/dog.json'
import { ref } from 'vue'

const lottieContainer = ref<HTMLDivElement>(null)

const stopAnimation = () => {
  console.log(lottieContainer.value.getDuration(true))
  lottieContainer.value.goToAndStop(10, true)
}
</script>

<script lang="ts">
export default {
  methods: {
    // stopAnimation() {
    //   this.$refs.lottieContainer.stop()
    // },
  },
  mounted() {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
