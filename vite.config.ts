/// <reference types="vitest" />

import crypto from 'crypto';
import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import removeConsole from 'vite-plugin-remove-console';

const randomUUIDFilename = crypto.randomUUID().slice(0, 10);

export default defineConfig((env) => ({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    checker({
      typescript: true,
      enableBuild: true,
    }),
    react(),
    eslint({
      fix: true,
      emitWarning: true,
      emitError: true,
      failOnError: true,
      failOnWarning: false,
      exclude: ['node_modules/**', 'dist/**', '.husky', 'build/**', 'public/**'],
      useEslintrc: true,
      cache: true,
      ignorePath: './.eslintignore',
    }),
    removeConsole(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]-${randomUUIDFilename}.js`,
        chunkFileNames: `[name]-${randomUUIDFilename}.js`,
        assetFileNames: `[name]-${randomUUIDFilename}.[ext]`,
      },
    },
  },

  server: {
    open: env.mode === 'development',
    // hmr: {
    //   overlay: false,
    // },
    // https: true,
    watch: {
      usePolling: true,
    },
  },

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
}));
