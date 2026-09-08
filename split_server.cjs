const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8');

const apiPartMatch = code.match(/const app = express\(\);([\s\S]*?)async function startServer\(\)/);
if (!apiPartMatch) {
    console.error("Could not find boundaries");
    process.exit(1);
}

const imports = `import express, { Request, Response, NextFunction } from 'express';
import { GoogleGenAI } from '@google/genai';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const app = express();`;

const apiPart = apiPartMatch[1];

const apiIndexCode = imports + apiPart + `\nexport default app;\n`;

fs.writeFileSync('api/index.ts', apiIndexCode);
console.log("api/index.ts created successfully.");

const serverPart = `import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import app from './api/index.js';

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
         middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Secure server running on http://0.0.0.0:\${PORT}\`);
  });
}

startServer();
`;
fs.writeFileSync('server.ts', serverPart);
console.log("server.ts updated successfully.");
