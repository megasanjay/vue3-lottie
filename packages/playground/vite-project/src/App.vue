<template>
  <Vue3Lottie :animationData="DogJSON" :height="300" />
  <Vue3Lottie
    animationLink="https://assets7.lottiefiles.com/private_files/lf30_0dzl4dgt.json"
    :height="300"
    ref="anim"
    :autoPlay="false"
    :delay="0"
    :loop="1"
  />
  <button @click="playAnim">Play Animation</button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// import { Vue3Lottie } from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'

import DogJSON from './assets/dog.json'
import { ref } from 'vue'

const anim = ref(null)

const playAnim = () => {
  anim.value.play()
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
