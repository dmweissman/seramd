import { copyFile } from "node:fs/promises";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// The admin dashboard is plain HTML/CSS/JS outside the Vite graph; copy it
// into dist so static hosts (Vercel) can serve /admin alongside the SPA.
function copyAdminDashboard(): Plugin {
  return {
    name: "copy-admin-dashboard",
    async closeBundle() {
      for (const file of ["admin.html", "admin.css", "admin.js"]) {
        await copyFile(
          path.resolve(__dirname, file),
          path.resolve(__dirname, "dist", file),
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyAdminDashboard()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
