import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from nazaninpour.github.io/Quickbook/, so only GitHub's build
  // (GITHUB_ACTIONS is set there) uses that path. Vercel and local dev serve from the root.
  base: process.env.GITHUB_ACTIONS ? '/Quickbook/' : '/',
  server: { port: 5173, open: true },
})
