import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Добавьте эту проверку перед экспортом конфига
const imagesPath = path.resolve(__dirname, 'src/assets')
console.log('Resolved images path:', imagesPath) // Логируется при запуске Vite

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.src'),
      '@components': path.resolve(__dirname, '.src/components'),
      '@image': path.resolve(__dirname, './src/assets/image'),
      '@common': path.resolve(__dirname, './src/components/common')
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp']
})