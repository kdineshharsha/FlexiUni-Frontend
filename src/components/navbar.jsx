import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">Flexi<span className="text-indigo-600">Uni</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Find a Job</a>
                        <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Post a Job</a>
                        <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About Us</a>
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                            <Link to="/login" className="text-slate-600 font-medium hover:text-slate-900 transition-colors">Log in</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm">Sign up</Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-500 hover:text-slate-900 p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200">
                    <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-3">
                        <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Find a Job</a>
                        <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Post a Job</a>
                        <hr className="border-slate-100 my-2" />
                        <button className="w-full text-left px-3 py-2 text-base font-medium text-slate-700">Log in</button>
                        <button className="w-full bg-indigo-600 text-white px-3 py-2.5 rounded-lg font-medium">Sign up</button>
                    </div>
                </div>
            )}
        </nav>
    );
}