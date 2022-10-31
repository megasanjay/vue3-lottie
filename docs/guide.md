# Getting Started

**vue3-lottie** is a simple Vue 3 component that allows you to add Lottie animations into Vue applications. This component uses props for data and any config options.

::: warning Limitations
`vue3-lottie` is not a full-featured Lottie library. It is only a wrapper around the `lottie-web` library. It does not support all of the features of the `lottie-web` library. At the moment vue3-lottie only supports the `svg` renderer which is the majority of all animations that I have seen available on the internet. You might not be able to use use `html` and `canvas` renderers with this library at the moment.
:::

[[toc]]

## Introduction

`vue3-lottie` was created to help developers add Lottie animations to their Vue 3 applications. In my search for a simple way to add Lottie animations to my Vue application I found a suprising lack of maintained solutions.

React has a great library called `react-lottie` that works very well. This component has been modeled after the `react-lottie` library with a few of my own additions.

`vue3-lottie` is a vue wrapper around the `lottie-web` library with a few additional features. Typescript support has been added to make it easier to use.

::: danger Upgrading from vue3-lottie@1.x.x
This component has been upgraded to a new build tool with native TS support thanks to [@reslear](https://github.com/reslear). This also means that there are some breaking changes that need to be made to your code.

- If you are importing the component in your main.(js|ts) file (via the `use` syntax), you don't have to modify this statement. However you will need to now import a css file as well.
- If you are using a local import, you will need to convert your `import Vue3Lottie from 'vue3-lottie'` to `import {Vue3Lottie} from 'vue3-lottie'`. You will need to now import a css file as well

  :::

::: warning For Nuxt v3
I first created this component for use in my Nuxt 3 application. However in my initial testing for SSR I found that the component could potentially increase your TBT times (if you care about that). I only see this in my CD metrics and I cannot see a delay in my actual real world initial render times. I would also include `vue3-lottie` in a `<ClientOnly>` component to prevent it from being rendered on the server.

If anyone has any solutions for this problem please let me know. I am open to any suggestions.
:::

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

:::warning
This is still experimental. Will need to be tested extensively and will be updated as I find more use cases.
:::

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

```js
import Vue3Lottie from 'vue3-lottie'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Lottie)
})
```

This should register as a global component that you can call anywhere in your app under the `<Vue3Lottie>` tag.

:::tip
I would recommend using a `<client-only>` parent tag to ensure that the animation only loads in on the client side.

```
<client-only>
  <Vue3Lottie
    animationLink="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
    :height="200"
    :width="200"
  />
</client-only>
```

:::

- Import the css file required by the component into your **`app.vue`** file.

```js
import 'vue3-lottie/dist/style.css'
```

## Available props

All the possible props for `vue3-lottie` are shown below.

### animationData

This is the animation data that is used to render the animation. **`This prop is required if the animationLink is not provided`**.
You will have to import a json file that contains the animation data and pass it via this prop.

You can go on https://lottiefiles.com/featured and find a lot of animations. When you find one you like, you can download it as a `Lottie JSON` file and import it into your app to use it as the animation data.

::: warning
This component does not support dynamic animations. You cannot change animation data once it has been initialized. Create multiple copies of the component or rerender the component if you want to change the animation that is shown.
:::

| Type       | Default value | Required                                   | Accepted values                              |
| ---------- | ------------- | ------------------------------------------ | -------------------------------------------- |
| **Object** | **{}**        | **Yes (if animationLink is not provided)** | JSON object containing Lottie animation data |

### animationLink

This is the animation data that is used to render the animation. **`This prop is required if animationData is not provided`**.
You can use the URL for the json file that contains the animation data. For example: `https://assets5.lottiefiles.com/packages/lf20_vmollwvl.json`.

If you're getting your lotties from `lottiefiles.com`, you can use the `Lottie Animation URL`.

| Type       | Default value | Required                                   | Accepted values              |
| ---------- | ------------- | ------------------------------------------ | ---------------------------- |
| **String** | **""**        | **Yes (if animationData is not provided)** | URL for a Lottie JSON object |

### width

Width of the lottie animation container (Numbers correspond to pixel values).

| Type             | Default value | Required | Accepted values                                                          |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------ |
| Number or String | '100%'        | No       | `Any valid css unit in String` or a `number that will become a px value` |

### height

Height of the lottie animation container (Numbers correspond to pixel values).

| Type             | Default value | Required | Accepted values                                                          |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------ |
| Number or String | '100%'        | No       | `Any valid css unit in String` or a `number that will become a px value` |

### speed

Speed of the lottie animation. This has to be a number greater than 0. You can use values between 0 and 1 to slow down the animation and values greater than 1 to speed it up.

| Type   | Default value | Required | Accepted values |
| ------ | ------------- | -------- | --------------- |
| Number | `1`           | no       | `Number > 0`    |

### direction

The direction of the animation. `alternate` will play the animation in reverse when it reaches the end. This is really cool for animations that are looping.

| Type   | Default value | Required | Accepted values                       |
| ------ | ------------- | -------- | ------------------------------------- |
| String | `forward`     | no       | `forward` or `reverse` or `alternate` |

### loop

A prop for detailing if you want the animation to loop. A number value would be how many times the animation should loop.

| Type              | Default value | Required | Accepted values                   |
| ----------------- | ------------- | -------- | --------------------------------- |
| Number or Boolean | `true`        | no       | `Number > 0` or `true` or `false` |

### autoPlay

A prop for detailing if you want the animation to play automatically.

| Type    | Default value | Required | Accepted values   |
| ------- | ------------- | -------- | ----------------- |
| Boolean | `true`        | no       | `true` or `false` |

### pauseAnimation

A prop to control the play and pause states of the animation.

:::danger
If you are controlling the animation state by yourself please be sure to **not** set `playOnHover` or `pauseOnHover` to `true`.
:::

| Type    | Default value | Required | Accepted values   |
| ------- | ------------- | -------- | ----------------- |
| Boolean | `false`       | no       | `true` or `false` |

### pauseOnHover

A prop to pause the animation on hover.

| Type    | Default value | Required | Accepted values   |
| ------- | ------------- | -------- | ----------------- |
| Boolean | `false`       | no       | `true` or `false` |

### playOnHover

A prop to play the animation on hover.

::: tip
This will also automatically pause the animation when it is initalized.
:::

| Type    | Default value | Required | Accepted values   |
| ------- | ------------- | -------- | ----------------- |
| Boolean | `false`       | no       | `true` or `false` |

### delay

A prop to delay the animation. This is useful if you want to show the animation for a certain amount of time before it starts. This is a number value that is in milliseconds.

| Type   | Default value | Required | Accepted values |
| ------ | ------------- | -------- | --------------- |
| Number | `0`           | no       | `Number > 0`    |

### backgroundColor

A prop to change the background color of the container. This will be passed directly into the css for this component.

| Type   | Default value | Required | Accepted values                            |
| ------ | ------------- | -------- | ------------------------------------------ |
| String | `transparent` | no       | Any valid CSS color or hex based rgb value |

### renderer

A prop to change the renderer of the animation.

| Type   | Default value | Required | Accepted values             |
| ------ | ------------- | -------- | --------------------------- |
| String | `svg`         | no       | `svg` or `canvas` or `html` |

### rendererSettings

A prop for configuring the renderer. This is not needed for most animations. To learn more about this option see the [lottie-web documentation](https://github.com/airbnb/lottie-web#other-loading-options).

| Type   | Default value | Required | Accepted values          |
| ------ | ------------- | -------- | ------------------------ |
| Object | {}            | no       | Lottie renderer settings |

## Available events

`vue3-lottie` will also emit the following events as they are described in the [lottie-web documentation](https://github.com/airbnb/lottie-web#events). Look at the examples provided in the [examples section](/examples#listening-to-events) for how to use these methods.

### onComplete

If your animation has a **`finite`** amount of loops you can use this event to know when the animation has completed.

### onLoopComplete

If your animation has a **`finite`** amount of loops you can use this event to know when the animation has completed a loop.

### onEnterFrame

This event is fired at every frame of the animation. There will be 60 events fired per second if your lottie animation runs at 60fps.

### onSegmentStart

This event is fired when the animation enters a segment.

### onAnimationLoaded

This event is fired when the animation has loaded. This should let you know when you can start referencing the methods for the component. Don't use the `mounted` or `onMounted` lifecycle hooks because they will be called before the animation has loaded in the browser.

## Available methods

`vue3-lottie` has a few methods that you can call directly from your component if needed. Add a `ref` to the `vue3-lottie` component and then call the methods you want. Look at the examples provided in the [examples section](/examples#custom-controls) for how to use these methods. The following example calls assume you have a `vue3-lottie` component with a `ref` called `lottieContainer`.

### play

You can call this method to play the animation. It will resume the animation if it is paused and will start the animation if it is stopped. This method takes no arguments.

```js
this.$refs.lottieContainer.play()
```

### pause

You can call this method to pause the animation. It will only pause the animation if it is playing. This method takes no arguments.

```js
this.$refs.lottieContainer.pause()
```

### stop

You can call this method to stop the animation. It will reset the animation to the first frame. This method takes no arguments.

```js
this.$refs.lottieContainer.stop()
```

### destroy

You can call this method to destroy the animation. It will remove the animation from the DOM. This method takes no arguments.

```js
this.$refs.lottieContainer.destroy()
```

### setSpeed

You can call this method to change the speed of your animation. This method takes a single argument which is the speed of the animation. The speed has to be a `number > 0`. You can also set this as a [prop](#speed) during initialization.

- `speed`: Any number **greater** than 0.

```js
this.$refs.lottieContainer.setSpeed(2)
```

### setDirection

You can call this method to change the direction of your animation. This method takes a single argument which is the direction of the animation. If you want the animation to alternate use the [direction prop](#direction).

- `direction`: Either `'forward'` or `'reverse'`

```js
this.$refs.lottieContainer.setDirection('forward')
```

### getDuration

You can call this method to get the duration of your animation. This method takes one argument.

- `inFrames`: If `true`, returns duration in frames, if `false`, in seconds. This is set to `true` by default.

```js
this.$refs.lottieContainer.getDuration(true)
```

### goToAndStop

You can call this method to go to a specific frame of your animation. The animation will be stopped at the end of this call. This method takes two arguments.

- `frame`: numeric value
- `isFrame`: defines if first argument is a time based value or a frame based. This value is set to `true` by default.

```js
this.$refs.lottieContainer.goToAndStop(10, true)
```

If you set the second argument to `false` you will be moving in seconds. (10 seconds in this example).

### goToAndPlay

You can call this method to go to a specific frame of your animation. The animation will be played from this frame. This method takes two arguments.

- `frame`: numeric value
- `isFrame`: defines if first argument is a time based value or a frame based. This value is set to `true` by default.

```js
this.$refs.lottieContainer.goToAndPlay(5, true)
```

If you set the second argument to `false` you will be moving in seconds. (5 seconds in this example).

### playSegments

You can call this method to play a specific segment of your animation. This method takes two arguments.

- `segments`: array. Can contain 2 numeric values that will be used as first and last frame of the animation. Or can contain a sequence of arrays each with 2 numeric values.
- `forceFlag`: boolean. If set to false, it will wait until the current segment is complete. If true, it will update values immediately. This value is set to `false` by default.

```js
this.$refs.lottieContainer.playSegments([10, 20], true)
```

### setSubFrame

You can call this method to set the subframe value. This method takes a single argument.

- `useSubFrame`: If `false`, it will respect the original After Effects fps. If `true`, it will update on every requestAnimationFrame with intermediate values. Default is `true`.

```js
this.$refs.lottieContainer.setSubFrame(true)
```

### updateDocumentData

This method updates text on text layers. Refer to the [official docs](https://github.com/airbnb/lottie-web/wiki/TextLayer.updateDocumentData) for how to use this method.

- `documentData`: An object with the document data (see below supported properties and meaning)
- `index`: index of the text keyframe. If the text source is not keyframed, you can skip this argument. If not skipped and the source text is keyframed, it will update the current source. This value is `0` by default.

All supported properties:

- `t`: text value
- `s`: font size
- `fc`: fill color - array with RGB values ranging from 0 to 1
- `lh`: font line height
- `sc`: stroke color - array with RGB values ranging from 0 to 1
- `j`: justify

```js
this.$refs.lottieContainer.updateDocumentData({ t: 'new text', s: 20 }, 0)
```
