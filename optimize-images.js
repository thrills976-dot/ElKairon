import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/images';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
    const filePath = path.join(dir, file);
    const parsed = path.parse(filePath);
    const outPath = path.join(dir, `${parsed.name}.webp`);
    
    // Only optimize if the webp doesn't already exist
    if (!fs.existsSync(outPath)) {
      console.log(`Optimizing ${file}...`);
      try {
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log(`Created ${parsed.name}.webp`);
      } catch (err) {
        console.error(`Failed to optimize ${file}: ${err.message}`);
      }
    }
  }
}
console.log('All images optimized!');
