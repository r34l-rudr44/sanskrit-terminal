import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    {
      name: 'dev-rewrites',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/blog/anusvara' || req.url === '/blog/anusvara/') req.url = '/blog-anusvara.html';
          else if (req.url === '/blog' || req.url === '/blog/') req.url = '/blog.html';
          next();
        });
      },
    },
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
  ],
  build: {
    minify: 'oxc',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson: resolve(__dirname, 'lesson.html'),
        blog: resolve(__dirname, 'blog.html'),
        'blog-anusvara': resolve(__dirname, 'blog-anusvara.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  }
});
