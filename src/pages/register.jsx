import { useState } from 'react';
import { Mail, Lock, User, GraduationCap, ArrowRight, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SRI_LANKAN_INSTITUTES } from '../constants/universities.js';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios.js';

export default function Register() {

    const { register, handleSubmit, control } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('student');
    const universityOptions = SRI_LANKAN_INSTITUTES.map((uni) => ({
        value: uni,
        label: uni
    }));
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {

            const payload = {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                role: role,

            }

            if (role === 'student') {
                payload.studentId = data.studentId;
                payload.university = data.university?.value;
            }

            await api.post(`/v1/auth/register`, payload);
            toast.success('Account created successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            const currentError = error.response?.data?.message || 'An error occurred during registration.';
            toast.error(currentError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            {/* Top Logo & Headings */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Link to="/" className="inline-flex items-center gap-2 cursor-pointer mb-6 hover:scale-105 transition-transform">
                    <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-md">
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-3xl tracking-tight text-slate-900">Flexi<span className="text-indigo-600">Uni</span></span>
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-slate-900">
                    Create an account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                        Log in here
                    </Link>
                </p>
            </div>

            {/* Signup Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                        {/* Role Selection Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                I am a...
                            </label>
                            <div className="flex p-1 bg-slate-100 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${role === 'student'
                                        ? 'bg-white text-indigo-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <GraduationCap className="w-4 h-4" /> Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('employer')}
                                    className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${role === 'employer'
                                        ? 'bg-white text-indigo-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <Briefcase className="w-4 h-4" /> Employer
                                </button>
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Full Name {role === 'employer' && "(or Company Name)"}
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                                    placeholder={role === 'student' ? "Harsha Madushan" : "Star Garments"}
                                    {...register("fullName", { required: "Name is required" })}
                                />
                            </div>
                        </div>

                        {role === 'student' && (
                            <>
                                {/* Student ID  */}
                                <div>
                                    <label htmlFor="studentId" className="block text-sm font-medium text-slate-700">
                                        Student ID
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GraduationCap className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            id="studentId"
                                            name="studentId"
                                            type="text"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                                            placeholder="e.g. IT20261042"
                                            {...register("studentId", { required: "Student ID is required" })}
                                        />
                                    </div>
                                </div>

                                {/* University Dropdown */}
                                <div>
                                    <label htmlFor="university" className="block text-sm font-medium text-slate-700">
                                        University / Institute
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            name="university"
                                            control={control}
                                            rules={{ required: "University selection is required" }}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={universityOptions}
                                                    placeholder="Search and select your university..."
                                                    unstyled
                                                    classNames={{
                                                        control: ({ isFocused }) =>
                                                            `block w-full rounded-xl border ${isFocused ? 'border-indigo-500 ring-2 ring-indigo-500 bg-white' : 'border-slate-300 bg-slate-50'} transition-colors text-sm shadow-sm py-1.5 px-2`,
                                                        menu: () => "mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50",
                                                        option: ({ isFocused, isSelected }) =>
                                                            `px-4 py-3 cursor-pointer text-sm transition-colors ${isSelected
                                                                ? 'bg-indigo-600 text-white font-semibold'
                                                                : isFocused
                                                                    ? 'bg-indigo-50 text-indigo-700'
                                                                    : 'text-slate-700 hover:bg-slate-50'
                                                            }`,
                                                        noOptionsMessage: () => "text-slate-500 p-4 text-sm",
                                                        placeholder: () => "text-slate-400 ml-1",
                                                        singleValue: () => "text-slate-900 ml-1",
                                                    }}
                                                />)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                                    placeholder="••••••••"
                                    {...register("password", { required: "Password is required" })}
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-lg hover:-translate-y-0.5 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Creating Account..." : "Sign Up"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}