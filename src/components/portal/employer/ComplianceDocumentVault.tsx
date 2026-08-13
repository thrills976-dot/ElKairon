import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, ShieldCheck, Download, Upload, CheckCircle2, 
  Clock, AlertTriangle, Filter, Plus, FileCheck, ExternalLink, 
  Sparkles, FileCode, Check, ArrowRight, UserCheck, X, Eye 
} from 'lucide-react';
import { INITIAL_COMPLIANCE_DOCUMENTS } from '../../../data/mockEmployerData';
import { ComplianceDocument } from '../../../types/recruitment';
import toast from 'react-hot-toast';

export function ComplianceDocumentVault() {
  const [documents, setDocuments] = useState<ComplianceDocument[]>(INITIAL_COMPLIANCE_DOCUMENTS);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isContractGeneratorOpen, setIsContractGeneratorOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<ComplianceDocument | null>(null);

  // Contract Generator Form State
  const [contractCandidateName, setContractCandidateName] = useState('Dr. Amina Benali');
  const [contractRole, setContractRole] = useState('Senior ICU Specialist Nurse');
  const [contractSalary, setContractSalary] = useState('3800');
  const [contractStartDate, setContractStartDate] = useState('2026-10-01');
  const [contractProbation, setContractProbation] = useState('6 Months (Statutory § 622 BGB)');
  const [contractCity, setContractCity] = useState('Berlin, Germany');

  // New Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCandidate, setUploadCandidate] = useState('Dr. Amina Benali');
  const [uploadCategory, setUploadCategory] = useState('Immigration & Fast-Track');
  const [uploadType, setUploadType] = useState<ComplianceDocument['type']>('work_permit');

  const filteredDocs = documents.filter((doc) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Contracts') return doc.type === 'contract';
    if (selectedFilter === 'Work Permits') return doc.type === 'work_permit';
    if (selectedFilter === 'Equivalence & Certs') return doc.type === 'certification' || doc.type === 'equivalence';
    if (selectedFilter === 'Visa Files') return doc.type === 'visa_file';
    return true;
  });

  const handleGenerateContract = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: ComplianceDocument = {
      id: `doc-${Date.now()}`,
      title: `Bilingual Employment Contract - ${contractCandidateName}`,
      type: 'contract',
      category: 'Employment Contract',
      candidateName: contractCandidateName,
      candidateId: 'cand-gen',
      jobTitle: contractRole,
      status: 'Pending Employer Signature',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '480 KB',
      fileUrl: '#',
      description: `Generated bilingual (DE/EN) contract according to German TVöD/BGB standards. €${contractSalary}/month starting ${contractStartDate} in ${contractCity}.`,
      isMandatoryForVisa: true
    };

    setDocuments([newDoc, ...documents]);
    setIsContractGeneratorOpen(false);
    toast.success('Bilingual German/English employment contract generated successfully!');
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      toast.error('Please enter a document title');
      return;
    }

    const newDoc: ComplianceDocument = {
      id: `doc-${Date.now()}`,
      title: uploadTitle.trim(),
      type: uploadType,
      category: uploadCategory,
      candidateName: uploadCandidate,
      candidateId: 'cand-up',
      jobTitle: 'Candidate Relocation File',
      status: 'Verified by ElKairon Legal',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '1.4 MB',
      fileUrl: '#',
      description: 'Document uploaded directly by employer for immigration and fast-track processing.',
      isMandatoryForVisa: true
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
    setUploadTitle('');
    toast.success('Document uploaded and queued for legal verification!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-teal-600" />
              <span>Immigration & Compliance Desk</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold font-display text-navy-900">
            Work Permits, Contracts & Legal Compliance Vault
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-2xl leading-relaxed">
            Manage legally verified employment contracts, § 81a accelerated procedure powers of attorney, Defizitbescheid equivalence papers, and visa approvals in one secure dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Upload size={15} />
            <span>Upload Document</span>
          </button>

          <button
            type="button"
            onClick={() => setIsContractGeneratorOpen(true)}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
          >
            <Sparkles size={15} className="text-gold-300" />
            <span>Generate EU Contract</span>
          </button>
        </div>
      </div>

      {/* Compliance Checklist Summary */}
      <div className="bg-teal-900 text-white p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-teal-400" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Germany & EU Legal Relocation Compliance Roadmap
            </h3>
          </div>
          <span className="text-xs text-teal-300 font-medium">99.4% Approval Guarantee with ElKairon</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-teal-300">
              <span>1. Labor Pre-Check</span>
              <Check size={14} className="text-emerald-400" />
            </div>
            <p className="text-[11px] text-gray-200">BA & Shortage occupation exemption verified.</p>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-teal-300">
              <span>2. Equivalence (ZAB/IHK)</span>
              <Check size={14} className="text-emerald-400" />
            </div>
            <p className="text-[11px] text-gray-200">Apostilled degrees & Defizitbescheid approved.</p>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-teal-300">
              <span>3. § 81a Fast-Track</span>
              <Check size={14} className="text-emerald-400" />
            </div>
            <p className="text-[11px] text-gray-200">Immigration office priority lane active (14-day turnaround).</p>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-teal-300">
              <span>4. Arrival & Onboarding</span>
              <span className="text-gold-400 text-[10px]">In Progress</span>
            </div>
            <p className="text-[11px] text-gray-200">Statutory health insurance & city registration ready.</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-white p-3 rounded-2xl border border-gray-100">
        {['All', 'Contracts', 'Work Permits', 'Equivalence & Certs', 'Visa Files'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedFilter === tab
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documents Table / Grid */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="p-5 md:p-6 hover:bg-gray-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-3 rounded-2xl shrink-0 ${
                doc.type === 'contract' ? 'bg-teal-50 text-teal-700' :
                doc.type === 'work_permit' ? 'bg-purple-50 text-purple-700' :
                doc.type === 'certification' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
              }`}>
                <FileText size={22} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-navy-900 text-sm md:text-base">{doc.title}</h4>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    doc.status === 'Verified by ElKairon Legal' || doc.status === 'Approved by Ausländerbehörde'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {doc.status}
                  </span>
                  {doc.isMandatoryForVisa && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-navy-50 text-navy-800 border border-navy-200">
                      Mandatory Visa File
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">{doc.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 pt-1">
                  <span>Candidate: <strong className="text-gray-700">{doc.candidateName}</strong></span>
                  <span>Category: <strong className="text-gray-700">{doc.category}</strong></span>
                  <span>Date: {doc.uploadDate}</span>
                  <span>Size: {doc.fileSize}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                type="button"
                onClick={() => setPreviewDoc(doc)}
                className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-navy-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Eye size={14} />
                <span>View Details</span>
              </button>

              <button
                type="button"
                onClick={() => toast.success(`Downloading secure PDF for ${doc.title}`)}
                className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download size={14} />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contract Generator Modal */}
      <AnimatePresence>
        {isContractGeneratorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
              onClick={() => setIsContractGeneratorOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">1-Click Bilingual EU Contract Generator</h3>
                    <p className="text-xs text-gray-400">German Civil Code (§611a BGB) & Skilled Immigration Compliant</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContractGeneratorOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleGenerateContract} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contractCandidateName}
                    onChange={(e) => setContractCandidateName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Designated Role
                    </label>
                    <input
                      type="text"
                      required
                      value={contractRole}
                      onChange={(e) => setContractRole(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Monthly Gross Salary (€)
                    </label>
                    <input
                      type="number"
                      required
                      value={contractSalary}
                      onChange={(e) => setContractSalary(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Official Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={contractStartDate}
                      onChange={(e) => setContractStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Work City / Station
                    </label>
                    <input
                      type="text"
                      required
                      value={contractCity}
                      onChange={(e) => setContractCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                    Probationary Period & Clauses
                  </label>
                  <input
                    type="text"
                    value={contractProbation}
                    onChange={(e) => setContractProbation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                  />
                </div>

                <div className="p-3 bg-teal-50 rounded-xl text-xs text-teal-800 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>Includes standard German statutory vacation (24-30 days), health insurance provisions, and bilingual German-English clauses.</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsContractGeneratorOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md"
                  >
                    Generate & Add to Vault
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
              onClick={() => setIsUploadModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload size={20} className="text-teal-300" />
                  <h3 className="font-display text-lg font-bold">Upload Compliance Document</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUploadDocument} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Signed § 81a Power of Attorney or Defizitbescheid"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Related Candidate
                    </label>
                    <select
                      value={uploadCandidate}
                      onChange={(e) => setUploadCandidate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    >
                      <option value="Dr. Amina Benali">Dr. Amina Benali (ICU Nurse)</option>
                      <option value="Marko Petrovic">Marko Petrovic (Master Electrician)</option>
                      <option value="Fatima Zahra Alami">Fatima Zahra Alami (Front Office)</option>
                      <option value="Arjun Nair">Arjun Nair (DevOps Lead)</option>
                      <option value="Samuel Kiprop">Samuel Kiprop (Geriatric Nurse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                      Document Type
                    </label>
                    <select
                      value={uploadType}
                      onChange={(e: any) => setUploadType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                    >
                      <option value="work_permit">Work Permit & §81a Authorization</option>
                      <option value="contract">Employment Contract</option>
                      <option value="certification">Equivalence / Defizitbescheid</option>
                      <option value="visa_file">Visa Approval / Vorabzustimmung</option>
                    </select>
                  </div>
                </div>

                {/* Drag and Drop Box */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-teal-500 transition-colors bg-gray-50/50 cursor-pointer">
                  <Upload size={28} className="text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-navy-900">Drag and drop file here, or click to browse</p>
                  <p className="text-[10px] text-gray-600 mt-1">Supports PDF, DOCX, JPG up to 25MB (Encrypted storage)</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-navy-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md"
                  >
                    Save & Submit to Vault
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
              onClick={() => setPreviewDoc(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 space-y-4 z-10"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="text-teal-600" size={24} />
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">{previewDoc.title}</h3>
                    <span className="text-xs text-teal-700 font-semibold">{previewDoc.status}</span>
                  </div>
                </div>
                <button type="button" onClick={() => setPreviewDoc(null)} className="text-gray-400 hover:text-navy-900">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl space-y-2 text-xs text-gray-700">
                <p><strong>Candidate:</strong> {previewDoc.candidateName}</p>
                <p><strong>Category:</strong> {previewDoc.category}</p>
                <p><strong>Upload Date:</strong> {previewDoc.uploadDate}</p>
                <p><strong>Description:</strong> {previewDoc.description}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-500"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success(`Downloading ${previewDoc.title}`);
                    setPreviewDoc(null);
                  }}
                  className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Download size={14} /> Download Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
