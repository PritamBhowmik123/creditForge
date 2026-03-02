import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Building2, TrendingUp, AlertTriangle, Scale, Factory, FileWarning, Wallet, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const revenueData = [
    { year: '2019', revenue: 120, ebitda: 18 },
    { year: '2020', revenue: 98, ebitda: 12 },
    { year: '2021', revenue: 145, ebitda: 22 },
    { year: '2022', revenue: 180, ebitda: 31 },
    { year: '2023', revenue: 215, ebitda: 38 },
    { year: '2024(P)', revenue: 260, ebitda: 45 },
];

const riskFlags = [
    { id: 1, title: 'GST filing mismatch detected (Oct 2023)', severity: 'high', icon: FileWarning },
    { id: 2, title: 'High leverage compared to sector average', severity: 'medium', icon: AlertTriangle },
    { id: 3, title: 'Ongoing litigation in district court', severity: 'medium', icon: Scale },
    { id: 4, title: 'Low capacity utilization (68%)', severity: 'low', icon: Factory },
];

export default function CompanyAnalysis() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-8">
            {/* Header Profile */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center space-x-5 relative z-10">
                    <div className="h-16 w-16 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center shadow-inner group-hover:border-brand-blue/50 transition-colors">
                        <Building2 className="h-8 w-8 text-brand-blue" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight text-white">NovaTech Industries Ltd.</h1>
                            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">Active</span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Manufacturing & Heavy Engineering  •  Est. 2008  •  Mumbai, MH</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 items-center relative z-10">
                    <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 font-medium mb-1">AI Risk Score</p>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-emerald-400">82</span>
                            <span className="text-xs text-slate-400">/ 100</span>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-semibold shadow-lg shadow-brand-blue/20">
                        Download Deep-Scan PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col - Overview & Flags */}
                <div className="space-y-6">
                    {/* Executive Overview List */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-brand-blue" />
                            Company Overview
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Annual Turnover', value: '₹ 215 Cr', subValue: '+18% YoY' },
                                { label: 'EBITDA (FY24)', value: '₹ 45 Cr', subValue: 'Margin: 17.3%' },
                                { label: 'Total Debt', value: '₹ 82 Cr', subValue: 'LT: ₹60Cr, ST: ₹22Cr' },
                                { label: 'Net Worth', value: '₹ 110 Cr', subValue: 'Tangible: ₹95Cr' },
                                { label: 'Promoter S.H.', value: '68.5%', subValue: 'Unpledged: 100%' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0 last:pb-0">
                                    <span className="text-sm font-medium text-slate-400">{item.label}</span>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-200">{item.value}</p>
                                        <p className="text-xs text-brand-blue/80 font-medium">{item.subValue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk Flags Panel */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-brand-yellow" />
                            Intelligence Risk Flags
                        </h2>
                        <div className="space-y-3">
                            {riskFlags.map((flag) => {
                                const Icon = flag.icon;
                                const severityColors = {
                                    high: 'border-red-500/30 bg-red-500/10 text-red-400',
                                    medium: 'border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow',
                                    low: 'border-slate-700 bg-slate-800 text-slate-300'
                                };

                                return (
                                    <div key={flag.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${severityColors[flag.severity]} transition-colors`}>
                                        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium">{flag.title}</p>
                                            <span className="text-xs opacity-80 uppercase tracking-wider font-bold mt-1 inline-block">
                                                Severity: {flag.severity}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Col - Financial Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Key Ratios Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Debt-to-Equity', value: '0.74', trend: 'down', status: 'good' },
                            { name: 'Interest Coverage', value: '5.2x', trend: 'up', status: 'good' },
                            { name: 'Current Ratio', value: '1.34', trend: 'down', status: 'warning' },
                            { name: 'DSCR', value: '1.8x', trend: 'up', status: 'good' },
                        ].map((ratio, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                                <p className="text-xs font-medium text-slate-400 mb-2">{ratio.name}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-bold text-white">{ratio.value}</p>
                                    <div className={`p-1 rounded ${ratio.status === 'good' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-yellow/20 text-brand-yellow'}`}>
                                        {ratio.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-white">Revenue & EBITDA Trend (₹ Cr)</h2>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-sm bg-brand-blue"></div>
                                    <span className="text-xs text-slate-400 font-medium">Revenue</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                                    <span className="text-xs text-slate-400 font-medium">EBITDA</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorEbitda" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                    <Area type="monotone" dataKey="ebitda" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEbitda)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Cash Flow Summary */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden relative">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-brand-blue" />
                            Cash Flow Summary (FY24)
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                            <div className="p-4 sm:p-2 sm:px-6 flex flex-col items-center">
                                <p className="text-sm font-medium text-slate-400 mb-1">Operating Activities</p>
                                <p className="text-xl font-bold text-emerald-400">₹ +32.5 Cr</p>
                            </div>
                            <div className="p-4 sm:p-2 sm:px-6 flex flex-col items-center">
                                <p className="text-sm font-medium text-slate-400 mb-1">Investing Activities</p>
                                <p className="text-xl font-bold text-red-400">₹ -18.2 Cr</p>
                            </div>
                            <div className="p-4 sm:p-2 sm:px-6 flex flex-col items-center">
                                <p className="text-sm font-medium text-slate-400 mb-1">Financing Activities</p>
                                <p className="text-xl font-bold text-red-400">₹ -12.0 Cr</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center px-4">
                            <span className="text-sm font-medium text-slate-300">Net Change in Cash</span>
                            <span className="text-lg font-bold text-emerald-400">₹ +2.3 Cr</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
