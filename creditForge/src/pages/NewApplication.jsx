import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, Circle, ArrowRight, Loader2, Sparkles, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewApplication() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const steps = [
        { name: 'Extracting Financials', description: 'Parsing P&L and Balance Sheet from PDF' },
        { name: 'Running Research Agent', description: 'Checking secondary intelligence & news' },
        { name: 'Calculating Risk', description: 'Evaluating 40+ financial indicators' },
        { name: 'Generating CAM', description: 'Drafting Credit Assessment Memo' },
    ];

    const handleRunAnalysis = () => {
        setIsProcessing(true);
        let step = 0;
        const interval = setInterval(() => {
            step += 1;
            setActiveStep(step);
            if (step >= steps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsProcessing(false);
                }, 1000);
            }
        }, 2000); // 2 second per step
    };

    useEffect(() => {
        return () => setIsProcessing(false); // Cleanup on unmount
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-brand-blue" />
                    New Credit Application
                </h1>
                <p className="text-sm text-slate-400 mt-1">Upload required documents to initiate AI-powered analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden relative">
                        {/* Subtle glow effect */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>

                        <h2 className="text-lg font-semibold text-white mb-6">Document Uploads</h2>

                        <div className="space-y-4">
                            {[
                                { label: 'Financial Statements (PDF)', req: 'Required', desc: 'Audited P&L and Balance Sheet' },
                                { label: 'GST Data (CSV)', req: 'Required', desc: 'Last 12 months GSTR-3B' },
                                { label: 'Bank Statements', req: 'Required', desc: '6 months primary account' },
                                { label: 'ITR Filing (PDF)', req: 'Required', desc: 'Latest assessment year' },
                            ].map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer border-dashed">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2.5 bg-slate-950 rounded-lg group-hover:bg-brand-blue/20 group-hover:text-brand-blue group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all text-slate-400 border border-slate-800 group-hover:border-brand-blue/30">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200">{doc.label}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{doc.desc} • <span className="text-brand-yellow/80">{doc.req}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">Browse</span>
                                        <Upload className="h-4 w-4 text-slate-500 group-hover:text-brand-blue transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">
                                Credit Officer Notes
                            </label>
                            <textarea
                                id="notes"
                                rows={4}
                                className="block w-full rounded-xl border-0 bg-slate-950/80 py-3 px-4 text-white shadow-inner ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6 transition-all"
                                placeholder="Add contextual parameters for the AI engine..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Real-time processing */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm sticky top-8">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-brand-blue" />
                            AI Execution Engine
                        </h2>
                        <p className="text-xs text-slate-400 mb-6">Real-time status of analysis pipeline</p>

                        <button
                            onClick={handleRunAnalysis}
                            disabled={isProcessing || activeStep >= steps.length}
                            className="w-full mb-8 flex items-center justify-center space-x-2 rounded-xl bg-brand-blue hover:bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Processing Context...</span>
                                </>
                            ) : activeStep >= steps.length ? (
                                <>
                                    <CheckCircle className="h-5 w-5 text-white" />
                                    <span>Analysis Completed</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    <span>Execute Analysis</span>
                                </>
                            )}
                        </button>

                        <div className="space-y-6 pl-2">
                            {steps.map((step, idx) => {
                                const isActive = activeStep === idx;
                                const isCompleted = activeStep > idx;

                                return (
                                    <div key={idx} className="relative flex space-x-4">
                                        {/* Line connecting steps */}
                                        {idx !== steps.length - 1 && (
                                            <div className={`absolute top-6 left-[11px] -bottom-6 w-px ${isCompleted ? 'bg-brand-blue' : 'bg-slate-800'}`}></div>
                                        )}

                                        <div className="relative flex-none mt-1 z-10">
                                            {isCompleted ? (
                                                <CheckCircle className="h-6 w-6 text-brand-blue bg-slate-900 rounded-full" />
                                            ) : isActive && isProcessing ? (
                                                <div className="h-6 w-6 bg-slate-900 rounded-full flex items-center justify-center">
                                                    <Loader2 className="h-5 w-5 text-brand-yellow animate-spin" />
                                                </div>
                                            ) : (
                                                <Circle className="h-6 w-6 text-slate-700 bg-slate-900 rounded-full" />
                                            )}
                                        </div>

                                        <div className="flex-1 pb-2">
                                            <p className={`text-sm font-semibold transition-colors ${isActive || isCompleted ? 'text-white' : 'text-slate-500'}`}>
                                                {step.name}
                                            </p>
                                            <p className={`text-xs mt-1 transition-colors ${isActive && isProcessing ? 'text-brand-yellow font-medium' : 'text-slate-500'}`}>
                                                {step.description}
                                            </p>

                                            {isActive && isProcessing && (
                                                <div className="mt-3 w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                                                    <div className="bg-brand-yellow/80 h-full rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-full origin-left scale-x-50"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {activeStep >= steps.length && !isProcessing && (
                            <div className="mt-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500 backdrop-blur-sm">
                                <CheckCircle className="h-10 w-10 text-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <div>
                                    <h3 className="text-sm font-bold text-emerald-400">Analysis Complete</h3>
                                    <p className="text-xs text-emerald-500/70 mt-1">Intelligence model compiled 4.2k data points.</p>
                                </div>
                                <button
                                    onClick={() => navigate('/company-analysis')}
                                    className="flex items-center space-x-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 px-5 py-2.5 rounded-lg transition-all w-full justify-center mt-2 group"
                                >
                                    <span>View Company Analysis</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
