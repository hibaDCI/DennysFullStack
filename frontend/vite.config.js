import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    proxy: {
      "/uploads": "http://localhost:5000",
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
