
import React from "react";
import { notFound } from "next/navigation";
import { solutionsData } from "../../lib/menuData";
import DetailsPage from "../../components/DetailsPage";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SolutionDetails({ params }: PageProps) {
    const { slug } = await params;
    const data = solutionsData[slug];

    if (!data) {
        return notFound();
    }

    return (
        <DetailsPage
            data={data}
        />
    );
}
