<template>
  <Vue3Lottie :animationData="DogJSON" :height="300" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// import 'vue3-lottie/dist/style.css'
// import { Vue3Lottie } from 'vue3-lottie'

import DogJSON from './assets/dog.json'
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
