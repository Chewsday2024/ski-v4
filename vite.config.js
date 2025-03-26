import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: import.meta.env.MODE === "production" ? "/ski-v4/" : "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "color-functions",
          "global-builtin",
          "import",
          "mixed-decls"
        ],
      },
    },
  },
});
