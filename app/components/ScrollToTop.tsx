
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!showScrollTop) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 animate-bounce-in group"
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />

            <style jsx global>{`
                @keyframes bounce-in {
                    from {
                        opacity: 0;
                        transform: scale(0) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </button>
    );
}
