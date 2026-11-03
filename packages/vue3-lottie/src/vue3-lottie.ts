import { createVue3Lottie } from './create-vue3-lottie'

// full lottie-web player: every renderer plus After Effects expressions
// (expressions are evaluated with `eval`)
export default createVue3Lottie({
  loadPlayer: () => import('lottie-web'),
})
