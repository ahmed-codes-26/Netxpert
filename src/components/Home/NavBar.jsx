import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
];

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    // Smooth scroll listener for fluid sticky header transition
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock background scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Precise smooth scroll positioning directly below the navigation bar
    const scrollToSection = (e, href) => {
        e.preventDefault();
        closeMenu();

        if (location.pathname !== '/') {
            navigate('/' + (href === '#' ? '' : href));
            return;
        }

        if (!href || href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const stickyNavHeight = 62;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - stickyNavHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            {/* Header: Fixed with fluid transition for padding, shadow, and backdrop */}
            <header
                className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out transform-gpu ${
                    isScrolled
                        ? 'bg-[#00102E]/95 backdrop-blur-md shadow-xl shadow-black/20 border-b border-white/10 py-2.5'
                        : 'bg-[#00102E]/85 backdrop-blur-xs border-b border-white/5 py-4 shadow-none'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
                    {/* Brand Logo & Name */}
                    <a
                        href="#"
                        onClick={(e) => scrollToSection(e, '#')}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <img
                            src="/logo.png"
                            alt="Netxpert Logo"
                            className={`w-auto object-contain transition-all duration-300 ${
                                isScrolled ? 'h-9' : 'h-11'
                            }`}
                        />
                        <h2 className="text-2xl font-bold font-heading text-white tracking-tight">
                            Net<span className="text-red">xpert</span>
                        </h2>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 font-body font-medium text-sm">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="relative py-1 text-slate-300 hover:text-white transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-red after:transition-all after:duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Action Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-red hover:bg-red-dark transition-colors duration-200 rounded-full shadow-sm"
                        >
                            Get in Touch
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="p-2 text-white hover:text-red hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
                            aria-label="Toggle Navigation Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Top Layout Spacer so Hero section doesn't hide behind fixed header */}
            <div className="h-[72px] sm:h-[80px]" aria-hidden="true" />

            {/* Mobile Backdrop Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
                }`}
                onClick={closeMenu}
                aria-hidden={!isMenuOpen}
            />

            {/* Mobile Side Drawer Panel */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-[#00102E] shadow-2xl border-l border-white/10 flex flex-col justify-between p-6 transition-all duration-300 ease-in-out md:hidden ${
                    isMenuOpen
                        ? 'translate-x-0 opacity-100 visible pointer-events-auto'
                        : 'translate-x-full opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                {/* Drawer Top Header */}
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Netxpert Logo" className="h-9 w-auto object-contain" />
                            <h3 className="text-xl font-bold font-heading text-white">
                                Net<span className="text-red">xpert</span>
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
                            aria-label="Close navigation menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-2 mt-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="px-4 py-3 rounded-lg text-base font-medium font-body text-slate-200 hover:bg-white/5 hover:text-white transition-all duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Drawer Footer Action Button */}
                <div className="pt-6 border-t border-white/10">
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="block w-full text-center py-3 text-sm font-medium text-white bg-red hover:bg-red-dark transition-colors duration-200 rounded-full shadow-sm"
                    >
                        Get in Touch
                    </a>
                </div>
            </aside>
        </>
    );
};

export default NavBar;
