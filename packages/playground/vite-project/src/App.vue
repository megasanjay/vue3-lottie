<template>
  <Vue3Lottie :animationData="data" :width="300" :height="300" @click="dataClick"/>

  <Vue3Lottie
    ref="lot"
    :animationLink="link[0]"
    :height="300"
    :width="300"
    @click="linkClick"
    :pauseOnHover="true"
    :scale="1.1"
  />

  <Vue3Lottie
    :animationLink="link[1]"
    :animationData="data"
    @click="linkClick"
    assetsPath="https://source.unsplash.com/user/wsanter"
    :height="200"
    :width="200"
  />

  <HelloWorld msg="Hello Lottie! Using Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import DogJSON from './assets/dog.json'
import Lottie from './assets/lottie.json'
import { ref } from 'vue';
const lot = ref()

const link = ref(['https://assets1.lottiefiles.com/packages/lf20_soCRuE.json','https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json'])
const data = ref<any>(DogJSON)
function linkClick(){
  link.value = link.value.reverse()
}
function dataClick(){
  data.value =  Lottie
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
