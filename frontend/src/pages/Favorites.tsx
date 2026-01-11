import { useState, useMemo, useEffect } from "react";
import { 
    Search, 
    X, 
    Star,
    SlidersHorizontal,
    Tag,
    Building2,
    Sparkles,
    Filter
} from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import NavBar from "../components/NavBar";
import type { Article } from "../models/interfaces";
import FavoritesSkeleton from "../components/FavoritesSkeleton";
import { toast } from "react-toastify";



export default function Favorites() {
    const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
    const [favoriteArticlesPrepared, setFavoriteArticlesPrepared] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSource, setSelectedSource] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [filterType, setFilterType] = useState<"category" | "source">("category");



    const getAllFavoriteArticlesFromDB = async () => {

        try{
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/article/favorites/all", {
                method: "GET",
                headers : {
                    "Authorization" : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            });

            const result = await response.json();

            if(result.favorites !== undefined){
                setFavoriteArticles(result.favorites);
                setFavoriteArticlesPrepared(true);
            }

    
        }catch(e){
            
        }
    }


    const removeFavoriteArticle = async (article: Article) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/article/remove-favorite/${article.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (result.deleted) {
                toast.success("Article Removed !");
            } else {
                toast.error("Cannot remove this Article !");
            }
            getAllFavoriteArticlesFromDB();
        } catch (e) {
            toast.error("Network Problem !");
        }
    };



    // Get unique categories and sources
    const categories = useMemo(() => {
        const cats = new Set<string>();
        favoriteArticles.forEach(article => cats.add(article.category.name));
        return ["all", ...Array.from(cats)];
    }, [favoriteArticles]);

    const sources = useMemo(() => {
        const srcs = new Set<string>();
        favoriteArticles.forEach(article => srcs.add(article.source.name));
        return ["all", ...Array.from(srcs)];
    }, [favoriteArticles]);

    // Filter and sort articles
    const filteredArticles = useMemo(() => {
        let filtered = favoriteArticles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || article.category.name.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSource = selectedSource === "all" || article.source.name === selectedSource;
            return matchesSearch && matchesCategory && matchesSource;
        });

        return filtered;
    }, [favoriteArticles, searchQuery, selectedCategory, selectedSource]);



    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedSource("all");
    };


    useEffect(() => {
        getAllFavoriteArticlesFromDB();
    },[]);

    return (
        <>
            <NavBar />

            {!favoriteArticlesPrepared ? (
                <FavoritesSkeleton />
            ):(

            
        
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-br from-yellow-600 to-yellow-500 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-400/20 rounded-full -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                        
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <Star className="w-6 h-6 text-white fill-current" />
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Your Collection
                                        </span>
                                    </div>
                                    <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                        My Favorites
                                    </h1>
                                    <p className="text-red-100 text-lg">Articles you've saved for later reading</p>
                                </div>

                                {/* Stats Cards */}
                                <div className="flex gap-4">
                                    <div className="px-6 py-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:bg-white transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Star className="w-6 h-6 text-white fill-current" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Saved Articles</p>
                                                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent">
                                                    {favoriteArticles.length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:bg-white transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Tag className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Categories</p>
                                                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                                    {categories.length - 1}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Search and Filter Bar */}
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="flex-1 relative group">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
                                    <input
                                        type="text"
                                        placeholder="Search your favorite articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 border-2 border-white/40 rounded-2xl text-base text-gray-800 bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 outline-none focus:border-white focus:ring-4 focus:ring-white/50 focus:bg-white hover:shadow-2xl placeholder:text-gray-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-1 transition-all duration-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 ${
                                        showFilters
                                            ? 'bg-white text-red-600 shadow-white/50'
                                            : 'bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-white/40'
                                    }`}
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                    <span>Filters</span>
                                </button>
                            </div>

                            {/* Filters Panel */}
                            {showFilters && (
                                <div className="mt-6 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/40 animate-[slideDown_0.3s_ease-out]">
                                    {/* Filter Type Switcher */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Filter className="w-5 h-5 text-red-600" />
                                            <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                                                Filter By
                                            </label>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setFilterType("category")}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                    filterType === "category"
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <Tag className="w-4 h-4" />
                                                Category
                                            </button>
                                            <button
                                                onClick={() => setFilterType("source")}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                    filterType === "source"
                                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/50'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <Building2 className="w-4 h-4" />
                                                Source
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Category/Source Filter */}
                                        <div className="flex-1">
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                                                <div className={`w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center ${
                                                    filterType === "category" 
                                                        ? 'from-purple-500 to-pink-600' 
                                                        : 'from-red-500 to-orange-600'
                                                }`}>
                                                    {filterType === "category" ? (
                                                        <Tag className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <Building2 className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                                {filterType === "category" ? "Category" : "Source"}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {(filterType === "category" ? categories : sources).map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => filterType === "category" 
                                                            ? setSelectedCategory(item) 
                                                            : setSelectedSource(item)
                                                        }
                                                        className={`px-5 py-2.5 rounded-xl font-semibold capitalize transition-all duration-300 hover:scale-105 ${
                                                            (filterType === "category" ? selectedCategory : selectedSource) === item
                                                                ? `bg-gradient-to-r ${filterType === "category" ? 'from-purple-600 to-pink-600 shadow-purple-500/50' : 'from-red-600 to-orange-600 shadow-red-500/50'} text-white shadow-lg`
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        
                                    </div>

                                    {/* Clear Filters Button */}
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={clearFilters}
                                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <X className="w-4 h-4" />
                                            Clear All Filters
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Active Filters Display */}
                            {(searchQuery || selectedCategory !== "all" || selectedSource !== "all") && (
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <span className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        Active filters:
                                    </span>
                                    {searchQuery && (
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-red-700 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-all duration-300">
                                            <Search className="w-3.5 h-3.5" />
                                            "{searchQuery}"
                                            <button onClick={() => setSearchQuery("")} className="hover:text-red-900 ml-1 transition-colors duration-300">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedCategory !== "all" && (
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-purple-700 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-all duration-300 capitalize">
                                            <Tag className="w-3.5 h-3.5" />
                                            {selectedCategory}
                                            <button onClick={() => setSelectedCategory("all")} className="hover:text-red-600 ml-1 transition-colors duration-300">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedSource !== "all" && (
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-orange-700 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-all duration-300">
                                            <Building2 className="w-3.5 h-3.5" />
                                            {selectedSource}
                                            <button onClick={() => setSelectedSource("all")} className="hover:text-red-600 ml-1 transition-colors duration-300">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {favoriteArticles.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                                    <Star className="w-12 h-12 text-yellow-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No favorites found</h3>
                                <p className="text-gray-600 mb-6">
                                    {searchQuery || selectedCategory !== "all" || selectedSource !== "all"
                                        ? "Try adjusting your search or filters"
                                        : "Start adding articles to your favorites to see them here"
                                    }
                                </p>
                                {(searchQuery || selectedCategory !== "all" || selectedSource !== "all") && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredArticles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        isFavorite={true}
                                        onRemoveFavorite={removeFavoriteArticle}
                                        onAddFavorite={removeFavoriteArticle}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <style>{`
                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}