import { useState } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Briefcase, Globe, FileText, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export function CandidateRegistration({ onSubmit, onBack }: { onSubmit: (data: any) => void, onBack: () => void }) {
  const [data, setData] = useState({
    title: '',
    industry: '',
    experience: '',
    countries: '',
    skills: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...data,
      countries: data.countries.split(',').map(s => s.trim()).filter(Boolean),
      skills: data.skills.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
      <button onClick={onBack} className="text-gray-400 hover:text-navy-900 mb-6 text-sm font-bold uppercase tracking-widest">&larr; Back</button>
      <h2 className="text-3xl font-display font-bold italic text-navy-900 mb-2">Candidate Profile</h2>
      <p className="text-gray-500 mb-8 text-sm">Tell us about yourself to get a customized job feed.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Professional Title</label>
            <input type="text" required value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Industry</label>
            <input type="text" required value={data.industry} onChange={e => setData({...data, industry: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. Technology" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Years of Experience</label>
          <select required value={data.experience} onChange={e => setData({...data, experience: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500">
            <option value="">Select...</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Target Countries (comma separated)</label>
          <input type="text" required value={data.countries} onChange={e => setData({...data, countries: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. Canada, Germany, Australia" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Top Skills (comma separated)</label>
          <input type="text" required value={data.skills} onChange={e => setData({...data, skills: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. React, Node.js, Project Management" />
        </div>

        <button type="submit" className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-teal-700 transition-colors shadow-md">
          Complete Profile
        </button>
      </form>
    </motion.div>
  );
}

export function EmployerRegistration({ onSubmit, onBack }: { onSubmit: (data: any) => void, onBack: () => void }) {
  const [data, setData] = useState({
    company: '',
    industry: '',
    size: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
      <button onClick={onBack} className="text-gray-400 hover:text-navy-900 mb-6 text-sm font-bold uppercase tracking-widest">&larr; Back</button>
      <h2 className="text-3xl font-display font-bold italic text-navy-900 mb-2">Employer Profile</h2>
      <p className="text-gray-500 mb-8 text-sm">Tell us about your company to start hiring.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Company Name</label>
          <input type="text" required value={data.company} onChange={e => setData({...data, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. TechCorp Inc." />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Industry</label>
          <input type="text" required value={data.industry} onChange={e => setData({...data, industry: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500" placeholder="e.g. Healthcare" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Company Size</label>
          <select required value={data.size} onChange={e => setData({...data, size: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500">
            <option value="">Select...</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-gold-500 text-navy-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gold-400 transition-colors shadow-md">
          Complete Profile
        </button>
      </form>
    </motion.div>
  );
}
