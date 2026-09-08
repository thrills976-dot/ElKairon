const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf8');

const oldList = `          <div className="space-y-4">
            {rankedJobs.length === 0 ? (`;

const newList = `          <div className="space-y-4">
            {loadingJobs ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mb-4" />
                <h3 className="text-lg font-bold text-navy-900">Loading Job Board...</h3>
                <p className="text-sm text-gray-500">Retrieving active positions from the global network.</p>
              </div>
            ) : rankedJobs.length === 0 ? (`;

code = code.replace(oldList, newList);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
console.log("Candidate dashboard loading state patched.");
