import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Users, FileText, CheckCircle, ArrowLeft, Loader2, Building, PlusCircle, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useAuth } from '../../context/authContext';

const CATEGORIES = [
    "Supermarket", "Garment", "Shop", "Delivery", "Retail",
    "F&B", "Admin", "Hospitality", "Logistics", "Technology",
    "Healthcare", "Education", "Finance", "Other"
];
const SHIFT_TYPES = ["Morning Shifts", "Afternoon Shifts", "Evening Shifts", "Night Shifts", "Weekend Shifts", "Weekday Shifts", "Flexible Hours", "Event-Based", "Full-time"];

export default function PostJob() {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            toast.error("You need to login first!");
            navigate('/login');
        } else if (user.role !== 'employer') {
            toast.error("Only employers can post jobs!");
            navigate('/jobs'); // Student කෙනෙක් ආවොත් Jobs පේජ් එකට යවනවා
        }
    }, [user]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        companyName: user?.companyName || "",
        category: "",
        location: "",
        salary: "",
        vacancy: "1", // Default 1
        shiftType: "",
        shiftDetails: "",
        description: "",
        requirements: "",
        contactMethods: [{ type: 'whatsapp', value: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleContactChange = (index, field, val) => {
        const updated = [...formData.contactMethods];
        updated[index][field] = val;
        setFormData(prev => ({ ...prev, contactMethods: updated }));

        if (errors.contactMethods) {
            setErrors(prev => ({ ...prev, contactMethods: undefined }));
        }
    };

    const addContactMethod = () => {
        if (formData.contactMethods.length < 3) {
            setFormData(prev => ({
                ...prev,
                contactMethods: [...prev.contactMethods, { type: 'call', value: '' }]
            }));
        }
    };

    const removeContactMethod = (index) => {
        const updated = formData.contactMethods.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, contactMethods: updated }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Job title is required";
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.category) newErrors.category = "Please select a category";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.salary) newErrors.salary = "Salary is required";
        if (!formData.vacancy) newErrors.vacancy = "Vacancy count is required";
        if (!formData.shiftType) newErrors.shiftType = "Please select shift type";
        if (!formData.description.trim()) newErrors.description = "Job description is required";

        let hasContactError = false;
        formData.contactMethods.forEach(contact => {
            if (!contact.value.trim()) hasContactError = true;
        });

        if (formData.contactMethods.length === 0) {
            newErrors.contactMethods = "Please add at least one contact method.";
        } else if (hasContactError) {
            newErrors.contactMethods = "Please fill in valid details for all contact methods.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

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
                requirements: requirementsArray,
                contactMethods: formData.contactMethods
            };

            await api.post('/v1/jobs/create', jobPayload);

            setIsSubmitted(true);
            toast.success("Job posted successfully!");
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to post job.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "", companyName: user?.companyName || "", category: "", location: "",
            salary: "", vacancy: "1", shiftType: "", shiftDetails: "", description: "", requirements: "",
            contactMethods: [{ type: 'whatsapp', value: '' }]
        });
        setErrors({});
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] py-24 px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Job Posted Successfully!</h2>
                <p className="text-slate-500 mt-2 mb-8 max-w-sm">
                    Your listing is now live on FlexiUni. Students will start applying soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/employer/my-jobs" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        <Briefcase size={16} /> View My Jobs
                    </Link>
                    <button onClick={resetForm} className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        <PlusCircle size={16} /> Post Another Job
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
            <div className="flex items-center gap-3 mb-8">
                <Link to="/dashboard/my-jobs" className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Post a New Job</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Fill in the details below to attract the right student candidates.</p>
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
                            <label className="text-sm font-medium text-slate-700">Job Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Retail Sales Associate"
                                className={`px-4 py-2.5 rounded-lg border outline-none transition-all ${errors.title ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Company Name *</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name"
                                    className={`w-full pl-9 pr-4 py-2.5 rounded-lg border outline-none transition-all ${errors.companyName ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            </div>
                            {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Category *</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                className={`px-4 py-2.5 rounded-lg border outline-none transition-all cursor-pointer bg-white ${errors.category ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}>
                                <option value="" disabled>Select category...</option>
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Location *</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Colombo 03"
                                    className={`w-full pl-9 pr-4 py-2.5 rounded-lg border outline-none transition-all ${errors.location ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            </div>
                            {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
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
                            <label className="text-sm font-medium text-slate-700">Salary (LKR) *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">LKR</span>
                                <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="35000"
                                    className={`w-full pl-11 pr-3.5 py-2.5 rounded-lg border outline-none transition-all ${errors.salary ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            </div>
                            {errors.salary && <p className="text-xs text-red-500">{errors.salary}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Vacancy Count *</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input type="number" name="vacancy" min="1" value={formData.vacancy} onChange={handleChange} placeholder="e.g. 3"
                                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border outline-none transition-all ${errors.vacancy ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            </div>
                            {errors.vacancy && <p className="text-xs text-red-500">{errors.vacancy}</p>}
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
                            <label className="text-sm font-medium text-slate-700">Shift Type *</label>
                            <select name="shiftType" value={formData.shiftType} onChange={handleChange}
                                className={`px-4 py-2.5 rounded-lg border outline-none transition-all cursor-pointer bg-white ${errors.shiftType ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}>
                                <option value="" disabled>Select shift type...</option>
                                {SHIFT_TYPES.map(shift => <option key={shift} value={shift}>{shift}</option>)}
                            </select>
                            {errors.shiftType && <p className="text-xs text-red-500">{errors.shiftType}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Additional Shift Info</label>
                            <input type="text" name="shiftDetails" value={formData.shiftDetails} onChange={handleChange} placeholder="e.g. 6 PM – 10 PM"
                                className="px-4 py-2.5 rounded-lg border border-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" />
                        </div>
                    </div>
                </div>

                {/* 4. Job Description */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Job Description & Requirements</h3>
                    </div>
                    <div className="p-6 space-y-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Job Description *</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the role and responsibilities..."
                                className={`px-4 py-3 rounded-lg border outline-none transition-all resize-y ${errors.description ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Requirements & Qualifications</label>
                            <p className="text-xs text-slate-500 mb-1">Enter each requirement on a new line.</p>
                            <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="e.g.&#10;Must be 18 years or older.&#10;Basic English communication skills."
                                className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-y" />
                        </div>
                    </div>
                </div>

                {/* 🔴 5. Contact Options  */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <Phone className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-900">Direct Contact Options</h3>
                    </div>
                    <div className="p-6">
                        <label className="block text-sm font-medium text-slate-700 mb-4">
                            How should applicants contact you? (Max 3) *
                        </label>

                        <div className="space-y-4">
                            {formData.contactMethods.map((contact, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                    <select
                                        value={contact.type}
                                        onChange={(e) => handleContactChange(index, 'type', e.target.value)}
                                        className="w-full sm:w-1/3 px-4 py-2.5 rounded-lg border border-slate-300 outline-none focus:border-indigo-500 bg-slate-50 cursor-pointer"
                                    >
                                        <option value="whatsapp">WhatsApp Message</option>
                                        <option value="call">Phone Call</option>
                                        <option value="email">Email</option>
                                    </select>

                                    <div className="flex-1 w-full flex gap-2">
                                        <input
                                            type={contact.type === 'email' ? 'email' : 'tel'}
                                            placeholder={contact.type === 'email' ? 'e.g. hr@company.com' : 'e.g. +94771234567'}
                                            value={contact.value}
                                            onChange={(e) => handleContactChange(index, 'value', e.target.value)}
                                            className={`flex-1 w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${errors.contactMethods ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
                                        />
                                        {formData.contactMethods.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeContactMethod(index)}
                                                className="px-4 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shrink-0"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {errors.contactMethods && <p className="text-xs text-red-500 mt-2">{errors.contactMethods}</p>}

                        {formData.contactMethods.length < 3 && (
                            <button
                                type="button"
                                onClick={addContactMethod}
                                className="mt-4 text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1.5 transition-colors"
                            >
                                <PlusCircle size={16} /> Add Another Method
                            </button>
                        )}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-8">
                    <button type="submit" disabled={isSubmitting} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Briefcase className="w-5 h-5" />}
                        {isSubmitting ? "Publishing..." : "Publish Job Listing"}
                    </button>
                    <button type="button" onClick={resetForm} className="w-full sm:w-auto px-6 py-3.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors text-sm">
                        Clear Form
                    </button>
                </div>

            </form>
        </div>
    );
}