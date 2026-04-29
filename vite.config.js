import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// base is "/" for the custom domain travlys.com (served at the apex).
// Override with VITE_BASE=/Travlys/ to build for the project-pages URL.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
