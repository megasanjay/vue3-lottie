import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

const root = import.meta.dirname
const dist = resolve(root, 'dist')
const isWatch = process.argv.includes('--watch') || process.argv.includes('-w')

// entry name (src/<name>.ts) -> output file base name
//   index: full lottie-web player (`vue3-lottie`)
//   light: lottie_light player, no `eval` (`vue3-lottie/light`)
const entries: Record<string, string> = {
  index: 'vue3-lottie',
  light: 'vue3-lottie-light',
}

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin({
      // inject into the shared component chunk so both entries get the styles
      jsAssetsFilterFunction: (chunk) =>
        chunk.moduleIds.some((id) => id.endsWith('/src/create-vue3-lottie.ts')),
    }),
    dts({
      // ESM declarations need explicit extensions on relative imports
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: content.replace(
          /(from\s+['"])(\.{1,2}\/[^'"]+?)(?<!\.js)(['"])/g,
          '$1$2.js$3',
        ),
      }),
      // CJS consumers need .d.cts files since the package is "type": "module"
      afterBuild: () => {
        const files = readdirSync(dist, { recursive: true }) as string[]
        for (const file of files) {
          if (!file.endsWith('.d.ts')) continue
          const content = readFileSync(resolve(dist, file), 'utf-8').replace(
            /(from\s+['"]\.{1,2}\/[^'"]+?)\.js(['"])/g,
            '$1.cjs$2',
          )
          writeFileSync(
            resolve(dist, file.replace(/\.d\.ts$/, '.d.cts')),
            content,
          )
        }
      },
    }),
  ],
  build: {
    lib: {
      entry: Object.fromEntries(
        Object.keys(entries).map((name) => [
          name,
          resolve(root, `src/${name}.ts`),
        ]),
      ),
      formats: ['es', 'cjs'],
      // .cjs extension is required for CommonJS output in a "type": "module" package
      fileName: (format, entryName) =>
        `${entries[entryName]}${format === 'es' ? '.es.js' : '.cjs'}`,
    },
    outDir: 'dist',
    // `vite build --watch` (pnpm dev): the dts plugin registers the files it
    // writes as watch targets, so without this the es and cjs builds keep
    // retriggering each other. Only set when watching: a non-null
    // `build.watch` would turn every `vite build` into watch mode.
    watch: isWatch ? { exclude: ['dist/**'] } : null,
    rollupOptions: {
      // also covers deep imports like lottie-web/build/player/lottie_light
      external: ['vue', /^lottie-web(\/|$)/],
      output: {
        exports: 'named',
      },
    },
  },
})
