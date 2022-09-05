<template>
  <div
    :data-id="elementid"
    class="lottie-animation-container"
    :style="getCurrentStyle"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
  ></div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch, defineComponent, PropType } from 'vue'
import Lottie from 'lottie-web'

export interface LottieProps {
  animationData: any
  animationLink: string
  loop: boolean | number
  autoPlay: boolean
  rendererSettings: any
  width: number | string
  height: number | string
  speed: number
  delay: number
  direction: string
  pauseOnHover: boolean
  playOnHover: boolean
  backgroundColor: string
  pauseAnimation: boolean
}

export default defineComponent({
  props: {
    animationData: {
      type: Object as PropType<LottieProps['animationData']>,
      default: () => ({}),
    },
    animationLink: {
      type: String as PropType<LottieProps['animationLink']>,
      default: '',
    },

    loop: {
      type: [Boolean, Number] as PropType<LottieProps['loop']>,
      default: true,
    },

    autoPlay: {
      type: Boolean as PropType<LottieProps['autoPlay']>,
      default: true,
    },

    width: {
      type: [Number, String] as PropType<LottieProps['width']>,
      default: '100%',
    },

    height: {
      type: [Number, String] as PropType<LottieProps['height']>,
      default: '100%',
    },

    speed: {
      type: Number as PropType<LottieProps['speed']>,
      default: 1,
    },
    delay: {
      type: Number as PropType<LottieProps['delay']>,
      default: 0,
    },

    direction: {
      type: String as PropType<LottieProps['direction']>,
      default: 'forward',
    },

    pauseOnHover: {
      type: Boolean as PropType<LottieProps['pauseOnHover']>,
      default: false,
    },

    playOnHover: {
      type: Boolean as PropType<LottieProps['playOnHover']>,
      default: false,
    },
    backgroundColor: {
      type: String as PropType<LottieProps['backgroundColor']>,
      default: 'transparent',
    },
    pauseAnimation: {
      type: Boolean as PropType<LottieProps['pauseAnimation']>,
      default: false,
    },
  },

  emits: {
    onComplete: null,
    onLoopComplete: null,
    onEnterFrame: null,
    onSegmentStart: null,
    onAnimationLoaded: null,
  },

  setup(props, { emit: emits }) {
    let lottieAnimation = ref<any>(null)
    const elementid = ref<string>('')
    let direction = 1

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
      let animationData = {}
      if (props.animationData !== {}) {
        animationData = JSON.parse(JSON.stringify(props.animationData))
      }

      if (props.animationLink != '') {
        try {
          const response = await fetch(props.animationLink)
          const json = await response.json()
          animationData = json
        } catch (error) {
          console.error(error)
          return
        }
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
        animationData: animationData,
      })

      setTimeout(() => {
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

      // set the emit events
      lottieAnimation.addEventListener('loopComplete', () => {
        if (props.direction === 'alternate') {
          lottieAnimation.stop()
          direction = direction * -1 //invert direction
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
      if (lottieAnimation) {
        lottieAnimation.destroy()
      }
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

    const goToAndStop = (frame: number, isFrame: Boolean = true) => {
      //value: numeric value.
      //isFrame: defines if first argument is a time based value or a frame based (default true).

      if (lottieAnimation) {
        lottieAnimation.goToAndStop(frame, isFrame)
      }
    }

    const goToAndPlay = (frame: number, isFrame: Boolean = true) => {
      //value: numeric value
      //isFrame: defines if first argument is a time based value or a frame based (default true).

      if (lottieAnimation) {
        lottieAnimation.goToAndPlay(frame, isFrame)
      }
    }

    const playSegments = (
      segments: Array<number>,
      forceFlag: Boolean = false,
    ) => {
      //segments: array. Can contain 2 numeric values that will be used as first and last frame of the animation. Or can contain a sequence of arrays each with 2 numeric values.
      //forceFlag: boolean. If set to false, it will wait until the current segment is complete. If true, it will update values immediately.

      if (lottieAnimation) {
        lottieAnimation.playSegments(segments, forceFlag)
      }
    }

    const setSubFrame = (useSubFrame: Boolean = true) => {
      // useSubFrames: If false, it will respect the original AE fps. If true, it will update on every requestAnimationFrame with intermediate values. Default is true.
      if (lottieAnimation) {
        lottieAnimation.setSubframe(useSubFrame)
      }
    }

    const getDuration = (inFrames: Boolean = true) => {
      if (lottieAnimation) {
        return lottieAnimation.getDuration(inFrames)
      }
    }

    const updateDocumentData = (documentData: any, index: number = 0) => {
      if (lottieAnimation) {
        lottieAnimation.renderer.elements[index].updateDocumentData(
          documentData,
        )
      }
    }

    // function to generate random strings for IDs
    const makeid = (length: number) => {
      var result = ''
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        )
      }
      return result
    }

    const setupLottie = (elementID: String) => {
      if (props.pauseOnHover && props.playOnHover) {
        throw new Error(
          'You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.',
        )
      }

      if (props.animationLink === '' && props.animationData === {}) {
        throw new Error(
          'You must provide either animationLink or animationData',
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

    return {
      elementid,
      hoverEnded,
      hoverStarted,
      getCurrentStyle,
      play,
      pause,
      stop,
      destroy,
      setSpeed,
      setDirection,
      goToAndStop,
      goToAndPlay,
      playSegments,
      setSubFrame,
      getDuration,
      updateDocumentData,
    }
  },
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
