import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Use defaults for build environments (e.g. Vercel/Netlify) where PORT isn't set
  const port = Number(env.PORT ?? 5173);
  const basePath = env.BASE_PATH ?? "/";

  return {
    base: basePath,
    plugins: [react(), tailwindcss(), runtimeErrorOverlay()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@workspace/api-client-react": path.resolve(
          __dirname,
          "./src/lib/api-client-react/index.ts"
        ),
      },
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
        "/uploads": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
