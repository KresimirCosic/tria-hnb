import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';

  return {
    plugins: [react()],
    server: {
      proxy: isProduction
        ? undefined
        : {
            '/api': {
              target: 'https://api.hnb.hr',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
    },
    base: isProduction ? '/tria-hnb/' : '/',
  };
});
