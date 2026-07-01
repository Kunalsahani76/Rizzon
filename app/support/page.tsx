"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SupportPage() {
    const [activeCategory, setActiveCategory] = useState("technical");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set(prev).add(entry.target.id));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll("[data-animate]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const supportCategories = [
        {
            id: "technical",
            title: "Technical Support",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            description: "Get help with installation, configuration, and troubleshooting",
        },
        {
            id: "product",
            title: "Product Information",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            description: "Learn about our products, features, and specifications",
        },
        {
            id: "training",
            title: "Training & Resources",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            description: "Access training materials, guides, and best practices",
        },
        {
            id: "warranty",
            title: "Warranty & Service",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            description: "Check warranty status and service options",
        },
    ];

    const faqs = [
        {
            category: "technical",
            question: "How do I install and configure my Rizonn device?",
            answer: "Our devices come with detailed installation guides. You can also access video tutorials in our resource center. For specific models, please refer to the product documentation or contact our technical support team.",
        },
        {
            category: "technical",
            question: "What should I do if my device is not connecting?",
            answer: "First, check all cable connections and power supply. Ensure your network settings are correct. If issues persist, try resetting the device to factory settings following the instructions in your user manual.",
        },
        {
            category: "product",
            question: "What is the difference between Layer 2 and Layer 3 switches?",
            answer: "Layer 2 switches operate at the data link layer using MAC addresses for connectivity. Layer 3 switches, like our Core Routing Switches, operate at the network layer and can perform routing functions between different subnets and VLANs, offering greater network control.",
        },
        {
            category: "product",
            question: "Do Rizonn switches support PoE (Power over Ethernet)?",
            answer: "Yes, many of our switch models, including the NAV-P series, support PoE/PoE+ standards (IEEE 802.3af/at). This allows you to power devices like IP cameras, VoIP phones, and wireless access points directly through the Ethernet cable, simplifying installation.",
        },
        {
            category: "training",
            question: "Do you offer training programs for our team?",
            answer: "Yes, we provide customized training programs including on-site training, virtual sessions, and self-paced online courses. Contact our training department to discuss your specific needs.",
        },
        {
            category: "training",
            question: "Where can I find user manuals and documentation?",
            answer: "All user manuals, quick start guides, and technical documentation are available in our online resource center. You can filter by product category to find specific documentation.",
        },
        {
            category: "warranty",
            question: "What is covered under the warranty?",
            answer: "Our standard warranty covers manufacturing defects and hardware failures under normal use. The warranty period varies by product. Extended warranty and service plans are available for purchase.",
        },
        {
            category: "warranty",
            question: "How do I submit a warranty claim?",
            answer: "To submit a warranty claim, log into your account on our support portal, register your product, and submit a claim with proof of purchase. Our support team will guide you through the process.",
        },
    ];

    const contactMethods = [
        {
            title: "24/7 Phone Support",
            description: "Speak with our technical experts",
            contact: "+91 96676 56203",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
        },
        {
            title: "Email Support",
            description: "Get a response within 24 hours",
            contact: "info@rizonn.in",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Live Chat",
            description: "Chat with our support team",
            contact: "Available Mon-Fri, 9AM-6PM",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            title: "Support Portal",
            description: "Access tickets and resources",
            contact: "rizonn.in",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
        },
    ];

    const filteredFAQs = faqs.filter((faq) => faq.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Animated Background Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slow" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.08),transparent_50%)] animate-pulse-slower" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16" data-animate id="hero">
                        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            Support Center
                        </h1>
                        <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            Get the help you need, when you need it. Our dedicated support team is here to assist you.
                        </p>
                    </div>

                    {/* Search Bar with Shimmer Effect */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                            <input
                                type="text"
                                placeholder="Search for help articles, guides, or FAQs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="relative w-full px-6 py-5 pl-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                            <svg
                                className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Support Categories Grid with Staggered Animation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" data-animate id="categories">
                        {supportCategories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`group p-8 rounded-2xl border transition-all duration-500 text-left transform hover:scale-105 hover:-translate-y-2 ${activeCategory === category.id
                                    ? "bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105"
                                    : "bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 hover:bg-white/10"
                                    } ${visibleSections.has("categories") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className={`mb-4 transition-all duration-300 ${activeCategory === category.id ? "text-blue-400 scale-110 rotate-12" : "text-gray-400 group-hover:text-blue-300 group-hover:scale-110"}`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{category.title}</h3>
                                <p className="text-sm text-gray-400">{category.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs Section with Slide-in Animation */}
            <section className="py-20 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-animate id="faqs">
                        {filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group ${visibleSections.has("faqs") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                        Q
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{faq.question}</h3>
                                        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Methods with Pulse Animation */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12" data-animate id="contact-header">
                        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 ${visibleSections.has("contact-header") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                            Get In Touch
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Choose the support channel that works best for you
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-animate id="contact-methods">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className={`relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 group hover:scale-105 hover:-translate-y-2 ${visibleSections.has("contact-methods") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Animated gradient border on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 animate-gradient-x" />

                                <div className="relative">
                                    <div className="mb-4 text-blue-400 group-hover:text-blue-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{method.title}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{method.description}</p>
                                    <p className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">{method.contact}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with Breathing Animation */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto" data-animate id="cta">
                    <div className={`relative p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 overflow-hidden transition-all duration-1000 ${visibleSections.has("cta") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse-slow" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 animate-shimmer" />

                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-gradient-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                                Still Need Help?
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                Our support team is ready to assist you with any questions or concerns
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105"
                                >
                                    Contact Support
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/products"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                                >
                                    Browse Resources
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .bg-300\% {
          background-size: 300%;
        }
      `}</style>
        </div>
    );
}
