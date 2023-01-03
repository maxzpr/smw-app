import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'


// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: parseInt(process.env.PORT, 10) || 3000,
      proxy: {
        "/socket.io": {
          target: "http://localhost:3001",
          changeOrigin: true,
          ws: true,
          // secure: true,
          cookieDomainRewrite: 'localhost',
        },
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
        },
      }
    },
    define: {
      'process.env': {},
      ...loadEnv(mode, '.')
    }
  })
}
