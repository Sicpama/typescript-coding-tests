import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/typescript-coding-tests/", // Replace with your GitHub repository name
  build: {
    outDir: "dist",
  },
});
