<template>
  <SampleComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SampleComponent from '../packages/sample-component'

export default defineComponent({
  name: 'App',
  components: {
    SampleComponent
  },
  setup () {
    return { }
  }
})

</script>
<style lang="scss">
html, body {
  margin:0;
  padding:0;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
