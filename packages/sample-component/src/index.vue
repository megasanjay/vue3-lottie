<template>
  <span class="sample-component-class">This is a sample component</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SampleComponent',
  setup () {
    return { }
  }
})
</script>
<style lang="scss" scoped>
.sample-component-class {
  color: red;
}
</style>
