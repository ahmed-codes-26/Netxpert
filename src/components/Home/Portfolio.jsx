import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Shield } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const portfolioProjects = [
    {
        id: 1,
        category: 'ACCESS CONTROL & NETWORKING',
        title: 'Commercial High-Rise HQ',
    },
    {
        id: 2,
        category: 'ENTERPRISE DATA CENTER',
        title: 'Secure Fiber & Thermal Monitoring',
    },
    {
        id: 3,
        category: 'PERIMETER DEFENSE',
        title: 'Industrial Complex Facility',
    },
    {
        id: 4,
        category: 'TELECOM INFRASTRUCTURE',
        title: 'Macro BTS Tower Deployment',
    },
    {
        id: 5,
        category: 'METROPOLITAN FIBER',
        title: 'High-Density Interconnect Ring',
    },
    {
        id: 6,
        category: 'MODULAR DATA CENTER',
        title: 'Edge Cloud Tier-3 Facility',
    },
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="relative w-full bg-white border-t border-border py-10 sm:py-14 md:py-16 overflow-hidden scroll-mt-16 sm:scroll-mt-20">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Left-Aligned Section Title */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-tight">
                        Portfolio
                    </h2>
                </div>

                {/* Swiper Slider Container with Top Headroom and Bottom Pagination Space */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                        grabCursor={true}
                        spaceBetween={24}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 28,
                            },
                        }}
                        className="portfolio-swiper-container w-full pt-3 pb-14 px-1"
                    >
                        {portfolioProjects.map((project) => (
                            <SwiperSlide key={project.id} className="h-auto">
                                <div className="group relative w-full h-[360px] sm:h-[400px] md:h-[420px] rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 bg-gradient-to-b from-[#A0A5AE] via-[#656A74] to-[#25282E] flex flex-col justify-between p-6 sm:p-7 select-none">
                                    
                                    {/* Top Area */}
                                    <div />

                                    {/* Centered Subtle Shield Brand Symbol */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <Shield
                                            className="h-28 w-28 sm:h-32 sm:w-32 text-white/10 stroke-[1.2] group-hover:scale-105 transition-transform duration-500"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    {/* Bottom Content Area */}
                                    <div className="relative z-10 flex flex-col items-start">
                                        <span className="text-red font-body font-bold text-xs uppercase tracking-wider mb-1.5">
                                            {project.category}
                                        </span>
                                        <h3 className="text-white font-heading font-bold text-xl sm:text-2xl leading-snug tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
