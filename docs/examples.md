# Examples

Some examples of how to use the library are shown below.

:::warning
If you don't see the example in any of the sections below [click here](https://vue3-lottie.vercel.app/) and click the `examples` in the navbar. There is occasionally a bug with Vitepress where all the components are loaded at the end of the page.
:::

[[toc]]

## Basic example

<script setup>
import BasicExample from './examples/BasicExample.vue'
import BasicExampleWidthHeight from './examples/BasicExampleWidthHeight.vue'
import BasicExampleAlternate from './examples/BasicExampleAlternate.vue'
import LoopExample from './examples/LoopExample.vue'
import PauseOnHoverExample from './examples/PauseOnHoverExample.vue'
import PlayOnHoverExample from './examples/PlayOnHoverExample.vue'
import ReactiveExample from './examples/ReactiveExample.vue'
import EventExample from './examples/EventExample.vue'
import CustomControlsExample from './examples/CustomControlsExample.vue'
</script>

<BasicExample />

```vue
<template>
  <Vue3Lottie :animationData="DogJSON" :height="200" :width="200" />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import DogJSON from './lotties/dog.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      DogJSON,
    }
  },
}
</script>
```

## Basic example with a custom width and height

You can also pass in any valid css unit here. If you pass in a number, It will be inferenced as a `pixel` value. Some valid examples include `50%`, `10em`, etc.

<BasicExampleWidthHeight />

```vue
<template>
  <Vue3Lottie :animationData="VinylJSON" :height="300" :width="300" />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import VinylJSON from './lotties/vinyl.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      VinylJSON,
    }
  },
}
</script>
```

## Loop example

<LoopExample />

::: info
If the loop has already been completed, refreshing the page will restart the animation.
:::

```vue
<template>
  <Vue3Lottie
    :animationData="AstronautJSON"
    :height="200"
    :width="200"
    :loop="3"
  />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import AstronautJSON from './lotties/astronaut.json'

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

## Direction alternate

You can set the `direction` to `alternate` to reverse the animation at the end of a loop.

<BasicExampleAlternate/>

```vue
<template>
  <Vue3Lottie
    :animationData="StarJSON"
    :height="300"
    :width="300"
    direction="alternate"
  />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import StarJSON from './lotties/star.json'

export default {
  name: 'BasicExampleAlternate',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      StarJSON,
    }
  },
}
</script>
```

## Pause on Hover

If you set `pauseOnHover` to true, the animation will pause when you hover over the animation.

<PauseOnHoverExample />

```vue
<template>
  <Vue3Lottie
    :animationData="RocketJSON"
    :height="200"
    :width="200"
    :pauseOnHover="true"
  />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import RocketJSON from './lotties/rocket.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      RocketJSON,
    }
  },
}
</script>
```

## Play on Hover

The lottie animation will play when you hover over the animation. Moving the mouse away will pause the animation at its current frame. Hovering over the container will play the animation from where it left off.

<PlayOnHoverExample/>

```vue
<template>
  <Vue3Lottie
    :animationData="WifiJSON"
    :height="200"
    :width="200"
    :playOnHover="true"
  />
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import WifiJSON from './lotties/wifi.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      WifiJSON,
    }
  },
}
</script>
```

## Using reactive props to control the animation

You can also use the `pauseAnimation` prop to control the play and pause state of the lottie animation.

<ReactiveExample/>

```vue
<template>
  <div>
    <Vue3Lottie
      :animationData="CarJSON"
      :height="200"
      :width="200"
      :pauseAnimation="playState"
    />
    <button @click="playState = !playState">Play/Pause Animation</button>
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import CarJSON from './lotties/car.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      playState: false,
      CarJSON,
    }
  },
}
</script>
```

## Listening to events

`vue3-lottie` has support for events to be emitted from the animation.

<EventExample/>

```vue
<template>
  <div>
    <Vue3Lottie
      :animationData="ClockJSON"
      :height="200"
      :width="200"
      @onLoopComplete="completed++"
    />
    <span> This animation has completed {{ completed }} times. </span>
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import ClockJSON from './lotties/clock.json'

export default {
  name: 'EventExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      ClockJSON,
      completed: 0,
    }
  },
}
</script>
```

## Custom controls

`vue3-lottie` has a few methods that you can call directly from your component if needed. Add a `ref` to the `vue3-lottie` component and then call the methods you want.

<CustomControlsExample/>

::: info
`stop` will stop the animation and reset it to the first frame.
:::

```vue
<template>
  <div>
    <div>
      <Vue3Lottie
        ref="customControl"
        :animationData="CountdownJSON"
        :height="200"
        :width="200"
      />
      <div>
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>
        <button @click="stop">Stop</button>
        <button @click="toggleDirection">Reverse</button>
      </div>
    </div>
    This animation has {{ count }} frames.
  </div>
</template>

<script>
import Vue3Lottie from 'vue3-lottie'
import CountdownJSON from './lotties/countdown.json'

export default {
  name: 'CustomControlsExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      CountdownJSON,
      count: 0,
      direction: 'forward',
    }
  },
  methods: {
    play() {
      this.$refs['customControl'].play()
    },
    pause() {
      this.$refs['customControl'].pause()
    },
    stop() {
      this.$refs['customControl'].stop()
    },
    toggleDirection() {
      if (this.direction === 'forward') {
        this.pause()
        this.$refs['customControl'].setDirection('reverse')
        this.play()
        this.direction = 'reverse'
      } else {
        this.pause()
        this.$refs['customControl'].setDirection('forward')
        this.play()
        this.direction = 'forward'
      }
    },
  },
  mounted() {
    this.$refs['customControl'].setSubframe()
  },
}
</script>
```

::: info Disclaimer
All the lotties in this page are from [lottiefiles.com](https://lottiefiles.com/).
:::
