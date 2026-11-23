import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.VITE_BASE_PATH || '/web-sholu/' : '/',
}));
