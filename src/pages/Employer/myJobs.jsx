import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, MapPin, DollarSign, Clock, PlusCircle, Trash2, Edit, Eye } from 'lucide-react';
import { FourSquare } from 'react-loading-indicators';
import toast from 'react-hot-toast';
import api from '../../api/axios';
export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                const response = await api.get('/v1/jobs/employer/jobs');
                setJobs(response.data.data || response.data);
            } catch (error) {
                console.error("Error fetching my jobs:", error);
                toast.error("Failed to load your jobs");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMyJobs();
    }, []);

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await api.delete(`/v1/jobs/delete/${jobId}`);
            toast.success("Job deleted successfully");
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error("Failed to delete the job");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
                <FourSquare color="#4f39f6" size="medium" text="Loading Workspace" textColor="#4f39f6" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Employer Workspace</h1>
                    <p className="text-lg text-slate-500">Manage your posted jobs and check student responses.</p>
                </div>
                <Link to="/employer/post-jobs" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-300">
                    <PlusCircle className="w-5 h-5" /> Post a New Job
                </Link>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">{jobs.length}</p>
                        <p className="text-base text-slate-500 font-medium">Active Job Listings</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">0</p>
                        <p className="text-base text-slate-500 font-medium">Total Applications Received</p>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            {jobs.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
                    <p className="text-lg font-medium text-slate-600">You haven't posted any jobs yet.</p>
                    <p className="text-sm mt-1 text-slate-500 mb-6">Start attracting students by posting your first listing.</p>
                    <Link to="/post-job" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        <PlusCircle className="w-5 h-5" /> Post Your First Job
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-full group">

                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 bg-indigo-100">
                                        {/* Fallback to Job Title's first letter if Company Name isn't populated */}
                                        {job.title?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                                        <p className="text-sm text-slate-500">Vacancies: {job.vacancy}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Badges (Category & Urgency) */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100">
                                    {job.category}
                                </span>
                                {job.urgency && (
                                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${job.urgency === 'Urgently Hiring' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                        {job.urgency}
                                    </span>
                                )}
                            </div>

                            {/* Details (Salary, Location, Shift) */}
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
                            </div>

                            {/* Action Buttons (Employer Specific) */}
                            <div className="grid grid-cols-3 gap-3 mt-auto pt-5 border-t border-slate-100">
                                <Link to={`/jobs/${job._id}`} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold border border-slate-200">
                                    <Eye className="w-4 h-4" /> Live
                                </Link>
                                <Link to={`/employer/edit-job/${job._id}`} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold border border-slate-200">
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                                <button onClick={() => handleDelete(job._id)} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors text-xs font-semibold border border-red-100">
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}