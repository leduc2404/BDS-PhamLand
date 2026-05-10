"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { getProperties } from "@/lib/firestore";

const MOBILE_LIMIT = 3;

const regions = [
  { id: "all", name: "Tất cả" },
  { id: "da-nang", name: "Đà Nẵng" },
  { id: "quang-nam", name: "Quảng Nam" },
  { id: "quang-binh", name: "Quảng Bình" },
];

export default function InvestmentHotspots() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getProperties(20).then((data) => {
      const projs = data.filter(p => p.propertyType !== "apartment");
      const mapped = projs.map((p) => ({
        id: p.slug || p.id,
        title: p.title,
        location: p.location,
        price: p.priceDisplay || `${(p.price / 1000000000).toFixed(1)} Tỷ`,
        area: p.area.toString() + " m²",
        image: p.thumbnailUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        imageAlt: p.title,
        badge: p.isHot ? { text: "HOT", color: "accent" } : undefined,
        secondLabel: "Loại",
        secondValue: p.propertyType === "land" ? "Đất nền" : p.propertyType === "villa" ? "Biệt thự" : p.propertyType === "shophouse" ? "Shophouse" : "Nhà phố",
        region: p.location?.toLowerCase().includes("đà nẵng") ? "da-nang" :
                p.location?.toLowerCase().includes("quảng nam") ? "quang-nam" :
                p.location?.toLowerCase().includes("quảng bình") ? "quang-binh" : "all",
        tags: ["sổ đỏ", "bàn giao ngay"],
        createdAt: p.createdAt?.toMillis?.() || Date.now()
      }));
      mapped.sort((a, b) => b.createdAt - a.createdAt);
      setProperties(mapped);
    }).catch((error) => {
      console.error("Firestore properties fetch failed:", error);
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("investment-hotspots-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset showAll when tab changes
  useEffect(() => {
    setShowAll(false);
  }, [activeTab]);

  const filteredProperties =
    activeTab === "all"
      ? properties
      : properties.filter((p) => p.region === activeTab);

  const displayedProperties =
    isMobile && !showAll
      ? filteredProperties.slice(0, MOBILE_LIMIT)
      : filteredProperties;

  const remainingCount = filteredProperties.length - MOBILE_LIMIT;

  return (
    <section
      id="investment-hotspots-section"
      className="py-14 md:py-28 bg-background-light relative overflow-hidden"
      aria-labelledby="hotspots-title"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-b-2 border-slate-200 pb-4 md:pb-6">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] font-bold text-xs mb-2 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent inline-block" />
                Cơ Hội Đầu Tư
              </p>
              <h2 id="hotspots-title" className="text-2xl md:text-5xl font-serif font-bold text-primary">
                Bất Động Sản Tiềm Năng
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 md:gap-8 overflow-x-auto pb-1 -mb-[22px] md:-mb-[26px] no-scrollbar" role="tablist" aria-label="Lọc theo khu vực">
              {regions.map((region) => (
                <button
                  key={region.id}
                  role="tab"
                  aria-selected={activeTab === region.id}
                  onClick={() => setActiveTab(region.id)}
                  className={`whitespace-nowrap pb-2 text-xs md:text-base font-medium uppercase tracking-wide transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 shrink-0 cursor-pointer ${
                    activeTab === region.id
                      ? "text-primary after:w-full after:bg-accent"
                      : "text-slate-400 hover:text-primary after:w-0 hover:after:w-full after:bg-slate-300"
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 min-h-[300px] md:min-h-[400px]" role="tabpanel">
          {displayedProperties.length > 0 ? (
            displayedProperties.map((property, idx) => (
              <div
                key={property.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + idx * 100}ms` }}
              >
                <PropertyCard {...property} imageAlt={property.title} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block font-light">domain_disabled</span>
              <p className="text-slate-500 font-serif text-lg italic">
                Đang cập nhật thêm các quỹ đất vàng tại khu vực này.
              </p>
            </div>
          )}
        </div>

        {/* Mobile expand/collapse buttons */}
        {isMobile && !showAll && remainingCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-primary hover:border-accent hover:text-accent transition-all font-medium text-sm rounded-md shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">expand_more</span>
              Xem thêm {remainingCount} bất động sản
            </button>
          </div>
        )}

        {isMobile && showAll && filteredProperties.length > MOBILE_LIMIT && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary transition-all font-medium text-sm rounded-md shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">expand_less</span>
              Thu gọn
            </button>
          </div>
        )}
        
        {/* CTA */}
        <div className="mt-10 md:mt-16 text-center">
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium uppercase tracking-widest text-xs md:text-sm rounded-sm group"
          >
            Xem tất cả dự án
            <span className="material-symbols-outlined font-light text-xl group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
