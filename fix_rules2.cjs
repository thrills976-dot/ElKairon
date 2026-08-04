const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf-8');

const newIsValidUser = `function isValidUser(data) {
      return data.keys().hasAll(['role', 'name', 'email', 'createdAt', 'updatedAt'])
        && data.role in ['candidate', 'employer']
        && data.name is string && data.name.size() <= 100
        && data.email is string && data.email.size() <= 150
        && (data.keys().hasAny(['company']) ? (data.company is string && data.company.size() <= 150) : true)
        && (data.keys().hasAny(['title']) ? (data.title is string && data.title.size() <= 100) : true)
        && (data.keys().hasAny(['industry']) ? (data.industry is string && data.industry.size() <= 100) : true)
        && (data.keys().hasAny(['experience']) ? (data.experience is string && data.experience.size() <= 50) : true)
        && (data.keys().hasAny(['size']) ? (data.size is string && data.size.size() <= 50) : true)
        && (data.keys().hasAny(['countries']) ? (data.countries is list) : true)
        && (data.keys().hasAny(['skills']) ? (data.skills is list) : true)
        && (data.keys().hasAny(['cvUrl']) ? (data.cvUrl is string && data.cvUrl.size() <= 500) : true)
        && data.createdAt is timestamp
        && data.updatedAt is timestamp;
    }`;

code = code.replace(/function isValidUser\(data\) \{[\s\S]*?    \}/, newIsValidUser);

fs.writeFileSync('firestore.rules', code);
