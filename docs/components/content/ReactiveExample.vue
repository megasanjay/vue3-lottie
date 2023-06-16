<template>
  <ClientOnly>
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      "
    >
      <Vue3Lottie
        animation-link="https://assets10.lottiefiles.com/packages/lf20_swnrn2oy.json"
        :height="200"
        :width="200"
        :pause-animation="playState"
      />
      <button style="margin-left: 20px" @click="playState = !playState">
        Play/Pause Animation
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import 'vue3-lottie/dist/style.css'

const playState = ref(true)
</script>

<style scoped>
button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border: 1px solid transparent;
  min-width: 160px;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  background-color: #15883e;
  height: 48px;
}

button:hover {
  background-color: #1db954;
}
</style>
