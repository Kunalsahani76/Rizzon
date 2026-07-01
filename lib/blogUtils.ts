import blogData from "../blogdata.json";

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    categoryColor: string;
    publishDate: string;
    readTime: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    heroImage: string;
    excerpt: string;
    content: {
        introduction: string;
        sections: Array<{
            heading: string;
            content: string;
            image?: string;
            bulletPoints?: string[];
        }>;
        conclusion: string;
    };
    tags: string[];
    relatedProducts: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
    };
}

export const getAllBlogPosts = (): BlogPost[] => {
    return blogData as BlogPost[];
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
    const posts = getAllBlogPosts();
    return posts.find(post => post.slug === slug) || null;
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
    const posts = getAllBlogPosts();
    return posts
        .filter(post => post.slug !== currentSlug)
        .slice(0, limit);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getCategoryColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; hover: string } } = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:text-blue-700' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:text-purple-700' },
        green: { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:text-green-700' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', hover: 'hover:text-orange-700' },
        cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', hover: 'hover:text-cyan-700' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'hover:text-indigo-700' },
    };
    
    return colorMap[color] || colorMap.blue;
};