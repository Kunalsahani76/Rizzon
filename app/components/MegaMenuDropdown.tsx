"use client";

import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";

interface MegaMenuColumn {
    title?: string;
    items?: MegaMenuItem[];
    content?: ReactNode;
    bgColor?: string;
}

interface MegaMenuItem {
    label: string;
    href: string;
    icon?: ReactNode;
    subItems?: MegaMenuItem[];
    description?: string;
}

interface MegaMenuDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    columns: MegaMenuColumn[];
    gridCols?: string; // Custom grid columns layout
    minHeight?: string;
}

export default function MegaMenuDropdown({
    isOpen,
    onClose,
    columns,
    // gridCols = "grid-cols-[240px_200px_1fr_350px]",
    gridCols = "grid grid-cols-3",

    minHeight = "min-h-[500px]",
}: MegaMenuDropdownProps) {
    const [mounted, setMounted] = useState(false);

    // Escape Key Closes
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Mount Animation
    useEffect(() => {
        if (!isOpen) {
            setMounted(false);
            return;
        }
        const id = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(id);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed top-[80px] left-0 right-0 z-[99999]"
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={onClose}
        >
            <div
                className={`relative transform transition-all duration-500 ease-out origin-top ${mounted ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                style={{
                    filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Clipped Background Layer */}
                <div
                    className="absolute inset-0 bg-white border-t-4 border-blue-600"
                    style={{
                        clipPath: "url(#megaMenuWave)",
                        zIndex: 0,
                    }}
                />

                {/* Content Layer (Unclipped) */}
                <div className="relative z-10 max-w-[1400px] mx-auto pb-24">
                    {/* Dynamic Grid Layout */}
                    <div className={`grid ${gridCols} ${minHeight}`}>
                        {columns.map((column, index) => (
                            <div
                                key={index}
                                className={`${column.bgColor || "bg-transparent"
                                    } p-8 ${index < columns.length - 1 ? "border-r border-gray-100" : ""}`}
                            >
                                {/* Column Title */}
                                {column.title && (
                                    <h3
                                        className={`${index === 0 ? "text-gray-900 text-lg font-bold" : "text-gray-500 text-xs font-bold uppercase tracking-wider"
                                            } mb-6`}
                                    >
                                        {column.title}
                                    </h3>
                                )}

                                {/* Column Items */}
                                {column.items && (
                                    <div className="space-y-2">
                                        {column.items.map((item, itemIndex) => (
                                            <Link
                                                key={itemIndex}
                                                href={item.href}
                                                className="flex items-center justify-between py-3 px-4 rounded-xl text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all group duration-300 border border-transparent hover:border-blue-100 hover:shadow-sm"
                                            >
                                                <span className="font-medium">{item.label}</span>
                                                <svg
                                                    className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1 duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Custom Content */}
                                {column.content && <div className="h-full">{column.content}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wave Clip Path Definition */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <clipPath id="megaMenuWave" clipPathUnits="objectBoundingBox">
                        <path d="M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z">
                            <animate
                                attributeName="d"
                                dur="8s"
                                repeatCount="indefinite"
                                values="
                                    M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z;
                                    M0,0 L1,0 L1,0.92 Q0.75,0.84 0.5,0.92 Q0.25,1 0,0.92 Z;
                                    M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z"
                            />
                        </path>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
