import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.e2e-spec.ts'],
    setupFiles: ['./vitest.setup-e2e.ts']
  },
})
