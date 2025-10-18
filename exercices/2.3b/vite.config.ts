import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // vérifie les erreurs TypeScript et les affiche dans le navigateur + terminal
      typescript: true,
    }),
  ],
})
