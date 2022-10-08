<template>
  <h2>Raw json</h2>
  <Vue3Lottie :animationData="firstAnim" :height="200" />

  <h2>Link to external resource</h2>
  <Vue3Lottie :animationLink="secondAnim" :height="200" />

  <h2>Static Asset</h2>
  <Vue3Lottie :animationLink="thirdAnim" :height="200" />

  <button @click="switchJson()">Change file</button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

import DogJSON from './assets/dog.json'
import CatJSON from './assets/cat.json'
import CatUrl from './assets/cat.json?url'

const firstAnim = shallowRef<object>(DogJSON)
const secondAnim = ref(
  'https://assets1.lottiefiles.com/packages/lf20_soCRuE.json',
)
const thirdAnim = ref(new URL(CatUrl, import.meta.url).href)

function switchJson() {
  firstAnim.value = CatJSON
  secondAnim.value =
    'https://assets10.lottiefiles.com/packages/lf20_8fr70to8.json'

  thirdAnim.value = new URL('./assets/dog.json', import.meta.url).href
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
