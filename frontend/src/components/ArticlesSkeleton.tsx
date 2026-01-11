

export default function ArticlesSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Skeleton */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            {/* Badge Skeleton */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl animate-pulse"></div>
                                <div className="w-36 h-6 bg-white/20 backdrop-blur-sm rounded-full animate-pulse"></div>
                            </div>
                            
                            {/* Title Skeleton */}
                            <div className="w-72 h-12 bg-white/30 rounded-lg mb-2 animate-pulse"></div>
                            <div className="w-96 h-6 bg-white/20 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Stats Cards Skeleton */}
                        <div className="flex gap-4">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="px-6 py-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                                        <div>
                                            <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
                                            <div className="w-12 h-8 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filter Bar Skeleton */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar Skeleton */}
                        <div className="flex-1 h-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl animate-pulse"></div>
                        
                        {/* Filter Button Skeleton */}
                        <div className="w-32 h-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Articles Grid Skeleton */}
            <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
                            {/* Image Skeleton */}
                            <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                                {/* Floating badges skeleton */}
                                <div className="absolute top-4 left-4 w-20 h-8 bg-white/40 backdrop-blur-sm rounded-full"></div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full"></div>
                                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full"></div>
                                </div>
                                <div className="absolute bottom-4 left-4 w-24 h-7 bg-white/40 backdrop-blur-sm rounded-full"></div>
                            </div>
                            
                            {/* Content Skeleton */}
                            <div className="p-6">
                                {/* Source Bar Skeleton */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                                        <div>
                                            <div className="w-12 h-3 bg-gray-200 rounded mb-1"></div>
                                            <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-gray-200 rounded-lg"></div>
                                </div>

                                {/* Title Skeleton */}
                                <div className="space-y-2 mb-4 min-h-[56px]">
                                    <div className="w-full h-5 bg-gray-200 rounded"></div>
                                    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                                </div>

                                {/* Meta Skeleton */}
                                <div className="space-y-3 mb-5">
                                    <div className="w-40 h-8 bg-gray-100 rounded-lg"></div>
                                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                </div>

                                {/* Buttons Skeleton */}
                                <div className="flex gap-3">
                                    <div className="flex-1 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}