<template>
  <ClientOnly>
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
          ref="lottieAnimation"
          animation-link="https://assets2.lottiefiles.com/private_files/lf30_vcwnens3.json"
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
            <button style="margin-left: 20px" @click="play">Play</button>
            <button style="margin-left: 20px" @click="pause">Pause</button>
            <button style="margin-left: 20px" @click="stop">Stop</button>
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
  </ClientOnly>
</template>

<script setup>
import 'vue3-lottie/dist/style.css'

const lottieAnimation = ref(null)

const direction = ref('forward')

const play = () => {
  lottieAnimation.value.play()
}

const pause = () => {
  lottieAnimation.value.pause()
}

const stop = () => {
  lottieAnimation.value.stop()
}

const toggleDirection = () => {
  if (direction.value === 'forward') {
    pause()
    lottieAnimation.value.setDirection('reverse')
    play()
    direction.value = 'reverse'
  } else {
    pause()
    lottieAnimation.value.setDirection('forward')
    play()
    direction.value = 'forward'
  }
}

const getFrameCount = () => {
  alert(`This animation has ${lottieAnimation.value.getDuration(true)} frames`)
}

const getTimeCount = () => {
  alert(
    `This animation takes ${lottieAnimation.value.getDuration(false)} seconds`,
  )
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
