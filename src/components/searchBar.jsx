import { Search, MapPin, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('All Categories');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.append('keyword', keyword.trim());
        if (location.trim()) params.append('location', location.trim());
        if (category !== 'All Categories') params.append('category', category);


        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 relative z-20 -mt-16 lg:-mt-20">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
                <form className="flex flex-col md:flex-row gap-4 items-end md:items-center" onSubmit={handleSearch}>

                    {/* 1. What - Search Input */}
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">What</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Job title, keyword..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* 2. Where - Location Input */}
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Where</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="City, area, or zip"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}

                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* 3. Category - Dropdown */}
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Category</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>All Categories</option>
                                <option>Retail</option>
                                <option>Hospitality</option>
                                <option>Delivery</option>
                                <option>Garment</option>
                                <option>On-Campus</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl hover:bg-indigo-700 w-full md:w-auto font-medium transition-colors shadow-md h-[50px] flex items-center justify-center">
                        Search Jobs
                    </button>

                </form>
            </div>
        </div>
    );
}