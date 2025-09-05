import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Bot } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navItems = [
        { name: 'Home', href: createPageUrl('Home') },
    ];
    return (
        <div className="min-h-screen bg-black text-gray-200 font-sans">
            <div className="fixed inset-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(5,150,105,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.2),transparent_40%)]" />
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 bg-black/50 backdrop-blur-lg border-b border-gray-800">
                <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors">
                        <Bot className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-wider">Bitscore</h1>
                </Link>
                <nav className="flex items-center gap-4">
                    {navItems.map((item) => (
                        <Link key={item.name} to={item.href}
                            className={`text-sm font-medium transition-colors ${location.pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </header>
            <main className="relative z-10 pt-24 pb-12 px-4 md:px-6">{children}</main>
            <footer className="relative z-10 text-center p-6 text-xs text-gray-600 border-t border-gray-900">
                <p>&copy; {new Date().getFullYear()} Bitscore. AI-powered crypto analysis.</p>
            </footer>
        </div>
    );
};

export default Layout;


