<template>
  <Vue3Lottie :animationData="data" :width="300" :height="300" @click="dataClick"/>

  <Vue3Lottie
    ref="lot"
    :animationLink="link[0]"
    :height="300"
    :width="300"
    @click="linkClick"
    :pauseOnHover="true"
    :scale="1.1"
  />

  <Vue3Lottie
    :animationLink="link[1]"
    :animationData="data"
    @click="linkClick"
    assetsPath="https://source.unsplash.com/user/wsanter"
    :height="200"
    :width="200"
  />

  <div
		class="lottie"
		@mousewheel="handleMouseWheel($event)"
		@click="lottieContainer.playSegments([10, 20])">
		<h1 class="lottie__title">Test lottie</h1>

		<Vue3Lottie
			ref="lottieContainer"
			class="lottie__wrapper"
			:animation-data="DogJSON"
			:auto-play="false" :height="300"
    :width="300"
			:loop="false"
			@on-animation-loaded="onLottieLoaded()"/>
	</div>

  <HelloWorld msg="Hello Lottie! Using Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import DogJSON from './assets/dog.json'
import Lottie from './assets/lottie.json'
import { ref } from 'vue';
const lot = ref()

const link = ref(['https://assets1.lottiefiles.com/packages/lf20_soCRuE.json','https://assets1.lottiefiles.com/packages/lf20_xvz0dpbn.json'])
const data = ref<any>(DogJSON)
function linkClick(){
  link.value = link.value.reverse()
}
function dataClick(){
  data.value =  Lottie
}

import {  reactive } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import { debounce } from 'lodash-es';


const lottieContainer = ref();
const state = reactive({
	frame: 100,
	totalFrames: 0,
});

function onLottieLoaded () {
	state.totalFrames = lottieContainer.value.getDuration(true);
	console.log(`🚀 ~ totalFrames:`, state.totalFrames);
}

const handleMouseWheel = debounce((ev: WheelEvent) => {
	console.log(ev);
	console.log(`🚀 ~ handleMouseWheel ~ lottieContainer:`, lottieContainer.value);
	let targetFrame = state.frame;

	ev.deltaY > 0
		? targetFrame += 10
		: targetFrame -= 10;

	if (targetFrame < 0) targetFrame = 0;
	if (targetFrame > state.totalFrames) targetFrame = state.totalFrames;

	console.log(`🚀 ~ playSegments:`, [state.frame, targetFrame]);

	lottieContainer.value?.playSegments([state.frame, targetFrame]);
	state.frame = targetFrame;

}, 100);

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
