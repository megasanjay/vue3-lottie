import {
  ref,
  computed,
  watch,
  defineComponent,
  onBeforeUnmount,
  PropType,
  toRaw,
  h,
} from 'vue'
import { klona as cloneDeep } from 'klona/json'

import './vue3-lottie.css'

import type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
  LottieProps,
} from './types'

const isEmptyObject = (value: unknown) =>
  !value || (typeof value === 'object' && Object.keys(value).length === 0)

export type LottiePlayer = typeof import('lottie-web').default

export interface CreateVue3LottieOptions {
  /** resolves the lottie-web build this component should use */
  loadPlayer: () => Promise<any>
  /** renderers the player supports; others log a warning. Omit for all. */
  renderers?: string[]
}

/**
 * Builds the Vue3Lottie component around a specific lottie-web build.
 * Each entry point (full / light) passes its own loader so bundlers only
 * ever see the build that entry imports.
 */
export const createVue3Lottie = ({
  loadPlayer,
  renderers,
}: CreateVue3LottieOptions) => {
  // lottie-web touches `window`/`document` at import time, so it is loaded
  // lazily on the client only to keep the component SSR-safe.
  let lottiePlayerPromise: Promise<LottiePlayer> | null = null
  const loadLottiePlayer = () => {
    if (!lottiePlayerPromise) {
      lottiePlayerPromise = loadPlayer()
        .then((mod: any) => (mod.default ?? mod) as LottiePlayer)
        .catch((error) => {
          // allow a retry on the next load
          lottiePlayerPromise = null
          throw error
        })
    }
    return lottiePlayerPromise
  }

  return defineComponent({
    name: 'Vue3Lottie',
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

      let animationData: any = null
      let lottieAnimation: AnimationItem | null = null
      let direction: AnimationDirection = 1
      let delayTimer: ReturnType<typeof setTimeout> | null = null
      let wasPlayingBeforeHover = false
      let isUnmounted = false

      // incremented on every source change so stale async loads are ignored
      let loadId = 0
      let abortController: AbortController | null = null

      const clearDelayTimer = () => {
        if (delayTimer !== null) {
          clearTimeout(delayTimer)
          delayTimer = null
        }
      }

      const destroyAnimation = () => {
        clearDelayTimer()
        lottieAnimation?.destroy()
        lottieAnimation = null
      }

      const shouldPlay = () =>
        props.autoPlay && !props.playOnHover && !props.pauseAnimation

      const getInitialDirection = (): AnimationDirection =>
        props.direction === 'reverse' ? -1 : 1

      // fetch / clone the animation source, then (re)build the animation
      const loadSource = async () => {
        const currentLoadId = ++loadId

        abortController?.abort()
        abortController = null

        if (!lottieAnimationContainer.value) return

        let data: any

        if (props.animationLink !== '') {
          const controller =
            typeof AbortController !== 'undefined'
              ? new AbortController()
              : null
          abortController = controller

          try {
            const response = await fetch(props.animationLink, {
              signal: controller?.signal,
            })

            if (!response.ok) {
              throw new Error(
                `Failed to fetch animation from ${props.animationLink}: ${response.status} ${response.statusText}`,
              )
            }

            data = await response.json()
          } catch (error: any) {
            if (error?.name !== 'AbortError') console.error(error)
            return
          }
        } else if (!isEmptyObject(props.animationData)) {
          // clone the raw animationData so lottie can't mutate the user's
          // object, without deep-tracking every nested property
          data = cloneDeep(toRaw(props.animationData))
        } else {
          console.warn(
            '[vue3-lottie] You must provide either animationLink or animationData',
          )
          return
        }

        // a newer load started (or the component unmounted) while we waited
        if (currentLoadId !== loadId || isUnmounted) return

        animationData = data
        await loadLottie(currentLoadId)
      }

      const loadLottie = async (currentLoadId = loadId) => {
        if (!lottieAnimationContainer.value || !animationData) return

        let Lottie: LottiePlayer
        try {
          Lottie = await loadLottiePlayer()
        } catch (error) {
          console.error(error)
          return
        }

        // the source changed or the component unmounted while lottie loaded
        if (
          currentLoadId !== loadId ||
          isUnmounted ||
          !lottieAnimationContainer.value
        ) {
          return
        }

        destroyAnimation()

        if (renderers && !renderers.includes(props.renderer)) {
          console.warn(
            `[vue3-lottie] renderer="${props.renderer}" is not supported by this build (supported: ${renderers.join(', ')}). Import from 'vue3-lottie' for the full player.`,
          )
        }

        let loop = props.loop

        // drop the loop by one
        // this is because lottie-web will loop one extra time
        if (typeof loop === 'number' && loop > 0) {
          loop = loop - 1
        }

        if (props.direction === 'alternate' && loop === false) {
          console.warn(
            '[vue3-lottie] direction="alternate" requires loop to be enabled',
          )
        }

        const lottieAnimationConfig: any = {
          container: lottieAnimationContainer.value,
          renderer: props.renderer,
          loop: loop,
          // only let lottie autoplay when nothing should hold the animation back
          autoplay: shouldPlay() && props.delay <= 0,
          animationData: animationData,
          assetsPath: props.assetsPath,
        }

        // check if the custom rendererSettings is provided
        if (!isEmptyObject(props.rendererSettings)) {
          lottieAnimationConfig.rendererSettings = { ...props.rendererSettings }
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
        const animation = Lottie.loadAnimation(lottieAnimationConfig)
        lottieAnimation = animation

        // set the speed and direction
        direction = getInitialDirection()
        animation.setSpeed(props.speed)
        animation.setDirection(direction)

        delayTimer = setTimeout(
          () => {
            delayTimer = null

            if (lottieAnimation !== animation) return

            if (shouldPlay()) {
              animation.play()
            } else {
              animation.pause()
            }

            /**
             * Emit an `onAnimationLoaded` event when the animation is loaded
             * This should help with times where you want to run functions on the ref of the element
             */
            emits('onAnimationLoaded')
          },
          Math.max(props.delay, 0),
        )

        // set the emit events
        animation.addEventListener('loopComplete', (event: any) => {
          if (props.direction === 'alternate') {
            animation.stop()
            direction = direction === -1 ? 1 : -1 //invert direction
            animation.setDirection(direction)
            animation.play()
          }
          emits('onLoopComplete', event)
        })

        animation.addEventListener('complete', (event: any) => {
          emits('onComplete', event)
        })

        animation.addEventListener('enterFrame', (event: any) => {
          emits('onEnterFrame', event)
        })

        animation.addEventListener('segmentStart', (event: any) => {
          emits('onSegmentStart', event)
        })
      }

      // (re)load whenever the container mounts or the animation source changes
      watch(
        [
          lottieAnimationContainer,
          () => props.animationLink,
          () => props.animationData,
        ],
        () => {
          loadSource()
        },
        { immediate: true },
      )

      // these options can only be applied by rebuilding the animation
      watch(
        [
          () => props.loop,
          () => props.autoPlay,
          () => props.delay,
          () => props.playOnHover,
          () => props.renderer,
          () => props.rendererSettings,
          () => props.assetsPath,
          () => props.scale,
        ],
        () => {
          if (animationData) loadLottie()
        },
        { deep: true },
      )

      // these options can be applied to the live animation
      watch(
        () => props.speed,
        (speed) => {
          lottieAnimation?.setSpeed(speed)
        },
      )

      watch(
        () => props.direction,
        () => {
          direction = getInitialDirection()
          lottieAnimation?.setDirection(direction)
        },
      )

      onBeforeUnmount(() => {
        isUnmounted = true
        abortController?.abort()
        abortController = null
        destroyAnimation()
      })

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
          '--lottie-animation-container-background-color':
            props.backgroundColor,
          '--lottie-animation-margin': props.noMargin ? '0' : '0 auto',
          '--lottie-animation-scale': props.scale != 1 ? props.scale : '',
        }

        return cssVariables
      })

      // function to check if the container is being hovered
      const hoverStarted = () => {
        if (!lottieAnimation) return

        if (props.pauseOnHover) {
          // remember the play state so we only resume what we paused
          wasPlayingBeforeHover = !lottieAnimation.isPaused
          lottieAnimation.pause()
        }

        if (props.playOnHover) {
          lottieAnimation.play()
        }
      }

      // function to check if the container is no longer being hovered
      const hoverEnded = () => {
        if (!lottieAnimation) return

        if (props.pauseOnHover && wasPlayingBeforeHover) {
          lottieAnimation.play()
        }
        wasPlayingBeforeHover = false

        if (props.playOnHover) {
          lottieAnimation.pause()
        }
      }

      // watch for changes in props.pauseAnimation
      watch(
        () => props.pauseAnimation,
        () => {
          // error if pauseAnimation is true and pauseOnHover is also true or playOnHover is also true
          if (
            (props.pauseOnHover || props.playOnHover) &&
            props.pauseAnimation
          ) {
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
        destroyAnimation()
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

      const setDirection = (newDirection: 'forward' | 'reverse') => {
        if (lottieAnimation) {
          if (newDirection === 'forward') {
            direction = 1
          } else if (newDirection === 'reverse') {
            direction = -1
          } else {
            return
          }
          lottieAnimation.setDirection(direction)
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

      const getCurrentFrame = () => {
        if (lottieAnimation) {
          return lottieAnimation.currentFrame
        }
      }

      const updateDocumentData = (documentData: any, index: number = 0) => {
        if (!lottieAnimation) return

        const element = (lottieAnimation as any).renderer?.elements?.[index]

        if (!element || typeof element.updateDocumentData !== 'function') {
          console.warn(
            `[vue3-lottie] updateDocumentData: no text element found at index ${index}`,
          )
          return
        }

        element.updateDocumentData(documentData)
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
        getCurrentFrame,
        updateDocumentData,
      }
    },

    render() {
      return h('div', {
        ref: 'lottieAnimationContainer',
        class: 'lottie-animation-container',
        style: this.getCurrentStyle,
        onMouseenter: this.hoverStarted,
        onMouseleave: this.hoverEnded,
      })
    },
  })
}
