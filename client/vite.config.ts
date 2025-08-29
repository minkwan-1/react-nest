import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },

  define: {
    global: {},
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@atom": path.resolve(__dirname, "./src/atom"),
      "@domains": path.resolve(__dirname, "./src/domains"),
      "@domains/ask-ai/*": path.resolve(__dirname, "src/domains/ask-ai/*"),
      "@mock": path.resolve(__dirname, "./src/mock"),
      "@api": path.resolve(__dirname, "./src/api"),

      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
});
