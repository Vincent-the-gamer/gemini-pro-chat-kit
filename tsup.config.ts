import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    "packages/main/core.ts",
    "packages/main/server.ts"
  ],
  format: ['cjs'],
  shims: true,
  dts: false,
})