import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const faviconSvg = readFileSync(join(publicDir, 'favicon.svg'));
const ogSvg = readFileSync(join(__dirname, 'og-image-template.svg'));

const sizes = [
  { file: 'favicon-16x16.png',        w: 16,   h: 16   },
  { file: 'favicon-32x32.png',        w: 32,   h: 32   },
  { file: 'favicon-48x48.png',        w: 48,   h: 48   },
  { file: 'apple-touch-icon.png',     w: 180,  h: 180  },
  { file: 'android-chrome-192x192.png', w: 192, h: 192 },
  { file: 'android-chrome-512x512.png', w: 512, h: 512 },
];

console.log('Generating favicon PNGs...');
for (const { file, w, h } of sizes) {
  await sharp(faviconSvg)
    .resize(w, h, { fit: 'contain', background: { r: 6, g: 6, b: 10, alpha: 1 } })
    .png()
    .toFile(join(publicDir, file));
  console.log(`  ✓ ${file}`);
}

console.log('Generating og-image.png...');
await sharp(ogSvg)
  .resize(1200, 630)
  .png()
  .toFile(join(publicDir, 'og-image.png'));
console.log('  ✓ og-image.png');

console.log('Generating favicon.ico...');
const { default: pngToIco } = await import('png-to-ico');
const icoSizes = [16, 32, 48].map(s =>
  sharp(faviconSvg)
    .resize(s, s, { fit: 'contain', background: { r: 6, g: 6, b: 10, alpha: 1 } })
    .png()
    .toBuffer()
);
const icoBuffers = await Promise.all(icoSizes);
const ico = await pngToIco(icoBuffers);
writeFileSync(join(publicDir, 'favicon.ico'), ico);
console.log('  ✓ favicon.ico');

console.log('\nDone. All assets written to public/');
