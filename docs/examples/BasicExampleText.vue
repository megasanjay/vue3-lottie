<template>
  <div>
    <Vue3Lottie :animation-data="AstronautJSON" :width="200" :height="200" />
    <Vue3Marquee>
      <span
        v-for="(word, index) in helloArray"
        :key="index"
        class="word-style"
        :class="{ word: true, odd: index % 2 === 0, even: index % 2 === 1 }"
      >
        {{ word }}
      </span>
    </Vue3Marquee>
  </div>
</template>

<script>
import Vue3Marquee from 'vue3-marquee'
import Vue3Lottie from 'vue3-lottie'

import AstronautJSON from './Astronaut.json'

export default {
  name: 'BasicExampleText',
  components: {
    Vue3Marquee,
    Vue3Lottie,
  },
  data() {
    return {
      helloArray: [
        'hello',
        'こんにちは',
        'bonjour',
        '안녕하세요 ',
        'Hai',
        'ສະບາຍດີ ',
        'hallo',
        'नमस्ते',
        'aloha',
        'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
        'bongu',
        'здравствуйте',
        'salama',
        '侬好',
        'salve',
        'ආයුබෝවන්',
        'xin chào',
        'வணக்கம் ',
        '¡Hola!',
        'నమస్కారం',
        'hej',
        'สวัสดี ครับ/ค่ะ',
        'kamusta',
        'السلام علیکم ',
      ],
      AstronautJSON,
    }
  },
}
</script>

<style scoped>
.word {
  font-size: 30px;
  margin: 0 10px;
}
.odd {
  color: rgb(68, 77, 84);
}
.even {
  color: rgb(137, 147, 156);
}
</style>
