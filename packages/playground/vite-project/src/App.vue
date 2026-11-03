<template>
  <section class="builds">
    <div>
      <h3>Full build</h3>
      <code>import Vue3Lottie from 'vue3-lottie'</code>
      <Vue3Lottie :animationData="DogJSON" :width="200" :height="200" />
    </div>
    <div>
      <h3>Light build</h3>
      <code
        >import {{ '{' }} Vue3Lottie {{ '}' }} from 'vue3-lottie/light'</code
      >
      <Vue3LottieLight :animationData="DogJSON" :width="200" :height="200" />
    </div>
  </section>

  <Vue3Lottie
    :animationData="data"
    :width="300"
    :height="300"
    @click="dataClick"
  />

  <Vue3Lottie
    ref="lot"
    :animationLink="link[0]"
    :height="300"
    :width="300"
    @click="linkClick"
    :pauseOnHover="true"
    :scale="1.1"
  />

  <Vue3Lottie
    :animationLink="link[1]"
    :animationData="data"
    @click="linkClick"
    :assetsPath="`https://api.dicebear.com/9.x/micah/svg?seed=${Math.random()}&scale=50`"
    :height="200"
    :width="200"
  />

  <Suspense>
    <LazyDynamicComponent />
    <template #fallback> Loading... </template>
  </Suspense>

  <HelloWorld msg="Hello Lottie! Using Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import DogJSON from './assets/dog.json'
import Lottie from './assets/lottie.json'
import { ref, defineAsyncComponent } from 'vue'
// light build (svg only, no expressions, no eval); the full build is
// registered globally as <Vue3Lottie> in main.ts
import { Vue3Lottie as Vue3LottieLight } from 'vue3-lottie/light'

const LazyDynamicComponent = defineAsyncComponent(
  () => import('./components/DynamicComponent.vue'),
)

const lot = ref()

const link = ref([
  'https://assets1.lottiefiles.com/packages/lf20_soCRuE.json',
  'https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json',
])
const data = ref<any>(DogJSON)
function linkClick() {
  link.value = link.value.reverse()
}
function dataClick() {
  data.value = Lottie
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}

.builds {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
