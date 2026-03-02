import { Search, AlertTriangle, Scale, Users, Newspaper, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

const newsItems = [
    {
        source: 'Financial Times India',
        date: '2 Days Ago',
        headline: 'NovaTech Industries faces union <risk>strike</risk> over wage disputes at Pune plant.',
        sentiment: 'negative'
    },
    {
        source: 'Economic Observer',
        date: '1 Week Ago',
        headline: 'CEO stepping down amidst <risk>allegations</risk> of financial <risk>irregularities</risk>.',
        sentiment: 'negative'
    },
    {
        source: 'Tech & Manufacturing Daily',
        date: '3 Weeks Ago',
        headline: 'NovaTech announces successful expansion into EV components sector.',
        sentiment: 'positive'
    }
];

const legalCases = [
    {
        id: 'CS-2023-4412',
        court: 'Bombay High Court',
        type: 'Civil Dispute',
        status: 'Ongoing',
        summary: 'Supplier lawsuit regarding <risk>unpaid dues</risk> amounting to ₹4.2Cr.'
    },
    {
        id: 'DRT-2021-889',
        court: 'Debt Recovery Tribunal',
        type: 'Recovery',
        status: 'Settled',
        summary: 'Previous <risk>default</risk> on term loan from State Bank of India.'
    }
];

const directorChecks = [
    {
        name: 'Rajesh Kumar (MD)',
        findings: [
            { type: 'clear', text: 'No criminal records found in central database' },
            { type: 'risk', text: 'Associated with 2 <risk>struck-off</risk> companies previously' },
            { type: 'clear', text: 'Credit score > 750 (Experian)' }
        ]
    },
    {
        name: 'Anita Desai (CFO)',
        findings: [
            { type: 'risk', text: 'Named in recent SEBI <risk>probe</risk> regarding insider trading at former employer' },
            { type: 'clear', text: 'Education and credentials verified successfully' }
        ]
    }
];

// Helper to highlight words wrapped in <risk> tags
const HighlightRiskWords = ({ text }) => {
    const parts = text.split(/(<risk>.*?<\/risk>)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('<risk>') && part.endsWith('</risk>')) {
                    const word = part.replace(/<\/?risk>/g, '');
                    return (
                        <span key={i} className="bg-red-500/20 text-red-400 font-bold px-1 rounded border border-red-500/30">
                            {word}
                        </span>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
};

export default function AIResearch() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-inner">
                        <Search className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Secondary Intelligence</h1>
                        <p className="text-sm text-slate-400 mt-1">Web scraping, MCA data, and judicial scraping results.</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2">
                    <ShieldAlert className="h-5 w-5 text-red-400" />
                    <span className="text-sm border-r border-red-500/30 pr-3 mr-1 font-bold text-red-400">High Risk Found</span>
                    <span className="text-sm font-medium text-slate-300">8 Critical Keywords Detected</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Col - News & NLP */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-[50px] pointer-events-none"></div>
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2 relative z-10">
                            <Newspaper className="h-5 w-5 text-brand-blue" />
                            NLP Sentiment Analysis (News)
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {newsItems.map((news, idx) => (
                                <div key={idx} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium text-slate-400">{news.source} • {news.date}</span>
                                        <a href="#" className="text-brand-blue hover:text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                        <HighlightRiskWords text={news.headline} />
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                            <p className="text-xs text-slate-500 font-medium">Analyzed 145 articles from past 12 months</p>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-slate-400">Aggregated Sentiment:</span>
                                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">Negative (32%)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <Scale className="h-5 w-5 text-brand-blue" />
                            Litigation & Judicial Records
                        </h2>
                        <div className="space-y-4">
                            {legalCases.map((caseItem, idx) => (
                                <div key={idx} className="p-5 rounded-xl border border-slate-700/50 bg-slate-800/20 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow rounded-l-xl"></div>
                                    <div className="flex justify-between items-center mb-3 pl-2">
                                        <span className="text-xs font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-700">
                                            {caseItem.id}
                                        </span>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-800 text-brand-yellow border border-slate-700">
                                            {caseItem.status}
                                        </span>
                                    </div>
                                    <div className="pl-2">
                                        <p className="text-xs text-slate-400 font-medium mb-1">{caseItem.court} • {caseItem.type}</p>
                                        <p className="text-sm text-slate-200 leading-relaxed">
                                            <HighlightRiskWords text={caseItem.summary} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col - Directors & Entities */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <Users className="h-5 w-5 text-brand-blue" />
                            Key Management Personnel Backgrounds
                        </h2>

                        <div className="space-y-5">
                            {directorChecks.map((dir, idx) => (
                                <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden">
                                    <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-white">{dir.name}</h3>
                                        <span className="text-xs text-slate-500 font-medium">DIN Validated</span>
                                    </div>
                                    <div className="p-4 bg-slate-800/10 space-y-3">
                                        {dir.findings.map((finding, fi) => (
                                            <div key={fi} className="flex items-start space-x-3">
                                                {finding.type === 'clear' ? (
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                                ) : (
                                                    <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                                )}
                                                <p className={`text-sm ${finding.type === 'clear' ? 'text-slate-300' : 'text-slate-200 font-medium'}`}>
                                                    <HighlightRiskWords text={finding.text} />
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-brand-blue" />
                            Related Party Transactions
                        </h2>
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start space-x-4">
                            <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-red-400 mb-1">Entity Overlap Warning</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Significant capital transfers (₹12.5Cr) detected to <span className="font-semibold text-white">Quantum Logistics Pvt Ltd</span>, where Director Rajesh Kumar is a majority shareholder. This presents a potential <HighlightRiskWords text="<risk>siphoning</risk>" /> risk.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
