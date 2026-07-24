"use client";

import React from "react";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent opacity-70" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute top-1/3 left-[-100px] w-[300px] h-[300px] bg-cyan-100/50 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        Cookie Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        How Rizonn uses browser storage and cookies to keep the website useful and reliable.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Section 1 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">01</span>
                            What Are Cookies?
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Cookies are small files stored by your browser. They help a website remember a choice, understand whether a page is working well, and provide a more consistent experience when you return. Rizonn may also use similar browser storage technologies for the same purposes.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">02</span>
                            How We Use Cookies
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Cookies used on Rizonn fall into the following practical categories:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Essential Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Support core features such as saving a consent choice and keeping the website secure.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Performance Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Help us understand page visits, loading behaviour, and which resources visitors find useful.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Functional Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Remember preferences that make repeat visits simpler and more consistent.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Targeting Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    May support relevant communications or campaign measurement where such tools are enabled.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">03</span>
                            Managing Your Preferences
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            On your first visit, Rizonn presents a choice to accept or reject cookies. You can also manage, block, or delete cookies through your browser settings. Blocking certain cookies may affect how smoothly some website features work.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            If you want to revisit a choice, clear cookies for rizonn.in in your browser and return to the site. Your browser help documentation can explain the exact steps for your device.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">04</span>
                            Updates to This Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may revise this policy when our website features, browser technologies, or legal requirements change. The date below shows when this page was last updated. For questions about cookies or privacy, email info@rizonn.in.
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Last updated: July 24, 2026
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
