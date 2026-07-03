import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Briefcase, DollarSign, Clock, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const CATEGORIES = [
    "Supermarket", "Garment", "Shop", "Delivery", "Retail",
    "F&B", "Admin", "Hospitality", "Logistics", "Technology",
    "Healthcare", "Education", "Finance", "Other"
];
const SHIFT_TYPES = ["Morning Shifts", "Afternoon Shifts", "Evening Shifts", "Night Shifts", "Weekend Shifts", "Weekday Shifts", "Flexible Hours", "Event-Based", "Full-time"];

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "", companyName: "", category: "", location: "",
        salary: "", vacancy: "", shiftType: "", shiftDetails: "",
        description: "", requirements: ""
    });


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/v1/jobs/${id}`);
                const job = response.data.data || response.data;


                let sType = "";
                let sDetails = "";
                if (job.shiftDetails && job.shiftDetails.includes(" : ")) {
                    [sType, sDetails] = job.shiftDetails.split(" : ");
                } else {
                    sType = job.shiftDetails;
                }

                setFormData({
                    title: job.title || "",
                    companyName: job.companyName || "",
                    category: job.category || "",
                    location: job.location || "",
                    salary: job.salary ? job.salary.toString() : "",
                    vacancy: job.vacancy ? job.vacancy.toString() : "1",
                    shiftType: sType || "",
                    shiftDetails: sDetails || "",
                    description: job.description || "",
                    requirements: job.requirements ? job.requirements.join('\n') : ""
                });
            } catch (err) {
                toast.error("Failed to fetch job details.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const requirementsArray = formData.requirements
                ? formData.requirements.split('\n').filter(req => req.trim() !== '')
                : [];

            const jobPayload = {
                title: formData.title,
                companyName: formData.companyName,
                category: formData.category,
                location: formData.location,
                salary: Number(formData.salary),
                vacancy: parseInt(formData.vacancy),
                shiftDetails: `${formData.shiftType}${formData.shiftDetails ? ' : ' + formData.shiftDetails : ''}`,
                description: formData.description,
                requirements: requirementsArray
            };


            await api.patch(`/v1/jobs/update/${id}`, jobPayload);

            toast.success("Job updated successfully!");
            navigate('/employer/my-jobs');

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update job.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
    }


    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
            <div className="flex items-center gap-3 mb-8">
                <Link to="/employer/my-jobs" className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Edit Job Listing</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Update the details of your job.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Information */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <Briefcase className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Basic Information</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Job Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Company Name</label>
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none">
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* 2. Compensation & Vacancies */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <DollarSign className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Compensation & Vacancies</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Salary (LKR)</label>
                            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Vacancy Count</label>
                            <input type="number" name="vacancy" min="1" value={formData.vacancy} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* 3. Shift Details */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Shift Details</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Shift Type</label>
                            <select name="shiftType" value={formData.shiftType} onChange={handleChange} required className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none">
                                <option value="" disabled>Select...</option>
                                {SHIFT_TYPES.map(shift => <option key={shift} value={shift}>{shift}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Additional Info</label>
                            <input type="text" name="shiftDetails" value={formData.shiftDetails} onChange={handleChange} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* 4. Description & Requirements */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Job Description</h3>
                    </div>
                    <div className="p-6 space-y-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none resize-y" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Requirements (Enter each on a new line)</label>
                            <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} className="px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none resize-y" />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting} className={`flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 w-full sm:w-auto ${isSubmitting ? 'opacity-70' : ''}`}>
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </button>
            </form>
        </div>
    );
}