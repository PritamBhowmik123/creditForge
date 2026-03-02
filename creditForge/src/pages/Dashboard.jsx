import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';

const stats = [
    { name: 'Total Applications', value: '2,845', icon: Users, change: '+12.5%', trend: 'up' },
    { name: 'Approved', value: '1,720', icon: CheckCircle2, change: '+4.2%', trend: 'up' },
    { name: 'Rejected', value: '820', icon: XCircle, change: '-1.1%', trend: 'down' },
    { name: 'Under Review', value: '305', icon: Clock, change: '+18.4%', trend: 'up' },
];

const riskData = [
    { name: 'Low Risk', value: 45, color: '#10b981' },
    { name: 'Medium Risk', value: 35, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' },
];

const sectorData = [
    { name: 'Manufacturing', value: 400 },
    { name: 'IT Services', value: 300 },
    { name: 'Retail', value: 300 },
    { name: 'Healthcare', value: 200 },
    { name: 'Real Estate', value: 150 },
];

const recentCases = [
    { id: 'APP-84592', company: 'NovaTech Industries', sector: 'Manufacturing', amount: '₹ 5.2 Cr', score: 82, status: 'Approved' },
    { id: 'APP-84591', company: 'Nexus Retail Chains', sector: 'Retail', amount: '₹ 2.8 Cr', score: 54, status: 'Under Review' },
    { id: 'APP-84590', company: 'Horizon Real Estate', sector: 'Real Estate', amount: '₹ 12.5 Cr', score: 38, status: 'Rejected' },
    { id: 'APP-84589', company: 'Apex Health Systems', sector: 'Healthcare', amount: '₹ 1.5 Cr', score: 91, status: 'Approved' },
    { id: 'APP-84588', company: 'Quantum IT Solutions', sector: 'IT Services', amount: '₹ 4.0 Cr', score: 67, status: 'Under Review' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                    <p className="text-sm text-slate-400 mt-1">Real-time credit analysis and portfolio health.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors text-sm font-medium">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-lg shadow-brand-blue/20">
                        New Application
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                                <div className="p-2 bg-slate-800/80 border border-slate-700 rounded-lg">
                                    <Icon className="h-5 w-5 text-brand-blue" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-baseline space-x-2 relative z-10">
                                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                                <span className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === 'down' && 'rotate-180'}`} />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-white mb-6">Risk Distribution</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-6 mt-2">
                        {riskData.map(item => (
                            <div key={item.name} className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-xs text-slate-400 font-medium">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-white mb-6">Applications by Sector</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip
                                    cursor={{ fill: '#1e293b' }}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Recent Loan Applications</h2>
                    <button className="text-sm text-brand-blue hover:text-blue-400 font-medium transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="text-xs text-slate-500 bg-slate-900/50 uppercase border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-wider">Application ID</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Entity Name</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Sector</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Requested Amount</th>
                                <th className="px-6 py-4 font-medium tracking-wider">AI Risk Score</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                            {recentCases.map((caseItem) => (
                                <tr key={caseItem.id} className="hover:bg-slate-800/40 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-brand-blue group-hover:text-blue-400 transition-colors cursor-pointer">{caseItem.id}</td>
                                    <td className="px-6 py-4 text-slate-200 font-medium">{caseItem.company}</td>
                                    <td className="px-6 py-4">{caseItem.sector}</td>
                                    <td className="px-6 py-4 font-medium text-slate-300">{caseItem.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[80px] overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${caseItem.score >= 80 ? 'bg-emerald-500' : caseItem.score >= 50 ? 'bg-brand-yellow' : 'bg-red-500'}`}
                                                    style={{ width: `${caseItem.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-medium text-slate-300 w-6 text-right">{caseItem.score}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold border ${caseItem.status === 'Approved'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : caseItem.status === 'Rejected'
                                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    : 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
                                            }`}>
                                            {caseItem.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
