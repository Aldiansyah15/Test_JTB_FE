import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: {
        exclude: [/AuthContext/], // ⛔ lewati file ini dari Fast Refresh
      },
    }),
  ],
  server: {
    port: 5500, // ganti dengan port yang kamu mau
    open: true, // otomatis buka browser
  },
});
