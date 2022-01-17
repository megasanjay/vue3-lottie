<script lang="ts">
import { defineComponent } from 'vue'
import Vue3Lottie from '@/vue3-lottie.vue'

// import AstronautJSON from './lotties/astronaut.json';
const AstronautJSON = require('./lotties/astronaut.json')

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    }
  },
  methods: {
    generateRandomString() {
      const randomString = Math.random().toString(36).substring(2, 15)
      return `https://avatars.dicebear.com/api/avataaars/${randomString}.svg`
    },
    getImgURLS(num: number) {
      let array = []
      for (let i = 0; i < num; i++) {
        array.push(this.generateRandomString())
      }
      return array
    },
  },
})
</script>

<template>
  <div id="app">
    <Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
  </div>
</template>
