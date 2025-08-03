import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import postcssFor from 'postcss-for' 
import postcssNesting from 'postcss-nested'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          socketio: ['socket.io-client'],
          react: ['react', 'react-dom']
        }
      }
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      // Just focusing on new TS code for now
      include: ['src/models/**/*.ts', 'src/react/reducer/**/*.ts'],
      reporter: ['text', 'json-summary', 'json'], // clover, html
      reportOnFailure: true,
    },
  },
  css: {
    postcss: {
      map: true,
      plugins: [
        postcssFor,
        postcssNesting
      ]
    }
  }
});
