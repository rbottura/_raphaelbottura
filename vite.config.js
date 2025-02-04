import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteVuetify from 'vite-plugin-vuetify'
import path from 'path'; // Node.js path module to resolve paths
// import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteVuetify({
      autoImport: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps '@' to the 'src' directory
    },
  },
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      // Customize the build process if needed
    },
  },
  // publicDir: 'public/'
})
