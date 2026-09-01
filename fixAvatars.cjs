const fs = require('fs');

function replaceUnsplash(file) {
    let content = fs.readFileSync(file, 'utf-8');
    // Replace all unsplash avatar URLs with generic UI avatars
    // e.g. https://ui-avatars.com/api/?name=User&background=random
    let count = 0;
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\']*/g, (match) => {
        count++;
        return `https://ui-avatars.com/api/?name=User+${count}&background=0D9488&color=fff&size=128`;
    });
    fs.writeFileSync(file, content);
}

replaceUnsplash('src/components/portal/employer/HiringPipeline.tsx');
replaceUnsplash('src/data/mockEmployerData.ts');

