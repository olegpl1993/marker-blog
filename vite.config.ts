import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: "[name][hash].js",
        chunkFileNames: "[name][hash].js",
        assetFileNames: "[name][hash].[ext]",
      },
    },
  },
});
