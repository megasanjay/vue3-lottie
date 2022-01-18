<template>
  <div
    ref="LottieAnimationContainer"
    class="lottie-animation-container"
    :style="getCurrentStyle"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
  ></div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, computed, watch } from 'vue'
import Lottie from 'lottie-web'

const props = defineProps({
  animationData: { type: Object, required: true },
  loop: { type: [Boolean, Number], default: true },
  autoPlay: { type: Boolean, default: true },
  rendererSettings: { type: Object, required: false },
  width: { type: [Number, String], default: '100%' },
  height: { type: [Number, String], default: '100%' },
  pauseOnHover: { type: Boolean, default: false },
  playOnHover: { type: Boolean, default: false },
  backgroundColor: { type: String, default: 'transparent' },
  pauseAnimation: { type: Boolean, default: false },
})

const emits = defineEmits([
  'onComplete',
  'onLoopComplete',
  'onEnterFrame',
  'onSegmentStart',
])

const LottieAnimationContainer = ref<HTMLElement | null>(null)
let lottieAnimation = ref<any>(null)

const checkIfContainerExists = () => {
  if (LottieAnimationContainer.value !== null) {
    return true
  } else {
    return false
  }
}

const loadLottie = async () => {
  let autoPlay = props.autoPlay

  if (props.playOnHover) {
    autoPlay = false
  }

  if (LottieAnimationContainer.value) {
    const animationDataCopy = JSON.parse(JSON.stringify(props.animationData))

    lottieAnimation = Lottie.loadAnimation({
      container: LottieAnimationContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: autoPlay,
      animationData: animationDataCopy,
    })

    if (props.pauseAnimation) {
      lottieAnimation.pause()
    } else {
      if (props.playOnHover) {
        lottieAnimation.pause()
      }
    }

    lottieAnimation.addEventListener('loopComplete', () => {
      emits('onLoopComplete')
    })

    lottieAnimation.addEventListener('complete', () => {
      emits('onComplete')
    })

    lottieAnimation.addEventListener('enterFrame', () => {
      emits('onEnterFrame')
    })

    lottieAnimation.addEventListener('segmentStart', () => {
      emits('onSegmentStart')
    })
  }
}

const getCurrentStyle: any = computed(() => {
  let width = props.width
  let height = props.height

  if (typeof props.width === 'number') {
    width = `${props.width}px`
  }
  if (typeof props.height === 'number') {
    height = `${props.height}px`
  }

  let cssVariables = {
    '--lottie-animation-container-width': width,
    '--lottie-animation-container-height': height,
    '--lottie-animation-container-background-color': props.backgroundColor,
  }

  return cssVariables
})

const hoverStarted = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.pause()
  }

  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.play()
  }
}

const hoverEnded = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.play()
  }
  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.pause()
  }
}

watch(props, () => {
  if ((props.pauseOnHover || props.playOnHover) && !props.pauseAnimation) {
    console.error(
      'If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover or playOnHover',
    )
  }

  if (!props.pauseOnHover && !props.playOnHover) {
    if (props.pauseAnimation && lottieAnimation) {
      lottieAnimation.pause()
    } else if (lottieAnimation && !props.pauseAnimation) {
      lottieAnimation.play()
    }
  }
})

const play = () => {
  if (lottieAnimation) {
    lottieAnimation.play()
  }
}

const pause = () => {
  if (lottieAnimation) {
    lottieAnimation.pause()
  }
}

const stop = () => {
  if (lottieAnimation) {
    lottieAnimation.stop()
  }
}

defineExpose({
  play,
  pause,
  stop,
})

const setupLottie = () => {
  if (props.pauseOnHover && props.playOnHover) {
    throw new Error(
      'You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.',
    )
  }

  const interval = setInterval(() => {
    if (checkIfContainerExists()) {
      clearInterval(interval)
      loadLottie()
    }
  }, 100)
}

onMounted(async () => {
  setupLottie()
})

// return {
//   LottieAnimationContainer,
//   lottieAnimation,
//   getCurrentStyle,
//   hoverStarted,
//   hoverEnded,
//   play,
//   pause,
//   stop,
// }
</script>

<style scoped>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
  background-color: var(--lottie-animation-container-background-color);
}
</style>
