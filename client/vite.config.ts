import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  define: {
    global: {},
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@atom": path.resolve(__dirname, "./src/atom"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@components/ask-ai/*": path.resolve(
        __dirname,
        "src/components/ask-ai/*"
      ),
      "@mock": path.resolve(__dirname, "./src/mock"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
});
