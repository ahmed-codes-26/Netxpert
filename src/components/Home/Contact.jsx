import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email Address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please enter a message (minimum 10 characters).';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Please enter a message (minimum 10 characters).';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                if (name === 'fullName' && value.trim()) delete next.fullName;
                if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) delete next.email;
                if (name === 'message' && value.trim().length >= 10) delete next.message;
                return next;
            });
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const validationErrors = validate();
        if (validationErrors[name]) {
            setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
            fullName: true,
            email: true,
            phone: true,
            message: true,
        });

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    message: '',
                });
                setTouched({});
            }, 800);
        }
    };

    return (
        <section id="contact" className="relative w-full bg-white border-t border-border py-12 sm:py-16 md:py-20 scroll-mt-16 sm:scroll-mt-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left Column: Info & Details (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-tight mb-4 sm:mb-5">
                            Get in Touch
                        </h2>
                        
                        <p className="text-body text-sm sm:text-[15px] leading-relaxed mb-8 sm:mb-10 max-w-lg">
                            Have a question about our security infrastructure services or need an urgent system assessment? Reach out to our engineering team today.
                        </p>

                        {/* Contact Information List */}
                        <div className="space-y-6 sm:space-y-7 mb-8 sm:mb-10">
                            {/* Head Office */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-red shrink-0">
                                    <MapPin className="h-5 w-5 fill-red/15 stroke-[2]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-ink text-sm sm:text-base">
                                        Head Office
                                    </h4>
                                    <p className="text-muted text-xs sm:text-sm mt-0.5 leading-normal">
                                        Commercial Zone, Gulberg III, Lahore, Pakistan
                                    </p>
                                </div>
                            </div>

                            {/* Direct Phone */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-red shrink-0">
                                    <Phone className="h-5 w-5 fill-red/15 stroke-[2]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-ink text-sm sm:text-base">
                                        Direct Phone
                                    </h4>
                                    <a
                                        href="tel:+9204235789000"
                                        className="text-muted text-xs sm:text-sm mt-0.5 hover:text-red transition-colors inline-block"
                                    >
                                        +92 (042) 3578-9000
                                    </a>
                                </div>
                            </div>

                            {/* Email Support */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-red shrink-0">
                                    <Mail className="h-5 w-5 fill-red/15 stroke-[2]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-ink text-sm sm:text-base">
                                        Email Support
                                    </h4>
                                    <a
                                        href="mailto:info@connectcommunications.pk"
                                        className="text-muted text-xs sm:text-sm mt-0.5 hover:text-red transition-colors inline-block"
                                    >
                                        info@connectcommunications.pk
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-surface rounded-2xl p-6 border border-border/80 max-w-lg">
                            <h4 className="font-heading font-bold text-ink text-base mb-2">
                                Business Hours
                            </h4>
                            <p className="text-body text-xs sm:text-sm leading-relaxed">
                                Monday – Saturday: 9:00 AM – 6:00 PM
                            </p>
                            <p className="text-body text-xs sm:text-sm leading-relaxed mt-1">
                                24/7 Emergency Support for Enterprise Clients
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact Form (7 cols) */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col space-y-5 sm:space-y-6">
                            
                            {/* Success Notification Banner */}
                            {isSubmitted && (
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fade-in">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                                    <p className="text-xs sm:text-sm font-medium">
                                        Thank you! Your message has been sent successfully. Our engineering team will get back to you shortly.
                                    </p>
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-ink mb-2">
                                    Full Name <span className="text-red">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="John Doe"
                                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-white text-ink text-sm sm:text-[15px] placeholder:text-muted/60 transition-all focus:outline-none ${
                                        errors.fullName && touched.fullName
                                            ? 'border-red ring-1 ring-red'
                                            : 'border-border focus:border-red focus:ring-1 focus:ring-red'
                                    }`}
                                />
                                {errors.fullName && touched.fullName && (
                                    <span className="text-xs text-red mt-1.5 font-medium">
                                        {errors.fullName}
                                    </span>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-ink mb-2">
                                    Email Address <span className="text-red">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="john@example.com"
                                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-white text-ink text-sm sm:text-[15px] placeholder:text-muted/60 transition-all focus:outline-none ${
                                        errors.email && touched.email
                                            ? 'border-red ring-1 ring-red'
                                            : 'border-border focus:border-red focus:ring-1 focus:ring-red'
                                    }`}
                                />
                                {errors.email && touched.email && (
                                    <span className="text-xs text-red mt-1.5 font-medium">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-ink mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+92 300 1234567"
                                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-border bg-white text-ink text-sm sm:text-[15px] placeholder:text-muted/60 transition-all focus:outline-none focus:border-red focus:ring-1 focus:ring-red"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col">
                                <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-ink mb-2">
                                    Message <span className="text-red">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Tell us about your project or security needs..."
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-white text-ink text-sm sm:text-[15px] placeholder:text-muted/60 transition-all focus:outline-none resize-y ${
                                        errors.message && touched.message
                                            ? 'border-red ring-1 ring-red'
                                            : 'border-border focus:border-red focus:ring-1 focus:ring-red'
                                    }`}
                                />
                                {errors.message && touched.message && (
                                    <span className="text-xs text-red mt-1.5 font-medium">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center border-2 border-red text-red hover:bg-red hover:text-white transition-all duration-300 rounded-full px-8 py-3 text-sm sm:text-base font-medium font-body cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
