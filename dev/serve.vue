<script lang="ts">
import { defineComponent } from 'vue'
import Vue3Lottie from '@/vue3-lottie.vue'

// import AstronautJSON from './lotties/astronaut.json';
const AstronautJSON = require('./lotties/astronaut.json')
const DogJSON = require('./lotties/dog.json')
const VinylJSON = require('./lotties/vinyl.json')
const RocketJSON = require('./lotties/rocket.json')
const HeartJSON = require('./lotties/heart.json')
const CarJSON = require('./lotties/car.json')

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
      DogJSON,
      VinylJSON,
      RocketJSON,
      HeartJSON,
      CarJSON,
      startAnimation: false,
      count: 0,
    }
  },
  methods: {
    play() {
      ;(this.$refs['customControl'] as any).play()
      this.count = (this.$refs['customControl'] as any).getDuration(true)
      console.log(this.count)
    },
    pause() {
      ;(this.$refs['customControl'] as any).pause()
    },
    stop() {
      ;(this.$refs['customControl'] as any).stop()
    },
  },
  mounted() {},
})
</script>

<template>
  <div id="app">
    <div>
      <p>Default</p>
      <Vue3Lottie :animationData="DogJSON" :height="200" :width="200" />
    </div>
    <div>
      <p>Adjusting width and height to 300px</p>
      <Vue3Lottie :animationData="VinylJSON" :height="300" :width="300" />
    </div>
    <div>
      <p>Loop only twice</p>
      <Vue3Lottie
        :animationData="AstronautJSON"
        :height="200"
        :width="200"
        :loop="2"
      />
    </div>
    <div>
      <p>Autoplay and pause on hover</p>
      <Vue3Lottie
        :animationData="RocketJSON"
        :height="200"
        :width="200"
        :pauseOnHover="true"
      />
    </div>
    <div>
      <p>Play on hover</p>
      <Vue3Lottie
        :animationData="HeartJSON"
        :height="200"
        :width="200"
        :playOnHover="true"
      />
    </div>
    <div>
      <p>Reactive play state</p>
      <Vue3Lottie
        :animationData="CarJSON"
        :height="200"
        :width="200"
        :pauseAnimation="startAnimation"
      />
      <button @click="startAnimation = !startAnimation">
        Toggle Animation
      </button>
    </div>
    <div>
      <p>Adjusting width and height to 300px</p>
      <Vue3Lottie
        ref="customControl"
        :animationData="VinylJSON"
        :height="300"
        :width="300"
      />
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="stop">Stop</button>
    </div>
    <div>
      <p>Alternate direction</p>
      <Vue3Lottie
        :animationData="HeartJSON"
        :height="200"
        :width="200"
        :direction="'alternate'"
      />
    </div>
    <div>
      <p>Reverse direction</p>
      <Vue3Lottie
        :animationData="HeartJSON"
        :height="200"
        :width="200"
        :direction="'reverse'"
      />
    </div>
    <div>
      <p>Animation link</p>
      <Vue3Lottie
        animationLink="https://assets5.lottiefiles.com/packages/lf20_vmollwvl.json"
        :height="200"
        :width="200"
      />
    </div>
  </div>
</template>
