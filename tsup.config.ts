import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    "packages/chat-kit/core.ts",
    "packages/chat-kit/server.ts"
  ],
  format: ['cjs'],
  shims: true,
  dts: false,
})