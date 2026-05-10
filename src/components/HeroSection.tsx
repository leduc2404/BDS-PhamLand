"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const heroStats = [
  { number: "10+", label: "Năm Kinh Nghiệm" },
  { number: "500+", label: "Khách Hàng" },
  { number: "50+", label: "Dự Án" },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (region) {
      router.push(`/du-an/${region}`);
    } else {
      router.push("/du-an");
    }
  };

  return (
    <section
      className="relative h-[92vh] min-h-[650px] md:min-h-[750px] flex items-center justify-center overflow-hidden"
      aria-label="Giới thiệu Pham Land"
    >
      {/* Background Image with optimized next/image for LCP */}
      <div className="absolute inset-0 transform scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRNPa_7_WJ85J9HgRhbcOlfUB-3hQ5Xs0nn-O54xtO2GXT5DA7wE2w7OxyFsGVu_Esg61iJOMyIQ_VooQgWhHs7eeyWS--fORglOOqwm0XvcLqTuQnI2u83lGCrt8QjmgFmDDDh0g7ruNq5p8mUZ9QWXLGb8gmQxymNb2kjolaIV49k7l55LT6h3L2dDvGLeCuG2i6HgG-uGi_Oki5fPzg7UJ86Vzl97mKCVIKh8UeiX8tswTOZ_PCfDXjBMAwd9iq-dH3LBie2nSe"
          alt="Hình ảnh flycam dự án đất nền ven biển Miền Trung"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />
      </div>
      
      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/45 to-primary/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-4 text-center mt-20 md:mt-16">
        <div
          className={`transition-all duration-1000 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex justify-center mb-6">
            <span className="text-accent uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-semibold px-3 md:px-5 py-1.5 border border-accent/30 rounded-full backdrop-blur-sm bg-accent/5">
              Tinh Hoa Bất Động Sản
            </span>
          </div>
          
          <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-serif font-medium mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Khơi Nguồn Thịnh Vượng
            <span className="block mt-1 md:mt-2 text-xl sm:text-3xl md:text-5xl font-light text-white/90">
              Giữa Tâm Điểm Miền Trung
            </span>
          </h1>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          
          <p className="text-slate-200 text-sm sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Chuyên trang tư vấn &amp; phân phối các dự án đất nền, biệt thự và căn hộ đẳng cấp tại Đà Nẵng, Quảng Nam, Quảng Bình.
          </p>
        </div>

        {/* Functional Search Form */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="glass-effect p-2 rounded-lg shadow-lux max-w-4xl mx-auto border border-white/20">
            <form
              className="grid grid-cols-1 md:grid-cols-5 gap-0 bg-white rounded-md overflow-hidden"
              role="search"
              aria-label="Tìm kiếm bất động sản"
              onSubmit={handleSearch}
            >
              <div className="md:col-span-2 relative border-b md:border-b-0 md:border-r border-slate-100 flex items-center">
                <span
                  className="absolute left-4 material-symbols-outlined text-accent font-light"
                  aria-hidden="true"
                >
                  search
                </span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium"
                  placeholder="Nhập tên dự án, khu vực..."
                  type="text"
                  aria-label="Tìm kiếm dự án hoặc khu vực"
                  id="hero-search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="relative border-b md:border-b-0 md:border-r border-slate-100">
                <select
                  className="w-full px-4 py-4 bg-transparent outline-none text-sm text-slate-700 font-medium cursor-pointer appearance-none"
                  aria-label="Loại hình bất động sản"
                  id="hero-type"
                  title="Chọn loại hình"
                >
                  <option value="">Loại hình</option>
                  <option value="dat-nen">Đất Nền Biệt Thự</option>
                  <option value="can-ho">Căn Hộ Hạng Sang</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none font-light">
                  expand_more
                </span>
              </div>
              <div className="relative">
                <select
                  className="w-full px-4 py-4 bg-transparent outline-none text-sm text-slate-700 font-medium cursor-pointer appearance-none"
                  aria-label="Khu vực"
                  id="hero-area"
                  title="Chọn khu vực"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">Khu vực</option>
                  <option value="da-nang">Đà Nẵng</option>
                  <option value="quang-nam">Quảng Nam</option>
                  <option value="quang-binh">Quảng Bình</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none font-light">
                  expand_more
                </span>
              </div>
              <button
                type="submit"
                className="bg-primary text-white font-medium py-4 flex items-center justify-center gap-2 hover:bg-primary-light transition-all cursor-pointer group"
                id="hero-search-btn"
              >
                <span className="material-symbols-outlined font-light text-accent group-hover:-rotate-12 transition-transform duration-300" aria-hidden="true">
                  travel_explore
                </span>
                Khám Phá
              </button>
            </form>
          </div>
        </div>

        {/* Hero Stats - NEW */}
        <div
          className={`mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-12 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {heroStats.map((stat, idx) => (
            <div key={stat.label} className="text-center group">
              <span className="block text-2xl md:text-3xl font-serif text-accent font-bold group-hover:scale-110 transition-transform">
                {stat.number}
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 mt-1 block">
                {stat.label}
              </span>
              {idx < heroStats.length - 1 && (
                <span className="hidden" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-light">Khám phá</span>
        <span className="material-symbols-outlined text-white/40 text-lg" aria-hidden="true">
          expand_more
        </span>
      </div>
    </section>
  );
}
