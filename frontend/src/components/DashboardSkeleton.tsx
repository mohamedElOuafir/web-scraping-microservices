

export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Skeleton */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    {/* Badge Skeleton */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl animate-pulse"></div>
                        <div className="w-32 h-6 bg-white/20 backdrop-blur-sm rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Title Skeleton */}
                    <div className="w-64 h-12 bg-white/30 rounded-lg mb-2 animate-pulse"></div>
                    <div className="w-80 h-6 bg-white/20 rounded-lg animate-pulse"></div>
                </div>
            </div>

            <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                                <div className="w-12 h-5 bg-gray-200 rounded"></div>
                            </div>
                            <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-16 h-8 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Doughnut Chart Skeleton */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        
                        {/* Circular skeleton */}
                        <div className="flex items-center justify-center h-[400px]">
                            <div className="w-64 h-64 rounded-full border-8 border-gray-200 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Table Skeleton */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Table Header */}
                            <div className="flex gap-4 pb-4 border-b border-gray-200">
                                <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            
                            {/* Table Rows */}
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <div className="flex items-center gap-2 flex-1">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar Chart Skeleton */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-4">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div 
                                        className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
                                        style={{ width: `${Math.random() * 50 + 50}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}