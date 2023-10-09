import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    include: ['**/*test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
  },
});
