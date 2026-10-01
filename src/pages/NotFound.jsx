import { Link } from 'react-router-dom';
import { WifiOff, Home, ArrowRight, ShieldAlert, PhoneCall } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative min-h-[85vh] bg-[#00102E] text-white flex flex-col items-center justify-center px-5 sm:px-8 py-16 overflow-hidden font-body">
            
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#08214C]/40 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
                
                {/* Visual Icon Badge */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#051838] border border-white/10 shadow-2xl flex items-center justify-center text-red">
                        <WifiOff className="h-10 w-10 sm:h-12 sm:w-12 stroke-[1.8] animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#00102E] border border-red/40 text-red shadow-md">
                        <ShieldAlert className="h-4 w-4" />
                    </div>
                </div>

                {/* 404 Heading */}
                <span className="text-red font-mono text-sm sm:text-base font-bold uppercase tracking-widest mb-2">
                    Error 404 • Network Route Dropped
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight mb-4">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-8">
                    The network path you requested could not be resolved. The page may have been relocated, decommissioned, or does not exist.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red hover:bg-red-dark text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-red/25 active:scale-98"
                    >
                        <Home className="h-4 w-4" />
                        <span>Return to Homepage</span>
                    </Link>

                    <Link
                        to="/#contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#051838] border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-xs"
                    >
                        <PhoneCall className="h-4 w-4 text-red" />
                        <span>Contact Support</span>
                    </Link>
                </div>

                {/* Helpful Quick Navigation Links */}
                <div className="mt-12 pt-8 border-t border-white/10 w-full">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
                        Quick System Links
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
                        <Link to="/#services" className="hover:text-white hover:underline transition-colors flex items-center gap-1">
                            <span>Services</span>
                            <ArrowRight className="h-3 w-3 text-red" />
                        </Link>
                        <span className="text-white/20">•</span>
                        <Link to="/#about" className="hover:text-white hover:underline transition-colors flex items-center gap-1">
                            <span>About Netxpert</span>
                            <ArrowRight className="h-3 w-3 text-red" />
                        </Link>
                        <span className="text-white/20">•</span>
                        <Link to="/#portfolio" className="hover:text-white hover:underline transition-colors flex items-center gap-1">
                            <span>Portfolio</span>
                            <ArrowRight className="h-3 w-3 text-red" />
                        </Link>
                        <span className="text-white/20">•</span>
                        <Link to="/privacy-policy" className="hover:text-white hover:underline transition-colors flex items-center gap-1">
                            <span>Privacy Policy</span>
                            <ArrowRight className="h-3 w-3 text-red" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
