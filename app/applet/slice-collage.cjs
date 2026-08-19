import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Using the 39 identified image slots from the grid
const names = [
  // Row 1
  'talent-sourcing.jpg', 
  'discover.jpg',
  'sector-construction.jpg',
  'match-interview.jpg',
  'visa-relocation.jpg',
  // Row 2
  'deploy-relocate.jpg',
  'registered-nurse.jpg',
  'civil-engineer.jpg',
  'sector-agriculture.jpg',
  'senior-software-developer.jpg',
  // Row 3
  'finance-supervisor.jpg',
  'cultural-integration.jpg',
  'sector-corporate.jpg',
  'central-europe-hub.jpg',
  'eu-blue-card.jpg',
  // Row 4
  'uae-employment.jpg',
  'germany-opportunity.jpg',
  'uk-skilled-worker.jpg',
  'strong-economy.jpg', 
  'sector-healthcare.jpg',
  // Row 5
  'tuition-free-education.jpg',
  'work-life-balance.jpg',
  'quality-of-life.jpg', 
  'transportation.jpg',
  'berlin-cityscape.jpg',
  // Row 6
  'kairos-precision.jpg',
  'quality-healthcare.jpg',
  'truck-driver.jpg',
  'warehouse-staff.jpg',
  'hotel-chef.jpg',
  // Row 7
  'construction-worker.jpg',
  'seafood-processing.jpg',
  'rigorous-screening.jpg', 
  'cross-border-visa.jpg',
  'accommodation.jpg',
  // Row 8
  'trc.jpg',
  'airline-ticket.jpg',
  'paid-annual-leave.jpg',
  'overtime.jpg'
];

async function sliceImage(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Could not find ${inputPath}. Please upload the image first!`);
    return;
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const cols = 5;
  const rows = 8;
  const cellWidth = Math.floor(metadata.width / cols);
  const cellHeight = Math.floor(metadata.height / rows);
  
  // Padding to remove the grid borders
  const paddingX = Math.floor(cellWidth * 0.015);
  const paddingY = Math.floor(cellHeight * 0.015);
  
  const outputDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (index >= names.length) break;
      
      const left = (c * cellWidth) + paddingX;
      const top = (r * cellHeight) + paddingY;
      const width = cellWidth - (paddingX * 2);
      const height = cellHeight - (paddingY * 2);
      
      const outputName = names[index];
      const outputPath = path.join(outputDir, outputName);
      
      console.log(`Extracting ${outputName}...`);
      await sharp(inputPath)
        .extract({ left, top, width, height })
        .modulate({
          brightness: 1.05,
          saturation: 1.1
        })
        .sharpen()
        .jpeg({ quality: 90 })
        .toFile(outputPath);
        
      index++;
    }
  }
  
  // For any missing ones, copy an existing one as a fallback
  const fallbacks = {
    'medical-insurance.jpg': 'quality-healthcare.jpg',
    'meal.jpg': 'hotel-chef.jpg',
    'prepare-assess.jpg': 'match-interview.jpg'
  };
  
  for (const [missing, fallback] of Object.entries(fallbacks)) {
    if (!names.includes(missing)) {
      const src = path.join(outputDir, fallback);
      const dest = path.join(outputDir, missing);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Created fallback for ${missing}`);
      }
    }
  }

  console.log('Done slicing and enhancing images!');
}

sliceImage('public/collage.png').catch(console.error);
