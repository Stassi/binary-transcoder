import alias from '@rollup/plugin-alias'
import { defineConfig } from 'rollup'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'umd',
        name: 'Stassi',
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [
      alias({
        entries: [
          {
            find: 'node:buffer',
            replacement: 'buffer',
          },
        ],
      }),
      nodePolyfills(),
      typescript(),
      terser(),
    ],
  },
])
