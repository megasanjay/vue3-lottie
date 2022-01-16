<template>
  <Vue3Lottie :animationData="AstronautJSON" :width="200" :height="200" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue3Lottie from "../packages/vue3-lottie";

import AstronautJSON from "./assets/lotties/Astronaut.json";

export default defineComponent({
  name: "App",
  components: {
    Vue3Lottie,
  },
  setup() {
    return { AstronautJSON };
  },
});
</script>
<style lang="scss">
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
