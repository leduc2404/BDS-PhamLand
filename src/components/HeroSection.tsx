"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build the target URL based on selections
    if (region) {
      router.push(`/du-an/${region}`);
    } else {
      router.push("/du-an");
    }
  };

  return (
    <section
      className="relative h-[85vh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
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
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/80"></div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center mt-20 md:mt-16">
        <div className="flex justify-center mb-6">
          <span className="text-accent uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 border border-accent/30 rounded-full backdrop-blur-sm">
            Tinh Hoa Bất Động Sản
          </span>
        </div>
        
        <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-serif font-medium mb-4 md:mb-6 leading-tight drop-shadow-lg">
          Khơi Nguồn Thịnh Vượng
          <span className="block mt-1 md:mt-2 text-xl sm:text-3xl md:text-5xl font-light text-white/90">
            Giữa Tâm Điểm Miền Trung
          </span>
        </h1>
        
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
        
        <p className="text-slate-200 text-sm sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Chuyên trang tư vấn &amp; phân phối các dự án đất nền, biệt thự và căn hộ đẳng cấp tại Đà Nẵng, Quảng Nam, Quảng Bình.
        </p>

        {/* Functional Search Form */}
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
    </section>
  );
}
