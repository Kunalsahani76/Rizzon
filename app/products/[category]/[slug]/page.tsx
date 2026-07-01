
import React from "react";
import { notFound } from "next/navigation";
import { getProductDetail } from "../../../../lib/productUtils";
import DetailsPage from "../../../components/DetailsPage";

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export default async function ProductDetails({ params }: PageProps) {
    const { category, slug } = await params;

    // Fetch product details using the new utility
    const productDetail = getProductDetail(slug);

    if (!productDetail) {
        return notFound();
    }

    // Format category name for display (e.g., "industrial-poe-switch" -> "Industrial PoE Switch")
    const categoryName = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <DetailsPage
            productDetail={productDetail}
        />
    );
}
