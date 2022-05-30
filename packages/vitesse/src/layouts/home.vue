<script lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
export default {
  name: 'BasicExampleURL',
  components: {
    Vue3Lottie,
  },
}
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">[Home Layout]</div>
    <Vue3Lottie
      animationLink="https://assets5.lottiefiles.com/packages/lf20_vmollwvl.json"
      :height="200"
      :width="200"
    />
  </main>
</template>
