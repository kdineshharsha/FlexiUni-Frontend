import { useState } from "react";
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { set } from "react-hook-form";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate("/login");
        setIsMobileMenuOpen(false);
    };
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            Flexi<span className="text-indigo-600">Uni</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/jobs"
                            className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Find a Job
                        </Link>
                        {(!user || user?.role === "employer") && (
                            <Link
                                to="/post-job"
                                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                            >
                                Post a Job
                            </Link>
                        )}
                        <a
                            href="#"
                            className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            About Us
                        </a>
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                            {user ? (<div className="flex items-center gap-4">
                                {/* Profile Info */}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 group-hover:ring-2 ring-indigo-500 transition-all">
                                        {user.fullName ? (
                                            user.fullName.charAt(0).toUpperCase()
                                        ) : (
                                            <User className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        {user.fullName?.split(" ")[0]}
                                    </span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                                    title="Log out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-slate-600 font-medium hover:text-slate-900 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user && (
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 group cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 group-hover:ring-2 ring-indigo-500 transition-all text-sm">
                                    {user.fullName ? (
                                        user.fullName.charAt(0).toUpperCase()
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </div>
                            </Link>
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-500 hover:text-slate-900 p-2"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <div
                className={`md:hidden bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Link
                        to="/jobs"
                        className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                    >
                        Find a Job
                    </Link>
                    {(!user || user?.role === "employer") && (
                        <Link
                            to="/post-job"
                            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                        >
                            Post a Job
                        </Link>
                    )}
                    <a
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                    >
                        About Us
                    </a>
                    <hr className="border-slate-100 my-2" />
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Log out
                        </button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/login"
                                className="w-full text-center text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="w-full text-center bg-indigo-600 text-white px-3 py-2.5 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
}
