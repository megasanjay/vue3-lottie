<template>
  <ClientOnly>
    <Vue3Lottie
      :animationData="data"
      :width="300"
      :height="300"
      @click="dataClick"
    />
  </ClientOnly>

  <ClientOnly>
    <Vue3Lottie
      :animationLink="links[0]"
      :height="300"
      :width="300"
      @click="linkClick"
      :scale="1.1"
    />
  </ClientOnly>

  <ClientOnly>
    <Vue3Lottie
      animationLink="https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json"
      assetsPath="https://source.unsplash.com/user/wsanter"
      :height="200"
      :width="200"
    />
  </ClientOnly>

  <HelloWorld msg="Hello Lottie! Using Nuxt 3" />
</template>

<script setup lang="ts">
import DogJSON from '@/assets/dog.json'
import Lottie from '@/assets/lottie.json'

const links = ref([
  'https://assets1.lottiefiles.com/packages/lf20_soCRuE.json',
  'https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json',
])

const data = ref<any>(DogJSON)

function linkClick() {
  links.value = links.value.reverse()
}

function dataClick() {
  data.value = Lottie
}
</script>

<style>
div {
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
