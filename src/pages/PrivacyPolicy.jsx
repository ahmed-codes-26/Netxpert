import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, ChevronRight, ArrowLeft, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
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
                    <span className="text-red">Privacy Policy</span>
                </nav>

                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-red/10 border border-red/20 text-red">
                        <Shield className="h-6 w-6" />
                    </div>
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-red">
                        Legal & Compliance
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
                    Privacy Policy
                </h1>

                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Netxpert is committed to protecting the privacy, confidentiality, and security of our clients, partners,
                    and website visitors across all telecom, access control, and networking engagements.
                </p>

                <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#051838] border border-white/10 text-slate-300">
                        Effective Date: October 1, 2026
                    </span>
                    <span>•</span>
                    <span>Version 2.4</span>
                </div>
            </div>

            {/* Policy Content Sections */}
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">
                
                {/* Section 1: Overview & Scope */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">01.</span>
                        <h2>Overview & Scope of Policy</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        This Privacy Policy outlines how Netxpert collects, uses, processes, and safeguards personal and enterprise
                        information gathered through our website, client consultation portals, site assessment services, and physical
                        infrastructure installations (including CCTV surveillance systems, biometric access controllers, and structured network facilities).
                    </p>
                </section>

                {/* Section 2: Information We Collect */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">02.</span>
                        <h2>Information We Collect</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        Depending on your interaction with Netxpert, we may collect the following categories of information:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="p-5 rounded-xl bg-[#051838] border border-white/10">
                            <h3 className="font-heading font-bold text-white text-sm sm:text-base mb-2 flex items-center gap-2">
                                <Lock className="h-4 w-4 text-red" />
                                Contact & Business Data
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                Full name, enterprise email address, direct phone number, company name, office address, and project specifications provided via inquiry forms.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-[#051838] border border-white/10">
                            <h3 className="font-heading font-bold text-white text-sm sm:text-base mb-2 flex items-center gap-2">
                                <Eye className="h-4 w-4 text-red" />
                                Infrastructure & Site Specs
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                Floor plans, IP schema requirements, CCTV camera coverage coordinates, and server rack blueprints shared for technical survey and deployment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Purpose of Processing */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">03.</span>
                        <h2>How We Use Collected Information</h2>
                    </div>
                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-300">
                        <li className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red mt-2 shrink-0" />
                            <span><strong>System Engineering & Deployment:</strong> Delivering accurate bills of quantities (BOQ), structured cabling designs, and equipment configuration.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red mt-2 shrink-0" />
                            <span><strong>Technical & Emergency Support:</strong> Providing 24/7 Tier-3 monitoring, warranty repairs, and scheduled preventative maintenance.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red mt-2 shrink-0" />
                            <span><strong>Legal & SLA Compliance:</strong> Maintaining audited operational logs to meet carrier-grade SLA standards and regulatory telecom guidelines.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 4: Security Surveillance & CCTV Footages */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">04.</span>
                        <h2>Client Security & Surveillance Footage Policy</h2>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#051838] border border-white/10">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Netxpert operates strictly as an infrastructure integration provider. We do not store, view, or retain client CCTV video streams, biometric database keys, or telemetry packet payloads on our own servers unless explicitly contracted under a formal Managed Security Service Agreement with end-to-end encrypted tunnels.
                        </p>
                    </div>
                </section>

                {/* Section 5: Data Confidentiality & Security Measures */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold font-heading text-white">
                        <span className="text-red font-mono text-sm sm:text-base">05.</span>
                        <h2>Data Protection & Confidentiality</h2>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                        We employ enterprise-grade security protocols, including AES-256 encryption for data in transit and at rest, role-based access control (RBAC), and strict Non-Disclosure Agreements (NDAs) signed with all field engineers and technical personnel.
                    </p>
                </section>

                {/* Section 6: Inquiries & Contact */}
                <section className="pt-6 border-t border-white/10">
                    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#051838] to-[#0A224E] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-bold font-heading text-white">
                                Have questions about our Privacy Standards?
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm mt-1">
                                Contact our Data Protection and Compliance team directly.
                            </p>
                        </div>
                        <a
                            href="mailto:info@netxpert.pk"
                            className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-red/20 shrink-0"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Contact DPO</span>
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

export default PrivacyPolicy;
