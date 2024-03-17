<template>
  <div>
    <Vue3Lottie :animationData="dog" :width="300" :height="300" />
  </div>
</template>

<script setup lang="ts">
import dog from '../assets/dog.json'

await new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, 3000)
})
</script>
