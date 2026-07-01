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
                        Transparency about how we use cookies to improve your experience on Rizonn.
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
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies allow us to recognize your device and remember your preferences for future visits.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">02</span>
                            How We Use Cookies
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We use cookies for several reasons, detailed below:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Essential Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Necessary for the website to function properly. These cannot be disabled in our systems.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Performance Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Functional Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    Enable the website to provide enhanced functionality and personalization based on your choices.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">Targeting Cookies</h3>
                                <p className="text-sm text-gray-500">
                                    May be set through our site by our advertising partners to build a profile of your interests.
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
                            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            When you first visit our site, we provide you with a banner that allows you to accept or reject non-essential cookies. You can change these settings at any time by clearing your browser cookies for our domain.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">04</span>
                            Updates to This Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Last updated: December 12, 2025
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
