"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { propertiesData as properties } from "@/data/properties";

const regions = [
  { id: "all", name: "Tất cả" },
  { id: "da-nang", name: "Đà Nẵng" },
  { id: "quang-nam", name: "Quảng Nam" },
  { id: "quang-binh", name: "Quảng Bình" },
];

export default function InvestmentHotspots() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProperties =
    activeTab === "all"
      ? properties
      : properties.filter((p) => p.region === activeTab);

  return (
    <section className="py-16 md:py-24 bg-background-light" id="dat-nen" aria-labelledby="hotspots-title">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-slate-200 pb-6">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] font-bold text-xs mb-2 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent inline-block"></span>
                Cơ Hội Đầu Tư
              </p>
              <h2 id="hotspots-title" className="text-3xl md:text-5xl font-serif font-bold text-primary">
                Bất Động Sản Tiềm Năng
              </h2>
            </div>

            {/* Tabs — horizontal scroll on mobile */}
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-1 -mb-[26px] md:-mb-[26px] no-scrollbar" role="tablist" aria-label="Lọc theo khu vực">
              {regions.map((region) => (
                <button
                  key={region.id}
                  role="tab"
                  aria-selected={activeTab === region.id}
                  onClick={() => setActiveTab(region.id)}
                  className={`whitespace-nowrap pb-2 text-sm md:text-base font-medium uppercase tracking-wide transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 shrink-0 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]" role="tabpanel">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property.id}>
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
        
        <div className="mt-12 md:mt-16 text-center">
          <Link href="/du-an" className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium uppercase tracking-widest text-sm rounded-sm">
            Xem tất cả dự án
            <span className="material-symbols-outlined font-light text-xl">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
