import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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
    VERSION: JSON.stringify(require('./package.json').version),
  },
})
