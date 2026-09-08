
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plane, Home, FileText, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, Calendar } from 'lucide-react';
import { JobApplication, RelocationCase, VisaImmigrationStatus, TravelInformation, AccommodationDetails, ArrivalTask } from '../../../types/recruitment';
import { db, auth } from '../../../lib/firebase';
import { collection, query, where, onSnapshot, setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface RelocationDashboardProps {
  applications: JobApplication[];
  candidateId: string;
}

export function RelocationDashboard({ applications, candidateId }: RelocationDashboardProps) {
  const [relocationCase, setRelocationCase] = useState<RelocationCase | null>(null);
  const [visaStatus, setVisaStatus] = useState<VisaImmigrationStatus | null>(null);
  const [travel, setTravel] = useState<TravelInformation | null>(null);
  const [accommodation, setAccommodation] = useState<AccommodationDetails | null>(null);
  const [tasks, setTasks] = useState<ArrivalTask[]>([]);
  const [loading, setLoading] = useState(true);

  const placedApp = applications.find(a => a.stage === 'placed' || a.stage === 'compliance');

  useEffect(() => {
    if (!candidateId || !placedApp) {
      setLoading(false);
      return;
    }

    // Subscribe to relocation case
    const caseQ = query(collection(db, 'relocation_cases'), where('candidateId', '==', candidateId));
    const unsubCase = onSnapshot(caseQ, (snap) => {
      if (!snap.empty) {
        setRelocationCase({ id: snap.docs[0].id, ...snap.docs[0].data() } as RelocationCase);
      } else {
        // Auto-initialize relocation case if missing but placed
        if (placedApp.stage === 'placed') {
            const initCase = async () => {
                const newCaseRef = doc(collection(db, 'relocation_cases'));
                await setDoc(newCaseRef, {
                    candidateId,
                    applicationId: placedApp.id,
                    jobId: placedApp.jobId,
                    employerId: placedApp.employerId,
                    destinationCountry: 'Germany', // Defaulting for now
                    destinationCity: 'Berlin',
                    stage: 'preparation',
                    status: 'planning',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            };
            initCase();
        }
      }
      setLoading(false);
    });

    return () => unsubCase();
  }, [candidateId, placedApp]);

  useEffect(() => {
    if (!relocationCase?.id) return;
    
    // Subscribe to tasks
    const tasksQ = query(collection(db, 'arrival_tasks'), where('relocationId', '==', relocationCase.id));
    const unsubTasks = onSnapshot(tasksQ, (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() } as ArrivalTask)));
    });

    return () => unsubTasks();
  }, [relocationCase?.id]);

  if (!placedApp) {
    return (
      <div className="p-10 text-center bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
        <Plane className="w-12 h-12 text-gray-300 mx-auto" />
        <h3 className="text-xl font-bold text-navy-900">Relocation Journey Locked</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          The Digital Relocation Experience activates automatically once you accept an official placement offer. Keep tracking your applications!
        </p>
      </div>
    );
  }

  if (loading) return <div>Loading relocation data...</div>;
  if (!relocationCase) return <div>Setting up your relocation journey...</div>;

  const handleTaskToggle = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    const taskRef = doc(db, 'arrival_tasks', taskId);
    await updateDoc(taskRef, { status: newStatus, updatedAt: serverTimestamp() });
    toast.success(`Task marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-navy-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-3 py-1 bg-gold-500 text-navy-900 text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                Active Relocation
              </span>
              <h2 className="text-3xl font-display font-bold mt-3">Destination: {relocationCase.destinationCountry}</h2>
              <p className="text-teal-400 font-medium text-sm mt-1">{relocationCase.destinationCity}</p>
            </div>
            <div className="text-right">
              <span className="block text-xs text-gray-400 uppercase tracking-widest font-bold">Stage</span>
              <span className="text-lg font-bold text-white capitalize">{relocationCase.stage}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visa & Immigration */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Visa & Immigration</h3>
          </div>
          <div className="space-y-3">
             {visaStatus ? (
               <div>
                 <p className="text-sm font-medium capitalize text-navy-900">Status: {visaStatus.status.replace('_', ' ')}</p>
                 {visaStatus.nextAction && <p className="text-xs text-gray-500 mt-1">Next Action: {visaStatus.nextAction}</p>}
               </div>
             ) : (
               <p className="text-sm text-gray-500">No active visa application tracked yet.</p>
             )}
          </div>
        </div>

        {/* Travel Information */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <Plane size={20} />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Travel Itinerary</h3>
          </div>
          <div className="space-y-3">
             {travel ? (
               <div>
                 <p className="text-sm font-medium capitalize text-navy-900">Status: {travel.status}</p>
                 {travel.departureDate && <p className="text-xs text-gray-500 mt-1">Departure: {travel.departureDate}</p>}
               </div>
             ) : (
               <p className="text-sm text-gray-500">No travel booked yet.</p>
             )}
          </div>
        </div>

        {/* Accommodation */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <Home size={20} />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Accommodation</h3>
          </div>
          <div className="space-y-3">
             {accommodation ? (
               <div>
                 <p className="text-sm font-medium capitalize text-navy-900">Status: {accommodation.status}</p>
                 {accommodation.address && <p className="text-xs text-gray-500 mt-1">Address: {accommodation.address}</p>}
               </div>
             ) : (
               <p className="text-sm text-gray-500">No accommodation details available yet.</p>
             )}
          </div>
        </div>

        {/* Arrival Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Arrival Checklist</h3>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
             {tasks.length > 0 ? (
               tasks.map(task => (
                 <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-xl">
                   <button 
                     onClick={() => handleTaskToggle(task.id!, task.status)}
                     className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${task.status === 'completed' ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}
                   >
                     {task.status === 'completed' && <CheckCircle2 size={12} />}
                   </button>
                   <div>
                     <p className={`text-sm font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-navy-900'}`}>{task.title}</p>
                     <p className="text-xs text-gray-500">{task.description}</p>
                   </div>
                 </div>
               ))
             ) : (
               <p className="text-sm text-gray-500">Your arrival tasks will appear here shortly.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
