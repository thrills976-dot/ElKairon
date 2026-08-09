import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Bus, 
  HeartPulse, 
  Utensils, 
  CreditCard, 
  Plane, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Search,
  Building2,
  UserCheck,
  Briefcase,
  FileText,
  Award,
  HelpCircle,
  FileCheck,
  Download,
  BookOpen,
  Check,
  ChevronRight,
  Calculator,
  ArrowRight,
  Layers,
  Globe,
  DollarSign
} from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

type Tab = 'candidates' | 'employers' | 'resources';

const CANDIDATE_BENEFITS = [
  {
    title: "Accommodation",
    desc: "100% Company-provided or subsidized high-standard residential quarters, fully furnished and located near your primary workplace.",
    icon: Building,
    badge: "100% Covered"
  },
  {
    title: "Transportation",
    desc: "Daily shift transit service or dedicated transportation allowance ensuring safe and punctual commute to work.",
    icon: Bus,
    badge: "Daily Transit"
  },
  {
    title: "Medical Insurance",
    desc: "Comprehensive health, emergency, and workplace injury insurance compliant with host-nation labor regulations.",
    icon: HeartPulse,
    badge: "Full Health"
  },
  {
    title: "One-time Meal During Duty",
    desc: "Nutritious daily meal provided during working hours at company cafeterias or approved food service partners.",
    icon: Utensils,
    badge: "Every Shift"
  },
  {
    title: "TRC (Temporary Residence Card)",
    desc: "Guaranteed processing and issuance of your official Temporary Residence Card within 3 months of arrival.",
    icon: CreditCard,
    badge: "Within 3 Months"
  },
  {
    title: "Airline Ticket",
    desc: "Sponsored air travel ticket from your home country directly to your destination hub upon visa stamping.",
    icon: Plane,
    badge: "Relocation Flight"
  },
  {
    title: "Paid Annual Leave",
    desc: "Guaranteed annual vacation leave with full basic pay plus public holiday entitlements per country laws.",
    icon: CalendarCheck,
    badge: "Statutory Leave"
  },
  {
    title: "Overtime (OT) Pay",
    desc: "Regulated shift hours with additional premium overtime rates as per official employer policy and local labor codes.",
    icon: Clock,
    badge: "Premium Overtime"
  }
];

const PAYMENT_STAGES = [
  {
    stage: "Stage 1",
    percent: "10%",
    title: "Initial File & Documentation",
    desc: "File initiation, document verification, CIPA qualification mapping, and ATS CV optimization.",
    deliverable: "Official File Number & Dossier Audit",
    color: "bg-gold-500 text-navy-950 border-gold-400"
  },
  {
    stage: "Stage 2",
    percent: "20%",
    title: "After Offer Letter",
    desc: "Payable only when you receive an official, signed employment offer letter from the host company.",
    deliverable: "Verified Employer Contract",
    color: "bg-teal-600 text-white border-teal-500"
  },
  {
    stage: "Stage 3",
    percent: "30%",
    title: "After Work Permit",
    desc: "Payable once the host country government or Ministry of Labor approves your work permit quota.",
    deliverable: "Government Work Approval",
    color: "bg-navy-900 text-white border-navy-700"
  },
  {
    stage: "Stage 4",
    percent: "40%",
    title: "After Visa Issued",
    desc: "Final payment required only when your entry visa sticker is stamped and departure tickets are ready.",
    deliverable: "Stamped Passport & Flight Pass",
    color: "bg-emerald-600 text-white border-emerald-500"
  }
];

const COUNTRY_FEES = [
  { code: 'NL', country: 'NETHERLANDS', total: 3000, region: 'Schengen Europe', timeline: '60 - 90 Days' },
  { code: 'FI', country: 'FINLAND', total: 3120, region: 'Nordic Europe', timeline: '60 - 90 Days' },
  { code: 'LU', country: 'LUXEMBOURG', total: 2760, region: 'Western Europe', timeline: '60 - 90 Days' },
  { code: 'NO', country: 'NORWAY', total: 2760, region: 'Nordic Europe', timeline: '60 - 90 Days' },
  { code: 'IE', country: 'IRELAND', total: 3000, region: 'Critical Skills', timeline: '60 - 90 Days' },
  { code: 'RO', country: 'ROMANIA', total: 2400, region: 'Eastern Europe', timeline: '45 - 60 Days' },
  { code: 'CA', country: 'CANADA', total: 8400, region: 'North America', timeline: '90 - 120 Days' },
  { code: 'IT', country: 'ITALY', total: 2880, region: 'Southern Europe', timeline: '60 - 90 Days' },
  { code: 'DE', country: 'GERMANY', total: 2880, region: 'FEG / Chancenkarte', timeline: '60 - 90 Days' },
  { code: 'AU', country: 'AUSTRALIA', total: 8400, region: 'Pacific Corridor', timeline: '90 - 120 Days' },
  { code: 'NZ', country: 'NEW ZEALAND', total: 8400, region: 'Pacific Corridor', timeline: '90 - 120 Days' },
];

