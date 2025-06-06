import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: '/restaurant-app/',
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
})