/// <reference lib="dom" />

export type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
} from 'lottie-web'

export interface LottieProps {
  animationData: any
  animationLink: string
  loop: boolean | number
  autoPlay: boolean
  renderer: string
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
  fetchOptions: object
  onLoopComplete: () => void
  onEnterFrame: () => void
  onSegmentStart: () => void
  onComplete: () => void
  onAnimationLoaded: () => void
}
