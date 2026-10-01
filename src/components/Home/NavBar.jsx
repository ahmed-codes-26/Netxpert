import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
];

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

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

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-border">
                <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Netxpert Logo" className="h-12 w-auto object-contain" />
                        <h2 className="text-2xl font-bold font-heading text-ink tracking-tight">
                            Net<span className="text-red">xpert</span>
                        </h2>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 font-body font-medium text-sm">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`relative py-1 transition-colors duration-200 ${
                                    link.active
                                        ? 'text-ink font-semibold after:w-full'
                                        : 'text-muted hover:text-ink after:w-0 hover:after:w-full'
                                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red after:transition-all after:duration-200`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Action Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#contact"
                            className="px-5 py-2 text-sm font-medium text-white bg-red hover:bg-red-dark transition-colors duration-200 rounded-full shadow-sm"
                        >
                            Get in Touch
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="p-2 text-ink hover:text-red hover:bg-surface rounded-lg transition-colors focus:outline-none"
                            aria-label="Toggle Navigation Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Backdrop Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
                }`}
                onClick={closeMenu}
                aria-hidden={!isMenuOpen}
            />

            {/* Mobile Side Drawer (Completely hidden & translated offscreen when closed) */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl border-l border-border flex flex-col justify-between p-6 transition-all duration-300 ease-in-out md:hidden ${
                    isMenuOpen
                        ? 'translate-x-0 opacity-100 visible pointer-events-auto'
                        : 'translate-x-full opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                {/* Drawer Top Header */}
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Netxpert Logo" className="h-9 w-auto object-contain" />
                            <h3 className="text-xl font-bold font-heading text-ink">
                                Net<span className="text-red">xpert</span>
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="p-2 text-muted hover:text-ink hover:bg-surface rounded-lg transition-colors focus:outline-none"
                            aria-label="Close navigation menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex flex-col gap-2 mt-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className={`px-4 py-3 rounded-lg text-base font-medium font-body transition-all duration-200 ${
                                    link.active
                                        ? 'bg-red-tint text-red font-semibold'
                                        : 'text-body hover:bg-surface hover:text-ink'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Drawer Footer Action Button */}
                <div className="pt-6 border-t border-border">
                    <a
                        href="#contact"
                        onClick={closeMenu}
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
