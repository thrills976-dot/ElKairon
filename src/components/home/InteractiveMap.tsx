import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export function InteractiveMap() {
  const hubs = [
    { country: 'Germany', x: '52%', y: '32%', talent: 'Tech & Healthcare', active: true },
    { country: 'United Kingdom', x: '48%', y: '30%', talent: 'Care & Hospitality', active: true },
    { country: 'Canada', x: '24%', y: '30%', talent: 'Trades & Transport', active: true },
    { country: 'Norway', x: '53%', y: '22%', talent: 'Logistics & Processing', active: true },
    { country: 'UAE', x: '63%', y: '45%', talent: 'Engineering & Finance', active: true },
    { country: 'Zimbabwe Hub', x: '57%', y: '72%', talent: 'Vetted Talent Pool', active: false },
  ];

  return (
    <div className="relative w-full h-[400px] bg-navy-900 rounded-3xl p-6 overflow-hidden border border-navy-800 flex flex-col justify-between shadow-2xl">
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Global Corridor Network</span>
          <h4 className="text-white font-bold text-lg">Active Placement Corridors</h4>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> Live Deployment
        </span>
      </div>

      {/* Stylized world grid dots */}
      <div className="relative w-full h-[260px] my-auto">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400" fill="none">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#0DA2E7" />
          </pattern>
          <rect width="800" height="400" fill="url(#grid)" />
        </svg>

        {/* Connection arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 57 72 Q 55 50 52 32" stroke="rgba(13, 162, 231, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
          <path d="M 57 72 Q 50 45 48 30" stroke="rgba(13, 162, 231, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
          <path d="M 57 72 Q 40 45 24 30" stroke="rgba(13, 162, 231, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
          <path d="M 57 72 Q 60 55 63 45" stroke="rgba(13, 162, 231, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
          <path d="M 57 72 Q 55 40 53 22" stroke="rgba(13, 162, 231, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
        </svg>

        {/* Interactive nodes */}
        {hubs.map((hub) => (
          <motion.div
            key={hub.country}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ left: hub.x, top: hub.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            <div className="relative">
              <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${hub.active ? 'bg-teal-400' : 'bg-gold-400'}`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hub.active ? 'bg-teal-400' : 'bg-gold-400'}`} />
              </span>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                <div className="bg-navy-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-xl border border-navy-700 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-teal-400" />
                    <span>{hub.country}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 block">{hub.talent}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-navy-800">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400 inline-block" /> Destination Market</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400 inline-block" /> Sourcing Hub</span>
      </div>
    </div>
  );
}
