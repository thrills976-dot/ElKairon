import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const hubs = [
  { country: 'Germany', lon: 10.4515, lat: 51.1657, talent: 'Tech & Healthcare', active: true },
  { country: 'United Kingdom', lon: -3.4360, lat: 55.3781, talent: 'Care & Hospitality', active: true },
  { country: 'Canada', lon: -106.3468, lat: 56.1304, talent: 'Trades & Transport', active: true },
  { country: 'Norway', lon: 8.4689, lat: 60.4720, talent: 'Logistics & Processing', active: true },
  { country: 'UAE', lon: 53.8478, lat: 23.4241, talent: 'Engineering & Finance', active: true },
  { country: 'Zimbabwe Hub', lon: 29.1549, lat: -19.0154, talent: 'Vetted Talent Pool', active: false },
];

export function InteractiveMap() {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  useEffect(() => {
    fetch('/countries-110m.json')
      .then(res => res.json())
      .then(worldData => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { features } = topojson.feature(worldData as any, worldData.objects.countries as any) as any;
        setGeographies(features);
      })
      .catch(err => console.error("Could not load map data", err));
  }, []);

  const width = 800;
  const height = 450;

  const projection = useMemo(() => {
    return d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  const sourceHub = hubs.find(h => !h.active)!;
  const targetHubs = hubs.filter(h => h.active);

  return (
    <div className="relative w-full h-[500px] bg-navy-950 rounded-3xl p-6 overflow-hidden border border-navy-800 shadow-2xl flex flex-col">
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Global Corridor Network</span>
          <h4 className="text-white font-bold text-lg">Active Placement Corridors</h4>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> Live Deployment
        </span>
      </div>
      
      <div className="flex-1 w-full h-full relative mt-4">
        {geographies.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-teal-500/50">
            <span className="animate-pulse text-sm">Initializing global network...</span>
          </div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <g className="map-geographies">
              {geographies.map((geo, i) => (
                <path
                  key={`geo-${i}`}
                  d={pathGenerator(geo) || ''}
                  fill="#041a2e"
                  stroke="#0f345c"
                  strokeWidth={0.5}
                  className="transition-colors duration-300 hover:fill-navy-900"
                />
              ))}
            </g>

            <g className="arcs">
              {targetHubs.map((target, i) => {
                const s = projection([sourceHub.lon, sourceHub.lat]);
                const t = projection([target.lon, target.lat]);
                if (!s || !t) return null;
                
                const dx = t[0] - s[0];
                const dy = t[1] - s[1];
                const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;

                return (
                  <motion.path
                    key={`arc-${i}`}
                    d={`M ${s[0]},${s[1]} A ${dr},${dr} 0 0,1 ${t[0]},${t[1]}`}
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                  />
                );
              })}
            </g>

            <g className="markers">
              {hubs.map((hub, i) => {
                const pos = projection([hub.lon, hub.lat]);
                if (!pos) return null;

                return (
                  <g 
                    key={`marker-${i}`} 
                    transform={`translate(${pos[0]}, ${pos[1]})`}
                    onMouseEnter={() => setHoveredHub(hub.country)}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="cursor-pointer group"
                  >
                    <circle 
                      r={hub.active ? 4 : 6} 
                      fill={hub.active ? "#0DA2E7" : "#FBBF24"} 
                      className="transition-transform duration-300 group-hover:scale-150"
                    />
                    <circle 
                      r={hub.active ? 12 : 16} 
                      fill={hub.active ? "#0DA2E7" : "#FBBF24"} 
                      opacity={0.2}
                    >
                      <animate attributeName="r" values={hub.active ? "8;16;8" : "12;24;12"} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}
            </g>

            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#0DA2E7" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {hubs.map((hub, i) => {
          if (hoveredHub !== hub.country) return null;
          
          const pos = projection([hub.lon, hub.lat]);
          if (!pos) return null;

          return (
            <div 
              key={`tooltip-${i}`}
              className="absolute pointer-events-none z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-full pb-3"
              style={{ 
                left: `${(pos[0] / width) * 100}%`, 
                top: `${(pos[1] / height) * 100}%` 
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-navy-900 border border-teal-500/30 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={12} className={hub.active ? "text-teal-400" : "text-gold-400"} />
                  <span>{hub.country}</span>
                </div>
                <span className="text-[10px] text-sky-200 block ml-4">{hub.talent}</span>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-navy-800 bg-navy-950/50 backdrop-blur-md -mx-6 px-6 -mb-6 pb-6">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block shadow-[0_0_8px_rgba(13,162,231,0.8)]" /> 
          Destination Market
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gold-400 inline-block shadow-[0_0_10px_rgba(251,191,36,0.8)]" /> 
          African Sourcing Hubs
        </span>
      </div>
    </div>
  );
}
