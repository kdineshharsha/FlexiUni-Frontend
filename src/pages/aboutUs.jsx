import {
    GraduationCap,
    Briefcase,
    Target,
    ShieldCheck,
    Clock,
    Users,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    const stats = [
        { label: 'Registered Students', value: '10,000+' },
        { label: 'Partner Businesses', value: '500+' },
        { label: 'Completed Shifts', value: '25,000+' },
        { label: 'Average Match Time', value: '< 2 Hours' },
    ];

    const features = [
        {
            icon: Clock,
            title: 'Flexible Hourly Shifts',
            description:
                'Choose shifts that fit seamlessly around your lecture schedules, exams, and personal study time.',
        },
        {
            icon: ShieldCheck,
            title: 'Verified Opportunities',
            description:
                'Every job posting and employer profile is verified to ensure safe, legitimate working environments.',
        },
        {
            icon: Sparkles,
            title: 'Smart Matching Engine',
            description:
                'Our algorithm matches you with relevant positions based on proximity to your campus, preferences, and availability.',
        },
        {
            icon: Users,
            title: 'Reliable Local Talent',
            description:
                'Local businesses gain instant access to educated, motivated, and adaptable talent for rush hours and events.',
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 bg-white border-b border-slate-200">
                <div className="absolute top-0 right-1/4 -mt-12 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-1/4 -mb-12 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-100">
                        About FlexiUni
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                        Bridging Campus Life & <span className="text-indigo-600">Flexible Work</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        FlexiUni connects university students seeking flexible work with local businesses that need dependable, quick-to-hire talent. We empower students to gain financial independence without compromising their education.
                    </p>
                </div>
            </section>

            {/* 2. Platform Stats */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-1">{stat.value}</p>
                            <p className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Mission & Vision */}
            <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To make part-time work accessible, transparent, and flexible for university students, while giving businesses a frictionless way to find reliable short-term staffing.
                        </p>
                    </div>

                    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To build the leading student-first employment ecosystem, empowering the next generation with practical skills, financial autonomy, and direct industry exposure.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. Why FlexiUni */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose FlexiUni?</h2>
                        <p className="text-slate-600">
                            Tailored specifically to handle unpredictable university timetables and high-demand shifts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => {
                            const IconComp = feature.icon;
                            return (
                                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Role-Based Call To Actions */}
            <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* For Students */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between shadow-xl">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold mb-6 border border-indigo-400/20">
                                <GraduationCap className="w-4 h-4" /> For Students
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Earn on Your Schedule</h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                                Pick up nearby shifts around your academic calendar. Earn competitive hourly pay, develop workplace experience, and grow your resume before graduation.
                            </p>
                        </div>
                        <Link
                            to="/jobs"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition w-fit"
                        >
                            Browse Open Shifts <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* For Businesses */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-100">
                                <Briefcase className="w-4 h-4" /> For Businesses
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">On-Demand Shift Staffing</h3>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Fill urgent shifts for retail, hospitality, deliveries, or campus promotions with motivated, verified university students in your area.
                            </p>
                        </div>
                        <Link
                            to="/employer/post-job"
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition w-fit"
                        >
                            Post a Shift Vacancy <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}