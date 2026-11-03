import { createVue3Lottie } from './create-vue3-lottie'

// lottie-web light player: svg renderer only, no expressions, no `eval`
// (annotated so the declaration names lottie-web types portably)
const Vue3Lottie: ReturnType<typeof createVue3Lottie> = createVue3Lottie({
  loadPlayer: () => import('lottie-web/build/player/lottie_light'),
  renderers: ['svg'],
})

export default Vue3Lottie
