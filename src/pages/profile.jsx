import { useState, useEffect } from 'react';
import { User, Mail, Phone, BookOpen, Award, Briefcase, MapPin, Edit3, Save, X, Globe, Building } from 'lucide-react';
import { useAuth } from '../context/authContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Profile() {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "", number: "",
        university: "", course: "", skills: "", bio: "",
        companyName: "", companyDescription: "", website: "", companyAddress: ""
    });

    useEffect(() => {

        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                fullName: user.fullName || "",
                number: user.number || "",
                university: user.university || "",
                course: user.course || "",
                skills: user.skills ? user.skills.join(", ") : "",
                bio: user.bio || "",
                companyName: user.companyName || "",
                companyDescription: user.companyDescription || "",
                website: user.website || "",
                companyAddress: user.companyAddress || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {

            const updatedData = { ...formData };
            if (user.role === 'student' && formData.skills) {
                updatedData.skills = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
            }


            const response = await api.put('/v1/auth/update-profile', updatedData);

            toast.success("Profile updated successfully!");
            setIsEditing(false);
            const currentToken = localStorage.getItem('token')
            login(currentToken, response.data.user);

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
            {/* Header Section */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">

                    {/* Avatar & Name Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6">
                        {/* Profile Picture (Soft Box) */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-indigo-50 rounded-2xl flex items-center justify-center text-4xl font-bold text-indigo-600 border border-indigo-100 shadow-inner">
                            {user.fullName.charAt(0).toUpperCase()}
                        </div>

                        {/* Name and Role */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                {user.fullName}
                            </h1>
                            <div className="flex items-center justify-center sm:justify-start mt-2">
                                <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold capitalize flex items-center gap-1.5">
                                    {user.role === 'employer' ? <Building className="w-4 h-4 text-slate-400" /> : <BookOpen className="w-4 h-4 text-slate-400" />}
                                    {user.role} Account
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full sm:w-auto flex justify-center sm:justify-end shrink-0">
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-indigo-600 font-semibold text-sm transition-all shadow-sm">
                                <Edit3 size={16} /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-all">
                                    <X size={16} /> Cancel
                                </button>
                                <button onClick={handleSave} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold text-sm transition-all shadow-sm disabled:opacity-70">
                                    <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Info Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                <div className="flex items-center gap-2 mt-1 text-slate-700">
                                    <Mail size={16} className="text-slate-400" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                {isEditing ? (
                                    <input type="text" name="number" value={formData.number} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" placeholder="e.g. 0712345678" />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1 text-slate-700">
                                        <Phone size={16} className="text-slate-400" />
                                        <span className="text-sm">{formData.number || "Not provided"}</span>
                                    </div>
                                )}
                            </div>

                            {/* Employer-only sidebar fields */}
                            {user.role === 'employer' && (
                                <>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website</label>
                                        {isEditing ? (
                                            <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" placeholder="www.company.com" />
                                        ) : (
                                            <div className="flex items-center gap-2 mt-1 text-slate-700">
                                                <Globe size={16} className="text-slate-400" />
                                                <span className="text-sm truncate">{formData.website || "Not provided"}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                                        {isEditing ? (
                                            <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" placeholder="Colombo 03" />
                                        ) : (
                                            <div className="flex items-center gap-2 mt-1 text-slate-700">
                                                <MapPin size={16} className="text-slate-400" />
                                                <span className="text-sm">{formData.companyAddress || "Not provided"}</span>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">

                    {/* Basic Info (Full Name) */}
                    {isEditing && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Basic Details</h3>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:border-indigo-500" />
                            </div>
                        </div>
                    )}

                    {/* STUDENT DETAILS */}
                    {user.role === 'student' && (
                        <>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Education & Bio</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700">University / Institute</label>
                                            {isEditing ? (
                                                <input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500" placeholder="e.g. ATI Galle" />
                                            ) : (
                                                <p className="mt-1 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">{formData.university || "Not provided"}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-700">Course / Degree</label>
                                            {isEditing ? (
                                                <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500" placeholder="e.g. HNDIT" />
                                            ) : (
                                                <p className="mt-1 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">{formData.course || "Not provided"}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">About Me (Bio)</label>
                                        {isEditing ? (
                                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 resize-none" placeholder="Tell employers a little about yourself..." />
                                        ) : (
                                            <p className="mt-1 text-slate-600">{formData.bio || "No bio added yet."}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-indigo-500" /> Professional Skills</h3>
                                <div>
                                    {isEditing ? (
                                        <>
                                            <label className="text-sm font-medium text-slate-700">Skills (Comma separated)</label>
                                            <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500" placeholder="e.g. Data Entry, React, Communication" />
                                            <p className="text-xs text-slate-500 mt-1">Separate each skill with a comma.</p>
                                        </>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skills ? formData.skills.split(',').map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                                                    {skill.trim()}
                                                </span>
                                            )) : <p className="text-slate-500">No skills added yet.</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* EMPLOYER DETAILS */}
                    {user.role === 'employer' && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-500" /> Company Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Company Name</label>
                                    {isEditing ? (
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500" />
                                    ) : (
                                        <p className="mt-1 text-slate-900 font-semibold text-lg">{formData.companyName || "Not provided"}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Company Description</label>
                                    {isEditing ? (
                                        <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} rows={4} className="w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 resize-none" placeholder="What does your company do?" />
                                    ) : (
                                        <p className="mt-1 text-slate-600 leading-relaxed">{formData.companyDescription || "No description added yet."}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}