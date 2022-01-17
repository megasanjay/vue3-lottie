<template>
  <Vue3Lottie
    :animation-data="AstronautJSON"
    :width="200"
    :height="200"
    :pauseAnimation="testvariable"
  />
  <Vue3Lottie :animation-data="AstronautJSON" :width="200" :height="200" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Vue3Lottie from '../packages/vue3-lottie'

import AstronautJSON from '../docs/examples/Astronaut.json'

export default defineComponent({
  name: 'App',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      testvariable: true,
    }
  },
  setup() {
    return { AstronautJSON }
  },
  mounted() {
    setTimeout(() => {
      this.testvariable = false
    }, 3000)
  },
})
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
