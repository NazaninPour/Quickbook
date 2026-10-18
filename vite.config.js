import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // The live site is served from nazaninpour.github.io/Quickbook/; local dev stays at localhost:5173/.
  base: command === 'build' ? '/Quickbook/' : '/',
  server: { port: 5173, open: true },
}))
