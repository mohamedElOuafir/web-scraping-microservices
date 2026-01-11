import { useState } from "react";
import { 
    ExternalLink, 
    X, 
    Calendar, 
    User,
    Star,
    Share2,
    TrendingUp,
    Clock,
    Building2,
    Tag,
    BookmarkPlus,
    BookmarkCheck
} from "lucide-react";
import type { Article } from "../models/interfaces";


interface ArticleCardProps {
    article: Article;
    isFavorite: boolean;
    onAddFavorite: (article: Article) => void;
    onRemoveFavorite: (article: Article) => void;
}

export default function ArticleCard({ article, isFavorite, onAddFavorite, onRemoveFavorite }: ArticleCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLoading(true);

        if(isFavorite)
            onRemoveFavorite(article)
        else 
            onAddFavorite(article);
        setIsLoading(false);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: article.title,
                url: article.articleUrl
            }).catch(() => {
                navigator.clipboard.writeText(article.articleUrl);
            });
        } else {
            navigator.clipboard.writeText(article.articleUrl);
        }
    };

    const handleReadArticle = () => {
        window.open(article.articleUrl, '_blank', 'noopener,noreferrer');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
        return formatDate(dateString);
    };

    const categoryName = article.category.name;

    return (
        <article 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/60 hover:border-gray-300 cursor-pointer relative flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleReadArticle}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                {!imageError ? (
                    <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-center text-gray-400">
                            <TrendingUp className="w-16 h-16 mx-auto mb-2 opacity-40" />
                            <p className="text-sm font-medium opacity-60">News Article</p>
                        </div>
                    </div>
                )}
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Top Action Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    {/* Category Badge */}
                    <div className="px-3 py-1.5 bg-gradient-to-br from-blue-600 to-emerald-500 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wide rounded-lg shadow-lg flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {categoryName}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg ${
                            isFavorite 
                                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                                : 'bg-white/95 text-gray-700 hover:bg-white hover:text-amber-500'
                        }`}
                    >
                        <Star className={`w-4 h-4 transition-all ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Time Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                    <div className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {getTimeAgo(article.publishDate)}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                {/* Source Bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium mb-0.5">Source</p>
                            <p className="text-sm font-semibold text-gray-900">{article.source.name}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleShare}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group/share"
                    >
                        <Share2 className="w-4 h-4 text-gray-400 group-hover/share:text-gray-700" />
                    </button>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-gray-700 transition-colors duration-200 min-h-[56px]">
                    {article.title}
                </h3>

                {/* Meta Information */}
                <div className="space-y-2.5 mb-4 flex-1">
                    {/* Creators */}
                    {article.creators && article.creators.length > 0 && (
                        <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-gray-600 text-sm line-clamp-1">
                                {article.creators.map(c => c.name).slice(0, 2).join(', ')}
                                {article.creators.length > 2 && ` +${article.creators.length - 2}`}
                            </span>
                        </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(article.publishDate)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 mt-auto pt-2">
                    <button
                        onClick={handleReadArticle}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 group/btn"
                    >
                        <span className="text-sm">Read Article</span>
                        <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    {!isLoading ? (
                        <button
                            onClick={handleFavoriteClick}
                            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                isFavorite 
                                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {isFavorite ? (
                                <BookmarkCheck className="w-4 h-4" />
                            ) : (
                                <BookmarkPlus className="w-4 h-4" />
                            )}
                        </button>
                    ):(
                        <div
                            className="w-10 h-10 border-4 border-t-yellow-500 border-gray-300 rounded-full animate-spin"
                        ></div>

                    )}

                    
                </div>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 transform origin-left transition-transform duration-300 ${
                isHovered ? 'scale-x-100' : 'scale-x-0'
            }`}></div>
        </article>
    );
}

