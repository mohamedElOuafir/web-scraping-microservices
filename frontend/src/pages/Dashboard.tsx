import { useEffect, useMemo, useState } from "react";
import {
    FileText,
    Calendar,
    Tag,
    Building2,
    Users,
    BarChart3,
    PieChart,
    Activity,

} from "lucide-react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import NavBar from "../components/NavBar";
import type { Article } from "../models/interfaces";
import DashboardSkeleton from "../components/DashboardSkeleton";


// Register ChartJS components
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




export default function Dashboard() {
    
    const [articles, setArticles] = useState<Article[]>([]);
    const [ArticlesPrepared, setArticlesPrepared] = useState(false);

    const categoryColors = [ "#3498DB", "#E74C3C",  "#2ECC71",  "#F39C12",  "#9B59B6","#1ABC9C",  "#34495E",  "#E67E22","#16A085",  "#8E44AD",  "#27AE60",  "#D35400",  "#2980B9",  "#C0392B",  "#7F8C8D" ]


    const getAllArticlesFromDB = async () => {

        try{
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/article/all", {
                method: "GET",
                headers : {
                    "Authorization" : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            });

            const result = await response.json();

            if(result.articles !== undefined){
                setArticles(result.articles);
                setArticlesPrepared(true);
            }
        }catch(e){
            
        }
    }

    // Calculate statistics
    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const todayArticles = articles.filter(a => a.publishDate === today);
        
        const uniqueCategories = new Set(articles.map(a => a.category.name));
        const uniqueSources = new Set(articles.map(a => a.source.name));
        const uniqueAuthors = new Set(articles.flatMap(a => a.creators.map(c => c.name)));

        return {
            totalArticles: articles.length,
            todayArticles: todayArticles.length,
            totalCategories: uniqueCategories.size,
            totalSources: uniqueSources.size,
            totalAuthors: uniqueAuthors.size
        };
    }, [articles]);
    

    // Category distribution
    const categoryDistribution = useMemo(() => {
        const distribution: Record<string, number> = {};
        articles.forEach(article => {
            const category = article.category.name;
            distribution[category] = (distribution[category] || 0) + 1;
        });
        
        const total = articles.length;
        return Object.entries(distribution)
            .map(([name, count]) => ({
                name,
                count,
                percentage: ((count / total) * 100).toFixed(1)
            }))
            .sort((a, b) => b.count - a.count);
    }, [articles]);

    // Top 10 sources
    const topSources = useMemo(() => {
        const sourceCounts: Record<string, number> = {};
        articles.forEach(article => {
            const source = article.source.name;
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        });
        
        return Object.entries(sourceCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [articles]);

    

    

    // Doughnut Chart Data
    const doughnutData = {
        labels: categoryDistribution.map(c => c.name.charAt(0).toUpperCase() + c.name.slice(1)),
        datasets: [
            {
                label: 'Articles',
                data: categoryDistribution.map((c) => c.count),
                backgroundColor: categoryColors,
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 10
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} articles (${percentage}%)`;
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        }
    };

    // Bar Chart Data
    const barData = {
        labels: topSources.map(s => s.name),
        datasets: [
            {
                label: 'Articles',
                data: topSources.map(s => s.count),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(147, 51, 234, 0.8)',
            }
        ]
    };

    /*const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.parsed.x} articles`;
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '600'
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '600'
                    }
                }
            }
        }
    };*/


    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, // 🔴 OBLIGATOIRE
    };




    useEffect(() => {
        getAllArticlesFromDB();
    }, []);

    return (
        <>
            <NavBar />

            {!ArticlesPrepared ? (
                <DashboardSkeleton />
            ):(
                
            
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                    {/* Header */}
                    <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                        
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                    Analytics Dashboard
                                </span>
                            </div>
                            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                Content Analytics
                            </h1>
                            <p className="text-blue-100 text-lg">Real-time insights and statistics</p>
                        </div>
                    </div>

                    <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                            {/* Total Articles */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Total Articles</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalArticles}</p>
                            </div>

                            {/* Today's Articles */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Today's Articles</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.todayArticles}</p>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Tag className="w-6 h-6 text-white" />
                                    </div>
                                    
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Categories</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
                            </div>

                            {/* Sources */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Sources</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalSources}</p>
                            </div>

                            {/* Authors */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Authors</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalAuthors}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Doughnut Chart - Distribution by Categories */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                        <PieChart className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Distribution by Categories</h2>
                                </div>
                                
                                <div className="h-[400px]">
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                </div>
                            </div>

                            {/* Category Table */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <Tag className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Category Statistics</h2>
                                </div>
                                
                                <div className="overflow-hidden rounded-xl border border-gray-200">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Articles</th>
                                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {categoryDistribution.map((category, index) => (
                                                <tr key={category.name} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div 
                                                                className="w-3 h-3 rounded-full" 
                                                                style={{ backgroundColor: categoryColors[index] }}
                                                            ></div>
                                                            <span className="text-sm font-semibold text-gray-900 capitalize">{category.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
                                                            {category.count}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span 
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white"
                                                            style={{ backgroundColor: categoryColors[index] }}
                                                        >
                                                            {category.percentage}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Bar Chart - Top 10 Sources */}
                        <div className=" bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-max h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Top 10 Sources</h2>
                            </div>
                            
                            <div className=" h-[500px]">
                                <Bar data={barData} options={barOptions}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}