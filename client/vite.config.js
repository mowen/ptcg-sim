import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oppContainers: resolve(__dirname, 'opp-containers.html'),
        selfContainers: resolve(__dirname, 'self-containers.html'),
      },
    },
  },
});
