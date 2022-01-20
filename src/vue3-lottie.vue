<template>
  <div
    :data-id="elementid"
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

let lottieAnimation = ref<any>(null)
const elementid = ref<string>('')

// hack fix supplement for ssr
const checkIfContainerExists = (elementID: String) => {
  if (document.querySelector(`[data-id="${elementID}" ]`) !== null) {
    return true
  } else {
    return false
  }
}

const loadLottie = async (element: Element) => {
  let autoPlay = props.autoPlay

  if (props.playOnHover) {
    autoPlay = false
  }

  // creating a copy of the animation data to prevent the original data from being modified
  // also needed to render multiple animations on the same page
  const animationDataCopy = JSON.parse(JSON.stringify(props.animationData))

  let loop = props.loop

  // drop the loop by one
  if (typeof loop === 'number') {
    if (loop > 0) {
      loop = loop - 1
    }
  }

  // actually load the animation
  lottieAnimation = Lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    loop: loop,
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

  // set the emit events
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

// generate the css variables for width, height and background color
const getCurrentStyle: any = computed(() => {
  let width = props.width
  let height = props.height

  // set to px values if a number is passed
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

// function to check if the container is being hovered
const hoverStarted = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.pause()
  }

  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.play()
  }
}

// function to check if the container is no longer being hovered
const hoverEnded = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.play()
  }
  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.pause()
  }
}

// watch for changes in props
// mainly used for the pauseAnimation prop
watch(props, () => {
  // error if pauseAnimation is true and pauseOnHover is also true or playOnHover is also true
  if ((props.pauseOnHover || props.playOnHover) && !props.pauseAnimation) {
    console.error(
      'If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover or playOnHover',
    )
  }

  // control the animation play state
  if (!props.pauseOnHover && !props.playOnHover) {
    if (props.pauseAnimation && lottieAnimation) {
      lottieAnimation.pause()
    } else if (lottieAnimation && !props.pauseAnimation) {
      lottieAnimation.play()
    }
  }
})

// method to play the animation
const play = () => {
  if (lottieAnimation) {
    lottieAnimation.play()
  }
}

// method to pause the animation
const pause = () => {
  if (lottieAnimation) {
    lottieAnimation.pause()
  }
}

// method to stop the animation. It will reset the animation to the first frame
const stop = () => {
  if (lottieAnimation) {
    lottieAnimation.stop()
  }
}

// expose child methods to the parent component
defineExpose({
  play,
  pause,
  stop,
})

// function to generate random strings for IDs
const makeid = (length: number) => {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const setupLottie = (elementID: String) => {
  if (props.pauseOnHover && props.playOnHover) {
    throw new Error(
      'You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.',
    )
  }

  // Unfortunately, this is a hackfix for ssr. We need to wait for the element to be rendered before we can load the animation.
  // One day I will figure out how to do this properly.
  const interval = setInterval(() => {
    if (checkIfContainerExists(elementID)) {
      clearInterval(interval)
      const element = document.querySelector(`[data-id="${elementID}" ]`)

      if (element) {
        loadLottie(element) // load the animation
      }
    }
  }, 0)
}

onMounted(async () => {
  elementid.value = makeid(20) // generate a random id for the container
  setupLottie(elementid.value)
})
</script>

<style scoped>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
  background-color: var(--lottie-animation-container-background-color);
}
</style>
