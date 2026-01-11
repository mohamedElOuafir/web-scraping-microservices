import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    FileText, 
    Star, 
    LogOut, 
    Menu, 
    X,
    Newspaper,
    ChevronDown,
    LayoutDashboard
} from "lucide-react";
import type {User} from "../models/interfaces";
import { useActiveLink } from "../context/ActiveLinkContext";



export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [profile, setProfile] = useState<User>();

    const {activeLink, updateActiveLink} = useActiveLink();

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);


    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("token");
        setProfile(undefined);

        navigate("/");

    }

    useEffect(() => {
        const user = localStorage.getItem("loggedUser");
        
        if(user)
            setProfile(JSON.parse(user));

        updateActiveLink(location.pathname);

    },[]);


    return (
        <nav className="bg-white shadow-lg border-b-2 border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo */}
                    <div className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            <Newspaper className="w-7 h-7 text-white" />
                        </div>
                        <div >
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                                Articles
                            </h1>
                            <p className="text-xs text-gray-500">Knowledge Center</p>
                        </div>
                    </div>

                    {/* Hamburger Menu - Mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>

                    {/* Navigation Links - Desktop */}
                    <ul className="hidden md:flex items-center gap-2">
                        <li>
                            <Link
                                to="/dashboard"
                                onClick={() => updateActiveLink('/dashboard')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                    activeLink === '/dashboard'
                                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/articles"
                                onClick={() => updateActiveLink('/articles')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                    activeLink === '/articles'
                                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                            >
                                <FileText className="w-5 h-5" />
                                <span className="font-medium">Articles</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                onClick={() => updateActiveLink('/favorites')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                    activeLink === '/favorites'
                                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                            >
                                <Star className="w-5 h-5" />
                                <span className="font-medium">Favorites</span>
                            </Link>
                        </li>
                        
                    </ul>

                    {/* User Menu - Desktop */}
                    {profile && (
                        <div className="hidden md:block relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-transparent hover:border-gray-200"
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-semibold shadow-lg">
                                        {profile.username.charAt(0)}
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-800">{profile.username}</p>
                                </div>
                                <ChevronDown 
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-[slideDown_0.2s_ease-out]">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">{profile.username}</p>
                                        <p className="text-xs text-gray-500">{profile.email || 'member@library.com'}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-300 text-left"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="font-medium">Log Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 animate-[slideDown_0.3s_ease-out]">
                        <ul className="space-y-2">
                            <li>
                            <Link
                                to="/dashboard"
                                onClick={() => updateActiveLink('/dashboard')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                    activeLink === '/dashboard'
                                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </Link>
                        </li>
                            <li>
                                <Link
                                    to="/articles"
                                    onClick={() => {updateActiveLink('/articles'); setIsMenuOpen(false);}}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        activeLink === '/articles'
                                            ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                >
                                    <FileText className="w-5 h-5" />
                                    <span className="font-medium">Articles</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/favorites"
                                    onClick={() => {updateActiveLink('/favorites'); setIsMenuOpen(false);}}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        activeLink === '/favorites'
                                            ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                >
                                    <Star className="w-5 h-5" />
                                    <span className="font-medium">Favorites</span>
                                </Link>
                            </li>
                        
                            
                            <li className="pt-2 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Log Out</span>
                                </button>
                            </li>
                        </ul>

                        {/* User Info Mobile */}
                        {profile && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-3 px-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-semibold shadow-lg">
                                            {profile.username.charAt(0)}
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{profile.username}</p>
                                        <p className="text-xs text-gray-500">{profile.email || 'member@library.com'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
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
        </nav>
    );
}