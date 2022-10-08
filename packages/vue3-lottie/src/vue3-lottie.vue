<template>
  <div
    :data-id="elementId"
    ref="root"
    class="lottie-animation-container"
    :style="getCurrentStyle"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
  ></div>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  computed,
  watch,
  shallowRef,
  onUnmounted,
  watchEffect,
  nextTick,
} from 'vue'
import Lottie from 'lottie-web'

import { fetchData, parseData } from './utils'

import type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
  LottieProps,
} from './types'

const props = withDefaults(defineProps<LottieProps>(), {
  animationData: '',
  animationLink: '',
  loop: true,
  autoPlay: true,
  rendererSettings: null,
  width: '100%',
  height: '100%',
  speed: 1,
  delay: 0,
  direction: 'forward',
  pauseOnHover: false,
  playOnHover: false,
  backgroundColor: 'transparent',
  pauseAnimation: false,
  fetchOptions: undefined,
})

const emits = defineEmits<{
  (event: 'onComplete'): void
  (event: 'onLoopComplete'): void
  (event: 'onEnterFrame'): void
  (event: 'onSegmentStart'): void
  (event: 'onAnimationLoaded'): void
}>()

let lottieAnimation: AnimationItem | null = null
const root = ref<HTMLElement | null>(null)
const elementId = ref<string>('')
let direction: AnimationDirection = 1

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

  let loop = props.loop

  // drop the loop by one
  if (typeof loop === 'number') {
    if (loop > 0) {
      loop = loop - 1
    }
  }

  if (props.delay > 0) {
    autoPlay = false
  }

  // actually load the animation
  lottieAnimation = Lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    loop: loop,
    autoplay: autoPlay,
    animationData: animationData.value,
  })

  if (!lottieAnimation) {
    return
  }

  setTimeout(() => {
    if (!lottieAnimation) return

    autoPlay = props.autoPlay

    if (props.playOnHover) {
      lottieAnimation.pause()
    } else {
      if (autoPlay) {
        lottieAnimation.play()
      } else {
        lottieAnimation.pause()
      }
    }

    /**
     * Emit an `onAnimationLoaded` event when the animation is loaded
     * This should help with times where you want to run functions on the ref of the element
     */
    emits('onAnimationLoaded')
  }, props.delay)

  lottieAnimation.setSpeed(props.speed)

  if (props.direction === 'reverse') {
    lottieAnimation.setDirection(-1)
  }
  if (props.direction === 'normal') {
    lottieAnimation.setDirection(1)
  }

  if (props.pauseAnimation) {
    lottieAnimation.pause()
  } else {
    if (props.playOnHover) {
      lottieAnimation.pause()
    }
  }

  attachEvents()
}

function attachEvents() {
  if (!lottieAnimation) return

  // set the emit events
  lottieAnimation.addEventListener('loopComplete', () => {
    if (!lottieAnimation) return

    if (props.direction === 'alternate') {
      lottieAnimation.stop()
      direction = direction === -1 ? 1 : -1 //invert direction
      lottieAnimation.setDirection(direction)
      lottieAnimation.play()
    }
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

// watch for changes in props.pauseAnimation
watch(
  () => props.pauseAnimation,
  () => {
    // error if pauseAnimation is true and pauseOnHover is also true or playOnHover is also true
    if ((props.pauseOnHover || props.playOnHover) && props.pauseAnimation) {
      console.error(
        'If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover and playOnHover',
      )
      return
    }

    // control the animation play state
    if (lottieAnimation) {
      if (props.pauseAnimation) {
        lottieAnimation.pause()
      } else {
        lottieAnimation.play()
      }
    }
  },
)

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

const destroy = () => {
  if (!lottieAnimation) return

  lottieAnimation.destroy()
  lottieAnimation = null
}

const setSpeed = (speed: number = 1) => {
  // speed: 1 is normal speed.

  if (speed <= 0) {
    throw new Error('Speed must be greater than 0')
  }

  if (lottieAnimation) {
    lottieAnimation.setSpeed(speed)
  }
}

const setDirection = (direction: 'forward' | 'reverse') => {
  if (lottieAnimation) {
    if (direction === 'forward') {
      lottieAnimation.setDirection(1)
    } else if (direction === 'reverse') {
      lottieAnimation.setDirection(-1)
    }
  }
}

const goToAndStop = (frame: number, isFrame: boolean = true) => {
  //value: numeric value.
  //isFrame: defines if first argument is a time based value or a frame based (default true).

  if (lottieAnimation) {
    lottieAnimation.goToAndStop(frame, isFrame)
  }
}

const goToAndPlay = (frame: number, isFrame: boolean = true) => {
  //value: numeric value
  //isFrame: defines if first argument is a time based value or a frame based (default true).

  if (lottieAnimation) {
    lottieAnimation.goToAndPlay(frame, isFrame)
  }
}

const playSegments = (
  segments: AnimationSegment[],
  forceFlag: boolean = false,
) => {
  //segments: array. Can contain 2 numeric values that will be used as first and last frame of the animation. Or can contain a sequence of arrays each with 2 numeric values.
  //forceFlag: boolean. If set to false, it will wait until the current segment is complete. If true, it will update values immediately.

  if (lottieAnimation) {
    lottieAnimation.playSegments(segments, forceFlag)
  }
}

const setSubFrame = (useSubFrame: boolean = true) => {
  // useSubFrames: If false, it will respect the original AE fps. If true, it will update on every requestAnimationFrame with intermediate values. Default is true.
  if (lottieAnimation) {
    lottieAnimation.setSubframe(useSubFrame)
  }
}

const getDuration = (inFrames: boolean = true) => {
  if (lottieAnimation) {
    return lottieAnimation.getDuration(inFrames)
  }
}

const updateDocumentData = (documentData: any, index: number = 0) => {
  if (lottieAnimation) {
    lottieAnimation.renderer.elements[index].updateDocumentData(documentData)
  }
}

// function to generate random strings for IDs
const makeId = (length: number) => {
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

const animationData = shallowRef<null | object>(null)

/**
 * Prepare the animation data
 */
async function prepareAnimationData() {
  // parse or fetch data
  const json = props.animationData
    ? parseData(props.animationData)
    : await fetchData(props.animationLink, props.fetchOptions)

  if (!json) {
    throw new Error('You must provide correct animationLink or animationData')
  }

  animationData.value = json
}

watch(
  () => [props.animationData, props.animationLink],
  () => {
    prepareAnimationData()
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  elementId.value = makeId(20) // generate a random id for the container

  watch(
    () => animationData.value,
    (value, oldValue) => {
      if (value && value !== oldValue) {
        destroy()
        setupLottie(elementId.value)
      }
    },
    {
      immediate: true,
    },
  )
})

onUnmounted(() => {
  destroy()
})
</script>

<style>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
  background-color: var(--lottie-animation-container-background-color);
  overflow: hidden;
  margin: 0 auto;
}
</style>
