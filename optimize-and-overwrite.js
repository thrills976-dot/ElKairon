import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'src/assets/images';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const filePath = path.join(dir, file);
    console.log(`Optimizing ${file}...`);
    try {
      const buffer = fs.readFileSync(filePath);
      
      // Compress and overwrite
      const optimizedBuffer = await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true }) // resize to max 800px width
        .jpeg({ quality: 60, progressive: true }) // compress
        .toBuffer();
        
      fs.writeFileSync(filePath, optimizedBuffer);
      console.log(`Optimized and overwrote ${file}`);
    } catch (err) {
      console.error(`Failed to optimize ${file}: ${err.message}`);
    }
  }
}
console.log('All original images optimized and overwritten!');
