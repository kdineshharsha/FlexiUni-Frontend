import { DollarSign, MapPin, Clock, ArrowRight } from 'lucide-react';
import { featuredJobs } from '../data/mockData';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FourSquare } from 'react-loading-indicators';


export default function FeaturedJobs() {

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/v1/jobs/all');

                setJobs(response.data.data || response.data);
                console.log(response.data.data || response.data);

            } catch (err) {
                toast.error(err.response.data.message || 'Failed to load jobs. Please try again later.');

            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

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

                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <FourSquare color="#4f39f6" size="medium" text="Loading Jobs" textColor="#4f39f6" />

                    </div>
                )}
                {!isLoading && jobs.length === 0 && (
                    <div className="bg-slate-50 text-slate-500 p-10 rounded-xl text-center border border-slate-200">
                        <p className="text-lg font-medium">No jobs available right now.</p>
                        <p className="text-sm mt-1">Check back later for new opportunities!</p>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.slice(0, 6).map((job) => (
                        <Link to={`jobs/${job._id}`} key={job.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-full cursor-pointer group">

                            {/* Card Header (Logo + Title) */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 bg-indigo-100`}>
                                        {job.postedBy.fullName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                                        <p className="text-sm text-slate-500">{job.postedBy.fullName}</p>
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
                                    <span className="text-sm font-semibold text-slate-700">Rs.{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">{job.shiftDetails}</span>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-indigo-600 transition-colors text-sm font-semibold mt-auto flex items-center justify-center gap-2 group-hover:shadow-md">
                                Apply Now
                            </button>
                        </Link>
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