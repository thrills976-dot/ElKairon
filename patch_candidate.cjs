const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf8');

const oldState = `  // Active User Applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);`;

const newState = `  // Job Board State
  const [availableJobs, setAvailableJobs] = useState<JobItem[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Active User Applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);`;

code = code.replace(oldState, newState);

const oldEffect = `  // Sync Applications from Firestore if signed in
  useEffect(() => {
    if (!user) return;`;

const newEffect = `  // Fetch Real Jobs from Firestore
  useEffect(() => {
    const q = query(collection(db, 'jobs')); // Optionally add: where('status', '==', 'active')
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedJobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobItem[];
      
      // Filter out closed jobs client-side to avoid index requirement for now, or just show active
      const activeJobs = fetchedJobs.filter(job => job.status !== 'closed');
      setAvailableJobs(activeJobs);
      setLoadingJobs(false);
    }, (error) => {
      console.error("Error fetching jobs: ", error);
      setLoadingJobs(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync Applications from Firestore if signed in
  useEffect(() => {
    if (!user) return;`;

code = code.replace(oldEffect, newEffect);

const oldRank = `  // Ranked Jobs calculation
  const rankedJobs = useMemo(() => {
    const matched = rankAndMatchJobs(INITIAL_JOBS, candidateProfile || {});`;

const newRank = `  // Ranked Jobs calculation
  const rankedJobs = useMemo(() => {
    const matched = rankAndMatchJobs(availableJobs, candidateProfile || {});`;

code = code.replace(oldRank, newRank);

const oldRefresh = `              onClick={() => {
                const refreshed = rankAndMatchJobs(INITIAL_JOBS, candidateProfile || {});
                toast.success(\`AI re-matched \${refreshed.length} international roles\`);
              }}`;

const newRefresh = `              onClick={() => {
                const refreshed = rankAndMatchJobs(availableJobs, candidateProfile || {});
                toast.success(\`AI re-matched \${refreshed.length} international roles\`);
              }}`;

code = code.replace(oldRefresh, newRefresh);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
console.log("Candidate dashboard patched.");
