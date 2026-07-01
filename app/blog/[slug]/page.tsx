import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { getBlogPostBySlug, getRelatedPosts, formatDate, getCategoryColorClasses } from "@/lib/blogUtils";
import { getProductDetail } from "@/lib/productUtils";
import ScrollToTop from "@/app/components/ScrollToTop";
import BlogDetailClient from "@/app/blog/[slug]/BlogDetailClient";

interface BlogDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    const relatedPosts = getRelatedPosts(slug, 3);

    if (!post) {
        notFound();
    }

    return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}