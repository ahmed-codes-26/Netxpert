import NetworkBackground from './NetworkBackground';
import { ShieldCheck } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative flex min-h-[calc(100vh-65px)] flex-col justify-between overflow-hidden bg-white pt-8 sm:pt-12 pb-6 sm:pb-8">
            {/* Interactive Network Graphic */}
            <NetworkBackground />

            {/* Main Content Area: Full Width on Mobile, Column on Tablet/Desktop */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 my-auto">
                <div className="w-full max-w-full md:max-w-[430px] lg:max-w-xl">
                    {/* Eyebrow */}
                    <p className="text-xs sm:text-sm font-semibold tracking-wider sm:tracking-widest text-red uppercase">
                        Telecom & Data Center Infrastructure
                    </p>

                    {/* Main Headline */}
                    <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-[2.35rem] lg:text-5xl xl:text-6xl font-bold font-heading text-ink leading-[1.14] tracking-tight">
                        Future-ready infrastructure, built end to end.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg font-body text-muted leading-relaxed">
                        From site survey and design to data center and fiber deployment, we
                        deliver the infrastructure your network depends on.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 font-body">
                        <button
                            type="button"
                            onClick={() => {
                                const target = document.getElementById('services');
                                if (target) {
                                    const top = target.getBoundingClientRect().top + window.pageYOffset - 62;
                                    window.scrollTo({ top, behavior: 'smooth' });
                                }
                            }}
                            className="w-full sm:w-auto rounded-xl bg-red px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-red-dark cursor-pointer text-center"
                        >
                            Explore Services
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const target = document.getElementById('about');
                                if (target) {
                                    const top = target.getBoundingClientRect().top + window.pageYOffset - 62;
                                    window.scrollTo({ top, behavior: 'smooth' });
                                }
                            }}
                            className="w-full sm:w-auto rounded-xl border border-ink/20 px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-surface cursor-pointer text-center"
                        >
                            About Netxpert
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-Width Metrics Bar with Divider Line */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 mt-8 sm:mt-10 md:mt-12">
                <div className="border-t border-border pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16 font-body text-center">
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-red shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-body">
                            99.99% Reliability
                        </span>
                    </div>

                    <div className="hidden sm:block h-3.5 w-px bg-border" />

                    <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-ink">500+</span>
                        <span className="text-xs sm:text-sm text-muted">Nodes Deployed</span>
                    </div>

                    <div className="hidden sm:block h-3.5 w-px bg-border" />

                    <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-ink">24/7</span>
                        <span className="text-xs sm:text-sm text-muted">Tier-3 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;