<template>
  <ClientOnly>
    <Vue3Lottie
      animation-link="https://assets7.lottiefiles.com/packages/lf20_bNKaWpBPt6.json"
      :height="200"
      :width="200"
      :play-on-hover="true"
    />
  </ClientOnly>
</template>

<script setup>
import 'vue3-lottie/dist/style.css'
</script>
