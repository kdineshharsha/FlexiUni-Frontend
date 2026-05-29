import { ShieldCheck, Map, Calendar, FastForward } from 'lucide-react';

export default function Benefits() {
    const BENEFITS_DATA = [
        { icon: <ShieldCheck className="w-8 h-8" />, title: "Verified Employers", desc: "Safe and secure. Every local business is manually vetted before posting on our platform." },
        { icon: <Map className="w-8 h-8" />, title: "Hyper-Local Focus", desc: "Find opportunities right around your campus, dorm, or local neighborhood." },
        { icon: <Calendar className="w-8 h-8" />, title: "Flexible Scheduling", desc: "Filter jobs by shift type to perfectly match your busy university timetable." },
        { icon: <FastForward className="w-8 h-8" />, title: "Fast Hiring", desc: "Skip the long interview processes. Connect directly with hiring managers." }
    ];

    return (
        <>
            {/* Trust/Benefits Section (Dark Theme) */}
            <section className="bg-slate-900 py-24 px-4 text-white">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose CampusWork?</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            We are building the most trusted hyper-local job platform connecting the campus community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {BENEFITS_DATA.map((benefit, index) => (
                            <div key={index} className="flex gap-6 group cursor-pointer">
                                <div className="shrink-0">
                                    <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center text-teal-400 group-hover:bg-teal-500/10 group-hover:text-teal-300 transition-colors border border-slate-700 group-hover:border-teal-500/30">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-100">{benefit.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors">
                                        {benefit.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Simple CTA Section */}
            <section className="bg-indigo-600 py-16 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:-translate-y-1">
                            Find a Job
                        </button>
                        <button className="bg-indigo-800 text-white border border-indigo-500 px-8 py-3 rounded-lg font-bold hover:bg-indigo-900 transition-all duration-300 hover:-translate-y-1">
                            Post a Job
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}