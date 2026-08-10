import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Briefcase, Star, ShieldCheck, 
  Zap, ArrowRight, UserCheck, Stethoscope, HardHat, Utensils, 
  Cpu, CheckCircle2, Eye, Calendar, MessageSquare, Award, Sparkles 
} from 'lucide-react';
import { PRE_VETTED_CANDIDATES } from '../../../data/mockEmployerData';
import { PreVettedCandidate } from '../../../types/recruitment';
import { CandidateDetailModal } from './CandidateDetailModal';
import toast from 'react-hot-toast';

interface CandidatePoolBrowserProps {
  onScheduleInterview: (candidate: PreVettedCandidate) => void;
  onSendMessage: (candidate: PreVettedCandidate) => void;
  onExtendOffer: (candidate: PreVettedCandidate) => void;
}

export function CandidatePoolBrowser({
  onScheduleInterview,
  onSendMessage,
  onExtendOffer
}: CandidatePoolBrowserProps) {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [fastTrackOnly, setFastTrackOnly] = useState(false);
  const [selectedGermanLevel, setSelectedGermanLevel] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<PreVettedCandidate | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        toast.success('Removed from saved shortlist');
        return prev.filter(item => item !== id);
      } else {
        toast.success('Candidate saved to your shortlist');
        return [...prev, id];
      }
    });
  };

  const filteredCandidates = useMemo(() => {
    return PRE_VETTED_CANDIDATES.filter((cand) => {
      // Sector filter
      if (selectedSector !== 'All' && cand.sector.toLowerCase() !== selectedSector.toLowerCase()) {
        return false;
      }
      // Fast-Track filter
      if (fastTrackOnly && !cand.fastTrackEligible) {
        return false;
      }
      // German level filter
      if (selectedGermanLevel !== 'All' && !cand.germanLevel.toLowerCase().includes(selectedGermanLevel.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cand.name.toLowerCase().includes(q);
        const matchesTitle = cand.title.toLowerCase().includes(q);
        const matchesSkills = cand.skills.some(s => s.toLowerCase().includes(q));
        const matchesLocation = cand.location.toLowerCase().includes(q) || cand.targetRelocation.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesSkills && !matchesLocation) {
          return false;
        }
      }
      return true;
    });
  }, [selectedSector, fastTrackOnly, selectedGermanLevel, searchQuery]);

  const sectorCounts = useMemo(() => {
    return {
      All: PRE_VETTED_CANDIDATES.length,
      Healthcare: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Healthcare').length,
      Construction: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Construction').length,
      Hospitality: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Hospitality').length,
      Technology: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Technology').length,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Value Banner: Pre-Qualified Pools */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-teal-900/40">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-radial-gradient from-teal-500/10 to-transparent pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={14} className="text-gold-400" />
            <span>ElKairon Pre-Qualified Global Talent Pools</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
            Pre-Screened Candidates, Verified Credentials & Express Relocation
          </h2>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Every candidate below has completed rigorous identity verification, certified language testing (Telc/Goethe), and German equivalence screening. Hire in days, not months, through our fast-track § 81a accelerated procedure.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold">
            <div className="flex items-center gap-2 text-teal-300">
              <ShieldCheck size={16} /> 100% Background & Credential Cleared
            </div>
            <div className="flex items-center gap-2 text-gold-400">
              <Zap size={16} /> 14-Day Fast-Track Visa Guarantee
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Award size={16} /> B1/B2 Language Certified
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        {/* Sector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'All', label: 'All Sectors', icon: Briefcase, count: sectorCounts.All },
            { id: 'Healthcare', label: 'Healthcare & Nursing', icon: Stethoscope, count: sectorCounts.Healthcare },
            { id: 'Construction', label: 'Construction & Trades', icon: HardHat, count: sectorCounts.Construction },
            { id: 'Hospitality', label: 'Hospitality & Culinary', icon: Utensils, count: sectorCounts.Hospitality },
            { id: 'Technology', label: 'Technology & DevOps', icon: Cpu, count: sectorCounts.Technology },
          ].map((sec) => {
            const Icon = sec.icon;
            const isSelected = selectedSector === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedSector(sec.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-teal-400' : 'text-gray-500'} />
                <span>{sec.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Refinement Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, specialist skill (e.g. ICU, Siemens PLC, HACCP), name, or country..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            />
          </div>

          <div>
            <select
              value={selectedGermanLevel}
              onChange={(e) => setSelectedGermanLevel(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none focus:border-teal-500"
            >
              <option value="All">All Language Levels</option>
              <option value="B2">German B2 Certified</option>
              <option value="B1">German B1 Level</option>
              <option value="A2">German A2 Level</option>
              <option value="Fluent">English Fluent (C1/C2)</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-full flex items-center justify-between p-2.5 bg-teal-50/70 border border-teal-200 rounded-xl cursor-pointer text-xs font-bold text-teal-900">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-teal-600" />
                <span>Fast-Track Only (§81a)</span>
              </span>
              <input
                type="checkbox"
                checked={fastTrackOnly}
                onChange={(e) => setFastTrackOnly(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (
          <motion.div
            key={cand.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 hover:border-teal-500 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Card Header & Profile */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                    />
                    <div className="absolute -bottom-1 -right-1 p-0.5 bg-teal-500 text-white rounded-md">
                      <ShieldCheck size={12} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base group-hover:text-teal-600 transition-colors">
                      {cand.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-500">{cand.title}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(cand.id, e)}
                  className={`p-2 rounded-xl transition-colors ${
                    bookmarkedIds.includes(cand.id)
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-gray-100 text-gray-400 hover:text-amber-500'
                  }`}
                  title="Bookmark Candidate"
                >
                  <Star size={16} className={bookmarkedIds.includes(cand.id) ? 'fill-amber-500' : ''} />
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 text-[10px] font-extrabold uppercase tracking-wider border border-teal-100">
                  {cand.sector}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-100">
                  {cand.germanLevel}
                </span>
                {cand.fastTrackEligible && (
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-100">
                    <Zap size={10} /> Fast-Track
                  </span>
                )}
              </div>

              {/* Key Details */}
              <div className="space-y-2 text-xs text-gray-600 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-bold text-navy-900">{cand.experienceYears} Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Origin / Relocation:</span>
                  <span className="font-medium text-navy-900 text-right truncate max-w-[180px]">{cand.location} ➔ {cand.targetRelocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Target Salary:</span>
                  <span className="font-bold text-teal-700">{cand.salaryExpectation}</span>
                </div>
              </div>

              {/* Skills Chips */}
              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Key Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {cand.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] text-gray-700 font-medium">
                      {s}
                    </span>
                  ))}
                  {cand.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-gray-50 text-[10px] text-gray-400 font-bold">
                      +{cand.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className="px-3 py-2 bg-white border border-gray-200 hover:border-teal-500 text-navy-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm flex-1 justify-center"
              >
                <Eye size={14} />
                <span>View Dossier</span>
              </button>

              <button
                type="button"
                onClick={() => onScheduleInterview(cand)}
                className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm flex-1 justify-center"
              >
                <Calendar size={13} />
                <span>Interview</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
          <UserCheck size={36} className="text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-navy-900">No Candidates Match Your Filter</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try adjusting your search criteria or reset filters to view all pre-qualified international candidates.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSector('All');
              setSearchQuery('');
              setFastTrackOnly(false);
              setSelectedGermanLevel('All');
            }}
            className="px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detailed Dossier Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onScheduleInterview={(c) => {
          setSelectedCandidate(null);
          onScheduleInterview(c);
        }}
        onSendMessage={(c) => {
          setSelectedCandidate(null);
          onSendMessage(c);
        }}
        onExtendOffer={(c) => {
          setSelectedCandidate(null);
          onExtendOffer(c);
        }}
      />
    </div>
  );
}
