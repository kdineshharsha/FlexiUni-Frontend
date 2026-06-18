import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, Calendar, CheckCircle, Zap, User, Loader2 } from 'lucide-react';
import api from '../api/axios';
import { useEffect, useState } from 'react';
import { FourSquare } from 'react-loading-indicators';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

export default function JobDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await api.get(`/v1/jobs/${id}`);
                setJob(response.data.data || response.data);
                console.log("Fetched Job Details:", response.data.data || response.data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load job details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobDetails();
    }, [id, hasApplied]);

    const handleApply = async () => {
        if (!user) {
            alert("You need to be logged in to apply for a job.");
            navigate("/login");
            return;
        }
        if (user.role === "employer") {
            alert("Employers cannot apply for jobs. Please use a student account.");
            return;
        }
        setIsApplying(true);

        try {
            await api.post(`/v1/applications/apply/${id}`);
            toast.success("Successfully applied for the job!");

            setHasApplied(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to apply for the job. Please try again later.";
            toast.error(errorMessage);
        } finally {
            setIsApplying(false);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <FourSquare color="#4f39f6" size="medium" text="Loading Job Details" textColor="#4f39f6" />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Job not found!</h2>
                <Link to="/jobs" className="text-indigo-600 hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <Link to="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to all jobs
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Main Job Details */}
                    <main className="w-full lg:w-2/3">

                        {/* Header Section */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl text-slate-700 shadow-sm border border-slate-100 ${job.logoBg}`}>
                                    {job.postedBy.fullName ? job.postedBy.fullName.charAt(0).toUpperCase() : 'J'}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                                    <p className="text-lg text-slate-600 font-medium">{job.postedBy.fullName}</p>
                                </div>
                            </div>

                            {/* Quick Info Badges */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                    <DollarSign className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700">{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700">{job.shiftDetails}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                                    <Briefcase className="w-4 h-4 text-indigo-500" />
                                    <span className="text-sm font-semibold text-indigo-700">{job.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                                <p>
                                    {job.description}
                                </p>

                            </div>

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Responsibilities</h2>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-teal-500 shrink-0" /> Handle daily operational tasks efficiently.</li>
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-teal-500 shrink-0" /> Provide excellent customer service and support.</li>
                                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-teal-500 shrink-0" /> Collaborate with team members to ensure smooth workflow.</li>
                            </ul>

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Requirements</h2>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></span> Currently enrolled as a university student.</li>
                                <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></span> Strong communication and interpersonal skills.</li>
                                <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></span> Ability to work flexibly according to the required shift.</li>
                            </ul>
                        </div>

                    </main>

                    {/* Right Column: Sticky Apply Card */}
                    <aside className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl sticky top-24">

                            <h3 className="font-bold text-slate-900 text-lg mb-4">Ready to work?</h3>

                            {job.urgency && (
                                <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2 mb-6">
                                    <Zap className="w-4 h-4 fill-current" /> {job.urgency}
                                </div>
                            )}

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Posted</span>
                                    <span className="font-medium text-slate-900">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 flex items-center gap-2"><User className="w-4 h-4" /> Openings</span>
                                    <span className="font-medium text-slate-900">{job.vacancy} Positions</span>
                                </div>
                            </div>

                            <button
                                onClick={handleApply}
                                disabled={isApplying || hasApplied}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2
                                    ${hasApplied
                                        ? 'bg-green-500 text-white cursor-not-allowed' // Apply කරලා නම් කොළ පාටයි
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1'
                                    }
                                    ${isApplying ? 'opacity-70 cursor-wait' : ''}
                                `}
                            >
                                {isApplying && <Loader2 className="w-5 h-5 animate-spin" />}
                                {hasApplied ? "Successfully Applied ✓" : "Apply for this job"}

                            </button>

                            <p className="text-center text-xs text-slate-500 mt-4">
                                By applying, you agree to CampusWork's Terms of Service.
                            </p>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}