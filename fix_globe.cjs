const fs = require('fs');
const path = require('path');

const globePath = path.join(process.cwd(), 'src/components/home/Globe.tsx');
let content = fs.readFileSync(globePath, 'utf8');

// 1. Increase Text Size and Depth for Universal Studios look
content = content.replace(/size: 11,\s*depth: 4,/g, 'size: 15,\n                depth: 6,');
content = content.replace(/const radius = GLOBE_RADIUS \* 1\.35;/g, 'const radius = GLOBE_RADIUS * 1.5;');

// 2. Adjust Lighting to be more cinematic (brighter gold, more contrast)
content = content.replace(/const sunLight = new THREE\.DirectionalLight\(0xffffff, 2\);/g, 'const sunLight = new THREE.DirectionalLight(0xffffff, 3);');
content = content.replace(/const fillLight = new THREE\.DirectionalLight\(0x0ea5e9, 1\);/g, 'const fillLight = new THREE.DirectionalLight(0x0ea5e9, 2);');

// 3. Make the altitude responsive (larger altitude = smaller globe on screen)
content = content.replace(/myGlobe\.pointOfView\(\{ lat: 5, lng: 0, altitude: 2\.5 \}, 5000\);/g, `const isMobile = window.innerWidth < 768;
        const targetAltitude = isMobile ? 4.5 : 2.8;
        myGlobe.pointOfView({ lat: 15, lng: 0, altitude: targetAltitude }, 5000);`);

// 4. Give the scene a slight tilt like the Universal Studios logo
content = content.replace(/myGlobe\.scene\(\)\.add\(textGroup\);/g, `textGroup.rotation.x = Math.PI / 12; // Slight upward tilt for the text ring
    myGlobe.scene().add(textGroup);`);

fs.writeFileSync(globePath, content);
console.log('Fixed Globe.tsx');