const EMPLOYER_SERVICES = [
  {
    title: "Tailored Executive & Technical Sourcing",
    desc: "Direct access to pre-evaluated talent pools across Healthcare, IT & Software, Engineering, Heavy Logistics, Construction, and Hospitality.",
    icon: Building2,
    badge: "Multi-Industry"
  },
  {
    title: "Rigorous 4-Tier Candidate Vetting",
    desc: "Comprehensive background checks, trade competency testing, language verification, and CIPA qualification equivalence mapping.",
    icon: UserCheck,
    badge: "100% Vetted"
  },
  {
    title: "Work Permit & Immigration Compliance",
    desc: "End-to-end guidance through host country quota approvals, LMIA, FEG German fast-track, and UK Home Office sponsor compliance.",
    icon: ShieldCheck,
    badge: "Legal Security"
  },
  {
    title: "90-Day Candidate Replacement Guarantee",
    desc: "If a candidate fails to meet probation standards within 90 days, ElKairon replaces them at zero additional recruitment cost.",
    icon: Award,
    badge: "Risk-Free"
  }
];

const VETTING_STEPS = [
  { step: "01", title: "Document & Credential Verification", desc: "Authenticating degree certificates, trade licenses, CIPA accreditation, and police clearance." },
  { step: "02", title: "Practical Trade & Technical Assessment", desc: "Rigorous competency evaluations conducted by senior industry evaluators in dedicated assessment centers." },
  { step: "03", title: "Language & Communication Audit", desc: "Assessing English, German, or Scandinavian fluency for seamless workplace integration." },
  { step: "04", title: "Medical & Background Screening", desc: "Comprehensive fit-to-work medical examinations compliant with international immigration standards." }
];

const ATS_RULES = [
  "Use a single-column clean layout with standard fonts (Arial, Calibri, or Inter).",
  "Include exact keyword matches from target job descriptions in a dedicated Skills section.",
  "Format work history with bullet points using strong action verbs (e.g., Developed, Managed, Executed).",
  "Quantify achievements with hard metrics (e.g., 'Reduced system downtime by 35% across 14 servers').",
  "Avoid tables, graphs, images, or header/footer text boxes that confuse ATS parser software."
];

const STAR_METHOD = [
  { letter: "S", title: "Situation", detail: "Describe the specific background or context of the project or challenge." },
  { letter: "T", title: "Task", detail: "Explain the exact goal or problem you were responsible for addressing." },
  { letter: "A", title: "Action", detail: "Detail the specific technical and tactical steps you took to resolve it." },
  { letter: "R", title: "Result", detail: "Highlight the measurable outcome, cost savings, or operational impact achieved." }
];

