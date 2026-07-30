import { motion } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, Mail, CheckCircle, Clock, Users, Building, Plus } from 'lucide-react';
import { useState } from 'react';

const candidates = [
  { id: 1, name: "Kwame D.", role: "Logistics Coordinator", location: "Accra, GH", status: "Vetted & Ready", match: "98%" },
  { id: 2, name: "Amara O.", role: "Registered Nurse", location: "Lagos, NG", status: "Interview Pending", match: "95%" },
  { id: 3, name: "Zanele M.", role: "IT Support Specialist", location: "Johannesburg, ZA", status: "Vetted & Ready", match: "92%" },
];

export function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs' | 'messages'>('talent');

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">Partner Portal</h1>
            <p className="text-gray-600">Source, filter, and manage compliant global talent.</p>
          </div>
          <button className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-navy-800 transition-colors shadow-lg">
            <Plus size={16} /> Post New Job
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border-t-4 border-teal-500 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pre-Vetted Candidates</p>
              <h3 className="text-2xl font-bold text-navy-900">1,240</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-t-4 border-gold-500 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Postings</p>
              <h3 className="text-2xl font-bold text-navy-900">8</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-t-4 border-navy-900 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-900 flex items-center justify-center">
              <Building size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Ongoing Placements</p>
              <h3 className="text-2xl font-bold text-navy-900">12</h3>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button 
              onClick={() => setActiveTab('talent')}
              className={`px-8 py-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeTab === 'talent' ? 'bg-white text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-navy-900'}`}
            >
              Talent Pool
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-8 py-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeTab === 'jobs' ? 'bg-white text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-navy-900'}`}
            >
              My Postings
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'talent' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search by role, skill, or keyword..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-navy-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    <Filter size={18} /> Filters
                  </button>
                </div>

                {/* Candidates List */}
                <div className="space-y-4">
                  {candidates.map((c) => (
                    <div key={c.id} className="flex flex-col md:flex-row items-center justify-between p-6 border border-gray-100 rounded-xl hover:border-teal-500 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center text-white font-display font-bold text-xl">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-navy-900 text-lg group-hover:text-teal-600 transition-colors">{c.name}</h4>
                          <p className="text-gray-500 text-sm mb-1">{c.role}</p>
                          <div className="flex items-center gap-4 text-xs font-medium">
                            <span className="flex items-center gap-1 text-gray-400"><MapPin size={14} /> {c.location}</span>
                            <span className="flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full"><CheckCircle size={12} /> {c.status}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Match Score</p>
                          <p className="text-xl font-display font-bold text-gold-500">{c.match}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-3 text-gray-400 bg-gray-50 hover:bg-navy-50 hover:text-navy-900 rounded-lg transition-colors">
                            <Mail size={18} />
                          </button>
                          <button className="px-6 py-3 bg-teal-50 text-teal-600 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-teal-600 hover:text-white transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Briefcase size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-2">No Active Postings</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Create a job posting to start receiving matched candidates from our vetted talent pool.</p>
                <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-teal-700 transition-colors">
                  Create First Posting
                </button>
              </motion.div>
            )}
          </div>
                </div>

          {/* Privacy & Security Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 col-span-1 lg:col-span-3 mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900">Privacy & Data Management</h2>
                <p className="text-gray-500 text-sm">Control your data as promised in our Data Protection policy.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                <h4 className="font-bold text-navy-900 mb-1">Company Visibility</h4>
                <p className="text-xs text-gray-500 mb-4">Restrict who can see your company profile.</p>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>All Candidates</option>
                  <option>Only Vetted Candidates</option>
                  <option>Private (Hidden)</option>
                </select>
              </div>
              
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                <h4 className="font-bold text-navy-900 mb-1">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 mb-4">Enable MFA for an extra layer of account security.</p>
                <button className="px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-navy-800 transition-colors">
                  Enable MFA
                </button>
              </div>
              
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-navy-900 mb-1">Delete Account & Data</h4>
                  <p className="text-xs text-gray-500 max-w-md">Permanently delete your company account and all associated data from our servers.</p>
                </div>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to delete all your data? This action is irreversible.')) {
                      import('react-hot-toast').then(toast => toast.default.success('Data deletion request submitted.'));
                    }
                  }}
                  className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors whitespace-nowrap"
                >
                  Request Deletion
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
