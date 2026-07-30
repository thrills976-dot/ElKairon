const fs = require('fs');
let code = fs.readFileSync('src/components/home/Globe.tsx', 'utf-8');

code = code.replace(
  /const sunLight = new THREE\.DirectionalLight\(0xffffff, 2\.5\);/,
  "const sunLight = new THREE.DirectionalLight(0xffffff, 4.0);"
);

code = code.replace(
  /const rimLight = new THREE\.DirectionalLight\(0x0ea5e9, 2\);/,
  "const rimLight = new THREE.DirectionalLight(0x0ea5e9, 3.0);"
);

code = code.replace(
  /const ambientLight = new THREE\.AmbientLight\(0xffffff, 0\.2\);/,
  "const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);"
);

fs.writeFileSync('src/components/home/Globe.tsx', code);
