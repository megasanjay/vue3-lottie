<template>
  <Vue3Lottie :animationData="DogJSON" :height="300" />
  <Vue3Lottie
    :animationData="DogJSON"
    :height="300"
    :pauseAnimation="playState"
  />
  <button @click="playState = !playState">Play/Pause Animation</button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// import { Vue3Lottie } from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'

import DogJSON from './assets/dog.json'
import { ref } from 'vue'

const playState = ref(false)
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
