import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';

export function CandidateGuides() {
  const guides = [
    {
      title: "Writing a CV for UAE Employers",
      description: "Learn the format, tone, and key details UAE hiring managers look for in top candidates.",
      size: "2.4 MB PDF"
    },
    {
      title: "Preparing for International Interviews",
      description: "Master cross-cultural communication and common questions in global recruitment.",
      size: "3.1 MB PDF"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-4">Resources</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-navy-900 italic">
            Essential Guides for Candidates
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guides.map((guide, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <FileText size={24} />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">{guide.title}</h4>
              <p className="text-gray-600 mb-8 flex-1">{guide.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{guide.size}</span>
                <button 
                  className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs hover:text-teal-700 transition-colors"
                  onClick={() => {
                    import('react-hot-toast').then(toast => toast.default.success(`Downloading ${guide.title}...`));
                  }}
                >
                  Download <Download size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
