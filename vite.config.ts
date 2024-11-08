import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

import packageJson from './package.json'

const entries = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,tsx,scss}')
    .map((file) => [
      relative('src', file.slice(0, file.length - extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url)),
    ]),
)

const outputBase = {
  globals: {
    react: 'React',
    'react/jsx-runtime': 'jsxRuntime',
    'react-dom': 'ReactDOM',
  },
}

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'shoppe-ui-kit',
    },
    outDir: './dist',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
      input: entries,
      output: [
        {
          ...outputBase,
          esModule: true,
          exports: 'named',
          format: 'cjs',
        },
        {
          ...outputBase,
          exports: 'named',
          format: 'esm',
          interop: 'esModule',
        },
      ],
      plugins: [],
      treeshake: { moduleSideEffects: 'no-external' },
    },
    ssr: true,
  },
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    dtsPlugin({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
