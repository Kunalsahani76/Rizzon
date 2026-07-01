"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    User, 
    Tag, 
    Share2, 
    ChevronRight,
    Home,
    CheckCircle2
} from "lucide-react";
import { formatDate, getCategoryColorClasses, BlogPost } from "@/lib/blogUtils";
import { getProductDetail } from "@/lib/productUtils";
import ScrollToTop from "@/app/components/ScrollToTop";

interface BlogDetailClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
    const categoryColors = getCategoryColorClasses(post.categoryColor);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto  pt-8 min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
          

          

            {/* Hero Section */}
            <div className="relative bg-white py-16 lg:py-24">
                <div className="w-full container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {/* Back Button */}
                        <motion.div variants={fadeInUp}>
                            <Link 
                                href="/blog" 
                                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Back to Blog</span>
                            </Link>
                        </motion.div>

                        {/* Category and Meta Info */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                            <span className={`px-3 py-1 ${categoryColors.bg} ${categoryColors.text} text-sm font-semibold rounded-full`}>
                                {post.category}
                            </span>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(post.publishDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Title and Subtitle */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                {post.subtitle}
                            </p>
                        </motion.div>

                        {/* Author Info */}
                        {/* <motion.div variants={fadeInUp} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{post.author.name}</div>
                                    <div className="text-sm text-slate-500">{post.author.role}</div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </motion.div> */}
                    </motion.div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
                <div >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* Article Content */}
            <div className=" py-16 lg:py-24">
                <motion.article
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="prose prose-lg prose-slate max-w-none"
                >
                    {/* Introduction */}
                    <motion.div variants={fadeInUp} className="text-xl leading-relaxed text-slate-700 mb-12">
                        {post.content.introduction}
                    </motion.div>

                    {/* Content Sections */}
                    {post.content.sections.map((section: any, index: number) => (
                        <motion.section key={index} variants={fadeInUp} className="mb-12">
                            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                                {section.heading}
                            </h2>
                            
                            <div className="text-lg leading-relaxed text-slate-700 mb-6">
                                {section.content}
                            </div>

                            {/* Bullet Points */}
                            {section.bulletPoints && (
                                <ul className="space-y-3 mb-6">
                                    {section.bulletPoints.map((point: string, pointIndex: number) => (
                                        <li key={pointIndex} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <span className="text-slate-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Section Image */}
                            {section.image && (
                                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg mb-6">
                                    <Image
                                        src={section.image}
                                        alt={section.heading}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </motion.section>
                    ))}

                    {/* Conclusion */}
                    <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200/50">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">Conclusion</h3>
                        <p className="text-lg leading-relaxed text-blue-800">
                            {post.content.conclusion}
                        </p>
                    </motion.div>
                </motion.article>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200"
                >
                    <Tag className="w-5 h-5 text-slate-400 mr-2" />
                    {post.tags.map((tag: string, index: number) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Related Products Section */}
            {post.relatedProducts.length > 0 && (
                <div className="bg-white py-16 lg:py-24">
                    <div >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                                Related Products
                            </h2>
                            <p className="text-lg text-slate-600">
                                Explore the products mentioned in this article
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {post.relatedProducts.slice(0, 3).map((productSlug: string, index: number) => {
                                const product = getProductDetail(productSlug);
                                if (!product) return null;

                                return (
                                    <motion.div
                                        key={productSlug}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    >
                                        <Link href={`/products/${productSlug}`} className="block group">
                                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full">
                                                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-50">
                                                    <Image
                                                        src={product.heroImage}
                                                        alt={product.name}
                                                        width={300}
                                                        height={200}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {product.model}
                                                </h3>
                                                <p className="text-sm text-slate-600 line-clamp-2">
                                                    {product.heroDescription}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <div className="bg-slate-50 py-16 lg:py-24">
                    <div >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                                Related Articles
                            </h2>
                            <p className="text-lg text-slate-600">
                                Continue reading about industrial networking
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost: BlogPost, index: number) => {
                                const relatedCategoryColors = getCategoryColorClasses(relatedPost.categoryColor);
                                
                                return (
                                    <motion.article
                                        key={relatedPost.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    >
                                        <Link href={`/blog/${relatedPost.slug}`} className="block group">
                                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 h-full">
                                                <div className="aspect-[16/9] relative">
                                                    <Image
                                                        src={relatedPost.heroImage}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span className={`px-3 py-1 ${relatedCategoryColors.bg} ${relatedCategoryColors.text} text-xs font-semibold rounded-full`}>
                                                            {relatedPost.category}
                                                        </span>
                                                        <span className="text-slate-400 text-xs">
                                                            {formatDate(relatedPost.publishDate)}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {relatedPost.title}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm line-clamp-3">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                        Ready to Transform Your Network?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Get in touch with our experts to discuss how Rizonn's solutions can address your specific industrial networking needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/contact" 
                            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl shadow-white/10 flex items-center justify-center gap-2"
                        >
                            Contact Our Experts
                        </Link>
                        <Link 
                            href="/products" 
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}