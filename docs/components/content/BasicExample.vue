<template>
  <ClientOnly>
    <Vue3Lottie :animation-data="SkullJSON" :height="200" :width="200" />
  </ClientOnly>
</template>

<script setup>
import SkullJSON from './lotties/skull.json'
</script>
