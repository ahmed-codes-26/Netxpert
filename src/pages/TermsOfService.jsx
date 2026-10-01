import { Link } from 'react-router-dom';
import { Scale, CheckCircle2, ChevronRight, ArrowLeft, Mail, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="bg-[#00102E] text-white min-h-screen font-body pt-8 pb-20">
            {/* Header / Hero Section */}
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-white/10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 font-medium">
                    <Link to="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-red">Terms of Service</span>
                </nav>

                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-red/10 border border-red/20 text-red">
                        <Scale className="h-6 w-6" />
                    </div>
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-red">
                        Service Agreement & Guidelines
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
                    Terms of Service
                </h1>

                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Please read these Terms of Service carefully before commissioning infrastructure surveys, hardware procurement,
                    cabling installations, or managed security services with Netxpert.
                </p>

                <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#051838] border border-white/10 text-slate-300">
                        Last Updated: October 1, 2026
                    </span>
                    <span>•</span>
                    <span>Version 2.4</span>
                </div>
            </div>

            {/* Terms Content Sections */}
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">

                {/* Section 1: Acceptance */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">01.</span>
                        <h2>Acceptance of Agreement</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        By accessing our website, requesting engineering site surveys, approving technical quotations, or engaging
                        Netxpert for telecom and security integration services, you confirm that you have read, understood, and agreed
                        to be bound by these Terms of Service.
                    </p>
                </section>

                {/* Section 2: Scope of Engineering Services */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">02.</span>
                        <h2>Scope of Engineering & Installation Services</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        Netxpert provides specialized infrastructure solutions, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
                        <div className="p-4 rounded-xl bg-[#051838] border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-red shrink-0 mt-0.5" />
                            <span>CCTV Surveillance & Remote NVR Matrix</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[#051838] border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-red shrink-0 mt-0.5" />
                            <span>Biometric & RFID Access Control Gates</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[#051838] border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-red shrink-0 mt-0.5" />
                            <span>Cat6/Cat6A & Multi-Strand Fiber Cabling</span>
                        </div>
                    </div>
                </section>

                {/* Section 3: Site Access & Environmental Readiness */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">03.</span>
                        <h2>Client Site Readiness & Access Obligations</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        Clients agree to provide safe, unobstructed physical access to server rooms, riser shafts, and conduit pathways during agreed-upon maintenance windows. It is the client’s responsibility to secure relevant building permissions, permits, and electrical power redundancy before equipment commissioning.
                    </p>
                </section>

                {/* Section 4: OEM Warranties & Equipment */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">04.</span>
                        <h2>Hardware Warranties & OEM Guarantees</h2>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#051838] border border-white/10 space-y-3">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            All active networking hardware (switches, routers, firewalls, and cameras) carries original manufacturer warranties (typically 1–3 years). Netxpert provides workmanship warranties on structured cabling termination and rack installations for a standard period of 12 months from handover.
                        </p>
                    </div>
                </section>

                {/* Section 5: Limitation of Liability */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">05.</span>
                        <h2>Limitation of Liability</h2>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red/5 border border-red/20 text-slate-300 text-xs sm:text-sm">
                        <AlertCircle className="h-5 w-5 text-red shrink-0 mt-0.5" />
                        <p>
                            To the maximum extent permitted by applicable law, Netxpert shall not be liable for indirect, incidental, or consequential damages resulting from ISP upstream fiber cuts, public grid power failures, or unauthorized third-party tampering with physical patch panels.
                        </p>
                    </div>
                </section>

                {/* Section 6: Governing Law & Inquiries */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">06.</span>
                        <h2>Governing Law & Dispute Resolution</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the commercial courts in Lahore, Pakistan.
                    </p>
                </section>

                {/* Section 7: Legal Inquiry Card */}
                <section className="pt-6 border-t border-white/10">
                    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#051838] to-[#0A224E] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-bold font-heading text-white">
                                Questions regarding enterprise Master Service Agreements (MSA)?
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm mt-1">
                                Our legal and contracts team is available to discuss custom SLA contracts.
                            </p>
                        </div>
                        <a
                            href="mailto:info@netxpert.pk"
                            className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-red/20 shrink-0"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Contact Legal</span>
                        </a>
                    </div>
                </section>

                {/* Back to Home Button */}
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Return to Homepage</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default TermsOfService;
