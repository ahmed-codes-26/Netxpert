import { useNavigate, useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
];

const serviceLinks = [
    { name: 'CCTV Installation', href: '#services' },
    { name: 'Access Control Systems', href: '#services' },
    { name: 'Structured Networking', href: '#services' },
    { name: 'Security Maintenance', href: '#services' },
    { name: 'Full Ecosystem Design', href: '#services' },
];

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Smooth scroll navigation with 62px offset
    const scrollToSection = (e, href) => {
        e.preventDefault();

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
        <footer className="relative bg-[#000A1D] text-white border-t border-white/10 overflow-hidden font-body">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-12">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    
                    {/* Column 1: Brand & Bio & Social Media (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col space-y-5">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Netxpert Logo" className="h-10 w-auto object-contain" />
                            <h3 className="text-2xl font-bold font-heading text-white tracking-tight">
                                Net<span className="text-red">xpert</span>
                            </h3>
                        </div>
                        <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed max-w-sm">
                            Netxpert is your trusted partner in security and telecom infrastructure, delivering professional
                            CCTV, access control, and structured networking across Pakistan.
                        </p>

                        {/* Social Media Icons (Facebook, X, Instagram) */}
                        <div className="flex items-center gap-3 pt-1">
                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Netxpert on Facebook"
                                className="w-10 h-10 rounded-full bg-[#051838] border border-white/20 flex items-center justify-center text-white hover:bg-red hover:border-red transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* X (formerly Twitter) */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Netxpert on X"
                                className="w-10 h-10 rounded-full bg-[#051838] border border-white/20 flex items-center justify-center text-white hover:bg-red hover:border-red transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer"
                            >
                                <svg className="w-3.5 h-3.5 fill-white text-white" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Netxpert on Instagram"
                                className="w-10 h-10 rounded-full bg-[#051838] border border-white/20 flex items-center justify-center text-white hover:bg-red hover:border-red transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Our Services (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-5">
                            Our Services
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {serviceLinks.map((service) => (
                                <li key={service.name}>
                                    <a
                                        href={service.href}
                                        onClick={(e) => scrollToSection(e, service.href)}
                                        className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                                    >
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Get In Touch (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col space-y-5">
                        <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1">
                            Get In Touch
                        </h4>

                        <div className="space-y-3.5 text-sm">
                            <div className="flex items-start gap-3 text-white/80">
                                <MapPin className="h-4 w-4 text-red shrink-0 mt-1" />
                                <span>Gulberg III, Lahore, Pakistan</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Phone className="h-4 w-4 text-red shrink-0" />
                                <a href="tel:+9204235789000" className="hover:text-white transition-colors">
                                    +92 (042) 3578-9000
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Mail className="h-4 w-4 text-red shrink-0" />
                                <a href="mailto:info@netxpert.pk" className="hover:text-white transition-colors">
                                    info@netxpert.pk
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, '#contact')}
                                className="inline-flex items-center justify-center bg-red hover:bg-red-dark text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-md shadow-red/30 transition-all duration-200 cursor-pointer"
                            >
                                Book a Consultation
                            </a>
                        </div>
                    </div>

                </div>

                {/* Sub-Footer Copyright Bar */}
                <div className="mt-14 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
                    <p>© 2026 Netxpert. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
