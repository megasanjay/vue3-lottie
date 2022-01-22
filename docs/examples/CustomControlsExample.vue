<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      "
    >
      <Vue3Lottie
        ref="customControl"
        :animationData="CountdownJSON"
        :height="200"
        :width="200"
      />
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          "
        >
          <button @click="play" style="margin-left: 20px">Play</button>
          <button @click="pause" style="margin-left: 20px">Pause</button>
          <button @click="stop" style="margin-left: 20px">Stop</button>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          "
        >
          <button @click="toggleDirection" style="margin-left: 20px">
            Reverse
          </button>
          <button @click="getFrameCount" style="margin-left: 20px">
            # of frames
          </button>
          <button @click="getTimeCount" style="margin-left: 20px">
            # of seconds
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import CountdownJSON from './lotties/countdown.json'

export default {
  name: 'CustomControlsExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      CountdownJSON,
      count: 0,
      direction: 'forward',
    }
  },
  methods: {
    play() {
      this.$refs['customControl'].play()
    },
    pause() {
      this.$refs['customControl'].pause()
    },
    stop() {
      this.$refs['customControl'].stop()
    },
    toggleDirection() {
      if (this.direction === 'forward') {
        this.pause()
        this.$refs['customControl'].setDirection('reverse')
        this.play()
        this.direction = 'reverse'
      } else {
        this.pause()
        this.$refs['customControl'].setDirection('forward')
        this.play()
        this.direction = 'forward'
      }
    },
    getFrameCount() {
      alert(
        `This animation has ${this.$refs['customControl'].getDuration(
          true,
        )} frames`,
      )
    },
    getTimeCount() {
      alert(
        `This animation takes ${this.$refs['customControl'].getDuration(
          false,
        )} seconds`,
      )
    },
  },
}
</script>

<style scoped>
button {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

button:hover,
button:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
