# Vue 3 Lottie

Add Lottie animations to your Vue 3 or Nuxt 3 application.

---

<p align="center">
  <a href="#">
    <img src="hi.gif" width="150" height="150" />
  </a>

  <p align="center">
    <a href="https://www.npmjs.com/package/vue3-lottie">
      <img src="https://img.shields.io/npm/v/vue3-lottie" />
    </a>
    <a href="https://www.npmjs.com/package/vue3-lottie">
      <img src="https://img.shields.io/npm/dm/vue3-lottie" />
    </a>
    <a href="https://github.com/megasanjay/vue3-lottie/stargazers">
      <img src="https://img.shields.io/github/stars/megasanjay/vue3-lottie.svg?style=flat-square" />
    </a>
    <a href="https://github.com/megasanjay/vue3-lottie/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/vue3-lottie" >
    </a>
    <a href="https://github.com/megasanjay/vue3-lottie/issues">
      <img src="https://img.shields.io/github/issues/megasanjay/vue3-lottie" />
    </a>
    <br/>
    <br/>
    <a href="https://vue3-lottie.vercel.app/"><strong>Explore the documentation »</strong></a>
  </p>
</p>

`vue3-lottie` was created to help developers add Lottie animations to their Vue 3 applications. In my search for a simple way to add Lottie animations to my Vue application I found a suprising lack of maintained solutions. `vue3-lottie` is a vue wrapper around the `lottie-web` library with a few additional features.

## Demos

