import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  assetsDir: '/three-demo',
  base: '/three-demo',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
