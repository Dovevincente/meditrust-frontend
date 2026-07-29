import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.meditrustnigeria.com",
      dynamicRoutes: [
        "/doctors",
        "/departments",
        "/appointment",
        "/contact",
      ],
    }),
  ],
});