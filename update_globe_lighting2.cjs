const fs = require('fs');
let code = fs.readFileSync('src/components/home/Globe.tsx', 'utf-8');

code = code.replace(
  "const sunLight = new THREE.DirectionalLight(0xffffff, 4.0);",
  "const sunLight = new THREE.DirectionalLight(0xffffff, 6.0);"
);

code = code.replace(
  "const rimLight = new THREE.DirectionalLight(0x0ea5e9, 3.0);",
  "const rimLight = new THREE.DirectionalLight(0x0ea5e9, 5.0);"
);

code = code.replace(
  "const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);",
  "const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);"
);

fs.writeFileSync('src/components/home/Globe.tsx', code);
