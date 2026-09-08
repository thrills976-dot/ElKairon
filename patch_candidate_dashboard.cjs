const fs = require('fs');
let content = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf-8');

// Add auth import if not present
if (!content.includes('import { auth }')) {
    content = content.replace(
      /import \{ db \} from '\.\.\/\.\.\/lib\/firebase';/,
      `import { db, auth } from '../../lib/firebase';`
    );
}

// Update /api/ai/match-analysis fetch
content = content.replace(
  /const res = await fetch\('\/api\/ai\/match-analysis', \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{[\s\S]*?\}\)\s*\}\);/,
  `const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = \`Bearer \${token}\`;
      const res = await fetch('/api/ai/match-analysis', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          candidateId: user.uid,
          jobId: targetJob.id,
          candidateProfile: profile,
          jobDetails: targetJob
        })
      });`
);

// Update /api/ai/resume-review fetch
content = content.replace(
  /const res = await fetch\('\/api\/ai\/resume-review', \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{[\s\S]*?\}\)\s*\}\);/,
  `const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = \`Bearer \${token}\`;
      const res = await fetch('/api/ai/resume-review', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          resumeText: aiAnalyzeText,
          targetRole: profile?.preferredJobs?.[0] || profile?.currentJobTitle || 'General',
          candidateId: user.uid
        })
      });`
);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', content);
console.log("CandidateDashboard api calls patched with token");
