<template>
  <ClientOnly>
    <Vue3Lottie
      animation-link="https://assets8.lottiefiles.com/datafiles/uoZvuyyqr04CpMr/data.json"
      :height="200"
      :width="200"
      :loop="3"
    />
  </ClientOnly>
</template>

<script setup>
import 'vue3-lottie/dist/style.css'
</script>
