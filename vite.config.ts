/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

dotenv.config();

export default defineConfig({
  root: 'src',
  define : {
    __VALUE__ : `"${process.env.VALUE}"`
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true
      },
    },
  },
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
    tsconfigPaths(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  cacheDir: '../node_modules/.vite',
  test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
  },
});
