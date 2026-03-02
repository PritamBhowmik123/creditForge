import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Activity, ShieldAlert, Cpu, Network, Info } from 'lucide-react';

const fiveCsData = [
    { subject: 'Character', A: 85, fullMark: 100 },
    { subject: 'Capacity', A: 65, fullMark: 100 },
    { subject: 'Capital', A: 75, fullMark: 100 },
    { subject: 'Collateral', A: 45, fullMark: 100 },
    { subject: 'Conditions', A: 60, fullMark: 100 },
];

const riskFactors = [
    { factor: 'Revenue Stability', score: 80, weight: '25%', impact: 'Positive' },
    { factor: 'Debt Ratio', score: 60, weight: '20%', impact: 'Neutral' },
    { factor: 'Litigation History', score: 40, weight: '20%', impact: 'Negative' },
    { factor: 'Promoter Background', score: 75, weight: '15%', impact: 'Positive' },
    { factor: 'Sector Outlook', score: 70, weight: '20%', impact: 'Positive' },
];

export default function RiskScoring() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-inner">
                        <Activity className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Risk Engine & Explainability</h1>
                        <p className="text-sm text-slate-400 mt-1">Transparent breakdown of AI credit evaluations.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col - Overall Score & Breakdown */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
                        <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-[40px] pointer-events-none"></div>
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Composite AI Risk Score</h2>
                            <p className="text-sm text-slate-400">Calculated using 450+ data points and deep learning models.</p>
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="text-right">
                                <p className="text-3xl font-bold text-brand-yellow">68<span className="text-lg text-slate-500 font-medium">/100</span></p>
                                <p className="text-xs font-semibold text-brand-yellow uppercase tracking-widest mt-1">Medium Risk</p>
                            </div>
                            <div className="h-16 w-16 relative">
                                <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                                    <path
                                        className="text-slate-800"
                                        strokeWidth="3"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="text-brand-yellow"
                                        strokeDasharray="68, 100"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Network className="h-5 w-5 text-brand-blue" />
                                Score Explainability Breakdown
                            </h2>
                            <button className="text-slate-400 hover:text-white transition-colors">
                                <Info className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="text-xs text-slate-500 bg-slate-950 uppercase border-b border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-medium tracking-wider">Factor</th>
                                        <th className="px-6 py-4 font-medium tracking-wider">Computed Score</th>
                                        <th className="px-6 py-4 font-medium tracking-wider">Model Weight</th>
                                        <th className="px-6 py-4 font-medium tracking-wider">Net Impact</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/80 bg-slate-900">
                                    {riskFactors.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-slate-200">{item.factor}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className={`font-bold w-6 text-right ${item.score >= 75 ? 'text-emerald-400' :
                                                            item.score >= 50 ? 'text-brand-yellow' : 'text-red-400'
                                                        }`}>{item.score}</span>
                                                    <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[80px] overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${item.score >= 75 ? 'bg-emerald-500' :
                                                                    item.score >= 50 ? 'bg-brand-yellow' : 'bg-red-500'
                                                                }`}
                                                            style={{ width: `${item.score}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-300">{item.weight}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${item.impact === 'Positive'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : item.impact === 'Negative'
                                                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                            : 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
                                                    }`}>
                                                    {item.impact}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 text-xs text-slate-500">
                            * Weights are dynamically adjusted based on sector: Manufacturing
                        </div>
                    </div>
                </div>

                {/* Right Col - Radar Chart & Insights */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-white mb-2 self-start flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-brand-blue" />
                            Five C's of Credit
                        </h2>
                        <p className="text-xs text-slate-400 self-start mb-4">Multi-dimensional risk mapping</p>

                        <div className="w-full h-64 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={fiveCsData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Company Profile"
                                        dataKey="A"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fill="#3b82f6"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-brand-yellow" />
                            Key AI Deductions
                        </h2>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-300 pl-4 border-l-2 border-brand-blue leading-relaxed">
                                Strong historical revenue stability mitigates recent dips in operating margin.
                            </li>
                            <li className="text-sm text-slate-300 pl-4 border-l-2 border-red-500 leading-relaxed">
                                Ongoing district court litigation severely dragged down the composite score by <span className="font-bold text-white">12 points</span>.
                            </li>
                            <li className="text-sm text-slate-300 pl-4 border-l-2 border-emerald-500 leading-relaxed">
                                Promoters have untarnished history and excellent personal credit profiles.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
