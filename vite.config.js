import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// base is "/" for the custom domain travlys.com (served at the apex).
// Override with VITE_BASE=/Travlys/ to build for the project-pages URL.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // react-simple-maps ships UMD with CJS require('prop-types'); Vite needs
    // to pre-bundle both so the import works in dev + prod.
    include: ['react-simple-maps', 'prop-types'],
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy/cacheable third-party libs into their own chunks so
        // the browser can cache them across deploys and code-only changes
        // don't invalidate vendor JS.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-router')) return 'react-vendor'
          if (id.includes('react-dom')) return 'react-vendor'
          if (id.includes('/react/')) return 'react-vendor'
          if (id.includes('react-simple-maps') || id.includes('d3-') || id.includes('topojson-')) return 'maps'
          if (id.includes('world-atlas')) return 'maps'
        },
      },
    },
  },
})
