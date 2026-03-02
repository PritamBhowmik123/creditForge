import { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Calculator, PieChart, Save, RefreshCw } from 'lucide-react';

export default function Settings() {
    const [riskThreshold, setRiskThreshold] = useState(65);
    const [baseRate, setBaseRate] = useState(8.5);
    const [riskPremium, setRiskPremium] = useState(3.0);

    const [sectorWeights, setSectorWeights] = useState([
        { name: 'Manufacturing', weight: 1.2 },
        { name: 'IT Services', weight: 0.8 },
        { name: 'Real Estate', weight: 1.8 },
        { name: 'Healthcare', weight: 0.9 },
        { name: 'Retail', weight: 1.1 },
    ]);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-inner">
                        <SettingsIcon className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Model Configuration</h1>
                        <p className="text-sm text-slate-400 mt-1">Adjust AI engine parameters, thresholds, and sector weightings.</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors text-sm font-medium flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4" />
                        <span>Reset Defaults</span>
                    </button>
                    <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-lg shadow-brand-blue/20 flex items-center space-x-2 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <Save className="h-4 w-4 relative z-10" />
                        <span className="relative z-10">Save Configuration</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Col - Thresholds & Formula */}
                <div className="space-y-8">

                    {/* Risk Thresholds */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Sliders className="h-5 w-5 text-brand-blue" />
                            Global Risk Thresholds
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="auto-approve" className="text-sm font-medium text-slate-300">
                                        Auto-Approval Minimum Score (Out of 100)
                                    </label>
                                    <span className="px-3 py-1 bg-slate-950 border border-slate-700 rounded-md text-emerald-400 font-bold text-sm">
                                        {riskThreshold}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    id="auto-approve"
                                    min="50"
                                    max="95"
                                    step="1"
                                    value={riskThreshold}
                                    onChange={(e) => setRiskThreshold(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                                    <span>Lenient (50)</span>
                                    <span>Strict (95)</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <p className="text-sm text-slate-300 font-medium mb-3">Score Classification Bands</p>
                                <div className="w-full h-8 flex rounded-lg overflow-hidden border border-slate-700 text-xs font-bold items-center text-center">
                                    <div className="bg-red-500/20 text-red-500 h-full flex items-center justify-center border-r border-slate-700/50" style={{ width: '40%' }}>
                                        0 - 40 (Reject)
                                    </div>
                                    <div className="bg-brand-yellow/20 text-brand-yellow h-full flex items-center justify-center border-r border-slate-700/50" style={{ width: `${riskThreshold - 40}%` }}>
                                        41 - {riskThreshold - 1} (Review)
                                    </div>
                                    <div className="bg-emerald-500/20 text-emerald-500 h-full flex items-center justify-center" style={{ width: `${100 - riskThreshold}%` }}>
                                        {riskThreshold} - 100 (Approve)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interest Rate Engine */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-brand-blue" />
                            Dynamic Interest Engine
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Base Lending Rate (MCLR/Repo Linked)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={baseRate}
                                        onChange={(e) => setBaseRate(Number(e.target.value))}
                                        step="0.1"
                                        className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 pl-4 pr-10 text-white shadow-inner ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <span className="text-slate-500 font-bold">%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Max Risk Premium Cap</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={riskPremium}
                                        onChange={(e) => setRiskPremium(Number(e.target.value))}
                                        step="0.1"
                                        className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 pl-4 pr-10 text-white shadow-inner ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <span className="text-slate-500 font-bold">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Simulation Formula</p>
                                    <code className="text-sm font-mono text-brand-blue block">
                                        Final ROI = Base Rate + (Risk Premium × (100 - AI Score)/100)
                                    </code>
                                    <div className="mt-3 text-xs text-slate-400">
                                        Example (Score 60): {baseRate}% + ({riskPremium}% × 0.4) = <span className="font-bold text-white">{(baseRate + (riskPremium * 0.4)).toFixed(2)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Col - Sector Weights */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm h-full">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-brand-blue" />
                            Sector Risk Multipliers
                        </h2>
                        <p className="text-sm text-slate-400 mb-6">Adjust the AI's sensitivity to macroeconomic sectoral risks. Multipliers {'>'} 1.0 penalize the score.</p>

                        <div className="space-y-5">
                            {sectorWeights.map((sector, idx) => (
                                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 hover:border-slate-700 transition-colors">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-slate-200">{sector.name}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${sector.weight > 1.2 ? 'bg-red-500/20 text-red-400' :
                                                sector.weight < 1.0 ? 'bg-emerald-500/20 text-emerald-400' :
                                                    'bg-slate-800 text-slate-300'
                                            }`}>
                                            {sector.weight.toFixed(2)}x
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2.5"
                                        step="0.1"
                                        value={sector.weight}
                                        onChange={(e) => {
                                            const newWeights = [...sectorWeights];
                                            newWeights[idx].weight = Number(e.target.value);
                                            setSectorWeights(newWeights);
                                        }}
                                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3 p-3 bg-brand-blue/5 border-l-2 border-brand-blue rounded-r-lg">
                            <SettingsIcon className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-300 leading-relaxed">
                                <span className="font-bold text-white block mb-1">Impact Note:</span>
                                Changes to sector multipliers require re-running the intelligence pipeline for all active applications in the queue to maintain portfolio consistency.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
