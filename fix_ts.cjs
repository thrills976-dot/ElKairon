const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');

code = code.replace(/data\.workAuthorization === 'EU Citizen'/g, "String(data.workAuthorization) === 'EU Citizen'");
code = code.replace(/data\.workAuthorization !== 'EU Citizen'/g, "String(data.workAuthorization) !== 'EU Citizen'");
code = code.replace(/documentsReady: true/g, "documentsReady: []");

fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
