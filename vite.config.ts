import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'

export default defineConfig({
  plugins: [vue(), VueTypeImports()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-lottie',
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
  define: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    VERSION: JSON.stringify(require('./package.json').version),
  },
})
