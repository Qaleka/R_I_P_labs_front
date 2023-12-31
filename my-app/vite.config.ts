import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:80',
    }
  },

  base: "/R_I_P_labs_front/",
  plugins: [react()]
})
