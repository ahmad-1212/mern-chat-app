import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    // vite config
    plugins: [react()],
    server: {
      port: 8000,
    },
  };
});
