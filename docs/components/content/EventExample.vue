<template>
  <ClientOnly>
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      "
    >
      <Vue3Lottie
        animation-link="https://assets4.lottiefiles.com/datafiles/i0DrGl1AyhF4rvhqpBUbia6zUEekgKoxRociBzZy/stopwatch.json"
        :height="200"
        :width="200"
        @on-loop-complete="completed++"
      />
      <span style="margin-left: 20px">
        This animation has completed {{ completed }} times.
      </span>
    </div>
  </ClientOnly>
</template>

<script setup>
const completed = ref(0)
</script>
