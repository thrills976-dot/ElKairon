const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');
code = code.replace("      </div>\n      )}\n\n      {filteredCandidates.length === 0 && (", "      </div>\n\n      {!loading && filteredCandidates.length === 0 && (");
fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
