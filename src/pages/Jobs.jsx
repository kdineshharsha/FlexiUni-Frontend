import { useState, useEffect } from 'react';
import { DollarSign, MapPin, Clock, Loader2, Briefcase, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

export default function AllJobs() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const [totalJobs, setTotalJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const currentPage = parseInt(searchParams.get('page')) || 1;

    // Form Inputs
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All Categories');


    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {

                const queryString = searchParams.toString();
                const response = await api.get(`/v1/jobs?${queryString}`);

                const data = response.data.data;

                setJobs(data.jobs || []);
                setTotalJobs(data.totalJobs || 0);
                setTotalPages(data.totalPages || 1);
                setError(null);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [searchParams]);


    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (keyword.trim()) params.append('keyword', keyword.trim());
        if (location.trim()) params.append('location', location.trim());
        if (category !== 'All Categories') params.append('category', category);

        params.append('page', 1);

        setSearchParams(params);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', newPage);
            setSearchParams(params);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const clearFilters = () => {
        setKeyword('');
        setLocation('');
        setCategory('All Categories');
        setSearchParams(new URLSearchParams());
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-slate-900 pt-16 pb-24 px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    Explore All Opportunities
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Find the perfect part-time job that fits your university schedule.
                </p>
            </div>

            {/* In-page Search Bar */}
            <div className="max-w-5xl mx-auto px-4 relative z-20 -mt-10">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
                    <form className="flex flex-col md:flex-row gap-4 items-end md:items-center" onSubmit={handleSearch}>
                        <div className="flex-1 w-full relative">
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">What</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Job title, company..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Where</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City, area..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Category</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="All Categories">All Categories</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Hospitality">Hospitality</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Garment">Garment</option>
                                    <option value="On-Campus">On-Campus</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl hover:bg-indigo-700 w-full md:w-auto font-medium transition-colors shadow-md h-[50px]">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Jobs List Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">

                {/* Search Results Summary & Clear Button */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-slate-900">

                        {totalJobs} {totalJobs === 1 ? 'Job' : 'Jobs'} Found
                    </h2>
                    {(searchParams.get('keyword') || searchParams.get('location') || (searchParams.get('category') && searchParams.get('category') !== 'All Categories')) && (
                        <button onClick={clearFilters} className="text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-1">
                            <X className="w-4 h-4" /> Clear Filters
                        </button>
                    )}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                        <p>Loading jobs...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && jobs.length === 0 && (
                    <div className="bg-white text-slate-500 p-12 rounded-2xl text-center border border-slate-200 shadow-sm">
                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-xl font-medium text-slate-700">No jobs match your search.</p>
                        <p className="text-sm mt-2">Try clearing filters or using different keywords.</p>
                        <button onClick={clearFilters} className="mt-6 text-indigo-600 font-semibold hover:underline">
                            Clear all filters
                        </button>
                    </div>
                )}

                {!isLoading && !error && jobs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <Link to={`/jobs/${job._id}`} key={job._id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-full group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 bg-indigo-100">
                                            {job.companyName ? job.companyName.charAt(0).toUpperCase() : 'J'}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                                            <p className="text-sm text-slate-500">{job.companyName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100">
                                        {job.category}
                                    </span>
                                </div>

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
                                        <span className="text-sm">{job.workingHours || job.shift}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-indigo-600 transition-colors text-sm font-semibold mt-auto flex items-center justify-center gap-2 group-hover:shadow-md">
                                    View Details
                                </button>
                            </Link>
                        ))}
                    </div>
                )}

                {!isLoading && !error && totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="text-sm font-medium text-slate-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}