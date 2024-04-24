import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pluginRewriteAll()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
        https: {
            key: path.resolve(__dirname, "./.cert/serenityms.pl.key"),
            cert: path.resolve(__dirname, "./.cert/serenityms.pl.certificate.pem"),
        },
    },
    preview: {
        port: 5173,
        host: true,
        strictPort: true,
        https: {
            key: path.resolve(__dirname, "./.cert/serenityms.pl.key"),
            cert: path.resolve(__dirname, "./.cert/serenityms.pl.certificate.pem"),
        },
        proxy: {
            "/api": {
                target: "https://server:3001", // see here
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
