import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Download, 
  RefreshCw,
  Globe2,
  Clock,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

// 1. Monthly Candidate Growth & Verification Data
const MONTHLY_GROWTH_DATA = [
  { month: 'Oct 2025', totalCandidates: 420, verifiedTalent: 310, fastTrackReady: 180, placements: 34, placementRate: 82 },
  { month: 'Nov 2025', totalCandidates: 560, verifiedTalent: 430, fastTrackReady: 260, placements: 48, placementRate: 84 },
  { month: 'Dec 2025', totalCandidates: 680, verifiedTalent: 540, fastTrackReady: 340, placements: 62, placementRate: 85 },
  { month: 'Jan 2026', totalCandidates: 830, verifiedTalent: 670, fastTrackReady: 450, placements: 79, placementRate: 88 },
  { month: 'Feb 2026', totalCandidates: 990, verifiedTalent: 810, fastTrackReady: 560, placements: 95, placementRate: 91 },
  { month: 'Mar 2026', totalCandidates: 1180, verifiedTalent: 980, fastTrackReady: 710, placements: 118, placementRate: 93 },
  { month: 'Apr 2026 (YTD)', totalCandidates: 1350, verifiedTalent: 1140, fastTrackReady: 840, placements: 142, placementRate: 94 },
];

// 2. Growth by Sector & Placement Efficiency
const SECTOR_METRICS_DATA = [
  { 
    sector: 'Healthcare & Nursing', 
    activeCandidates: 480, 
    activeVacancies: 120, 
    placedCandidates: 94, 
    avgPlacementDays: 14, 
    visaApprovalRate: 98.2 
  },
  { 
    sector: 'IT & Cloud Engineering', 
    activeCandidates: 340, 
    activeVacancies: 95, 
    placedCandidates: 78, 
    avgPlacementDays: 12, 
    visaApprovalRate: 96.5 
  },
  { 
    sector: 'Construction & Trades', 
    activeCandidates: 260, 
    activeVacancies: 70, 
    placedCandidates: 58, 
    avgPlacementDays: 18, 
    visaApprovalRate: 93.0 
  },
  { 
    sector: 'Hospitality & Gastronomy', 
    activeCandidates: 180, 
    activeVacancies: 50, 
    placedCandidates: 42, 
    avgPlacementDays: 16, 
    visaApprovalRate: 92.4 
  },
  { 
    sector: 'Logistics & Supply Chain', 
    activeCandidates: 90, 
    activeVacancies: 30, 
    placedCandidates: 26, 
    avgPlacementDays: 19, 
    visaApprovalRate: 91.8 
  },
];

// 3. Regional Sourcing Hub Distribution
const REGIONAL_DISTRIBUTION_DATA = [
  { name: 'North Africa (Tunisia, Morocco, Egypt)', value: 460, color: '#0D9488', percentage: '34%' },
  { name: 'East Africa (Kenya, Uganda, Rwanda)', value: 380, color: '#0A192F', percentage: '28%' },
  { name: 'West Africa (Nigeria, Ghana, Senegal)', value: 290, color: '#D97706', percentage: '21%' },
  { name: 'Southern Africa (South Africa, Zimbabwe)', value: 140, color: '#3B82F6', percentage: '11%' },
  { name: 'Asia-Pacific & Other Hubs', value: 80, color: '#6366F1', percentage: '6%' },
];

// 4. Hiring Funnel & Placement Milestones
const PIPELINE_CONVERSION_DATA = [
  { stage: '1. Candidate Sourced & Screened', count: 1350, percentage: 100, fill: '#0A192F' },
  { stage: '2. B2/C1 Tested & Recognized', count: 1140, percentage: 84.4, fill: '#1E3A8A' },
  { stage: '3. Employer Shortlisted & Interviewed', count: 860, percentage: 63.7, fill: '#0D9488' },
  { stage: '4. Official Employment Offer', count: 520, percentage: 38.5, fill: '#14B8A6' },
  { stage: '5. § 81a Fast-Track Visa Clearance', count: 490, percentage: 36.2, fill: '#D97706' },
  { stage: '6. Relocated & Onboarded', count: 478, percentage: 35.4, fill: '#10B981' },
];

