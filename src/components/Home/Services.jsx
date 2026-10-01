import { useState } from 'react';

// Custom CCTV Camera SVG Icon matching the exact style from the reference image
const CctvIcon = ({ className = "h-12 w-12", color = "currentColor" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera body */}
        <path d="M 8 16 L 30 16 L 36 22 L 36 28 L 8 28 Z" />
        {/* Lens */}
        <path d="M 36 20 L 42 16 L 42 30 L 36 26 Z" />
        {/* Front ring */}
        <circle cx="14" cy="22" r="2.5" />
        {/* Cable / Mount bracket */}
        <path d="M 18 28 L 18 38 L 32 38" />
        <path d="M 32 34 L 32 42" />
        {/* Sunshield top */}
        <path d="M 6 12 L 34 12" />
    </svg>
);

// Access Control / Turnstile & Biometric Icon
const AccessIcon = ({ className = "h-12 w-12", color = "currentColor" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Turnstile / Gate barrier */}
        <rect x="8" y="14" width="12" height="26" rx="3" />
        <rect x="28" y="14" width="12" height="26" rx="3" />
        <path d="M 20 22 L 28 22" />
        <path d="M 20 30 L 28 30" />
        {/* RFID Card / Sensor wave */}
        <rect x="18" y="6" width="12" height="8" rx="1.5" />
        <circle cx="24" cy="10" r="1.5" fill={color} />
    </svg>
);

// Structured Cabling & Networking Icon
const NetworkRackIcon = ({ className = "h-12 w-12", color = "currentColor" }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rack shelf */}
        <rect x="6" y="8" width="36" height="10" rx="2" />
        <rect x="6" y="22" width="36" height="10" rx="2" />
        {/* Ports and LEDs */}
        <circle cx="12" cy="13" r="1.5" fill={color} />
        <circle cx="18" cy="13" r="1.5" fill={color} />
        <circle cx="24" cy="13" r="1.5" fill={color} />
        <line x1="30" y1="13" x2="36" y2="13" />
        <circle cx="12" cy="27" r="1.5" fill={color} />
        <circle cx="18" cy="27" r="1.5" fill={color} />
        {/* Patch cables flowing down */}
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
        featured: false,
    },
    {
        id: 'access-control',
        title: 'Access Control Systems',
        description:
            'Biometric card readers, RFID turnstiles, and automated barrier gates engineered to secure multi-level entry points.',
        icon: AccessIcon,
        featured: true,
    },
    {
        id: 'structured-networking',
        title: 'Structured Networking',
        description:
            'Enterprise Cat6/Cat6A cablings, rack organization, and high-speed fiber backbones supporting continuous uptime.',
        icon: NetworkRackIcon,
        featured: false,
    },
];

const Services = () => {
    const [activeId, setActiveId] = useState('access-control');

    return (
        <section id="services" className="relative w-full bg-white border-t border-border py-10 sm:py-14 md:py-16 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Left-Aligned Section Title (Standardized Layout) */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-tight">
                        Services
                    </h2>
                </div>

                {/* 3-Column Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                    {serviceList.map((service) => {
                        const Icon = service.icon;
                        const isFeatured = activeId === service.id;

                        return (
                            <div
                                key={service.id}
                                onMouseEnter={() => setActiveId(service.id)}
                                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer min-h-[320px] ${
                                    isFeatured
                                        ? 'bg-red text-white shadow-xl shadow-red/25 transform -translate-y-1'
                                        : 'bg-white border border-border text-ink hover:border-red/40 hover:shadow-lg'
                                }`}
                            >
                                <div>
                                    {/* Line Art Icon */}
                                    <div className="mb-6">
                                        <Icon
                                            className="h-12 w-12"
                                            color={isFeatured ? '#FFFFFF' : '#D91E1E'}
                                        />
                                    </div>

                                    {/* Service Title */}
                                    <h3
                                        className={`font-heading text-xl sm:text-2xl font-bold mb-3.5 tracking-tight ${
                                            isFeatured ? 'text-white' : 'text-ink'
                                        }`}
                                    >
                                        {service.title}
                                    </h3>

                                    {/* Service Description */}
                                    <p
                                        className={`font-body text-sm sm:text-base leading-relaxed ${
                                            isFeatured ? 'text-white/90' : 'text-muted'
                                        }`}
                                    >
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
