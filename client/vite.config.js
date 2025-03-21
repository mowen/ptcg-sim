import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'], // clover, html
      reportOnFailure: true,
    },
  },
});
