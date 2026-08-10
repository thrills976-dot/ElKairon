import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Video, CheckCircle2, User, Globe, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  candidateTitle?: string;
  onScheduled?: (details: any) => void;
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  candidateName = 'Selected Candidate',
  candidateTitle = 'Specialist',
  onScheduled
}: ScheduleInterviewModalProps) {
  const [date, setDate] = useState('2026-08-15');
  const [time, setTime] = useState('14:00');
  const [timeZone, setTimeZone] = useState('Europe/Berlin (CET)');
  const [platform, setPlatform] = useState('Google Meet (ElKairon Live Integration)');
  const [interviewType, setInterviewType] = useState('Clinical & Technical Assessment');
  const [notes, setNotes] = useState('Technical interview with department head and clinical lead.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Fast-Track Interview scheduled with ${candidateName} for ${date} at ${time} ${timeZone}`);
    if (onScheduled) {
      onScheduled({ date, time, timeZone, platform, interviewType, notes });
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
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Schedule Fast-Track Video Call</h3>
              <p className="text-xs text-gray-400">Interview: {candidateName} ({candidateTitle})</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Interview Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Time (24h)
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Timezone
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              >
                <option value="Europe/Berlin (CET)">Europe/Berlin (CET)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Video Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
              >
                <option value="Google Meet (ElKairon Live Integration)">Google Meet (Integrated)</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Zoom Meeting">Zoom Meeting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Interview Format / Focus
            </label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
            >
              <option value="Clinical & Technical Assessment">Clinical & Technical Assessment</option>
              <option value="Cultural & Language Proficiency Call">Cultural & Language Proficiency Call</option>
              <option value="Final Offer & Onboarding Discussion">Final Offer & Onboarding Discussion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Meeting Agenda & Candidate Instructions
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <div className="p-3 bg-teal-50 rounded-xl text-xs text-teal-800 flex items-center gap-2">
            <Sparkles size={16} className="text-teal-600 shrink-0" />
            <span>Candidate will receive an instant calendar invite and automated SMS reminder.</span>
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
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-colors"
            >
              Send Interview Invite
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
