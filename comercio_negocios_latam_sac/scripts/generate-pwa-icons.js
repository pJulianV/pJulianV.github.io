import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputPath = path.join(__dirname, '../img/Icon.jpeg');
const outputDir = path.join(__dirname, '../img/icons');

async function generateIcons() {
  try {
    console.log('Generating PWA icons...');

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 33, b: 86, alpha: 1 }, // #002156
        })
        .png()
        .toFile(outputPath);

      console.log(`Generated ${size}x${size} icon`);
    }

    console.log('All PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
