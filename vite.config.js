import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Deal Grabber",
        short_name: "DealGrabber",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#044f70",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/screenshot1.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile View",
          },
          {
            src: "/screenshots/screenshot2.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
            label: "Desktop View",
          },
        ],
      },
    }),
  ],
});
