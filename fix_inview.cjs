const fs = require('fs');

let code = fs.readFileSync('src/components/InViewLoader.tsx', 'utf-8');

// The issue might be GSAP getting confused by the empty div placeholders 
// causing the entire scroll calculation to collapse to 0 height.
// Let's ensure the placeholder has actual min-height to maintain document flow.

code = code.replace(
  `export function InViewLoader({ children, height = '400px' }: InViewLoaderProps) {`,
  `export function InViewLoader({ children, height = 'min-h-[600px]' }: InViewLoaderProps) {`
);

code = code.replace(
  `  if (!isInView) {
    return <div ref={ref} style={{ height }} />;
  }`,
  `  if (!isInView) {
    return <div ref={ref} className={\`w-full \${height}\`} />;
  }`
);

code = code.replace(
  `<div style={{ height }} className="flex items-center justify-center opacity-50"><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>`,
  `<div className={\`flex items-center justify-center opacity-50 w-full \${height}\`}><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>`
);

fs.writeFileSync('src/components/InViewLoader.tsx', code);
console.log('Fixed InViewLoader placeholder heights');
