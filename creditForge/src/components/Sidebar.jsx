import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileUp, Building2, BrainCircuit, Activity, FileText, Settings, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'New Application', href: '/new-application', icon: FileUp },
        { name: 'Company Analysis', href: '/company-analysis', icon: Building2 },
        { name: 'AI Research', href: '/ai-research', icon: BrainCircuit },
        { name: 'Risk Engine', href: '/risk-scoring', icon: Activity },
        { name: 'CAM Report', href: '/cam-report', icon: FileText },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="w-64 flex-shrink-0 bg-slate-950 flex flex-col h-full border-r border-slate-800">
            <div className="p-6 flex items-center space-x-3 mb-2">
                <div className="bg-brand-blue/20 p-2 rounded-lg border border-brand-blue/30 shadow-inner shadow-brand-blue/10">
                    <ShieldCheck className="h-6 w-6 text-brand-blue" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">CreditForge AI</span>
            </div>

            <div className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                    ? 'bg-slate-800 text-white font-medium shadow-sm border border-slate-700/50'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            <Icon className={`h-5 w-5 ${isActive ? 'text-brand-blue' : 'text-slate-500'}`} />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800 mt-auto bg-slate-950/50">
                <div className="flex items-center space-x-3 px-2 py-2">
                    <div className="h-9 w-9 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-200">Jane Doe</p>
                        <p className="text-xs text-slate-500">Sr. Credit Officer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
