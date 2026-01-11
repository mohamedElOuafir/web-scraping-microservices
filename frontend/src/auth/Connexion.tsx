import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../models/interfaces";


export default function Connexion(){

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");
    const [authentificationError, setAuthentificationError] = useState("");


    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        inputType === "password" ? setInputType("text") : setInputType("password");
    }



    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const userCredentials = {
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredentials)
            });

            const result = await response.json();

            if(!result.login){
                setAuthentificationError(result.message);
                return;
            }

            const loggedUser : User = {
                idUser: result.data.userInfo.idUser,
                username: result.data.userInfo.username,
                email: result.data.userInfo.email
            }

            localStorage.setItem("token", result.data.token);
            localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

            navigate("/dashboard");
        }catch(e) {
            setAuthentificationError("Network problem, try again!");
        }
    }



    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const userRegistrationInfo = {
            username,
            email,
            password
        }

        try {
            const response = await fetch("http://localhost:8080/auth/registration", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(userRegistrationInfo)
            });

            const result = await response.json();

            if(!result.registered){
                setAuthentificationError(result.message);
                return;
            }

            const loggedUser : User = {
                idUser: result.data.userInfo.idUser,
                username: result.data.userInfo.username,
                email: result.data.userInfo.email
            }

            localStorage.setItem("token", result.data.token);
            localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

            navigate("/dashboard");

        }catch(e){
            setAuthentificationError("Network problem, try again!");
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 p-5 relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-48 -right-48"></div>
            <div className="absolute w-80 h-80 bg-white/10 rounded-full -bottom-40 -left-40"></div>

            {/* Carte d'authentification */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md relative z-10 animate-[slideUp_0.5s_ease-out]">
                
                

                {/* Tabs pour basculer entre Login et Register */}
                <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            isLogin 
                                ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg' 
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            !isLogin 
                                ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg' 
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-gray-600 text-sm">
                        {isLogin ? 'Please login to continue' : 'Fill in the details to get started'}
                    </p>
                </div>

                {/* Formulaire Login */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
                        
                        {/* Champ Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-800 text-sm font-semibold ml-1">Email</label>
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <input
                                    type="email"
                                    placeholder="your.name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); setAuthentificationError("");}}
                                    className="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-base text-gray-800 bg-white transition-all duration-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Champ Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-800 text-sm font-semibold ml-1">Password</label>
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input
                                    type={inputType}
                                    placeholder="Enter your password"
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value); setAuthentificationError("");}}
                                    className="w-full py-3.5 pl-12 pr-12 border-2 border-gray-300 rounded-xl text-base text-gray-800 bg-white transition-all duration-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 placeholder:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={handlePasswordVisibility}
                                    className="absolute right-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {inputType === "password" ? (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </>
                                        ) : (
                                            <>
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {authentificationError && (
                            <div className="flex items-center gap-3 py-3 px-4 bg-red-50 border border-red-400 rounded-xl text-red-500 text-sm animate-[shake_0.4s_ease]">
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                                <span>{authentificationError}</span>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white border-none rounded-xl py-4 px-8 text-base font-semibold cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 mt-2 group"
                        >
                            <span>Log In</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </form>
                ) : (
                    /* Formulaire Register */
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
                        
                        {/* Champ Username */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-800 text-sm font-semibold ml-1">Username</label>
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    required
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value); setAuthentificationError("");}}
                                    className="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-base text-gray-800 bg-white transition-all duration-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Champ Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-800 text-sm font-semibold ml-1">Email</label>
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <input
                                    type="email"
                                    placeholder="your.name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); setAuthentificationError("");}}
                                    className="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-base text-gray-800 bg-white transition-all duration-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 placeholder:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Champ Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-800 text-sm font-semibold ml-1">Password</label>
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input
                                    type={inputType}
                                    placeholder="Create a password"
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value); setAuthentificationError("");}}
                                    className="w-full py-3.5 pl-12 pr-12 border-2 border-gray-300 rounded-xl text-base text-gray-800 bg-white transition-all duration-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 placeholder:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={handlePasswordVisibility}
                                    className="absolute right-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {inputType === "password" ? (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </>
                                        ) : (
                                            <>
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                    

                        {authentificationError && (
                            <div className="flex items-center gap-3 py-3 px-4 bg-red-50 border border-red-400 rounded-xl text-red-500 text-sm animate-[shake_0.4s_ease]">
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                                <span>{authentificationError}</span>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white border-none rounded-xl py-4 px-8 text-base font-semibold cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 mt-2 group"
                        >
                            <span>Create Account</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </form>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `}</style>
        </div>
    )

}