"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PartnerPortalPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [hoveredTier, setHoveredTier] = useState<string | null>(null);

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

    const benefits = [
        {
            title: "Exclusive Pricing",
            description: "Access special partner pricing and volume discounts",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: "Sales Support",
            description: "Dedicated account managers and sales enablement tools",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: "Training & Certification",
            description: "Access comprehensive training programs and certifications",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
        },
        {
            title: "Marketing Resources",
            description: "Co-marketing opportunities and ready-to-use marketing materials",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            ),
        },
        {
            title: "Technical Support",
            description: "Priority technical support and pre-sales engineering assistance",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            title: "Partner Portal Access",
            description: "24/7 access to ordering, inventory, and deal registration",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
    ];

    const partnerTiers = [
        {
            name: "Authorized Partner",
            level: "Entry Level",
            requirements: [
                "Complete partner registration",
                "Basic product training",
                "Minimum annual commitment",
            ],
            benefits: [
                "Access to partner pricing",
                "Marketing development funds",
                "Standard support",
            ],
            color: "from-gray-600/20 to-gray-700/20",
            borderColor: "border-gray-500/30",
        },
        {
            name: "Silver Partner",
            level: "Mid-Tier",
            requirements: [
                "Certified sales professionals",
                "Advanced technical training",
                "Higher revenue commitment",
            ],
            benefits: [
                "Enhanced discount levels",
                "Co-marketing opportunities",
                "Priority support",
                "Deal registration",
            ],
            color: "from-slate-400/20 to-slate-500/20",
            borderColor: "border-slate-400/40",
            featured: true,
        },
        {
            name: "Gold Partner",
            level: "Premium",
            requirements: [
                "Multiple certified professionals",
                "Customer success stories",
                "Significant revenue milestone",
            ],
            benefits: [
                "Maximum discount rates",
                "Dedicated account manager",
                "Premium support & training",
                "Early access to new products",
                "Strategic planning sessions",
            ],
            color: "from-yellow-600/20 to-amber-600/20",
            borderColor: "border-yellow-500/40",
        },
    ];

    const resources = [
        {
            category: "Sales Tools",
            items: [
                { name: "Product Catalog", type: "PDF" },
                { name: "Pricing Guide", type: "Excel" },
                { name: "Sales Playbook", type: "PDF" },
                { name: "ROI Calculator", type: "Tool" },
            ],
        },
        {
            category: "Marketing",
            items: [
                { name: "Brand Guidelines", type: "PDF" },
                { name: "Product Images", type: "ZIP" },
                { name: "Case Studies", type: "PDF" },
                { name: "Email Templates", type: "HTML" },
            ],
        },
        {
            category: "Technical",
            items: [
                { name: "Installation Guides", type: "PDF" },
                { name: "Configuration Tools", type: "Software" },
                { name: "API Documentation", type: "Web" },
                { name: "Troubleshooting KB", type: "Web" },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-float-slow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 12}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse-slow" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.1),transparent_50%)] animate-pulse-slower" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12" data-animate id="hero">
                        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            Partner Portal
                        </h1>
                        <p className={`text-xl text-gray-300 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            Join our partner ecosystem and unlock exclusive benefits, resources, and support to grow your business.
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <Link href="/partner/apply" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105">
                                Become a Partner
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            {/* <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                                Partner Login
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Benefits with Staggered Animation */}
            <section className="py-20 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12" data-animate id="benefits-header">
                        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has("benefits-header") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                            Partner Benefits
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Everything you need to succeed with Rizonn
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate id="benefits">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={`group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 ${visibleSections.has("benefits") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-4 text-blue-400 group-hover:text-blue-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Tiers with 3D Flip Effect */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12" data-animate id="tiers-header">
                        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 ${visibleSections.has("tiers-header") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                            Partner Program Tiers
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Grow with us through our tiered partner program
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="tiers">
                        {partnerTiers.map((tier, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredTier(tier.name)}
                                onMouseLeave={() => setHoveredTier(null)}
                                className={`relative p-8 rounded-2xl bg-gradient-to-br ${tier.color} backdrop-blur-md border ${tier.borderColor} transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${tier.featured ? "ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/20" : ""
                                    } ${visibleSections.has("tiers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{
                                    transitionDelay: `${index * 150}ms`,
                                    transform: hoveredTier === tier.name ? "rotateY(5deg)" : "rotateY(0deg)",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full animate-bounce-slow">
                                        Most Popular
                                    </div>
                                )}

                                {/* Animated gradient border */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 opacity-0 blur-xl transition-opacity duration-500 ${hoveredTier === tier.name ? "opacity-30 animate-gradient-x" : ""}`} />

                                <div className="relative z-10">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                        <p className="text-gray-400">{tier.level}</p>
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Requirements</h4>
                                        <ul className="space-y-2">
                                            {tier.requirements.map((req, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                                                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    <span className="text-sm">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Benefits</h4>
                                        <ul className="space-y-2">
                                            {tier.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                                                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-sm">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section with Hover Effects */}
            {/* <section className="py-20 px-6 bg-black/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12" data-animate id="resources-header">
                        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 ${visibleSections.has("resources-header") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                            Partner Resources
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Access tools and materials to drive your success
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="resources">
                        {resources.map((resource, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${visibleSections.has("resources") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{resource.category}</h3>
                                <ul className="space-y-3">
                                    {resource.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="group/item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:translate-x-2"
                                            style={{ transitionDelay: `${i * 50}ms` }}
                                        >
                                            <span className="text-gray-300 group-hover/item:text-white transition-colors flex items-center gap-2">
                                                <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {item.name}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded-md group-hover/item:bg-blue-600/30 group-hover/item:scale-110 transition-all">{item.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA Section with Shimmer Effect */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto" data-animate id="cta">
                    <div className={`relative p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 overflow-hidden transition-all duration-1000 ${visibleSections.has("cta") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse-slow" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 animate-shimmer" />

                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                                Ready to Partner with Rizonn?
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                Join hundreds of successful partners worldwide and start growing your business today
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/partner/apply"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105"
                                >
                                    Apply Now
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                                >
                                    Contact Us
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-60px) translateX(-15px);
          }
          75% {
            transform: translateY(-30px) translateX(15px);
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .animate-float-slow {
          animation: float-slow linear infinite;
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

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .bg-300\% {
          background-size: 300%;
        }
      `}</style>
        </div>
    );
}
