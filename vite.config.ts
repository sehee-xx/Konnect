import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/oauth2": "http://20.200.137.41:8080",
      "/login": "http://20.200.137.41:8080",
      "/signup": "http://20.200.137.41:8080",
      "/api": {
        target: "http://20.200.137.41:8080",
        changeOrigin: true,
        // 필요한 경우 rewrite 로직을 넣어주세요
        // rewrite: path => path.replace(/^\/api/, "/api")
      },
    },
  },
});
