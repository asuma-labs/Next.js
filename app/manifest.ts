import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "id.my.asuma",
    name: "Asuma",
    short_name: "Asuma",
    description:
      "Asuma adalah bot WhatsApp multifungsi — AI assistant, manajemen grup, downloader media, RPG & games, dan lebih dari 100 perintah siap pakai.",
    lang: "id",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: [
      "browser",
      "fullscreen",
      "minimal-ui",
      "standalone",
      "window-controls-overlay",
    ],
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "https://asuma.my.id/icons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        src: "https://asuma.my.id/icons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        src: "https://asuma.my.id/icons/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        src: "https://asuma.my.id/icons/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
      {
        src: "https://asuma.my.id/icons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "https://asuma.my.id/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "https://asuma.my.id/icons/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    protocol_handlers: [
      {
        protocol: "web+asuma",
        url: "/?action=%s",
      },
    ],
    categories: [
      "productivity",
      "utilities",
      "entertainment",
      "social",
      "developer tools",
    ],
    share_target: {
      method: "GET",
      action: "/share",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
  };
}
