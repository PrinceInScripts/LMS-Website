// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify', // or another implementation
    },
  },
};