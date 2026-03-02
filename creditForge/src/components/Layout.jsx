import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-slate-900 shadow-inner shadow-black/20 relative">
                <Outlet />
            </main>
        </div>
    );
}
