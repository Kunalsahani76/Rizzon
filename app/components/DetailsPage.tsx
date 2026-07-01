"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "../lib/menuData";
import { ProductDetail, getProductDetailBySlug } from "../lib/productDetails";
import {
    ChevronRight, Zap, Layers, Shield, Mail, Download,
    CheckCircle2, Package, Puzzle, Settings,
    Award, Activity, Cpu, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DatasheetModal from "./DatasheetModal";

interface DetailsPageProps {
    data?: MenuItem;
    productDetail?: ProductDetail;
}

const iconMap: Record<string, any> = {
    zap: Zap,
    layers: Layers,
    shield: Shield,
};

const ContentTruncator = ({
    text,
    limit = 150,
    buttonClass = "ml-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors",
    moreText = "Read More",
    lessText = "Read Less"
}: {
    text: string,
    limit?: number,
    buttonClass?: string,
    moreText?: string,
    lessText?: string
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text || text.length <= limit) return <>{text}</>;

    return (
        <span>
            {isExpanded ? text : `${text.slice(0, limit)}...`}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className={buttonClass}
            >
                {isExpanded ? lessText : moreText}
            </button>
        </span>
    );
};

export default function DetailsPage({ data, productDetail: propProductDetail }: DetailsPageProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'ordering'>('overview');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDatasheetModalOpen, setIsDatasheetModalOpen] = useState(false);

    // Resolve product detail from prop or data ID
    const productDetail = propProductDetail || (data?.id ? getProductDetailBySlug(data.id) : null);





    if (!productDetail) return null;

    // Create array of images (hero + additional images)
    const allImages = [productDetail.heroImage, ...(productDetail.images || [])].filter(Boolean);

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* <ScrollToTop /> */}

            {/* Floating Breadcrumb Navigation */}
            {/* <motion.div
                className={`fixed top-[70px] left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/50 py-2" : "bg-transparent py-4"}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                    <nav className="flex items-center text-sm">
                        <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors group">
                            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline font-medium">Home</span>
                        </Link>
                        {parentLink && (
                            <>
                                <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                                <Link href={parentLink} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
                                    {categoryName}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                        <span className={`font-bold truncate max-w-[200px] sm:max-w-md ${isScrolled ? "text-slate-900" : "text-slate-700"}`}>
                            {productDetail.model}
                        </span>
                    </nav>
                </div>
            </motion.div> */}

            {/* Premium Hero Section with Slider - Light Theme */}
            <div className="relative pt-24 pb-24 lg:pt-28 lg:pb-36 overflow-hidden bg-white">
                {/* Animated Background Grid - Subtle for Light Theme */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="space-y-10"
                        >
                            {/* Model Badge */}
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                </span>
                                <span className="text-blue-700 text-xs font-bold tracking-widest uppercase">{productDetail.model}</span>
                            </motion.div>

                            {/* Product Title */}
                            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                <ContentTruncator
                                    text={productDetail.heroTitle}
                                    limit={60}
                                    buttonClass="ml-3 text-lg text-blue-600 hover:text-blue-700 cursor-pointer underline decoration-2 underline-offset-4 align-middle"
                                    moreText="See More"
                                    lessText="See Less"
                                />
                            </motion.h1>

                            {/* Description */}
                            <motion.div variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                                <ContentTruncator text={productDetail.heroDescription} limit={200} />
                            </motion.div>

                            {/* Key Stats Cards - Light Theme Refined */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 pt-4">
                                <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                            <Cpu className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Capacity</span>
                                    </div>
                                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                                        {productDetail.keyStats.switchingCapacity}
                                    </div>
                                </div>

                                <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Performance</span>
                                    </div>
                                    <div className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                        {productDetail.keyStats.forwardingRate}
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-6">
                                <Link href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-1 flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    Contact Sales
                                </Link>
                                <button
                                    onClick={() => setIsDatasheetModalOpen(true)}
                                    className="px-8 py-4 bg-white cursor-pointer hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                                >
                                    <Download className="w-5 h-5 text-slate-500" />
                                    Datasheet
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right: Image Slider - Light Theme */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            {/* Main Image Container */}
                            <div className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden aspect-[4/3]">
                                {/* Swiper Slider */}
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-100">
                                    <Swiper
                                        modules={[Autoplay, EffectFade, Pagination, Navigation]}
                                        effect="fade"
                                        speed={800}
                                        autoplay={{
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                            bulletActiveClass: "swiper-pagination-bullet-active",
                                        }}
                                        navigation={{
                                            prevEl: '.swiper-button-prev-custom',
                                            nextEl: '.swiper-button-next-custom',
                                        }}
                                        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                                        className="w-full h-full product-slider"
                                    >
                                        {allImages.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                                    <Image
                                                        src={img}
                                                        alt={`${productDetail.name} - View ${idx + 1}`}
                                                        fill
                                                        className="object-contain drop-shadow-xl"
                                                        priority={idx === 0}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Buttons */}
                                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md hover:bg-white hover:scale-110 flex items-center justify-center text-slate-700 transition-all">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md hover:bg-white hover:scale-110 flex items-center justify-center text-slate-700 transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Image Counter */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
                                    <span className="text-xs text-slate-600 font-mono font-bold">
                                        {currentImageIndex + 1} / {allImages.length}
                                    </span>
                                </div>
                            </div>

                            {/* Certification Badges */}
                            <div className="flex gap-4 justify-center mt-8">
                                <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 font-bold flex items-center gap-2 shadow-sm">
                                    <Award className="w-4 h-4 text-blue-600" />
                                    CE Certified
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 font-bold flex items-center gap-2 shadow-sm">
                                    <Shield className="w-4 h-4 text-emerald-600" />
                                    RoHS Compliant
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 font-bold flex items-center gap-2 shadow-sm">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    Industrial Grade
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Sticky Tab Navigation */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {/* Conditionally render tabs based on data availability */}
                        {[
                            { 
                                key: 'overview', 
                                label: 'Product Overview', 
                                hasData: productDetail.overview?.paragraphs?.length > 0 || 
                                        productDetail.features?.length > 0 || 
                                        (productDetail.highlights?.length ?? 0) > 0 || 
                                        productDetail.applications || 
                                        (productDetail.advancedCapabilities?.length ?? 0) > 0 || 
                                        productDetail.keyFeaturesCards?.length > 0 || 
                                        productDetail.conclusion
                            },
                            { key: 'specs', label: 'Technical Specs', hasData: productDetail.technicalSpecs?.length > 0 },
                            { key: 'ordering', label: 'Ordering Info', hasData: (productDetail.orderingInfo?.length ?? 0) > 0 || (productDetail.packingList?.length ?? 0) > 0 || (productDetail.optionalModules?.length ?? 0) > 0 }
                        ].filter(tab => tab.hasData).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`relative py-5 px-2 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.key ? 'text-blue-600 scale-105' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-20"
                        >
                            {/* Description Section - Only show if overview data exists */}
                            {productDetail.overview?.paragraphs?.length > 0 && (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    <div className="lg:col-span-4">
                                        <div className="sticky top-40 space-y-6">
                                            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                                Designed for Performance
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed">
                                                Engineered to meet the rigorous demands of modern industrial and enterprise networks, providing unmatched reliability and speed.
                                            </p>
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                                                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50">
                                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                                        <Award className="w-5 h-5 text-blue-600" />
                                                        Premium Quality
                                                    </h4>
                                                    <p className="text-sm text-blue-800/80 leading-relaxed">
                                                        Built with industrial-grade components to ensure longevity and stable operation in harsh environments.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8 space-y-8">
                                        {productDetail.overview.paragraphs.map((para, idx) => (
                                            <motion.p
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="text-lg text-slate-700 leading-relaxed"
                                            >
                                                {para}
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features Grid - Only show if features exist */}
                            {productDetail.features?.length > 0 && (
                                <div>
                                    <div className="text-center max-w-3xl mx-auto mb-16">
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="text-4xl font-black text-slate-900 mb-4"
                                        >
                                            Core Capabilities
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                            className="text-slate-600 text-lg"
                                        >
                                            Everything you need to build a robust and scalable network infrastructure.
                                        </motion.p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {productDetail.features.map((feature, idx) => {
                                            const Icon = iconMap[feature.icon] || Zap;
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                                    className="group relative"
                                                >
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                                                    <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 h-full flex flex-col">
                                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                                                            <Icon className="w-8 h-8" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                                        <p className="text-slate-600 leading-relaxed flex-1">{feature.description}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Highlights Section - Only show if highlights exist */}
                            {productDetail.highlights && productDetail.highlights.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-black text-slate-900 mb-8">Key Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {productDetail.highlights.map((highlight, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-bold text-slate-900 mb-4">{highlight.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{highlight.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Applications Section - Only show if applications exist */}
                            {productDetail.applications && (
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-black text-slate-900 mb-8">{productDetail.applications.title}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {productDetail?.applications?.categories?.map((category, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200"
                                            >
                                                <h3 className="text-xl font-bold text-blue-900 mb-6">{category.name}</h3>
                                                <ul className="space-y-3">
                                                    {category.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 mt-0.5 text-blue-600 flex-shrink-0" />
                                                            <span className="text-slate-700 text-sm">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Advanced Capabilities Section - Only show if advancedCapabilities exist */}
                            {productDetail.advancedCapabilities && productDetail.advancedCapabilities.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-black text-slate-900 mb-8">Advanced Capabilities</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {productDetail.advancedCapabilities.map((capability, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-bold text-slate-900 mb-4">{capability.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{capability.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Advanced Features Cards - Only show if keyFeaturesCards exist */}
                            {productDetail.keyFeaturesCards?.length > 0 && (
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-black text-slate-900 mb-8">Advanced Specifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {productDetail.keyFeaturesCards.map((card, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 h-full flex flex-col ${card.highlighted
                                                    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl'
                                                    : 'bg-white border-2 border-slate-200 text-slate-900 hover:shadow-xl hover:border-blue-200'
                                                    }`}
                                            >
                                                {card.highlighted && (
                                                    <>
                                                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                        <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                                    </>
                                                )}

                                                <div className="relative z-10 flex flex-col h-full">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${card.highlighted ? 'bg-white/10 text-white' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                                                            }`}>
                                                            {idx + 1}
                                                        </span>
                                                        <h3 className="text-xl font-bold">{card.title}</h3>
                                                    </div>
                                                    <ul className="space-y-4 flex-1">
                                                        {card.items.map((item, itemIdx) => (
                                                            <li key={itemIdx} className="flex items-start gap-3">
                                                                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${card.highlighted ? 'text-blue-400' : 'text-blue-600'
                                                                    }`} />
                                                                <span className={`text-sm leading-relaxed ${card.highlighted ? 'text-slate-300' : 'text-slate-600'
                                                                    }`}>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Conclusion Section - Only show if conclusion exists */}
                            {productDetail.conclusion && (
                                <div className="space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 text-center"
                                    >
                                        <h2 className="text-3xl font-black text-white mb-6">Summary</h2>
                                        <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                                            {productDetail.conclusion}
                                        </p>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'specs' && productDetail.technicalSpecs?.length > 0 && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                                {productDetail.technicalSpecs.map((category, catIdx) => (
                                    <div key={catIdx} className="border-b border-slate-100 last:border-0">
                                        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 px-8 py-6 border-b border-slate-100">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                                <Settings className="w-5 h-5 text-blue-600" />
                                                {category.category}
                                            </h3>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {category.specs.map((spec, specIdx) => (
                                                <div key={specIdx} className="grid grid-cols-1 md:grid-cols-3 px-8 py-5 hover:bg-blue-50/50 transition-colors group">
                                                    <div className="font-bold text-slate-900 md:col-span-1 mb-2 md:mb-0 group-hover:text-blue-700 transition-colors">
                                                        {spec.feature}
                                                    </div>
                                                    <div className="text-slate-600 md:col-span-2 text-sm leading-relaxed">
                                                        {Array.isArray(spec.description) ? (
                                                            <ul className="space-y-1.5">
                                                                {spec.description.map((desc, descIdx) => (
                                                                    <li key={descIdx} className="flex items-start gap-2">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                                                        <span>{desc}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            spec.description
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'ordering' && (
                        <motion.div
                            key="ordering"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12 max-w-5xl mx-auto"
                        >
                            {/* Ordering Info Cards - Only show if orderingInfo exists */}
                            {productDetail.orderingInfo?.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-black text-slate-900">Ordering Information</h3>
                                    {productDetail.orderingInfo.map((order, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-start h-full"
                                        >
                                            <div className="md:w-1/4">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl inline-block font-mono font-bold text-lg border-4 border-blue-100 shadow-lg">
                                                    {order.model}
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                                                    <p className="text-slate-700 leading-relaxed font-medium">{order.description}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Zap className="w-4 h-4 text-amber-500" />
                                                    <span className="font-bold text-slate-900">Power Supply:</span>
                                                    <span className="text-slate-600">{order.powerSupply}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Packing List - Only show if packingList exists */}
                                {productDetail.packingList?.length > 0 && (
                                    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 h-full">
                                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                                                <Package className="w-6 h-6 text-white" />
                                            </div>
                                            What's in the Box
                                        </h3>
                                        <ul className="space-y-4">
                                            {productDetail.packingList.map((item, idx) => (
                                                <li key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                                                    <span className="font-semibold text-slate-700">{item.content}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-slate-400 uppercase font-bold">{item.unit}</span>
                                                        <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border-2 border-slate-200 font-black text-slate-900">
                                                            ×{item.quantity}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Optional Modules - Only show if optionalModules exists */}
                                {productDetail.optionalModules && productDetail.optionalModules.length > 0 && (
                                    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 h-full">
                                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                                                <Puzzle className="w-6 h-6 text-white" />
                                            </div>
                                            Optional Accessories
                                        </h3>
                                        <div className="space-y-4">
                                            {productDetail.optionalModules.slice(0, 4).map((module, idx) => (
                                                <div key={idx} className="group p-4 rounded-xl border-2 border-slate-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-bold text-slate-900">{module.model}</span>
                                                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                                            {module.unit}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors line-clamp-2">
                                                        {module.description}
                                                    </p>
                                                </div>
                                            ))}
                                            {productDetail.optionalModules.length > 4 && (
                                                <button className="w-full py-3 text-sm font-bold text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors border-2 border-purple-100 hover:border-purple-300">
                                                    View All Accessories →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to upgrade your network?</h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Get in touch with our technical experts to discuss your requirements and find the perfect solution for your infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl shadow-white/10 flex items-center justify-center gap-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Mail className="w-5 h-5 text-blue-600 relative z-10" />
                            <span className="relative z-10">Contact Sales Team</span>
                        </Link>
                        
                    </div>
                </div>
            </div>

            {/* Datasheet Modal */}
            <DatasheetModal
                isOpen={isDatasheetModalOpen}
                onClose={() => setIsDatasheetModalOpen(false)}
                productModel={productDetail.model}
                productTitle={productDetail.title}
            />

        </div>
    );
}
