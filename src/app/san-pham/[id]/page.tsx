import { getPropertyById, propertiesData } from "@/data/properties";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return propertiesData.map((property) => ({
    id: property.id.toString(),
  }));
}

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background-light pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-[13px] text-slate-400 font-light">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="text-slate-300">/</span>
            <Link href="/#dat-nen" className="hover:text-primary transition-colors">Dự án</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-medium truncate max-w-[180px] md:max-w-xs">{property.title}</span>
          </nav>
          <Link href="/" className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-accent transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Quay lại
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title Block */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {property.badge && (
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${
                property.badge.color === "accent"
                  ? "border-accent/30 text-accent bg-accent/5"
                  : "border-primary/20 text-primary bg-primary/5"
              }`}>
                {property.badge.text}
              </span>
            )}
            <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-slate-100 text-slate-500">
              {property.id}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary leading-tight mb-5">
            {property.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 font-light">
              <span className="material-symbols-outlined text-accent text-[20px]">location_on</span>
              {property.location}
            </div>
            <div className="text-3xl font-serif font-medium text-accent">
              {property.price}
            </div>
          </div>
        </header>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-12 rounded-sm overflow-hidden">
          <div className="md:col-span-8 relative h-[350px] md:h-[480px] group">
            <Image
              src={property.image}
              alt={property.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-3">
            {property.gallery && property.gallery.slice(0, 2).map((img, idx) => (
              <div key={idx} className="relative h-[160px] md:h-full group">
                <Image
                  src={img}
                  alt={`${property.title} - ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            ))}
            {(!property.gallery || property.gallery.length < 2) && (
              <div className="bg-slate-100 flex items-center justify-center border border-slate-200">
                <span className="material-symbols-outlined text-3xl text-slate-300">wallpaper</span>
              </div>
            )}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-10">

            {/* Quick Specs */}
            <section className="bg-white rounded-sm p-6 sm:p-8 border border-slate-100">
              <h2 className="text-lg font-serif font-medium text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-[20px]">info</span>
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Diện tích", value: property.area },
                  { label: property.secondLabel, value: property.secondValue },
                  ...property.overview.slice(0, 2),
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col gap-1 ${idx > 0 ? "border-l border-slate-100 pl-4" : ""}`}>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{item.label}</span>
                    <span className="font-medium text-primary text-lg">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-serif font-medium text-primary mb-4">Tổng Quan</h2>
              <div className="w-8 h-[2px] bg-accent mb-6"></div>
              <div className="text-slate-600 font-light leading-relaxed space-y-4">
                <p>{property.description}</p>
                <p>Với định hướng phát triển trở thành tâm điểm giao thương và nghỉ dưỡng, {property.title} mang lại chuẩn mực sống hoàn toàn mới cho cộng đồng tinh hoa.</p>
              </div>
            </section>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <section className="bg-primary text-white rounded-sm p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
                <h2 className="text-xl font-serif font-medium mb-6 flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined text-accent text-[20px]">diamond</span>
                  Tiện ích
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {property.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 group">
                      <span className="material-symbols-outlined text-accent text-2xl group-hover:scale-110 transition-transform">{f.icon}</span>
                      <p className="text-white/80 font-light text-sm group-hover:text-white transition-colors">{f.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-100 rounded-sm shadow-lux p-6 sm:p-8">
              <div className="text-center mb-6 pb-6 border-b border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2">Giá tham khảo</p>
                <div className="text-3xl font-serif font-medium text-primary mb-2">{property.price}</div>
                <p className="text-[12px] font-light text-emerald-600 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Pháp lý minh bạch
                </p>
              </div>

              <h3 className="text-sm font-serif font-medium text-primary mb-5 text-center">Nhận thông tin chi tiết</h3>

              <form className="space-y-4">
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-accent focus:ring-0 py-3 px-4 rounded-sm outline-none text-primary text-sm font-light placeholder:text-slate-400"
                  placeholder="Họ và tên *"
                />
                <input
                  type="tel"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-accent focus:ring-0 py-3 px-4 rounded-sm outline-none text-primary text-sm font-light placeholder:text-slate-400"
                  placeholder="Số điện thoại *"
                />
                <button
                  type="button"
                  className="w-full bg-primary hover:bg-accent text-white font-semibold py-3.5 rounded-sm text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Tải bảng giá
                </button>
                <div className="text-center pt-1">
                  <p className="text-[11px] text-slate-400 font-light">Hotline:</p>
                  <a href="tel:0905000000" className="text-accent font-medium tracking-wider hover:underline block mt-0.5">
                    0905.XXX.XXX
                  </a>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
