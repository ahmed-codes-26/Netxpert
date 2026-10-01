import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Custom CCTV Camera SVG Icon with currentColor for instant CSS hover transitions
const CctvIcon = ({ className = "h-12 w-12" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 8 16 L 30 16 L 36 22 L 36 28 L 8 28 Z" />
        <path d="M 36 20 L 42 16 L 42 30 L 36 26 Z" />
        <circle cx="14" cy="22" r="2.5" />
        <path d="M 18 28 L 18 38 L 32 38" />
        <path d="M 32 34 L 32 42" />
        <path d="M 6 12 L 34 12" />
    </svg>
);

// Access Control / Barrier & RFID Icon
const AccessIcon = ({ className = "h-12 w-12" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="12" height="26" rx="3" />
        <rect x="28" y="14" width="12" height="26" rx="3" />
        <path d="M 20 22 L 28 22" />
        <path d="M 20 30 L 28 30" />
        <rect x="18" y="6" width="12" height="8" rx="1.5" />
        <circle cx="24" cy="10" r="1.5" fill="currentColor" />
    </svg>
);

// Structured Cabling & Networking Icon
const NetworkRackIcon = ({ className = "h-12 w-12" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="36" height="10" rx="2" />
        <rect x="6" y="22" width="36" height="10" rx="2" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
        <circle cx="18" cy="13" r="1.5" fill="currentColor" />
        <circle cx="24" cy="13" r="1.5" fill="currentColor" />
        <line x1="30" y1="13" x2="36" y2="13" />
        <circle cx="12" cy="27" r="1.5" fill="currentColor" />
        <circle cx="18" cy="27" r="1.5" fill="currentColor" />
        <path d="M 14 32 C 14 40 20 40 24 40 C 28 40 34 40 34 32" />
    </svg>
);

const serviceList = [
    {
        id: 'cctv',
        title: 'CCTV Installation',
        description:
            'High-definition IP and analog camera networks designed for total visual coverage, remote mobile monitoring, and critical footage retention.',
        icon: CctvIcon,
    },
    {
        id: 'access-control',
        title: 'Access Control Systems',
        description:
            'Biometric card readers, RFID turnstiles, and automated barrier gates engineered to secure multi-level entry points.',
        icon: AccessIcon,
    },
    {
        id: 'structured-networking',
        title: 'Structured Networking',
        description:
            'Enterprise Cat6/Cat6A cablings, rack organization, and high-speed fiber backbones supporting continuous uptime.',
        icon: NetworkRackIcon,
    },
];

const Services = () => {
    const servicesRef = useRef(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            gsap.fromTo(
                '.services-title',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-title',
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                    clearProps: 'transform,opacity',
                }
            );

            gsap.fromTo(
                '.service-card',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.75,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    clearProps: 'transform,opacity',
                }
            );
        },
        { scope: servicesRef }
    );

    return (
        <section
            id="services"
            ref={servicesRef}
            className="relative w-full bg-[#00102E] border-t border-white/10 py-10 sm:py-14 md:py-16 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
        >
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Left-Aligned Section Title */}
                <div className="services-title mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
                        Services
                    </h2>
                </div>

                {/* 3-Column Service Cards Grid */}
                <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                    {serviceList.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.id}
                                className="service-card group rounded-2xl p-7 sm:p-8 flex flex-col justify-between cursor-pointer min-h-[320px] bg-[#051838] border border-white/10 text-white transition-[background-color,border-color,box-shadow,transform] duration-300 hover:bg-red hover:text-white hover:border-red hover:shadow-2xl hover:shadow-red/30 hover:-translate-y-1.5 shadow-lg"
                            >
                                <div>
                                    {/* Line Art Icon with pure CSS hover color transition */}
                                    <div className="mb-6 text-red group-hover:text-white transition-colors duration-200">
                                        <Icon className="h-12 w-12" />
                                    </div>

                                    {/* Service Title */}
                                    <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3.5 tracking-tight text-white group-hover:text-white transition-colors duration-200">
                                        {service.title}
                                    </h3>

                                    {/* Service Description */}
                                    <p className="font-body text-sm sm:text-base leading-relaxed text-slate-300 group-hover:text-white/90 transition-colors duration-200">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
