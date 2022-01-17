# Vue 3 Lottie

[![npm](https://img.shields.io/npm/v/vue3-lottie)](https://www.npmjs.com/package/vue3-lottie) [![Downloads](https://img.shields.io/npm/dt/vue3-lottie)](https://www.npmjs.com/package/vue3-lottie) [![Stars](https://img.shields.io/github/stars/megasanjay/vue3-lottie.svg?style=flat-square)](https://github.com/megasanjay/vue3-lottie/stargazers) [![License](https://img.shields.io/npm/l/vue3-lottie)](https://github.com/megasanjay/vue3-lottie/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/megasanjay/vue3-lottie)](https://github.com/megasanjay/vue3-lottie/issues)

After finding a suprising lack of Vue 3 components for Lottie animations, I decided to create my own. Will be adding more documentation and examples soon.

# Demos

View the live demos here: [https://vue3-lottie.vercel.app/examples.html](https://vue3-lottie.vercel.app/examples.html)

# Installation

If you are using npm:

```shell
npm install vue3-lottie
```

If you are using yarn:

```shell
yarn add vue3-lottie
```

# Usage

The most common use case is to register the component globally.

```js
// main.js
import { createApp } from 'vue'
import Vue3Lottie from 'vue3-lottie'

createApp(App).use(Vue3Lottie).mount('#app')
```

Alternatively you can import the marquee component locally.

```js
import Vue3Lottie from 'vue3-lottie'

export default {
  components: {
    Vue3Lottie,
  },
}
```

You can then use the component in your template. A common use case is an image marquee for logos but you can also use it for scrolling text.

```js
// import your animation data
import AstronautJSON from './lotties/astronaut.json';
// OR
const AstronautJSON = require('./lotties/astronaut.json');

<Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
```

# Props and options

| Prop             | Type                  | Default Value | Description                                                                              |
| ---------------- | --------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| animationData    | Object (**Required**) | none          | The lottie animation data                                                                |
| autoPlay         | Boolean               | true          | Start animation on component load                                                        |
| rendererSettings | Object                | {}            | Options for if you want to use an existing canvas to draw (can be ignored on most cases) |
| loop             | Number or Boolean     | true          | The number of instances that the marquee animation should run (true is infinite)         |
| width            | Number or String      | "100%"        | Width of the lottie animation container (Numbers correspond to pixel values)             |
| height           | Number or String      | "100%"        | Height of the lottie animation container (Numbers correspond to pixel values)            |
| backgroundColor  | String                | transparent   | Background color of the container                                                        |
| pauseOnHover     | Boolean               | false         | Whether to pause the animation on hover                                                  |
| pauseOnClick     | Boolean               | false         | Whether to play the animation when you hover                                             |
| pauseAnimation   | Boolean               | false         | Prop to pass reactive variables so that you can control animation pause and play         |

[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
