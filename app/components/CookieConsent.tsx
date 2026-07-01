"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
            <div className="max-w-7xl mx-auto bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                        We value your privacy
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized
                        content, and analyze our traffic. By clicking "Accept All", you
                        consent to our use of cookies. Read our{" "}
                        <Link
                            href="/cookie-policy"
                            className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                            Cookie Policy
                        </Link>{" "}
                        to learn more.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={handleReject}
                        className="px-6 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        Reject All
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium whitespace-nowrap shadow-lg shadow-blue-600/20"
                    >
                        Accept All
                    </button>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors md:hidden"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
