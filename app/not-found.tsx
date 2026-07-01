"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Wrench } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* 404 Illustration */}
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-8xl lg:text-9xl font-black text-slate-200 select-none"
                        >
                            404
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Wrench className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900">
                            Page Not Found
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
                            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-1"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="pt-8 border-t border-slate-200"
                    >
                        <p className="text-sm text-slate-500 mb-4">Or explore these popular sections:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/products"
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Products
                            </Link>
                            <Link
                                href="/blog"
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-xl" />
                    <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-green-200/30 rounded-full blur-xl" />
                </div>
            </div>
        </div>
    );
}