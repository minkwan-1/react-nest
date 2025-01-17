import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    fs: {
      // fs 모듈 사용 허용
      allow: ['..'],
    },
  },
});
