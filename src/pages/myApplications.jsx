import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Calendar, ExternalLink, CheckCircle2, Clock3, XCircle, Award } from 'lucide-react';
import { FourSquare } from 'react-loading-indicators';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyApplications = async () => {
            try {
                const response = await api.get('/v1/applications/my-applications');
                setApplications(response.data.data || response.data);
            } catch (error) {
                console.error("Error fetching my applications:", error);
                toast.error("Failed to load your applications");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMyApplications();
    }, []);

    const renderStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
            case 'shortlisted':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 size={14} /> Accepted / Shortlisted
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                        <XCircle size={14} /> Rejected
                    </span>
                );
            case 'reviewed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        <Award size={14} /> Reviewed
                    </span>
                );
            default: // pending
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                        <Clock3 size={14} /> Pending Review
                    </span>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-slate-500">
                <FourSquare color="#4f39f6" size="medium" text="Loading Applications" textColor="#4f39f6" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Applications</h1>
                    <p className="text-lg text-slate-500">Track the status of the jobs you have applied for.</p>
                </div>
                <Link to="/jobs" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-300 w-fit">
                    <Briefcase className="w-5 h-5" /> Browse More Jobs
                </Link>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">{applications.length}</p>
                        <p className="text-sm text-slate-500 font-medium">Applied Jobs</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Clock3 className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">
                            {applications.filter(app => !app.status || app.status === 'pending').length}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">Pending Responses</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">
                            {applications.filter(app => app.status === 'accepted' || app.status === 'shortlisted').length}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">Shortlisted / Accepted</p>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            {applications.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
                    <p className="text-lg font-medium text-slate-600">You haven't applied for any jobs yet.</p>
                    <p className="text-sm mt-1 text-slate-500 mb-6">Explore available student-friendly shifts and apply today.</p>
                    <Link to="/jobs" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        <Briefcase className="w-5 h-5" /> Explore Jobs
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map(app => {
                        const job = app.jobId || app.job;
                        if (!job) return null;

                        return (
                            // 🔴 FeaturedJobs Card Design
                            <div key={app._id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-full group">

                                {/* Card Header (Logo + Title) */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 bg-indigo-100`}>
                                            {job.companyName ? job.companyName.charAt(0).toUpperCase() : (job.postedBy?.fullName?.charAt(0).toUpperCase() || 'C')}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                                            <p className="text-sm text-slate-500">{job.companyName || job.postedBy?.fullName || "Company"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Badges (Category & Status) */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100">
                                        {job.category || "General"}
                                    </span>
                                    {renderStatusBadge(app.status)}
                                </div>

                                {/* Details (Salary, Location, Shift, Applied Date) */}
                                <div className="space-y-3 mb-6 grow">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <DollarSign className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-700">Rs. {job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">{job.shiftDetails}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link
                                    to={`/jobs/${job._id}`}
                                    className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-indigo-600 transition-colors text-sm font-semibold mt-auto flex items-center justify-center gap-2 group-hover:shadow-md"
                                >
                                    View Job Listing <ExternalLink className="w-4 h-4" />
                                </Link>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}