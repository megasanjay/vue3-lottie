export type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
} from 'lottie-web'

import type {
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
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
  direction: 'forward' | 'reverse' | 'alternate'
  pauseOnHover: boolean
  playOnHover: boolean
  noMargin: boolean
  scale: number
  backgroundColor: string
  pauseAnimation: boolean
  assetsPath: string
  onLoopComplete: (event: BMCompleteLoopEvent) => void
  onEnterFrame: (event: BMEnterFrameEvent) => void
  onSegmentStart: (event: BMSegmentStartEvent) => void
  onComplete: (event: BMCompleteEvent) => void
  onAnimationLoaded: () => void
}
