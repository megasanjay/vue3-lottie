import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [Vue(), VueTypeImports(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-lottie',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'lottie-web'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'lottie-web': 'Lottie',
        },
      },
    },
  },
})
