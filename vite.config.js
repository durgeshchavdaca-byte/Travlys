import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// Base is set to the GitHub Pages project path. To deploy to a custom domain
// (e.g. https://www.travlys.com), set VITE_BASE=/ in the build environment
// or hardcode base: '/' here.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Travlys/',
  plugins: [react(), tailwindcss()],
})
