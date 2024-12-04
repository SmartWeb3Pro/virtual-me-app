// vite.config.js
export default {
  server: {
    host: '0.0.0.0', // Ensure it binds to all network interfaces
    port: 5173,
  },
};












// import { defineConfig } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/translate': {
//         target: 'https://libretranslate.de',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/translate/, ''),
//       },
//     },
//   },
// });













// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
