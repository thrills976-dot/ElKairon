const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');
code = code.replace(
  '<title>ElKairon Global Connect</title>',
  '<link rel="icon" type="image/png" href="/logo.png" />\n    <title>ElKairon Global Connect</title>'
);
fs.writeFileSync('index.html', code);
