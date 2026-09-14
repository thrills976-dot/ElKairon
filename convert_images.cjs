const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');

async function convertImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.jpe?g$/, '.webp'));
      try {
        await sharp(inputPath)
          .webp({ quality: 75 })
          .toFile(outputPath);
        console.log(`Converted ${file} to WebP`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertImages();