// Custom Tooltip Component for consistent ElKairon luxury styling
const CustomRechartsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-950/95 backdrop-blur-md border border-teal-500/40 p-3.5 rounded-2xl shadow-xl text-white text-xs space-y-1.5 z-50 min-w-[200px]">
        <div className="font-bold text-teal-300 border-b border-white/10 pb-1.5 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400">Verified Metric</span>
        </div>
        <div className="space-y-1 pt-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.color || entry.fill }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-extrabold text-white">
                {typeof entry.value === 'number' 
                  ? entry.name.includes('Rate') || entry.name.includes('%') 
                    ? `${entry.value}%` 
                    : entry.value.toLocaleString() 
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function EmployerAnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<'6m' | '12m' | 'all'>('6m');
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'candidates' | 'placements'>('all');

  const filteredGrowthData = useMemo(() => {
    if (timeRange === '6m') {
      return MONTHLY_GROWTH_DATA.slice(-6);
    }
    return MONTHLY_GROWTH_DATA;
  }, [timeRange]);

  const handleExportReport = () => {
    const summary = `ElKairon Global Connect - Candidate Growth & Placement Report (Generated ${new Date().toLocaleDateString()})\n` +
      `--------------------------------------------------------------------------------\n` +
      `Total Verified Candidates: 1,350+\n` +
      `§ 81a Fast-Track Visa Approval Rate: 94.2%\n` +
      `Active Placements Completed: 142\n` +
      `Average Sourcing Velocity: 14.8 Days\n` +
      `Primary Sectors: Healthcare (98.2%), IT & Cloud (96.5%), Skilled Trades (93.0%)\n` +
      `Key Sourcing Hubs: North Africa (34%), East Africa (28%), West Africa (21%)`;
    
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `elkairon-recruitment-analytics-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Analytics summary report downloaded successfully.');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header with Controls and Quick KPIs */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={14} className="text-teal-600" />
              <span>Real-Time Placement Intelligence</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-white text-[10px] font-bold">
              Recharts Data Visualizer
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900">
            Talent Growth & Active Placement Metrics
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-2xl">
            Live telemetry tracking candidate pool expansion across North and Sub-Saharan African talent hubs, § 81a German work authorization velocity, and placement conversion rates.
          </p>
        </div>

        {/* Action Buttons & Timeframe Selector */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-bold text-navy-900">
            <button
              type="button"
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '6m' ? 'bg-white shadow-xs text-navy-950 font-extrabold' : 'text-gray-600 hover:text-navy-900'}`}
            >
              Last 6 Months
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'all' ? 'bg-white shadow-xs text-navy-950 font-extrabold' : 'text-gray-600 hover:text-navy-900'}`}
            >
              Full Year (2025-2026)
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportReport}
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white p-5 rounded-3xl shadow-sm border border-navy-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Total Talent Inflow</span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-teal-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">1,350+</span>
            <span className="text-xs font-extrabold text-teal-400 flex items-center gap-0.5">
              <ArrowUpRight size={12} /> +28.4% YoY
            </span>
          </div>
          <p className="text-[11px] text-gray-400">1,140 fully verified & credentialed</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
            <span>Placement Success Rate</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-navy-900">94.2%</span>
            <span className="text-xs font-extrabold text-teal-600 flex items-center gap-0.5">
              <ArrowUpRight size={12} /> +4.1%
            </span>
          </div>
          <p className="text-[11px] text-gray-500">From shortlist to visa granted</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
            <span>Fast-Track Turnaround</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-navy-900">14.8 Days</span>
            <span className="text-xs font-extrabold text-amber-600">§ 81a Priority</span>
          </div>
          <p className="text-[11px] text-gray-500">vs 6+ months standard embassy queue</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
            <span>Active Vacancy Placements</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-navy-900">142</span>
            <span className="text-xs font-extrabold text-blue-600">Active Cycle</span>
          </div>
          <p className="text-[11px] text-gray-500">Across 38 German enterprise partners</p>
        </div>
      </div>

      {/* 3. Primary Chart: Candidate Growth Trajectory & Verification Velocity (AreaChart) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-navy-900">Candidate Talent Pool Expansion Trajectory</h3>
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-extrabold uppercase">
                Verified Inflow
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Visualizing overall talent registrations, AI assessment completions, and embassy visa-ready candidate pools.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-navy-900">
              <span className="w-3 h-3 rounded-full bg-navy-900" />
              Total Talent
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-teal-700 ml-2">
              <span className="w-3 h-3 rounded-full bg-teal-600" />
              AI Verified
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-700 ml-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Fast-Track Ready
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredGrowthData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A192F" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0A192F" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorFastTrack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                axisLine={{ stroke: '#E2E8F0' }} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomRechartsTooltip />} />
              <Area 
                type="monotone" 
                dataKey="totalCandidates" 
                name="Total Candidates" 
                stroke="#0A192F" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
              <Area 
                type="monotone" 
                dataKey="verifiedTalent" 
                name="AI Verified & Tested" 
                stroke="#0D9488" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorVerified)" 
              />
              <Area 
                type="monotone" 
                dataKey="fastTrackReady" 
                name="§ 81a Fast-Track Ready" 
                stroke="#F59E0B" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorFastTrack)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Dual Section: Active Placements & Sector Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 2: Active Job Placement Rates & Conversion Curve */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-navy-900">Active Job Placements & Conversion Rate</h3>
              <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                94% Target Met
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Monthly confirmed international employment contracts vs overall applicant placement success rate.
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10, fill: '#64748B' }} 
                  axisLine={{ stroke: '#E2E8F0' }} 
                  tickLine={false} 
                />
                <YAxis 
                  yAxisId="left" 
                  tick={{ fontSize: 10, fill: '#64748B' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={[60, 100]} 
                  unit="%" 
                  tick={{ fontSize: 10, fill: '#0D9488' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip content={<CustomRechartsTooltip />} />
                <Bar 
                  yAxisId="left" 
                  dataKey="placements" 
                  name="Monthly Placements" 
                  fill="#0A192F" 
                  radius={[6, 6, 0, 0]} 
                  barSize={24} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="placementRate" 
                  name="Placement Success Rate (%)" 
                  stroke="#0D9488" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0D9488', strokeWidth: 2, stroke: '#FFFFFF' }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between text-xs text-gray-600">
            <span className="font-medium">Average Monthly Placement Volume:</span>
            <span className="font-bold text-navy-950">92 candidates / month</span>
          </div>
        </div>

        {/* Chart 3: Sector Breakdown & Fast-Track Visa Approval (BarChart) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-navy-900">Placement Efficiency by Sector</h3>
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Healthcare Leading
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Active candidates vs confirmed job placements and average turnaround time per German industry.
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={SECTOR_METRICS_DATA} 
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="sector" 
                  tick={{ fontSize: 10, fill: '#0A192F', fontWeight: 600 }} 
                  axisLine={{ stroke: '#E2E8F0' }} 
                  tickLine={false} 
                  width={120}
                />
                <Tooltip content={<CustomRechartsTooltip />} />
                <Bar 
                  dataKey="activeCandidates" 
                  name="Active Talent Pool" 
                  fill="#E2E8F0" 
                  radius={[0, 4, 4, 0]} 
                  barSize={10} 
                />
                <Bar 
                  dataKey="placedCandidates" 
                  name="Placed Candidates" 
                  fill="#0D9488" 
                  radius={[0, 4, 4, 0]} 
                  barSize={10} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-teal-50/60 rounded-xl text-teal-900 font-semibold flex items-center justify-between">
              <span>Healthcare Avg Speed:</span>
              <span className="font-bold">14 Days</span>
            </div>
            <div className="p-2.5 bg-blue-50/60 rounded-xl text-blue-900 font-semibold flex items-center justify-between">
              <span>IT / Cloud Avg Speed:</span>
              <span className="font-bold">12 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Regional Talent Sourcing Hubs & Pipeline Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Regional Hubs Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">African & International Sourcing Hubs</h3>
            <p className="text-xs text-gray-500">
              Geographic distribution of accredited, language-verified talent across our continental partner offices.
            </p>
          </div>

          <div className="w-full h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={REGIONAL_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {REGIONAL_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomRechartsTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Centered Donut Stat */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-navy-950">1,350+</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Talent</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            {REGIONAL_DISTRIBUTION_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 font-medium truncate max-w-[200px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-900">{item.value}</span>
                  <span className="text-[11px] text-gray-400">({item.percentage})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Pipeline Conversion Funnel (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-navy-900">Placement Pipeline Conversion Funnel</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={13} />
                <span>Zero Drop-Off at Embassy</span>
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Step-by-step conversion efficiency from initial vetting to German employer onboarding.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {PIPELINE_CONVERSION_DATA.map((step, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-navy-900">{step.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-navy-950">{step.count} candidates</span>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {step.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${step.percentage}%`, 
                      backgroundColor: step.fill 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 flex items-start gap-3 mt-2">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-950 space-y-0.5">
              <span className="font-bold">AI Matching & Fast-Track Advantage:</span>
              <p className="text-teal-800 leading-relaxed">
                By pre-verifying language proficiency (Telc/Goethe) and academic equivalence (ZAB/Defizitbescheid) before employer submission, placement conversion reaches <strong>35.4% from intake</strong> compared to industry averages of ~4.2%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
