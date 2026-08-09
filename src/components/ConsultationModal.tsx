import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, Building2, Globe2, Sparkles, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'candidate' | 'employer';
}

export function ConsultationModal({ isOpen, onClose, defaultType = 'candidate' }: ConsultationModalProps) {
  const [consultationType, setConsultationType] = useState<'candidate' | 'employer'>(defaultType);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetCountry: 'Germany',
    profession: '',
    experienceYears: '3-5 years',
    companyName: '',
    talentRolesNeeded: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00 GMT+2)',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    { name: 'Germany', flag: '🇩🇪', desc: 'Fast-track FEG & EU Blue Card' },
    { name: 'United Kingdom', flag: '🇬🇧', desc: 'Health & Care / Skilled Worker' },
    { name: 'Netherlands', flag: '🇳🇱', desc: 'Highly Skilled Migrant Sponsor' },
    { name: 'Canada', flag: '🇨🇦', desc: 'LMIA & Provincial Nominee' },
    { name: 'UAE (Dubai)', flag: '🇦🇪', desc: 'Tax-Free Direct Employment Visa' },
    { name: 'Poland', flag: '🇵🇱', desc: 'EU Work Permit & Logistics' },
    { name: 'Ireland', flag: '🇮🇪', desc: 'Critical Skills Employment Permit' },
    { name: 'Romania', flag: '🇷🇴', desc: 'EU Fast-Track Permits' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please complete all required contact fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Consultation session successfully reserved! Our global advisor will contact you.');
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-navy-950/80">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-navy-900 border-2 border-gold-500 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto text-white shadow-2xl relative"
        >
          {/* Header */}
          <div className="bg-navy-950 px-6 py-5 border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-400 font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white italic">
                  Book 1-on-1 Global Consultation
                </h3>
                <p className="text-xs text-sky-200">
                  Direct guidance with CIPA-accredited international recruitment advisors
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-teal-500/20 border-2 border-teal-400 rounded-full flex items-center justify-center mx-auto text-teal-300">
                <CheckCircle2 size={44} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-display font-bold text-white italic">
                  Consultation Confirmed!
                </h4>
                <p className="text-sm text-sky-100 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-gold-300 font-bold">{formData.fullName}</span>. We have locked in your advisory session for <span className="text-teal-300 font-bold">{formData.targetCountry}</span> relocation opportunities.
                </p>
              </div>

              <div className="bg-navy-950 border border-white/10 rounded-xl p-5 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Meeting Type:</span>
                  <span className="font-bold text-white uppercase">{consultationType === 'candidate' ? 'Talent Career Review' : 'Enterprise Sourcing Call'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Target Region:</span>
                  <span className="font-bold text-gold-400">{formData.targetCountry}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Preferred Slot:</span>
                  <span className="font-bold text-teal-300">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">WhatsApp / Direct Call:</span>
                  <span className="font-bold text-white">{formData.phone}</span>
                </div>
              </div>

              <p className="text-xs text-gray-300">
                A calendar invitation and WhatsApp meeting link have been queued for <span className="text-white font-medium">{formData.email}</span>.
              </p>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-lg"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-navy-950 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setConsultationType('candidate')}
                  className={`py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    consultationType === 'candidate'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User size={15} />
                  <span>I am a Candidate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('employer')}
                  className={`py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    consultationType === 'employer'
                      ? 'bg-amber-400 text-navy-950 shadow-md font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Building2 size={15} />
                  <span>I am an Employer</span>
                </button>
              </div>

              {/* Destination Country Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                  Primary Destination / Focus Region *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {countries.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetCountry: c.name })}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.targetCountry === c.name
                          ? 'bg-navy-950 border-gold-400 ring-2 ring-gold-400/40 text-white'
                          : 'bg-navy-950/60 border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-lg">{c.flag}</span>
                        <span className="font-bold text-xs">{c.name}</span>
                      </div>
                      <span className="text-[9px] text-teal-300 leading-tight">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Kwame Mensah"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-navy-950 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="kwame@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy-950 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone / WhatsApp Number (with Country Code) *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+263 77 462 9109"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-navy-950 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {consultationType === 'candidate' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Professional Field & Experience *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Registered Nurse (5 yrs) / DevOps (4 yrs)"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full bg-navy-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Helios Healthcare UK Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-navy-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                )}
              </div>

              {/* Time preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-navy-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option>Morning (09:00 - 12:00 GMT+2)</option>
                    <option>Afternoon (13:00 - 16:00 GMT+2)</option>
                    <option>Evening (17:00 - 20:00 GMT+2)</option>
                    <option>Weekend Flexible Slot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Specific Questions or Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Visa sponsorship eligibility, salary expectations"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-navy-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Trust Signal Notice */}
              <div className="bg-navy-950/80 border border-teal-500/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-teal-200">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Free Initial Assessment</strong>: Direct review with a licensed CIPA & European immigration specialist. Zero obligation.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold uppercase tracking-widest text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Schedule...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Confirm 1-on-1 Consultation Call</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
