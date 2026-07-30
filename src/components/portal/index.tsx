import { useState, useEffect } from 'react';
import { CandidateDashboard } from './CandidateDashboard';
import { EmployerDashboard } from './EmployerDashboard';

export function Portal({ initialMode = 'candidate' }: { initialMode?: 'candidate' | 'employer' }) {
  const [mode, setMode] = useState<'candidate' | 'employer'>(initialMode);

  // Sync mode if initialMode changes (e.g. from nav clicks)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <div className="relative w-full h-full">
      {/* Dev Mode Toggle for Demo Purposes */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl border border-gray-200 rounded-full p-1 flex">
        <button 
          onClick={() => setMode('candidate')}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'candidate' ? 'bg-navy-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Candidate View
        </button>
        <button 
          onClick={() => setMode('employer')}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'employer' ? 'bg-navy-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Employer View
        </button>
      </div>

      {mode === 'candidate' ? <CandidateDashboard /> : <EmployerDashboard />}
    </div>
  );
}
