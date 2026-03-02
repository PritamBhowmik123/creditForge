import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center relative z-10">
                <div className="bg-brand-blue/10 p-4 rounded-2xl mb-6 border border-brand-blue/20 shadow-lg shadow-brand-blue/5">
                    <ShieldCheck className="h-12 w-12 text-brand-blue" />
                </div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-3">CreditForge AI</h2>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-px bg-slate-700"></div>
                    <span className="text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
                        Secure AI Credit Platform
                    </span>
                    <div className="w-12 h-px bg-slate-700"></div>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-slate-900/80 backdrop-blur-xl shadow-2xl py-10 px-4 sm:rounded-2xl sm:px-10 border border-slate-800 relative overflow-hidden">
                    {/* Subtle gradient border effect top */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"></div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Institutional Email
                            </label>
                            <div className="mt-2 text-slate-400">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue="officer@nbfc.com"
                                    className="block w-full rounded-lg border-0 bg-slate-950/50 py-2.5 px-3 text-white shadow-inner ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    defaultValue="password"
                                    className="block w-full rounded-lg border-0 bg-slate-950/50 py-2.5 px-3 text-white shadow-inner ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    defaultChecked
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-brand-blue focus:ring-brand-blue focus:ring-offset-slate-900"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                                    Remember device
                                </label>
                            </div>

                            <div className="text-sm text-slate-400">
                                Secured by SSO
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-brand-blue hover:bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-all"
                            >
                                Authenticate Session
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center text-xs text-slate-600 mt-6">
                    System access is restricted to authorized personnel only.
                    <br />All activity is monitored and logged.
                </p>
            </div>
        </div>
    );
}
