import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
    {
      name: 'dev-rewrites',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/blog/anusvara' || req.url === '/blog/anusvara/') req.url = '/blog/anusvara.html';
          else if (req.url === '/blog/vyakarana' || req.url === '/blog/vyakarana/') req.url = '/blog/vyakarana.html';
          else if (req.url === '/blog' || req.url === '/blog/') req.url = '/blog/index.html';
          next();
        });
      },
    },
  ],
  build: {
    minify: 'oxc',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson: resolve(__dirname, 'lesson.html'),
        path: resolve(__dirname, 'path.html'),
        progress: resolve(__dirname, 'progress.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        'blog-anusvara': resolve(__dirname, 'blog/anusvara.html'),
        'blog-vyakarana': resolve(__dirname, 'blog/vyakarana.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  }
});
