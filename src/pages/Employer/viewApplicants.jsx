import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Calendar, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function ViewApplicants() {
    const { id: jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {

                const response = await api.get(`/v1/applications/${jobId}`);


                setApplicants(response.data.data || response.data);
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to fetch applicants.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId, isLoading]);
    const handleStatusChange = async (applicationId, newStatus) => {
        setIsUpdating(true);
        try {

            await api.patch(`/v1/applications/update/${applicationId}`, { status: newStatus });

            toast.success(`Status updated to ${newStatus}`);
            setIsLoading(true);

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update status.");
        } finally {
            setIsUpdating(false);
        }
    };


    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
            case 'shortlisted': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Shortlisted</span>;
            case 'hired': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Hired</span>;
            case 'rejected': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
            default: return <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">{status}</span>;
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Link to="/employer/my-jobs" className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Job Applicants</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Review and manage students who applied for this role.</p>
                    </div>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {applicants.length} Total Applicants
                </div>
            </div>

            {/* Applicants List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {applicants.length === 0 ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No applicants yet</h3>
                        <p className="text-slate-500 mt-1">When students apply for this job, they will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Applied Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applicants.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">
                                                {app.studentId?.fullName || "Unknown Student"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                {app.studentId?.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <select
                                                value={app.status}
                                                disabled={isUpdating}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold outline-none cursor-pointer bg-white transition-all
                                                    ${app.status === 'pending' ? 'border-yellow-300 bg-yellow-50 text-yellow-700 focus:ring-yellow-100' : ''}
                                                    ${app.status === 'shortlisted' ? 'border-blue-300 bg-blue-50 text-blue-700 focus:ring-blue-100' : ''}
                                                    ${app.status === 'hired' ? 'border-green-300 bg-green-50 text-green-700 focus:ring-green-100' : ''}
                                                    ${app.status === 'rejected' ? 'border-red-300 bg-red-50 text-red-700 focus:ring-red-100' : ''}
                                                `}
                                            >
                                                <option value="pending">⏳ Pending</option>
                                                <option value="shortlisted">💙 Shortlisted</option>
                                                <option value="hired">✅ Hired</option>
                                                <option value="rejected">❌ Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}