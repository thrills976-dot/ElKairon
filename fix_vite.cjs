const fs = require('fs');

let configCode = fs.readFileSync('vite.config.ts', 'utf-8');

const buildConfig = `
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'vendor-three';
              if (id.includes('globe.gl')) return 'vendor-globe';
              if (id.includes('d3')) return 'vendor-d3';
              if (id.includes('recharts')) return 'vendor-recharts';
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('motion')) return 'vendor-motion';
              if (id.includes('lucide')) return 'vendor-lucide';
              if (id.includes('react')) return 'vendor-react';
              return 'vendor';
            }
          }
        }
      }
    },
`;

configCode = configCode.replace('server: {', buildConfig + '    server: {');

fs.writeFileSync('vite.config.ts', configCode);
console.log('Fixed vite.config.ts');
