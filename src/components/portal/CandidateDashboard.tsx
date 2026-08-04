import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, ChevronRight, CheckCircle, Upload, AlertCircle, Bell, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import toast from 'react-hot-toast';

export function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fake states for ui demonstration of profile uploading
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvName, setCvName] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [jobAlertSubscribed, setJobAlertSubscribed] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    
    const fetchProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.cvUrl) {
            setCvUrl(data.cvUrl);
            setCvUploaded(true);
            setCvName('Uploaded CV');
          }
        }
      } catch (e) {}
    };
    fetchProfile();

    // Fetch Active Jobs
    const qJobs = query(
      collection(db, 'jobs'),
      where('status', '==', 'active')
    );
    
    const unsubscribeJobs = onSnapshot(qJobs, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      jobsData.sort((a: any, b: any) => b.createdAt - a.createdAt);
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
      setLoading(false);
    });
    
    // Fetch User's Applications
    const qApps = query(
      collection(db, 'applications'),
      where('candidateId', '==', user.uid)
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

  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    setUploading(true);
    try {
      const storageRef = ref(storage, `cvs/${user.uid}_${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      await updateDoc(doc(db, 'users', user.uid), {
        cvUrl: url,
        updatedAt: serverTimestamp()
      });
      
      setCvUrl(url);
      setCvUploaded(true);
      setCvName(file.name);
      toast.success('CV uploaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleApply = async (job: any) => {
    if (!user) return;
    
    // Check if already applied
    if (applications.some(a => a.jobId === job.id)) {
      toast.error('You have already applied to this job.');
      return;
    }
    
    try {
      await addDoc(collection(db, 'applications'), {
        candidateId: user.uid,
        jobId: job.id,
        employerId: job.employerId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success('Application submitted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'applications');
      toast.error('Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">Candidate Portal</h1>
          <p className="text-gray-600">Discover global opportunities and manage your applications.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
             {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('jobs')}
                className={`pb-4 font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors relative ${activeTab === 'jobs' ? 'text-teal-600' : 'text-gray-400 hover:text-navy-900'}`}
              >
                Available Jobs
                {activeTab === 'jobs' && <motion.div layoutId="candidateTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`pb-4 font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors relative ${activeTab === 'applications' ? 'text-teal-600' : 'text-gray-400 hover:text-navy-900'}`}
              >
                My Applications
                {activeTab === 'applications' && <motion.div layoutId="candidateTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
              </button>
            </div>
            
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                {loading ? (
                   <div className="text-center py-10 text-gray-500">Loading jobs...</div>
                ) : jobs.length === 0 ? (
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                     <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                     <h3 className="font-bold text-navy-900 mb-2">No active jobs found</h3>
                     <p className="text-gray-500 text-sm">Check back later for new opportunities.</p>
                   </div>
                ) : (
                  jobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-navy-900 mb-1 group-hover:text-teal-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><MapPin size={16} className="text-teal-500" /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={16} className="text-teal-500" /> {job.industry}</span>
                          </div>
                        </div>
                        {applications.some(a => a.jobId === job.id) ? (
                          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-green-100">
                            <CheckCircle size={14} /> Applied
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleApply(job)}
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors shadow-sm w-full md:w-auto text-center"
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                 {applications.length === 0 ? (
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                     <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
                     <h3 className="font-bold text-navy-900 mb-2">No applications yet</h3>
                     <p className="text-gray-500 text-sm">Start applying to jobs to see your history here.</p>
                     <button 
                       onClick={() => setActiveTab('jobs')}
                       className="mt-6 text-teal-600 font-bold uppercase tracking-widest text-xs hover:text-teal-700 transition-colors"
                     >
                       Browse Jobs
                     </button>
                   </div>
                 ) : (
                   applications.map(app => {
                     const job = jobs.find(j => j.id === app.jobId);
                     return (
                       <div key={app.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                           <h3 className="font-display text-lg font-bold text-navy-900 mb-1">{job ? job.title : 'Unknown Job'}</h3>
                           <p className="text-sm text-gray-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border ${
                             app.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                             app.status === 'reviewed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                             app.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' :
                             'bg-red-50 text-red-700 border-red-100'
                           }`}>
                             {app.status}
                           </span>
                         </div>
                       </div>
                     );
                   })
                 )}
              </div>
            )}
          </div>

          {/* Sidebar / Profile Settings */}
          <div className="space-y-6">
            
            {/* Document Upload */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-2">My Documents</h3>
              <p className="text-gray-500 text-sm mb-6">Keep your CV and certifications up to date for faster matching.</p>
              
              <div className="space-y-4">
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} />
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <span className="font-bold text-navy-900 text-sm mb-1">{uploading ? 'Uploading...' : 'Upload Resume / CV'}</span>
                  <span className="text-xs text-gray-500">PDF, DOCX up to 5MB</span>
                </label>
                
                {cvUploaded && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-teal-600 shadow-sm">
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <a href={cvUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-navy-900 hover:underline">{cvName || 'My CV'}</a>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Updated today</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">Remove</button>
                  </div>
                )}
              </div>
            </div>

            {/* Career Advice CTA */}
            <div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 blur-2xl rounded-full" />
              <div className="relative z-10 flex items-start gap-4">
                <AlertCircle className="text-gold-400 shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Need Professional Career Advice?</h3>
                  <p className="text-navy-100 text-sm leading-relaxed mb-6">
                    Share your CV for professional career advice from our experts.
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                    Contact an Expert <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
