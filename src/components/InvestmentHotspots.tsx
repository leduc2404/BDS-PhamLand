"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { propertiesData as properties } from "@/data/properties";

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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    <section className="py-12 md:py-24 bg-background-light" id="dat-nen" aria-labelledby="hotspots-title">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-b-2 border-slate-200 pb-4 md:pb-6">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] font-bold text-xs mb-2 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent inline-block"></span>
                Cơ Hội Đầu Tư
              </p>
              <h2 id="hotspots-title" className="text-2xl md:text-5xl font-serif font-bold text-primary">
                Bất Động Sản Tiềm Năng
              </h2>
            </div>

            {/* Tabs — horizontal scroll on mobile */}
            <div className="flex gap-3 md:gap-8 overflow-x-auto pb-1 -mb-[22px] md:-mb-[26px] no-scrollbar" role="tablist" aria-label="Lọc theo khu vực">
              {regions.map((region) => (
                <button
                  key={region.id}
                  role="tab"
                  aria-selected={activeTab === region.id}
                  onClick={() => setActiveTab(region.id)}
                  className={`whitespace-nowrap pb-2 text-xs md:text-base font-medium uppercase tracking-wide transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 shrink-0 ${
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

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 min-h-[300px] md:min-h-[400px]" role="tabpanel">
          {displayedProperties.length > 0 ? (
            displayedProperties.map((property) => (
              <div key={property.id} className="animate-[fadeIn_0.4s_ease-out]">
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

        {/* "Xem thêm" button - mobile only */}
        {isMobile && !showAll && remainingCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-primary hover:border-accent hover:text-accent transition-all font-medium text-sm rounded-md shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">expand_more</span>
              Xem thêm {remainingCount} bất động sản
            </button>
          </div>
        )}

        {/* Collapse button when expanded on mobile */}
        {isMobile && showAll && filteredProperties.length > MOBILE_LIMIT && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary transition-all font-medium text-sm rounded-md shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">expand_less</span>
              Thu gọn
            </button>
          </div>
        )}
        
        <div className="mt-8 md:mt-16 text-center">
          <Link href="/du-an" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium uppercase tracking-widest text-xs md:text-sm rounded-sm">
            Xem tất cả dự án
            <span className="material-symbols-outlined font-light text-xl">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
