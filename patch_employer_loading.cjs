const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');

const oldGrid = `      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (`;

const newGrid = `      {loading ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-navy-900">Loading Candidate Pool...</h3>
          <p className="text-sm text-gray-500">Retrieving anonymized profiles from the database.</p>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
          <UserCheck className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-navy-900">No candidates found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search query.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSector('All'); setSelectedGermanLevel('All'); setFastTrackOnly(false); }}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (`;

code = code.replace(oldGrid, newGrid);

const oldGridEnd = `            </div>
          </motion.div>
        ))}
      </div>`;

const newGridEnd = `            </div>
          </motion.div>
        ))}
      </div>
      )}`;

code = code.replace(oldGridEnd, newGridEnd);

fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
console.log("Candidate pool grid patched.");
