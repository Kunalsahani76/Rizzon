
import React from "react";
import { notFound } from "next/navigation";
import { networkingData } from "../../lib/menuData";
import DetailsPage from "../../components/DetailsPage";

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function NetworkingDetails({ params }: PageProps) {
    // The slug is an array, e.g., ['wireless-access-points', 'um-225ax']
    // The last item is usually the specific product/item ID
    const { slug } = await params;
    const slugArray = slug;
    const itemId = slugArray[slugArray.length - 1];
    const data = networkingData[itemId];

    if (!data) {
        return notFound();
    }

    // Determine category name and parent link
    let categoryName = "Networking";
    let parentLink = "/networking";

    if (slugArray.length > 1) {
        const categoryId = slugArray[slugArray.length - 2];
        // Try to find category title from data if it exists as a key, otherwise format the ID
        const categoryData = networkingData[categoryId];
        categoryName = categoryData ? categoryData.title : categoryId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        parentLink = `/networking/${slugArray.slice(0, -1).join("/")}`;
    }

    return (
        <DetailsPage
            data={data}
        />
    );
}
