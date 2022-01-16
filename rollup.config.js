import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import fs from 'fs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue'
import del from 'rollup-plugin-delete'

function getAllPackages() {
  const items = fs.readdirSync(path.resolve(__dirname, 'packages'))
  const packages = {}
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const dir = path.resolve(__dirname, 'packages', item)
    const entry = path.join(dir, 'index.ts')
    if (fs.statSync(dir).isDirectory() && fs.existsSync(entry)) {
      packages[item] = entry
    }
  }
  return packages
}

export default [
  {
    input: {
      ...getAllPackages(),
      index: path.resolve(__dirname, 'packages/index.ts')
    },
    output: [{
      dir: './es',
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: (chunkInfo) => {
        return '__chunk/' + chunkInfo.name + '.js'
      },
      assetFileNames: '[name].[ext]',
      exports: 'auto',
      minifyInternalExports: false,
      compact: false,
      manualChunks: undefined
    },{
      dir: './lib',
      format: 'cjs',
      entryFileNames: '[name].js',
      chunkFileNames: (chunkInfo) => {
        return '__chunk/' + chunkInfo.name + '.js'
      },
      assetFileNames: '[name].[ext]',
      exports: 'auto',
      minifyInternalExports: false,
      compact: false,
      manualChunks: undefined
    }],
    plugins: [
      del({
        targets: ['dist/*', 'index.css', 'es/*', 'lib/*'],
        hook: 'buildEnd'
      }),
      alias({
        entries: [
          { find: '@', replacement: 'packages' }
        ]
      }),
      typescript({
        typescript: require('ttypescript'),
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          include: [
            "packages/**/*.ts",
            "packages/**/*.d.ts",
            "packages/**/*.tsx",
            "packages/**/*.vue",
          ],
          "exclude": [
            "playground",
            "node_modules",
            "es",
            "lib"
          ]
        }
      }),
      terser(),
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
        preprocessStyles: true,
        exposeFilename: false
      }),
      scss({
        outputStyle: 'compressed',
        output: 'index.css'
      })
    ],
    external: ['vue']
  }
]
