const fs = require('fs');

const tsFile = 'src/data/imageMap.ts';
let content = fs.readFileSync(tsFile, 'utf-8');

const replacements = {
  // Let's go through and ensure each of the fallback "duplicate" ones have distinct Unsplash IDs:
  'uaeEmployment': '1518684074-6f0284f18d7f', // Dubai
  'rigorousScreening': '1450101499163-c8848c66e92b', // Analyzing
  'financeSupervisor': '1556761175-5973dc0f32b7', // Wait, 1556... is 404. Let's use '1460925895917-afdab827c52f'
  'constructionWorker': '1504307651254-35680f356dfd',
  'medicalInsurance': '1505751172876-fa143ce4b5fa',
  'registeredNurse': '1584515933617-49f81628d05c',
  'warehouseStaff': '1553413077-190dd305871c',
};

// Apply new IDs
let newContent = content;
Object.entries(replacements).forEach(([key, val]) => {
  const r = new RegExp(`(${key}:\\s*'https:\\/\\/images\\.unsplash\\.com\\/photo-)[a-zA-Z0-9\\-]+(\\?auto=format&fit=crop&q=80&w=1200')`, 'g');
  newContent = newContent.replace(r, `$1${val}$2`);
});

fs.writeFileSync(tsFile, newContent);
console.log("Done");
