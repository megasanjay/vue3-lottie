<template>
  <div
    ref="lottieAnimationContainer"
    class="lottie-animation-container"
    :style="getCurrentStyle"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
  ></div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  defineComponent,
  PropType,
  watchEffect,
} from 'vue'
import Lottie from 'lottie-web'
import isEqual from 'fast-deep-equal/es6';
import { klona as cloneDeep } from 'klona/json';

import type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
  LottieProps,
} from './types'

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
    noMargin: {
      type: Boolean as PropType<LottieProps['noMargin']>,
      default: false,
    },
    scale: {
      type: Number as PropType<LottieProps['scale']>,
      default: 1,
    },
    renderer: {
      type: String as PropType<LottieProps['renderer']>,
      default: 'svg',
    },
    rendererSettings: {
      type: Object as PropType<LottieProps['rendererSettings']>,
      default: () => ({}),
    },
    assetsPath: {
      type: String as PropType<LottieProps['assetsPath']>,
      default: '',
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
    const lottieAnimationContainer = ref<HTMLDivElement>()

    let animationData: any
    let lottieAnimation: AnimationItem | null = null
    let direction: AnimationDirection = 1

    watchEffect(async () => {
      // track and ensure that `lottieAnimationContainer` is mounted
      // fix: #502
      if(!lottieAnimationContainer.value) return

      if (props.animationLink != '') {
        // fetch the animation data from the url

        try {
          const response = await fetch(props.animationLink)

          const responseJSON = await response.json()

          animationData = responseJSON
        } catch (error) {
          console.error(error)
          return
        }
      } else if (isEqual(props.animationData, {}) === false) {
        // clone the animationData to prevent it from being mutated
        animationData = cloneDeep(props.animationData)
      } else {
        throw new Error(
          'You must provide either animationLink or animationData',
        )
      }

      loadLottie()
    })

    const loadLottie = () => {
      // check if the lottieAnimationContainer has been created
      if (!lottieAnimationContainer.value) return

      // check if the animationData has been loaded
      if (!animationData) return

      // destroy the animation if it already exists
      lottieAnimation?.destroy()

      // reset the lottieAnimation variable
      lottieAnimation = null

      // set the autoplay and loop variables
      let autoPlay = props.autoPlay
      let loop = props.loop

      if (props.playOnHover) {
        autoPlay = false
      }

      // drop the loop by one
      // this is because lottie-web will loop one extra time
      if (typeof loop === 'number') {
        if (loop > 0) {
          loop = loop - 1
        }
      }

      // if the delay is greater than 0, we need to set autoplay to false
      if (props.delay > 0) {
        autoPlay = false
      }

      const lottieAnimationConfig: any = {
        container: lottieAnimationContainer.value,
        renderer: props.renderer,
        loop: loop,
        autoplay: autoPlay,
        animationData: animationData,
        assetsPath: props.assetsPath,
      }

      // check if the custom rendererSettings is provided
      if (isEqual(props.rendererSettings, {}) === false) {
        lottieAnimationConfig.rendererSettings = props.rendererSettings
      }

      /**
       * If the scale is not 1, we need to set `viewBoxOnly` to true
       * This will remove the translate3d transform from the svg and
       * will allow us to scale the svg using css transform scale
       */
      if (props.scale !== 1) {
        lottieAnimationConfig.rendererSettings = {
          ...lottieAnimationConfig.rendererSettings,
          viewBoxOnly: true,
        }
      }

      // actually load the animation
      lottieAnimation = Lottie.loadAnimation(lottieAnimationConfig)

      setTimeout(() => {
        autoPlay = props.autoPlay

        if (props.playOnHover) {
          lottieAnimation?.pause()
        } else {
          if (autoPlay) {
            lottieAnimation?.play()
          } else {
            lottieAnimation?.pause()
          }
        }

        /**
         * Emit an `onAnimationLoaded` event when the animation is loaded
         * This should help with times where you want to run functions on the ref of the element
         */
        emits('onAnimationLoaded')
      }, props.delay)

      // set the speed and direction
      lottieAnimation.setSpeed(props.speed)

      if (props.direction === 'reverse') {
        lottieAnimation.setDirection(-1)
      }
      if (props.direction === 'normal') {
        lottieAnimation.setDirection(1)
      }

      // pause the animation if pauseAnimation or playOnHover is true
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
          lottieAnimation?.stop()
          direction = direction === -1 ? 1 : -1 //invert direction
          lottieAnimation?.setDirection(direction)
          lottieAnimation?.play()
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
        '--lottie-animation-margin': props.noMargin ? '0' : '0 auto',
        '--lottie-animation-scale': props.scale != 1 ? props.scale : '',
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
      segments: AnimationSegment | AnimationSegment[],
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
        lottieAnimation.renderer.elements[index].updateDocumentData(
          documentData,
        )
      }
    }

    return {
      lottieAnimationContainer,
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
  margin: var(--lottie-animation-margin);
}

.lottie-animation-container svg {
  transform: scale(var(--lottie-animation-scale));
}
</style>
