import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/sigmoid-ctf-map-poc/',
  build: { ssr: false },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
})
