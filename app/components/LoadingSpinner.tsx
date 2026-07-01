"use client";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({ 
    size = "md", 
    text = "Loading...", 
    fullScreen = false 
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8", 
        lg: "w-12 h-12"
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    const containerClasses = fullScreen 
        ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
        : "flex items-center justify-center p-8";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-4">
                {/* Rizonn Logo Spinner */}
                <motion.div
                    className={`${sizeClasses[size]} relative`}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600"></div>
                </motion.div>

                {/* Loading Text */}
                <motion.p
                    className={`${textSizeClasses[size]} font-medium text-slate-600`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    {text}
                </motion.p>

                {/* Dots Animation */}
                <div className="flex gap-1">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: index * 0.2
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Page-level loading component
export function PageLoader() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center space-y-8">
                {/* Rizonn Branding */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <div className="text-2xl font-black text-slate-900">RIZONN</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">Industrial Networking Solutions</div>
                </motion.div>

                {/* Loading Animation */}
                <LoadingSpinner size="lg" text="Loading content..." />

                {/* Progress Bar */}
                <div className="w-64 mx-auto">
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}