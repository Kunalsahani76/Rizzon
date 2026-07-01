"use client";

import Link from "next/link";

export default function ProductTemplate({ children }: { children?: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="prose">
        {children}
      </div>
      <div className="mt-6">
        <Link href="/products" className="text-blue-600">Back to Products</Link>
      </div>
    </div>
  );
}
