import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ exportAsDefault: true })],
  resolve: {
    alias: {
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/api": path.resolve(__dirname, "./src/shared/api"),
      "@/configs": path.resolve(__dirname, "./src/shared/configs"),
      "@/hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@/routes": path.resolve(__dirname, "./src/shared/routes"),
      "@/store": path.resolve(__dirname, "./src/shared/store"),
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8787',
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
