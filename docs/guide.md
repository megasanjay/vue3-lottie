# Getting Started

**vue3-lottie** is a simple Vue 3 component that allows you to add Lottie animations into Vue applications. This component uses props for data and any config options.

## Introduction

`vue3-lottie` was created to help developers add Lottie animations to their Vue 3 applications. In my search for a simple way to add Lottie animations to my Vue application I found a suprising lack of maintained solutions. Adding a lottie animation to my Nuxt 3 application is the reason this component exists.

React has a great library called `react-lottie` that works very well. This component has been modeled after the `react-lottie` library with a few of my own additions.

`vue3-lottie` is a vue wrapper around the `lottie-web` library with a few additional features. Typescript support has been added to make it easier to use.

::: warning
`vue3-lottie` is not a full-featured Lottie library. It is only a wrapper around the `lottie-web` library. It does not support all of the features of the `lottie-web` library. At the moment vue3-lottie only supports the `svg` renderer which is the majority of all animations that I have seen available on the internet. You might not be able to use use `html` and `canvas` renderers with this library at the moment.
:::

## Installation

### NPM

You can install `vue3-lottie` over `yarn` or `npm`. `lottie-web` is a dependency of `vue3-lottie` and should be automatically installed when you install `vue3-lottie`.

```bash
yarn add vue3-lottie
```

```bash
npm install vue3-lottie --save
```

<!-- ### Browser CDN

You can also use `vue3-marquee` directly in the browser via CDN.

```html
<script src="https://unpkg.com/vue3-marquee@0.0.4/dist/vue3-marquee.min.js"></script>
``` -->

## Usage

The most common use case is to register the component globally.

```js
// main.js
import { createApp } from 'vue'
import Vue3Lottie from 'vue3-lottie'

createApp(App).use(Vue3Lottie).mount('#app')
```

Alternatively you can import the marquee component locally.

```vue
<template>
  <Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
const AstronautJSON = require('./astronaut.json')

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

## Available props

All the possible props for `vue3-lottie` are shown below.

### animationData 

This is the animation data that is used to render the animation. **`This prop is required`**.
You will have to import a json file that contains the animation data and pass it via this prop.

::: warning
This component does not support dynamic animations. You cannot change animation data once it has been initialized. Create multiple copies of the component if you want to change the animation that is shown.
:::

| Type   | Default value | Required | Accepted values       |
| ------ | ------------- | -------- | --------------------- |
| **Object** | **{}**            | **Yes**      | *Lottie animation data* |

### width

Width of the lottie animation container (Numbers correspond to pixel values).

| Type             | Default value | Required | Accepted values                                                          |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------ |
| Number or String | '100%'        | No      | `Any valid css unit in String` or a `number that will become a px value` |

### height

Height of the lottie animation container (Numbers correspond to pixel values).

| Type             | Default value | Required | Accepted values                                                          |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------ |
| Number or String | '100%'        | No       | `Any valid css unit in String` or a `number that will become a px value` |

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
If you are controlling the animation state by yourself please be sure to not set `playOnHover` or `pauseOnHover` to `true`.
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

### backgroundColor

A prop to change the background color of the container. This will be passed directly into the css for this component.

| Type   | Default value | Required | Accepted values                            |
| ------ | ------------- | -------- | ------------------------------------------ |
| String | `transparent` | no       | Any valid CSS color or hex based rgb value |

### rendererSettings

A prop for configuring the renderer. This is not needed for most animations. To learn more about this option see the [lottie-web documentation](https://github.com/airbnb/lottie-web#other-loading-options).

| Type   | Default value | Required | Accepted values          |
| ------ | ------------- | -------- | ------------------------ |
| Object | {}            | no       | Lottie renderer settings |


## Available events

`vue3-lottie` will also emit the following events as they are described in the [lottie-web documentation](https://github.com/airbnb/lottie-web#events)

### onComplete

If your animation has a finite amount of loops you can use this event to know when the animation has completed.

### onLoopComplete

If your animation has a finite amount of loops you can use this event to know when the animation has completed a loop.

### onEnterFrame

This event is fired every frame of the animation. There will be 60 events fired per second if your lottie animation runs at 60fps.

### onSegmentStart

This event is fired when the animation enters a segment.