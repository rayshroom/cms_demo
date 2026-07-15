import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@cms-demo/cms-contract": fileURLToPath(
        new URL("../../packages/cms-contract/src/index.ts", import.meta.url)
      )
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5187,
    strictPort: true
  },
  preview: {
    host: "127.0.0.1",
    port: 5187,
    strictPort: true
  }
});
