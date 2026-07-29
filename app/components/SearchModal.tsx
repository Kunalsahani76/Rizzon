"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Product, getAllProducts } from "@/lib/productUtils";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        setAllProducts(getAllProducts());
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            // Focus input after animation
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            // Prevent body scroll
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = allProducts.filter(
            (product) =>
                product.title.toLowerCase().includes(query) ||
                product.model.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
        );

        setSearchResults(results);
    }, [searchQuery, allProducts]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!mounted) return null;

    if (!isOpen && !isAnimating) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-4 top-24 z-50 cursor-pointer p-2 text-gray-500 transition-colors hover:text-black sm:right-8 sm:top-32"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="mx-auto flex h-full max-w-4xl flex-col px-4 pt-24 sm:px-6 sm:pt-32">
                {/* Search Input Section */}
                <div className="relative border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-lg font-light text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-8 overflow-y-auto pb-20 custom-scrollbar">
                    {searchQuery ? (
                        // Search Results
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {searchResults.map((product, index) => (
                                    <Link
                                        key={index}
                                        href={`/products/${product.category
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${product.model.toLowerCase()}`}
                                        onClick={onClose}
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                                            <img
                                                src={product.img || "/slide-1.jpg"}
                                                alt={product.model}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {product.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {product.model}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                {searchResults.length === 0 && (
                                    <div className="col-span-full text-left py-4 text-gray-400 font-light">
                                        No results for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Quick Links (Default State)
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quick Links
                            </h3>
                            <div className="flex flex-col space-y-3">
                                {[
                                    "NAV-C24S2Q",
                                    "NAV-D24R4S",
                                    "NAV-I-10R4S",
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSearchQuery(item);
                                            inputRef.current?.focus();
                                        }}
                                        className="text-left text-base text-gray-800 hover:text-blue-600 transition-colors font-light"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
