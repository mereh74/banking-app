import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://api.sandbox.treasuryprime.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const auth = Buffer.from(
                `${env.VITE_TREASURY_PRIME_USERNAME}:${env.VITE_TREASURY_PRIME_PASSWORD}`
              ).toString("base64");
              proxyReq.setHeader("Authorization", `Basic ${auth}`);
              console.log("Added auth header to proxy request");
            });
          },
        },
      },
    },
  };
});
