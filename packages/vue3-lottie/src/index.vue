<template>
  <div
    ref="LottieAnimationContainer"
    class="lottie-animation-container"
    :style="getCurrentStyle"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import lottie from "lottie-web";

export default defineComponent({
  name: "Vue3Lottie",

  props: {
    animationData: { type: Object, required: true },
    loop: { type: [Boolean, Number], default: true },
    autoPlay: { type: Boolean, default: true },
    rendererSettings: { type: Object, required: false },
    speed: { type: Number, default: 1 },
    width: { type: [Number, String], default: "100%" },
    height: { type: [Number, String], default: "100%" },
  },

  setup(props) {
    const LottieAnimationContainer = ref<HTMLElement | null>(null);
    let lottieAnimation = ref<any>(null);

    const checkIfContainerExists = async () => {
      if (LottieAnimationContainer.value !== null) {
        return true;
      } else {
        return false;
      }
    };

    const loadLottie = async () => {
      if (LottieAnimationContainer.value) {
        lottieAnimation = lottie.loadAnimation({
          container: LottieAnimationContainer.value,
          renderer: "svg",
          loop: props.loop,
          autoplay: props.autoPlay,
          animationData: props.animationData,
        });
      }
    };

    const getCurrentStyle: any = computed(() => {
      let width = props.width;
      let height = props.height;

      if (typeof props.width === "number") {
        width = `${props.width}px`;
      }
      if (typeof props.height === "number") {
        height = `${props.height}px`;
      }

      let cssVariables = {
        "--lottie-animation-container-width": `${width}`,
        "--lottie-animation-container-height": `${height}`,
      };

      return cssVariables;
    });

    const setupLottie = async () => {
      const interval = setInterval(async () => {
        if (await checkIfContainerExists()) {
          clearInterval(interval);
          loadLottie();
        }
      }, 100);
    };

    onMounted(async () => {
      setupLottie();
    });

    return { LottieAnimationContainer, lottieAnimation, getCurrentStyle };
  },
});
</script>

<style lang="css" scoped>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
}
</style>
