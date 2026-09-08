const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');

const target = `      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (`

const replacement = `      {/* Candidate Cards Grid */}
      {loading ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-navy-900">Loading Candidate Pool...</h3>
          <p className="text-sm text-gray-500">Retrieving anonymized profiles from the database.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (`

code = code.replace(target, replacement);

const targetClose = `        ))}
      </div>

      {!loading && filteredCandidates.length === 0 && (`

const replacementClose = `        ))}
      </div>
      )}

      {!loading && filteredCandidates.length === 0 && (`

code = code.replace(targetClose, replacementClose);
fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
