import { MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
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
    return (
        <footer className="relative bg-[#000A1D] text-white border-t border-white/10 overflow-hidden font-body">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-12">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    
                    {/* Column 1: Brand & Bio (4 cols) */}
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
                                        className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
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
                                        className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
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
                                className="inline-flex items-center justify-center bg-red hover:bg-red-dark text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-md shadow-red/30 transition-all duration-200"
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
                        <a href="#privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