View the live demos here: [https://vue3-lottie.vercel.app](https://vue3-lottie.vercel.app)

## Upgrade to v2.x

If you are using version 1.x of `vue3-lottie` you should upgrade to version 2.x. You can do this by running the [Installation and Usage](#installation-and-usage) command below. This adds TS support for the component. There are some new imports so take a look at the [new documentation](https://vue3-lottie.vercel.app).

## Installation and Usage

### Vue 3

- You can install `vue3-lottie` over `yarn` or `npm`. `lottie-web` is a dependency of `vue3-lottie` and should be automatically installed when you install `vue3-lottie`.

If you are using npm:

```shell
npm install vue3-lottie@latest --save
```

If you are using yarn:

```shell
yarn add vue3-lottie@latest
```

- Register the component in your Vue 3 application.

The most common use case is to register the component globally.

```js
// main.js
import { createApp } from 'vue'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

createApp(App).use(Vue3Lottie).mount('#app')
```

If you get an error with TS, try `use(Vue3Lottie, { name: "Vue3Lottie" })`

To define global components for [Volar type-checking](https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features#usage) you will need to add:

```ts
// components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    LottieAnimation: typeof import('vue3-lottie')['Vue3Lottie']
  }
}
export {}
```

If needed rename component to use:

```ts
app.use(Vue3Lottie, { name: 'LottieAnimation' }) // use in template <LottieAnimation />
```

- `name` string (default: 'Vue3Lottie') - set custom component name

Alternatively you can also import the component locally.

```js
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  components: {
    Vue3Lottie,
  },
}
```

You can then use the component in your template

```vue
<template>
  <Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import AstronautJSON from './astronaut.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    }
  },
}
</script>
```

### Nuxt 3

This is still experimental. Will be updated soon.

- You can install `vue3-lottie` over `yarn` or `npm`. `lottie-web` is a dependency of `vue3-lottie` and should be automatically installed when you install `vue3-lottie`.

If you are using npm:

```shell
npm install vue3-lottie@latest --save
```

If you are using yarn:

```shell
yarn add vue3-lottie@latest
```

- Create a folder called **`plugins`** at the root of your project.
- Create a file named **`Vue3Lottie.client.ts`** inside the _plugins_ directory.
- Add the following code to the **`Vue3Lottie.client.ts`** file.

```ts
import Vue3Lottie from 'vue3-lottie'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Lottie)
})
```

If you get an error with TS, try `use(Vue3Lottie, { name: "Vue3Lottie" })`

This should register as a global component that you can call anywhere in your app under the <Vue3Lottie> tag.

I would recommend using a `<client-only>` parent tag to ensure that the animation only loads in on the client side.

```vue
<client-only>
  <Vue3Lottie
    animationLink="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
    :height="200"
    :width="200"
  />
</client-only>
```

- Import the css file required by the component into your **`app.vue`** file.

```js
import 'vue3-lottie/dist/style.css'
```

## Props and options

More detailed explanations are provided in the [documentation](https://vue3-lottie.vercel.app).

| Prop             | Type              | Default Value | Description                                                                              |
| ---------------- | ----------------- | ------------- | ---------------------------------------------------------------------------------------- |
| animationData    | Object            | {}            | The lottie animation data provided as a JSON object                                      |
| animationLink    | String            | ''            | A URL link to the Lottie animation data (eg: `Lottie Animation URL` on lottiefiles.com)  |
| width            | Number or String  | "100%"        | Width of the lottie animation container (Numbers correspond to pixel values)             |
| height           | Number or String  | "100%"        | Height of the lottie animation container (Numbers correspond to pixel values)            |
| speed            | Number            | "1"           | Speed of the lottie animation                                                            |
| direction        | String            | "forward"     | Animation play direction                                                                 |
| loop             | Number or Boolean | true          | The number of instances that the lottie animation should run (true is infinite)          |
| autoPlay         | Boolean           | true          | Start animation on component load                                                        |
| delay            | Number            | 0             | Delay the animation play state by some milliseconds                                      |
| pauseAnimation   | Boolean           | false         | Prop to pass reactive variables so that you can control animation pause and play         |
| pauseOnHover     | Boolean           | false         | Whether to pause the animation on hover                                                  |
| playOnHover      | Boolean           | false         | Whether to play the animation when you hover                                             |
| backgroundColor  | String            | transparent   | Background color of the container                                                        |
| assetsPath       | String            | ""            | URL to the image asset you need to use in your Lottie animation                          |
| renderer         | String            | "svg"         | Set the renderer                                                                         |
| rendererSettings | Object            | {}            | Options for if you want to use an existing canvas to draw (can be ignored on most cases) |

## Events

A few events are emitted from the component. Look at the [Demos](#demos) for examples.

- onComplete
  - If your animation has a finite amount of loops you can use this event to know when the animation has completed.
- onLoopComplete
  - If your animation has a finite amount of loops you can use this event to know when the animation has completed a loop.
- onEnterFrame
  - This event is fired every frame of the animation. There will be 60 events fired per second if your lottie animation runs at 60fps.
- onSegmentStart
  - This event is fired when the animation enters a segment.
- onAnimationLoaded
  - This event is fired when the animation has loaded. This should let you know when you can start referencing the methods for the component.

## Methods

You can control the animation with the following methods. These methods can be called by assigning a `ref` value to the `vue3-lottie` component. Look at the [Demos](#demos) for examples.

- play
  - Plays the animation
- pause
  - Pauses the animation
- stop
  - Stops the animation. This will also reset the animation to the first frame. Look at the demo for some examples.
- destroy
  - You can call this method to destroy the animation. It will remove the animation from the DOM.
- setSpeed(speed)
  - You can call this method to change the speed of your animation.
- setDirection(direction)
  - You can call this method to change the direction of your animation.
- getDuration(inFrames)
  - You can call this method to get the duration of your animation.
- goToAndStop(frameNumber, isFrames)
  - You can call this method to go to a specific frame of your animation. The animation will be stopped at the end of this call.
- goToAndPlay(frameNumber, isFrames)
  - You can call this method to go to a specific frame of your animation. The animation will be played from this frame.
- playSegments(segments, forceFlag)
  - You can call this method to play a specific segment of your animation.
- setSubFrame(subFrame)
  - You can call this method to set the subframe value.
- updateDocumentData(documentData, index)
  - This method updates text on text layers. Refer to the [official docs](https://github.com/airbnb/lottie-web/wiki/TextLayer.updateDocumentData) for how to use this method.

## Credits

A big thank you goes to [@reslear](https://github.com/reslear) for adding Typescript support to this library. Go check out his profile and give him a follow!

- [@DamianGlowala](https://github.com/DamianGlowala) - PR [#29](https://github.com/megasanjay/vue3-lottie/pull/29) - Fix `watch` function
- [@Doyeon Eum](https://lottiefiles.com/user/283677) - For the hero [image](https://lottiefiles.com/20574-mongryong-hi) in this repo.
- [@Tafel](https://github.com/tafelnl) - PR[#296](https://github.com/megasanjay/vue3-lottie/pull/296) - Update lodash to the tree-shakeable versions
- [@TartanLeGrand](https://github.com/TartanLeGrand) - PR[#307](https://github.com/megasanjay/vue3-lottie/pull/307) - Add the `assetsPath` prop to the component

![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg) ![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
