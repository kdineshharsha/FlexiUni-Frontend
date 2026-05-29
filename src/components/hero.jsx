import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="bg-slate-50 pt-12 pb-24 lg:pt-20 lg:pb-32 px-4 relative overflow-hidden">
            {/* Background decorative  */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column:  */}
                <div className="text-center lg:text-left">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-100">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-bounce"></span>
                        1,200+ active jobs this week
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        Find the Perfect Part-Time Job <span className="text-indigo-600">Around Campus.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Connect with local businesses in minutes. Flexible hours for students, reliable staff for employers.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-lg group">
                            Find a Job Now

                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white text-indigo-600 border border-indigo-200 px-8 py-4 rounded-xl hover:bg-indigo-50 font-medium transition-colors text-lg">
                            Post a Job
                        </button>
                    </div>

                </div>

                {/* Right Column: Visual  */}
                <div className="relative hidden lg:block">
                    <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl relative">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Students working and collaborating"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Floating Badge  */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 hover:-translate-y-2 transition-transform cursor-pointer">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Hired Today</p>
                            <p className="text-lg font-bold text-slate-900">Alex M. at Local Cafe</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}