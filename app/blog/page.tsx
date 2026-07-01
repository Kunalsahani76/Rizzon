import SimpleHeroPage from "../components/SimpleHeroPage";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, formatDate, getCategoryColorClasses } from "@/lib/blogUtils";

export default function BlogPage() {
    const blogPosts = getAllBlogPosts();

    return (
        <SimpleHeroPage
            title="Rizonn Blog"
            subtitle="Insights, news, and trends from the world of industrial networking."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                    const categoryColors = getCategoryColorClasses(post.categoryColor);
                    
                    return (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100">
                            <div className="h-48 bg-slate-200 relative">
                                <Image
                                    src={post.heroImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`px-3 py-1 ${categoryColors.bg} ${categoryColors.text} text-xs font-semibold rounded-full`}>
                                        {post.category}
                                    </span>
                                    <span className="text-slate-400 text-xs">{formatDate(post.publishDate)}</span>
                                </div>
                                <h3 className={`text-xl font-bold text-slate-900 mb-3 ${categoryColors.hover} transition-colors cursor-pointer`}>
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className={`inline-flex items-center ${categoryColors.text} text-sm font-semibold ${categoryColors.hover}`}>
                                    Read Article
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </SimpleHeroPage>
    );
}
