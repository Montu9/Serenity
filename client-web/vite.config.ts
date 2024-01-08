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
});
