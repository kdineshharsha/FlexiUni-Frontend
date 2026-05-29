import { DollarSign, MapPin, Clock, ArrowRight } from 'lucide-react';
import { featuredJobs } from '../data/mockData';

export default function FeaturedJobs() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Latest Opportunities Near You</h2>
                        <p className="text-slate-500 text-lg">Fresh part-time roles perfectly suited for students.</p>
                    </div>
                    <a href="/jobs" className="hidden sm:flex items-center gap-1 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                        View All Jobs <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Jobs Grid (Responsive: Mobile 1, Tablet 2, PC 3) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredJobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-full cursor-pointer group">

                            {/* Card Header (Logo + Title) */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 ${job.logoBg}`}>
                                        {job.logoText}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                                        <p className="text-sm text-slate-500">{job.company}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Badges (Category & Urgency) */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100">
                                    {job.category}
                                </span>
                                {job.urgency && (
                                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${job.urgency === 'Urgently Hiring' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                        }`}>
                                        {job.urgency}
                                    </span>
                                )}
                            </div>

                            {/* Details (Salary, Location, Shift) */}
                            <div className="space-y-3 mb-6 grow">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <DollarSign className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">{job.shift}</span>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-indigo-600 transition-colors text-sm font-semibold mt-auto flex items-center justify-center gap-2 group-hover:shadow-md">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                {/* Mobile "View All Jobs" Button */}
                <button className="w-full sm:hidden mt-8 text-indigo-600 font-semibold border border-indigo-200 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                    View All Jobs <ArrowRight className="w-4 h-4" />
                </button>

            </div>
        </section>
    );
}