export function ServicesAndTerms() {
  const [activeTab, setActiveTab] = useState<Tab>('candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRY_FEES[0] | null>(COUNTRY_FEES[0]);
  
  // Interactive ATS Checklist State
  const [checkedRules, setCheckedRules] = useState<boolean[]>(new Array(ATS_RULES.length).fill(false));

  const toggleCheck = (index: number) => {
    setCheckedRules(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRY_FEES;
    return COUNTRY_FEES.filter(c => 
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const whatsappNumber = "+263774629109";

  return (
    <div className="w-full bg-[#F8FAFC] text-navy-950 pt-28 pb-24 min-h-screen">
      
      {/* Hero Banner Section (Midnight Navy Anchor) */}
      <section className="bg-navy-950 text-white relative overflow-hidden py-16 sm:py-20 border-b-4 border-gold-500 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-400 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
          >
            <ShieldCheck size={14} className="text-gold-400" />
            <span>ElKairon Global Framework</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Services & <span className="text-gold-400 italic">Transparent Terms</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed font-body"
          >
            Comprehensive recruitment pathways, guaranteed candidate benefits, 4-stage milestone payment agreements, and enterprise employer sourcing solutions.
          </motion.p>

          {/* Navigation Tab Bar */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-2 bg-navy-900 p-2 rounded-2xl border border-white/15 shadow-xl">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'candidates' 
                  ? 'bg-gold-500 text-navy-950 shadow-lg' 
                  : 'text-sky-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck size={16} />
              <span>For Candidates</span>
            </button>

            <button
              onClick={() => setActiveTab('employers')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'employers' 
                  ? 'bg-gold-500 text-navy-950 shadow-lg' 
                  : 'text-sky-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 size={16} />
              <span>For Employers</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'resources' 
                  ? 'bg-gold-500 text-navy-950 shadow-lg' 
                  : 'text-sky-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen size={16} />
              <span>Resource Center</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CANDIDATES */}
          {activeTab === 'candidates' && (
            <motion.div
              key="candidates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Candidate Benefits Section */}
              <div>
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
                    Your Guaranteed Package
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mt-4 mb-4">
                    Guaranteed Candidate Benefits <span className="text-gold-500 italic">Upon Success</span>
                  </h2>
                  <p className="text-base text-navy-900 leading-relaxed font-semibold">
                    Every successful job placement includes an official 2-year host-nation work permit (processing window: 60 to 90 days) with all 8 statutory benefits codified in your employer contract.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CANDIDATE_BENEFITS.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div 
                        key={i}
                        className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-gold-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-inner">
                              <Icon size={22} />
                            </div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-navy-950 bg-gold-400/20 border border-gold-400 px-2.5 py-1 rounded-full">
                              {b.badge}
                            </span>
                          </div>

                          <h3 className="font-display text-lg font-bold text-navy-950 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                            <span>{b.title}</span>
                          </h3>

                          <p className="text-xs text-navy-900 leading-relaxed font-medium">
                            {b.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-navy-950 font-bold">
                          <span>Contract Protected</span>
                          <span className="text-teal-600">2-Year Permit</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4-Stage Payment Milestone Structure */}
              <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl">
                <div className="max-w-3xl mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-950 text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <ShieldCheck size={14} />
                    <span>Transparency Over Promises</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mb-4">
                    The 4-Stage Proof-Linked Payment Schedule
                  </h2>
                  <p className="text-base text-navy-900 leading-relaxed font-semibold">
                    We only charge an initial 10% fee to register your dossier and begin administrative verification. Every subsequent installment is strictly tied to official, verifiable documentary proof from employers or government immigration ministries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {PAYMENT_STAGES.map((s, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-extrabold uppercase tracking-widest text-navy-950 bg-slate-200 px-3 py-1 rounded-md">
                            {s.stage}
                          </span>
                          <span className={`text-xl font-display font-extrabold px-3 py-1 rounded-lg border ${s.color}`}>
                            {s.percent}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-navy-950 mb-2">
                          {s.title}
                        </h3>

                        <p className="text-xs text-navy-900 leading-relaxed mb-4 font-medium">
                          {s.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">Deliverable</span>
                        <span className="text-xs font-bold text-navy-950">{s.deliverable}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Country Milestone Calculator */}
                <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                        <Calculator size={20} className="text-gold-400" />
                        <span>Interactive Milestone Fee Breakdown</span>
                      </h3>
                      <p className="text-xs text-sky-200 mt-1">Select or search a country to inspect the exact dollar cost per milestone stage.</p>
                    </div>

                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-300" />
                      <input 
                        type="text"
                        placeholder="Search destination country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-navy-900 border border-white/20 rounded-xl text-xs text-white placeholder:text-sky-300 focus:outline-none focus:border-gold-400 w-full sm:w-64"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-navy-900/80 text-xs font-bold uppercase tracking-wider text-gold-400 border-b border-white/10">
                          <th className="py-3 px-4">Country</th>
                          <th className="py-3 px-4">Total Fee</th>
                          <th className="py-3 px-4 text-center">Stage 1 (10%)</th>
                          <th className="py-3 px-4 text-center">Stage 2 (20%)</th>
                          <th className="py-3 px-4 text-center">Stage 3 (30%)</th>
                          <th className="py-3 px-4 text-center">Stage 4 (40%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-xs">
                        {filteredCountries.map((c) => (
                          <tr 
                            key={c.code}
                            onClick={() => setSelectedCountry(c)}
                            className={`cursor-pointer transition-colors ${
                              selectedCountry?.code === c.code 
                                ? 'bg-gold-500/20 font-bold text-white' 
                                : 'hover:bg-white/5 text-sky-100'
                            }`}
                          >
                            <td className="py-3 px-4 font-bold flex items-center gap-2.5 text-white">
                              <ReactCountryFlag countryCode={c.code} svg style={{ width: '1.6em', height: '1.2em' }} />
                              <span>{c.country}</span>
                            </td>
                            <td className="py-3 px-4 font-extrabold text-gold-400">${c.total.toLocaleString()}</td>
                            <td className="py-3 px-4 text-center text-gold-300 font-bold">${(c.total * 0.1).toFixed(0)}</td>
                            <td className="py-3 px-4 text-center text-teal-300 font-bold">${(c.total * 0.2).toFixed(0)}</td>
                            <td className="py-3 px-4 text-center text-sky-200 font-bold">${(c.total * 0.3).toFixed(0)}</td>
                            <td className="py-3 px-4 text-center text-emerald-300 font-bold">${(c.total * 0.4).toFixed(0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedCountry && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-200 gap-3">
                      <div>
                        Selected: <strong className="text-white">{selectedCountry.country} (${selectedCountry.total.toLocaleString()})</strong> — Typical timeline: <span className="text-gold-400 font-bold">{selectedCountry.timeline}</span>
                      </div>
                      <a
                        href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(`Hi ElKairon, I am interested in applying for positions in ${selectedCountry.country} ($${selectedCountry.total}). Could you assist with my file initiation?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <span>Initiate File via WhatsApp</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: EMPLOYERS */}
          {activeTab === 'employers' && (
            <motion.div
              key="employers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Employer Overview */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 bg-gold-50 px-3.5 py-1.5 rounded-full border border-gold-200">
                  Global Enterprise Solutions
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mt-4 mb-4">
                  Talent Sourcing, Vetting & <span className="text-teal-600 italic">Legal Compliance</span>
                </h2>
                <p className="text-base text-navy-900 leading-relaxed font-semibold">
                  ElKairon Global Connect bridges multinational employers with certified, highly skilled professionals across Southern Africa. We manage the entire recruitment lifecycle from trade testing to immigration petitions.
                </p>
              </div>

              {/* Employer Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {EMPLOYER_SERVICES.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div 
                      key={i}
                      className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-teal-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center">
                            <Icon size={22} />
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                            {s.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-navy-950 mb-2">
                          {s.title}
                        </h3>

                        <p className="text-xs text-navy-900 leading-relaxed font-medium">
                          {s.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-navy-950 flex items-center gap-1 text-teal-700">
                        <Check size={14} />
                        <span>Verified Protocol</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4-Tier Vetting Process */}
              <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-gold-500/40 shadow-2xl">
                <div className="max-w-3xl mb-10">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400 bg-gold-950 px-3.5 py-1.5 rounded-full border border-gold-500/40">
                    Quality Guarantee
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4 mb-3">
                    Our Rigorous 4-Tier Candidate Vetting Pathway
                  </h2>
                  <p className="text-sm sm:text-base text-sky-100 font-body">
                    We eliminate hiring risk by ensuring every recommended candidate undergoes background audits, practical skills assessments, and legal compliance checks before profile submission.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {VETTING_STEPS.map((v) => (
                    <div 
                      key={v.step}
                      className="bg-navy-900 p-6 rounded-2xl border border-white/15 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-2xl font-display font-extrabold text-gold-400 block mb-3">
                          {v.step}
                        </span>
                        <h3 className="font-display text-base font-bold text-white mb-2">
                          {v.title}
                        </h3>
                        <p className="text-xs text-sky-100 leading-relaxed font-medium">
                          {v.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-teal-300">
                        Tier Verified
                      </div>
                    </div>
                  ))}
                </div>

                {/* Employer CTA */}
                <div className="mt-10 bg-navy-900/90 border border-gold-400/40 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-white text-lg">Need Custom Labor Quota Sourcing?</h4>
                    <p className="text-xs text-sky-200">Our enterprise account managers assist with host-nation labor market impact assessments (LMIA), FEG Germany, and UK sponsor licenses.</p>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi ElKairon Enterprise Team, we are an employer seeking talent sourcing and compliance assistance.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold px-6 py-3 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2"
                  >
                    <span>Schedule Employer Consultation</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: RESOURCE CENTER */}
          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
                  Career Readiness Hub
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mt-4 mb-4">
                  ATS CV Optimization & <span className="text-gold-500 italic">Interview Guides</span>
                </h2>
                <p className="text-base text-navy-900 leading-relaxed font-semibold">
                  Prepare your professional dossier for European and global employers with our proven resume formatting guidelines, interview techniques, and relocation checklists.
                </p>
              </div>

              {/* ATS CV Optimization Section */}
              <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy-950">
                      ATS CV Formatting Best Practices
                    </h3>
                    <p className="text-xs text-navy-900 font-bold">Ensure your resume passes international Applicant Tracking Systems (ATS) cleanly.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-3">
                    <h4 className="font-bold text-navy-950 text-sm uppercase tracking-wider mb-2">Interactive ATS CV Checklist:</h4>
                    {ATS_RULES.map((rule, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleCheck(idx)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          checkedRules[idx] 
                            ? 'bg-teal-50 border-teal-500 text-navy-950' 
                            : 'bg-slate-50 border-slate-200 text-navy-900 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          checkedRules[idx] ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-400 bg-white'
                        }`}>
                          {checkedRules[idx] && <Check size={14} />}
                        </div>
                        <span className="text-xs font-semibold leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-navy-950 text-white rounded-2xl p-6 border border-navy-800 shadow-xl">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Sample ATS Template Outline</span>
                      <span className="text-[10px] font-bold text-teal-300 bg-teal-950 px-2 py-1 rounded">European Standard</span>
                    </div>

                    <div className="space-y-4 text-xs font-mono text-sky-100">
                      <div>
                        <p className="text-gold-400 font-bold text-sm">[FULL NAME] - [PRIMARY TITLE]</p>
                        <p className="text-[11px] text-sky-200">Email: name@domain.com | Phone: +263 ... | Location: Harare / Remote</p>
                      </div>

                      <div className="border-t border-white/10 pt-2">
                        <p className="text-teal-300 font-bold text-xs uppercase">PROFESSIONAL SUMMARY</p>
                        <p className="text-[11px] text-sky-100 leading-relaxed">
                          Results-driven [Title] with 5+ years of experience in [Core Skill 1] and [Core Skill 2]. Proven record of increasing efficiency by [X%] and leading teams across [Sector].
                        </p>
                      </div>

                      <div className="border-t border-white/10 pt-2">
                        <p className="text-teal-300 font-bold text-xs uppercase">CORE COMPETENCIES & SKILLS</p>
                        <p className="text-[11px] text-sky-100">
                          • Systems Architecture • Project Planning • Health & Safety (OSHA) • Language: English (Fluent)
                        </p>
                      </div>

                      <div className="border-t border-white/10 pt-2">
                        <p className="text-teal-300 font-bold text-xs uppercase">WORK EXPERIENCE</p>
                        <p className="text-[11px] font-bold text-white">Senior Specialist — Company Name (2021 – Present)</p>
                        <p className="text-[11px] text-sky-100">• Spearheaded operational workflow reducing errors by 22%.</p>
                        <p className="text-[11px] text-sky-100">• Managed cross-functional deployment of 15 technical assets.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* International Interview Preparation */}
              <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy-950">
                      The STAR Interview Technique
                    </h3>
                    <p className="text-xs text-navy-900 font-bold">Structure your behavioral interview answers to impress European and Canadian hiring panels.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {STAR_METHOD.map((item) => (
                    <div 
                      key={item.letter}
                      className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        <span className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 font-display font-extrabold text-xl flex items-center justify-center mb-3">
                          {item.letter}
                        </span>
                        <h4 className="font-display text-lg font-bold text-navy-950 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-navy-900 leading-relaxed font-medium">
                          {item.detail}
                        </p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] font-bold text-teal-700">
                        STAR Framework
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
