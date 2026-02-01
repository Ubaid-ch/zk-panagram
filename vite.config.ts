import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
  ],
  optimizeDeps: {
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js', '@noir-lang/noir_js', '@aztec/bb.js']
  },
  resolve: {
    alias: {
      pino: "pino/browser.js",
    },
  },
  server: {
    watch: {
      usePolling: true,   // <-- force polling
     // interval: 100,      // optional: check every 100ms
    },},
});