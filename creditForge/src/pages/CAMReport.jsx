import { FileText, Download, Printer, CheckCircle, XCircle, AlertTriangle, Briefcase, Building } from 'lucide-react';

export default function CAMReport() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-inner">
                        <FileText className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Credit Assessment Memo</h1>
                        <p className="text-sm text-slate-400 mt-1">AI-generated comprehensive credit report.</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors text-sm font-medium flex items-center space-x-2">
                        <Printer className="h-4 w-4" />
                        <span>Print</span>
                    </button>
                    <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-lg shadow-brand-blue/20 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download CAM as PDF</span>
                    </button>
                </div>
            </div>

            {/* Document Container */}
            <div className="bg-slate-200 text-slate-900 rounded-sm shadow-2xl overflow-hidden font-serif leading-relaxed">
                {/* Header */}
                <div className="border-b-4 border-slate-900 p-8 sm:p-12 bg-white">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                                <Building className="h-8 w-8 text-slate-800" />
                                CreditForge AI
                            </h2>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Secure AI Credit Platform</p>
                        </div>
                        <div className="text-right text-sm">
                            <p><span className="font-bold">Date:</span> 24 Oct 2024</p>
                            <p><span className="font-bold">App ID:</span> APP-84592</p>
                            <p><span className="font-bold">Analyst:</span> AI Engine v2.4</p>
                        </div>
                    </div>

                    <div className="bg-slate-100 p-6 rounded border border-slate-300">
                        <h3 className="text-xl font-bold mb-2">Target Entity: NovaTech Industries Ltd.</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase">Requested Amt</p>
                                <p className="font-semibold text-lg">₹ 5.2 Cr</p>
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase">Facility Type</p>
                                <p className="font-semibold text-lg">Term Loan</p>
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase">Tenure</p>
                                <p className="font-semibold text-lg">60 Months</p>
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase">AI Risk Score</p>
                                <p className="font-bold text-lg text-emerald-700">82/100 (Low Risk)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-12 space-y-10 bg-white">
                    {/* Executive Summary */}
                    <section>
                        <h4 className="text-lg font-black uppercase border-b-2 border-slate-900 pb-2 mb-4 flex items-center gap-2">
                            <Briefcase className="h-5 w-5" /> Executive Summary
                        </h4>
                        <p className="text-justify text-slate-800">
                            NovaTech Industries Ltd. has submitted a request for a fresh Term Loan of ₹5.2 Crore for capacity expansion at their Pune facility. The AI analysis engine has evaluated 3 years of audited financials, real-time GST filings, and secondary intelligence vectors. The company exhibits robust <span className="font-bold">YoY revenue growth of 18%</span> and maintains a healthy interest coverage ratio of 5.2x. Despite minor litigations typical for the manufacturing sector, the overall credit profile remains strong.
                        </p>
                    </section>

                    {/* Business Overview */}
                    <section>
                        <h4 className="text-lg font-black uppercase border-b-2 border-slate-900 pb-2 mb-4">Business Overview</h4>
                        <ul className="list-disc pl-5 space-y-2 text-slate-800">
                            <li><span className="font-bold">Industry:</span> Manufacturing & Heavy Engineering (Sector Outlook: Positive)</li>
                            <li><span className="font-bold">Incorporation:</span> 2008 (16 years of operational history)</li>
                            <li><span className="font-bold">Promoters:</span> Mr. Rajesh Kumar (MD) & Mrs. Anita Desai (CFO)</li>
                            <li><span className="font-bold">Key Clients:</span> L&T, Tata Motors, Mahindra & Mahindra (Low client concentration risk)</li>
                        </ul>
                    </section>

                    {/* Financial Assessment */}
                    <section>
                        <h4 className="text-lg font-black uppercase border-b-2 border-slate-900 pb-2 mb-4">Financial Assessment</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse border border-slate-300">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="border border-slate-300 p-2 font-bold">Metric (₹ Cr)</th>
                                        <th className="border border-slate-300 p-2 font-bold">FY22</th>
                                        <th className="border border-slate-300 p-2 font-bold">FY23</th>
                                        <th className="border border-slate-300 p-2 font-bold">FY24(P)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-medium">Revenue</td>
                                        <td className="border border-slate-300 p-2">180.0</td>
                                        <td className="border border-slate-300 p-2">215.0</td>
                                        <td className="border border-slate-300 p-2 font-bold">260.0</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-medium">EBITDA</td>
                                        <td className="border border-slate-300 p-2">31.0</td>
                                        <td className="border border-slate-300 p-2">38.0</td>
                                        <td className="border border-slate-300 p-2 font-bold">45.0</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-medium">Net Worth</td>
                                        <td className="border border-slate-300 p-2">78.5</td>
                                        <td className="border border-slate-300 p-2">92.0</td>
                                        <td className="border border-slate-300 p-2 font-bold">110.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm text-slate-700 italic border-l-4 border-slate-400 pl-3">
                            * GST filings (GSTR-3B) exactly match the provisional FY24 revenue figures, confirming 100% data integrity.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Strengths */}
                        <section>
                            <h4 className="text-lg font-black uppercase border-b-2 border-emerald-700 text-emerald-900 pb-2 mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-emerald-600" /> Key Strengths
                            </h4>
                            <ul className="space-y-3 text-sm text-slate-800">
                                <li className="flex gap-2"><span className="text-emerald-600 font-bold">+</span> Low Debt-to-Equity (0.74x) leaves ample room for leverage.</li>
                                <li className="flex gap-2"><span className="text-emerald-600 font-bold">+</span> Excellent DSCR of 1.8x indicates strong repayment capability.</li>
                                <li className="flex gap-2"><span className="text-emerald-600 font-bold">+</span> Consistent positive operating cash flows over 5 years.</li>
                            </ul>
                        </section>

                        {/* Weaknesses / Risks */}
                        <section>
                            <h4 className="text-lg font-black uppercase border-b-2 border-red-800 text-red-900 pb-2 mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600" /> Key Risks
                            </h4>
                            <ul className="space-y-3 text-sm text-slate-800">
                                <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> Pending civil litigation with supplier (₹4.2Cr).</li>
                                <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> Current Ratio of 1.34x is slightly below optimal industry benchmark (1.5x).</li>
                            </ul>
                        </section>
                    </div>

                    {/* Final Recommendation */}
                    <section className="bg-slate-100 p-6 rounded border border-slate-300">
                        <h4 className="text-lg font-black uppercase border-b-2 border-slate-400 pb-2 mb-4">Final Recommendation</h4>
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-600 text-white px-4 py-2 font-black rounded text-xl uppercase tracking-widest">
                                Approve
                            </div>
                            <p className="text-slate-800 leading-relaxed font-medium">
                                Based on the comprehensive AI assessment, the entity demonstrates strong repayment capacity, verified promoter backgrounds, and verified financial growth. The requested facility of <span className="font-bold">₹5.2 Cr</span> is recommended for <span className="font-bold text-emerald-700">APPROVAL</span> subject to standard covenants.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
