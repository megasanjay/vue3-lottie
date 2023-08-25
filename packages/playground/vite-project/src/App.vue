<template>
  <div>
    <Vue3Lottie :animationData="DogJSON" :width="300" :height="300" />
  </div>
  <Vue3Lottie
    animationLink="https://assets1.lottiefiles.com/packages/lf20_soCRuE.json"
    :height="300"
    :width="300"
    :pauseOnHover="true"
  />

  <Vue3Lottie
    animationLink="https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json"
    assetsPath="https://source.unsplash.com/user/wsanter"
    :height="300"
    :width="300"
  />
  <HelloWorld msg="Hello Lottie! Using Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

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
