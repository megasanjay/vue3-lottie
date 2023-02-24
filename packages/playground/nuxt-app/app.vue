<template>
  <div>
    <div id="asset">
      <Vue3Lottie :animationData="DogJson" :height="300" />
    </div>
    <div id="link">
      <Vue3Lottie
        animationLink="https://assets1.lottiefiles.com/packages/lf20_soCRuE.json"
        :height="300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DogJson from '~/assets/dog.json'
</script>
