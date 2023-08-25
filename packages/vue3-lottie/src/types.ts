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
  noMargin: boolean
  scale: number
  backgroundColor: string
  pauseAnimation: boolean
  assetsPath: string
  onLoopComplete: () => void
  onEnterFrame: () => void
  onSegmentStart: () => void
  onComplete: () => void
  onAnimationLoaded: () => void
}
