const fs = require('fs');
let code = fs.readFileSync('firebase-blueprint.json', 'utf-8');

const userProps = `"role": { "type": "string", "enum": ["candidate", "employer"] },
        "name": { "type": "string", "maxLength": 100 },
        "email": { "type": "string", "maxLength": 150 },
        "company": { "type": "string", "maxLength": 150 },
        "title": { "type": "string", "maxLength": 100 },
        "industry": { "type": "string", "maxLength": 100 },
        "experience": { "type": "string", "maxLength": 50 },
        "size": { "type": "string", "maxLength": 50 },
        "countries": { "type": "array", "items": { "type": "string" } },
        "skills": { "type": "array", "items": { "type": "string" } },
        "cvUrl": { "type": "string", "maxLength": 500 },
        "createdAt": { "type": "timestamp" },
        "updatedAt": { "type": "timestamp" }`;

code = code.replace(/"role": \{ "type": "string", "enum": \["candidate", "employer"\] \},[\s\S]*?"updatedAt": \{ "type": "timestamp" \}/, userProps);

fs.writeFileSync('firebase-blueprint.json', code);
