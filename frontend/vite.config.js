import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/alfresco": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
