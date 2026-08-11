import Image from "next/image";
import Link from "next/link";

export default function DcimPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="flex h-[300px] items-center justify-center bg-[#132b62] px-4 text-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">DCIM</h1>
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-white">
            <Link href="/" className="transition-colors hover:text-blue-200">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="transition-colors hover:text-blue-200">Products</Link>
            <span aria-hidden="true">/</span>
            <span>DCIM</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
          <div className="relative aspect-[4/3] w-full bg-gray-50 p-6">
            <Image
              src="/banner-images/DCIM.jpg"
              alt="DCIM - Data Center Infrastructure Management"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">DCIM</div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Data Center Infrastructure Management</h2>
            <p className="mb-4 text-sm text-gray-500">DCIM</p>
          </div>
        </article>
      </section>
    </main>
  );
}
