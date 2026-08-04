import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, Mail, CheckCircle, Clock, Users, Building, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export function EmployerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [isPostingJob, setIsPostingJob] = useState(false);
  
  // Job Post State
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobIndustry, setJobIndustry] = useState('healthcare');

  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Fetch Jobs
    const qJobs = query(
      collection(db, 'jobs'), 
      where('employerId', '==', user.uid),
    );
    
    const unsubscribeJobs = onSnapshot(qJobs, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by createdAt locally if not indexed
      jobsData.sort((a: any, b: any) => b.createdAt - a.createdAt);
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
      setLoading(false);
    });
    
    // Fetch Applications
    const qApps = query(
      collection(db, 'applications'),
      where('employerId', '==', user.uid)
    );
    
    const unsubscribeApps = onSnapshot(qApps, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(appsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'applications');
    });

    return () => {
      unsubscribeJobs();
      unsubscribeApps();
    };
  }, [user]);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      await addDoc(collection(db, 'jobs'), {
        employerId: user.uid,
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        industry: jobIndustry,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success('Job posted successfully!');
      setIsPostingJob(false);
      setJobTitle('');
      setJobDescription('');
      setJobLocation('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'jobs');
      toast.error('Failed to post job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and view applications.</p>
          </div>
          <button 
            onClick={() => setIsPostingJob(true)}
            className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-navy-800 transition-colors shadow-lg"
          >
            <Plus size={16} /> Post New Job
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border-t-4 border-teal-500 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">My Active Jobs</p>
              <h3 className="text-2xl font-bold text-navy-900">{jobs.filter(j => j.status === 'active').length}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border-t-4 border-navy-500 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Applications</p>
              <h3 className="text-2xl font-bold text-navy-900">{applications.length}</h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors relative ${activeTab === 'jobs' ? 'text-teal-600' : 'text-gray-400 hover:text-navy-900'}`}
          >
            My Jobs
            {activeTab === 'jobs' && <motion.div layoutId="employerTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`pb-4 font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors relative ${activeTab === 'applications' ? 'text-teal-600' : 'text-gray-400 hover:text-navy-900'}`}
          >
            Applications Received
            {activeTab === 'applications' && <motion.div layoutId="employerTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             {loading ? (
                <div className="p-8 text-center text-gray-500">Loading jobs...</div>
             ) : jobs.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-2">No Jobs Posted Yet</h3>
                  <p className="text-gray-500 mb-6">Create your first job posting to start attracting global talent.</p>
                  <button 
                    onClick={() => setIsPostingJob(true)}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-teal-700 transition-colors"
                  >
                    Post a Job
                  </button>
                </div>
             ) : (
                <div className="divide-y divide-gray-100">
                  {jobs.map((job: any) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-navy-900">{job.title}</h3>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={14} /> {job.industry}</span>
                            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center px-4 border-r border-gray-200">
                            <div className="font-bold text-navy-900 text-lg">{applications.filter(a => a.jobId === job.id).length}</div>
                            <div className="text-gray-500 text-[10px] uppercase tracking-widest">Apps</div>
                          </div>
                          <button className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">Manage</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             )}
          </div>
        )}
        
        {activeTab === 'applications' && (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center text-gray-500">
             {applications.length === 0 ? "No applications received yet." : "Application management interface coming soon."}
           </div>
        )}
      </div>
      
      {/* Post Job Modal */}
      <AnimatePresence>
        {isPostingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setIsPostingJob(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-navy-900 italic">Post a New Job</h2>
                <button onClick={() => setIsPostingJob(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handlePostJob} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Job Title</label>
                    <input 
                      required
                      type="text" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Registered Nurse" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Location</label>
                      <input 
                        required
                        type="text" 
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        placeholder="e.g. Berlin, Germany" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Industry</label>
                      <select 
                        required
                        value={jobIndustry}
                        onChange={(e) => setJobIndustry(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      >
                        <option value="healthcare">Healthcare & Nursing</option>
                        <option value="construction">Construction & Engineering</option>
                        <option value="logistics">Logistics & Supply Chain</option>
                        <option value="hospitality">Hospitality & Tourism</option>
                        <option value="it">Information Technology</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-2">Job Description & Requirements</label>
                    <textarea 
                      required
                      rows={5}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Describe the role, responsibilities, and required qualifications..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsPostingJob(false)}
                      className="px-6 py-3 text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-navy-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-teal-700 transition-colors shadow-lg"
                    >
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
