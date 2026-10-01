import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
    {
        title: 'Tier III / IV Specs',
        desc: 'Mission-critical ready',
    },
    {
        title: '99.999% SLA',
        desc: 'Carrier-grade uptime',
    },
    {
        title: 'Carrier-Neutral',
        desc: 'Dual-homed multi-POP',
    },
];

const About = () => {
    const aboutRef = useRef(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            // Section Title
            gsap.fromTo(
                '.about-title',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-title',
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                    clearProps: 'transform,opacity',
                }
            );

            // Image Frame
            gsap.fromTo(
                '.about-image-frame',
                { x: -40, opacity: 0, scale: 0.96 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-image-frame',
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                    clearProps: 'transform,opacity',
                }
            );

            // Right Column Text & Cards
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                defaults: { ease: 'power3.out' },
                onComplete: () => {
                    gsap.set(['.about-heading', '.about-desc', '.about-specs', '.about-stat-item', '.about-buttons'], {
                        clearProps: 'transform,opacity',
                    });
                },
            });

            tl.fromTo(
                '.about-heading',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 }
            )
                .fromTo(
                    '.about-desc',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.4'
                )
                .fromTo(
                    '.about-specs',
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7 },
                    '-=0.3'
                )
                .fromTo(
                    '.about-stat-item',
                    { y: 15, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
                    '-=0.4'
                )
                .fromTo(
                    '.about-buttons',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.3'
                );
        },
        { scope: aboutRef }
    );

    return (
        <section
            id="about"
            ref={aboutRef}
            className="relative w-full bg-[#00102E] border-t border-white/10 py-10 sm:py-14 md:py-16 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
        >
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Left-Aligned Section Title */}
                <div className="about-title mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
                        About Us
                    </h2>
                </div>

                {/* 2-Column Grid: Picture on Left, Text on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Column: Clean Picture */}
                    <div className="lg:col-span-6">
                        <div className="about-image-frame relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#051838]">
                            <img
                                src="/about.jpg"
                                alt="Netxpert Data Center & Telecom Engineers"
                                className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Right Column: Text + Specs + Buttons */}
                    <div className="about-content lg:col-span-6 flex flex-col items-start">
                        {/* Heading */}
                        <h3 className="about-heading font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                            Building the <span className="text-red">infrastructure</span> behind connected businesses.
                        </h3>

                        {/* Description */}
                        <p className="about-desc mt-4 font-body text-base sm:text-lg text-slate-300 leading-relaxed">
                            Netxpert delivers end-to-end telecom and data center infrastructure solutions, helping organizations
                            design, deploy, and maintain reliable networks built for today and ready for what’s next.
                        </p>

                        {/* Specs Tile (Moved Above Buttons) */}
                        <div className="about-specs w-full mt-6 bg-[#051838] rounded-xl p-4 sm:p-5 border border-white/10 shadow-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {stats.map((item) => (
                                    <div key={item.title} className="about-stat-item flex flex-col">
                                        <div className="flex items-center gap-1.5 text-white">
                                            <CheckCircle2 className="h-4 w-4 text-red shrink-0" />
                                            <span className="font-heading text-xs sm:text-sm font-bold tracking-tight">
                                                {item.title}
                                            </span>
                                        </div>
                                        <span className="font-body text-xs text-slate-400 mt-0.5 pl-5.5">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons (Portfolio & Team - Below the Tile) */}
                        <div className="about-buttons flex flex-wrap items-center gap-3.5 mt-6 w-full sm:w-auto font-body">
                            <a
                                href="#portfolio"
                                className="group inline-flex items-center justify-center gap-2 bg-red text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-red-dark transition-all duration-200 shadow-md shadow-red/20"
                            >
                                <span>Portfolio</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#team"
                                className="inline-flex items-center justify-center gap-2 bg-[#051838] border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-200 shadow-xs"
                            >
                                <span>Team</span>
                                <ArrowUpRight className="h-4 w-4 text-slate-400" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
