import { User, MousePointerClick, Zap, Briefcase, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function HowItWorks() {

    const [activeTab, setActiveTab] = useState('students');


    const STEPS_STUDENTS = [
        { icon: <User className="w-8 h-8" />, title: "Create a Profile", desc: "Sign up in seconds. Tell us your skills, major, and class availability." },
        { icon: <MousePointerClick className="w-8 h-8" />, title: "Browse & Apply", desc: "Find jobs that fit your schedule perfectly. Apply with just one click." },
        { icon: <Zap className="w-8 h-8" />, title: "Start Working", desc: "Get hired fast, start earning money, and gain valuable experience." }
    ];


    const STEPS_EMPLOYERS = [
        { icon: <Briefcase className="w-8 h-8" />, title: "Post a Job", desc: "Create a listing in minutes. Specify shifts, requirements, and pay rate." },
        { icon: <CheckCircle className="w-8 h-8" />, title: "Review Candidates", desc: "Review profiles of verified local students ready to work." },
        { icon: <User className="w-8 h-8" />, title: "Hire Fast", desc: "Connect directly with students and fill your shifts immediately." }
    ];


    const currentSteps = activeTab === 'students' ? STEPS_STUDENTS : STEPS_EMPLOYERS;

    return (
        <section className="py-24 px-4 bg-slate-50">
            <div className="max-w-5xl mx-auto">

                {/* Header & Toggle Buttons */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">How It Works</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
                        A streamlined experience tailored for both sides of the hiring process.
                    </p>

                    {/* Custom Toggle Bar */}
                    <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'students'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            For Students
                        </button>
                        <button
                            onClick={() => setActiveTab('employers')}
                            className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'employers'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            For Employers
                        </button>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                    {/* Decorative connecting line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 z-0"></div>

                    {currentSteps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">

                            {/* Icon Box */}
                            <div className="w-24 h-24 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 mb-6 mx-auto relative group hover:-translate-y-1 transition-transform duration-300">
                                <div className="absolute -inset-2 bg-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                                {step.icon}

                                {/* Step Number Badge (1, 2, 3) */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 text-base leading-relaxed px-4">{step.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}