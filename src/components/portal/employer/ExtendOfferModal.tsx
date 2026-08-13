import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, FileText, ArrowRight, ShieldCheck, Sparkles, Building, Euro } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExtendOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  candidateTitle?: string;
  candidateId?: string;
  onOfferSent?: (offerDetails: any) => void;
}

export function ExtendOfferModal({
  isOpen,
  onClose,
  candidateName = 'Selected Candidate',
  candidateTitle = 'Specialist',
  candidateId = 'cand-1',
  onOfferSent
}: ExtendOfferModalProps) {
  const [roleTitle, setRoleTitle] = useState(candidateTitle);
  const [monthlySalary, setMonthlySalary] = useState('3850');
  const [bonus, setBonus] = useState('2500 (Relocation & Flight Allowance)');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [city, setCity] = useState('Berlin / Frankfurt, Germany');
  const [fastTrackVisa, setFastTrackVisa] = useState(true);
  const [housingAssistance, setHousingAssistance] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Formal offer extended to ${candidateName}! Generated §81a pre-approval package sent to legal vault.`);
    if (onOfferSent) {
      onOfferSent({
        candidateName,
        candidateId,
        roleTitle,
        monthlySalary,
        bonus,
        startDate,
        city,
        fastTrackVisa,
        housingAssistance
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-400">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Extend Official Job Offer</h3>
              <p className="text-xs text-gray-300">{candidateName} • {candidateTitle}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Position Title
            </label>
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Monthly Gross Salary (€)
              </label>
              <input
                type="number"
                required
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Work Location / City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Relocation / Signing Bonus
              </label>
              <input
                type="text"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="p-4 bg-teal-50/70 rounded-2xl space-y-2 border border-teal-100">
            <label className="flex items-center gap-2 text-xs font-bold text-teal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={fastTrackVisa}
                onChange={(e) => setFastTrackVisa(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Trigger ElKairon § 81a Fast-Track Visa Filing (14-day embassy dispatch)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-teal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={housingAssistance}
                onChange={(e) => setHousingAssistance(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Provide 3-Month Temporary Furnished Accommodation Allowance</span>
            </label>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>Transmit Formal Offer</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
