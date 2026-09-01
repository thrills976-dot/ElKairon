const fs = require('fs');
let mapCode = fs.readFileSync('src/data/imageMap.ts', 'utf-8');

// Remove all import statements for images
mapCode = mapCode.replace(/import img_[a-zA-Z0-9_]+ from '\.\.\/\.\.\/public\/images\/[^']+\.jpg';\n/g, '');

// Replace variables with strings
const regex = /(img_[a-zA-Z0-9_]+)/g;
let newMapCode = mapCode.replace(regex, (match) => {
    let filename = match.replace('img_', '');
    // Need to handle the unsplash ones that don't have the long numbers if they don't match exactly, 
    // but the regex will just reconstruct the string based on the variable name.
    // Wait, the original variables were 'img_' + filename.replace(/[^a-zA-Z0-9]/g, '_');
    // We can just get the actual filename by looking at public/images
    return `'/images/REPLACEME'`; // Just doing this safely below
});
fs.writeFileSync('src/data/imageMap.ts.tmp', newMapCode);
