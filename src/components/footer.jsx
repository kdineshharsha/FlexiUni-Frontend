import { GraduationCap, } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-lg text-slate-900">Flexi<span className="text-indigo-600">Uni</span></span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Connecting university students with reliable local businesses for flexible part-time work.
                        </p>
                    </div>

                    {/* Links: For Students */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">For Students</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Browse Jobs</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Career Advice</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Resume Builder</a></li>
                        </ul>
                    </div>

                    {/* Links: For Employers */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">For Employers</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Post a Job</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Hiring Guide</a></li>
                        </ul>
                    </div>

                    {/* Links: Support */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Contact Us</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar (Copyright & Socials) */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">© 2026 FlexiUni Inc. All rights reserved.</p>

                    {/* Social Icons with Smooth Transitions */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                            {/* <Linkedin className="w-5 h-5" /> */}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                            {/* <Twitter className="w-5 h-5" /> */}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                            {/* <Instagram className="w-5 h-5" /> */}
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}