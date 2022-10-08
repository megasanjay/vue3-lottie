/// <reference lib="dom" />

export type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
} from 'lottie-web'

export interface LottieProps {
  animationData: string | object
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
  fetchOptions: object
}
