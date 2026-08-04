const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf-8');

// Add imports
code = code.replace("import { collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';", "import { collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';\nimport { ref, uploadBytes, getDownloadURL } from 'firebase/storage';\nimport { storage } from '../../lib/firebase';");

// State for CV
code = code.replace("const [cvUploaded, setCvUploaded] = useState(false);", "const [cvUploaded, setCvUploaded] = useState(false);\n  const [cvName, setCvName] = useState('');\n  const [cvUrl, setCvUrl] = useState('');\n  const [uploading, setUploading] = useState(false);");

// Fetch profile
const fetchProfile = `
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
`;

code = code.replace("// Fetch Active Jobs", fetchProfile + "\n    // Fetch Active Jobs");

// Upload Handler
const uploadHandler = `
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    setUploading(true);
    try {
      const storageRef = ref(storage, \`cvs/\${user.uid}_\${Date.now()}_\${file.name}\`);
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
`;

code = code.replace("const handleApply = async", uploadHandler + "\n  const handleApply = async");

// UI Changes
const oldUploadUI = `<div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <span className="font-bold text-navy-900 text-sm mb-1">Upload Resume / CV</span>
                  <span className="text-xs text-gray-500">PDF, DOCX up to 5MB</span>
                </div>`;

const newUploadUI = `<label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} />
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <span className="font-bold text-navy-900 text-sm mb-1">{uploading ? 'Uploading...' : 'Upload Resume / CV'}</span>
                  <span className="text-xs text-gray-500">PDF, DOCX up to 5MB</span>
                </label>`;

code = code.replace(oldUploadUI, newUploadUI);

const oldUploadedItem = `<p className="text-sm font-bold text-navy-900">resume_2026.pdf</p>`;
const newUploadedItem = `<a href={cvUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-navy-900 hover:underline">{cvName || 'My CV'}</a>`;
code = code.replace(oldUploadedItem, newUploadedItem);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
