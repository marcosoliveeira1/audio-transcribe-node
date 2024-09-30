// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 30000,
    include: ['src/**/*.test.ts'], // Garante que todos os arquivos .test.ts dentro de src/ sejam incluídos
    globals: true,
    coverage: {
      reporter: ['html'],
    }, 
    silent: false
  },
})