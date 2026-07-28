import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), tailwindcss(), react(), tsconfigPaths()],
  server: {
    port: 8082,
    strictPort: false,
  },
});
