import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    Vue(),
    VueTypeImports(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      skipDiagnostics: false,
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3lottie',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
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
