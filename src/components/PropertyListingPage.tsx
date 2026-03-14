"use client";

import { useState, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import { propertiesData, type PropertyDetails } from "@/data/properties";

interface PropertyListingPageProps {
  region?: string;
  title: string;
  subtitle?: string;
}

const regions = [
  { id: "all", label: "Tất cả", href: "/du-an" },
  { id: "da-nang", label: "Đà Nẵng", href: "/du-an/da-nang" },
  { id: "quang-nam", label: "Quảng Nam", href: "/du-an/quang-nam" },
  { id: "quang-binh", label: "Quảng Bình", href: "/du-an/quang-binh" },
];

function parsePriceToNumber(price: string): number {
  const match = price.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

function parseAreaToNumber(area: string): number {
  const match = area.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function PropertyListingPage({ region, title, subtitle }: PropertyListingPageProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [areaRange, setAreaRange] = useState("all");
  const [legalStatus, setLegalStatus] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const activeRegion = region || "all";

  const filtered = useMemo(() => {
    let result: PropertyDetails[] = region
      ? propertiesData.filter((p) => p.region === region)
      : [...propertiesData];

    if (priceRange !== "all") {
      result = result.filter((p) => {
        const price = parsePriceToNumber(p.price);
        switch (priceRange) {
          case "under-2": return price < 2;
          case "2-5": return price >= 2 && price <= 5;
          case "5-10": return price >= 5 && price <= 10;
          case "over-10": return price > 10;
          default: return true;
        }
      });
    }

    if (areaRange !== "all") {
      result = result.filter((p) => {
        const area = parseAreaToNumber(p.area);
        switch (areaRange) {
          case "under-100": return area < 100;
          case "100-200": return area >= 100 && area <= 200;
          case "over-200": return area > 200;
          default: return true;
        }
      });
    }

    if (legalStatus !== "all") {
      result = result.filter((p) => {
        const tags = (p.tags || []).join(" ").toLowerCase();
        if (legalStatus === "so-do") return tags.includes("sổ") || tags.includes("pháp");
        if (legalStatus === "hop-dong") return tags.includes("hợp đồng");
        return true;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "price-asc") return parsePriceToNumber(a.price) - parsePriceToNumber(b.price);
      if (sortBy === "price-desc") return parsePriceToNumber(b.price) - parsePriceToNumber(a.price);
      return 0;
    });

    return result;
  }, [region, priceRange, areaRange, legalStatus, sortBy]);

  const hasActiveFilters = priceRange !== "all" || areaRange !== "all" || legalStatus !== "all";

  /* Shared filter content — used in both mobile drawer and desktop sidebar */
  const filterContent = (
    <>
      {/* Region */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Khu vực</p>
        <div className="space-y-1">
          {regions.map((r) => (
            <a
              key={r.id}
              href={r.href}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                activeRegion === r.id
                  ? "bg-primary text-white font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
              {r.label}
            </a>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Khoảng giá</p>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-2 text-sm text-primary font-light outline-none cursor-pointer"
        >
          <option value="all">Tất cả mức giá</option>
          <option value="under-2">Dưới 2 Tỷ</option>
          <option value="2-5">2 — 5 Tỷ</option>
          <option value="5-10">5 — 10 Tỷ</option>
          <option value="over-10">Trên 10 Tỷ</option>
        </select>
      </div>

      {/* Area */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Diện tích</p>
        <select
          value={areaRange}
          onChange={(e) => setAreaRange(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-2 text-sm text-primary font-light outline-none cursor-pointer"
        >
          <option value="all">Tất cả diện tích</option>
          <option value="under-100">Dưới 100 m²</option>
          <option value="100-200">100 — 200 m²</option>
          <option value="over-200">Trên 200 m²</option>
        </select>
      </div>

      {/* Legal Status */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Pháp lý</p>
        <div className="space-y-2">
          {[
            { value: "all", label: "Tất cả" },
            { value: "so-do", label: "Sổ đỏ / Sổ hồng" },
            { value: "hop-dong", label: "Hợp đồng mua bán" },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="legal"
                value={item.value}
                checked={legalStatus === item.value}
                onChange={(e) => setLegalStatus(e.target.value)}
                className="text-accent focus:ring-accent"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={() => { setPriceRange("all"); setAreaRange("all"); setLegalStatus("all"); }}
          className="w-full text-center text-[12px] text-slate-400 hover:text-accent py-2 border border-slate-100 rounded-sm transition-colors"
        >
          Xóa bộ lọc
        </button>
      )}
    </>
  );

  return (
    <main className="min-h-screen bg-background-light pt-24 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-10">
        <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">Danh mục dự án</p>
        <h1 className="text-2xl md:text-4xl font-serif font-medium text-primary mb-2">{title}</h1>
        {subtitle && <p className="text-slate-500 font-light text-sm md:text-base max-w-xl">{subtitle}</p>}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6 flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all border ${
              filterOpen
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-slate-200 hover:border-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Bộ lọc
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent"></span>
            )}
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 bg-white text-primary font-medium focus:ring-0 rounded-sm px-3 py-2 cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá ↑</option>
              <option value="price-desc">Giá ↓</option>
            </select>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="lg:hidden mb-8 bg-white border border-slate-100 rounded-sm p-6 space-y-6 animate-[fadeIn_0.2s_ease-out]">
            {filterContent}
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full bg-primary text-white py-3 rounded-sm text-sm font-semibold uppercase tracking-wider"
            >
              Áp dụng ({filtered.length} kết quả)
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Sidebar (hidden on mobile) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-white border border-slate-100 rounded-sm p-6 space-y-8">
              {filterContent}
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0">
            {/* Desktop toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500 font-light">
                <span className="text-primary font-medium">{filtered.length}</span> bất động sản
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-0 bg-transparent text-primary font-medium focus:ring-0 pr-6 cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá thấp → cao</option>
                  <option value="price-desc">Giá cao → thấp</option>
                </select>
              </div>
            </div>

            {/* Mobile result count */}
            <div className="lg:hidden mb-4">
              <p className="text-sm text-slate-500 font-light">
                <span className="text-primary font-medium">{filtered.length}</span> bất động sản
              </p>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.image}
                    imageAlt={property.imageAlt}
                    title={property.title}
                    location={property.location}
                    area={property.area}
                    secondLabel={property.secondLabel}
                    secondValue={property.secondValue}
                    price={property.price}
                    badge={property.badge}
                    tags={property.tags}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-sm">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">search_off</span>
                <p className="text-primary font-serif text-lg mb-2">Không tìm thấy kết quả</p>
                <p className="text-slate-400 font-light text-sm">Hãy thử thay đổi bộ lọc để xem thêm.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
