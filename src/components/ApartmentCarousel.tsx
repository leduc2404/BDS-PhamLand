"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { propertiesData as apartments } from "@/data/properties";

export default function ApartmentCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white" id="can-ho" aria-labelledby="carousel-title">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Navigation */}
        <div className="flex items-end justify-between mb-12 border-b-2 border-slate-100 pb-6">
          <div>
             <p className="text-slate-400 uppercase tracking-[0.2em] font-bold text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-slate-300 inline-block"></span>
              Bộ Sưu Tập
            </p>
            <h2 id="carousel-title" className="text-4xl md:text-5xl font-serif font-bold text-primary">
              Căn Hộ Hạng Sang
            </h2>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-accent outline-none"
              aria-label="Cuộn trái"
            >
              <span className="material-symbols-outlined font-light" aria-hidden="true">arrow_back</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-accent outline-none"
              aria-label="Cuộn phải"
            >
              <span className="material-symbols-outlined font-light" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 pt-4 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          role="region"
          aria-label="Danh sách căn hộ"
        >
          {apartments.map((apt) => (
            <Link
              href={`/san-pham/${apt.id}`}
              key={apt.id}
              className="min-w-[85vw] md:min-w-[400px] flex-none snap-start bg-background-light rounded-md border border-slate-200/50 group block hover:shadow-lux transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={apt.image}
                  alt={apt.imageAlt || apt.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 400px"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-serif font-medium text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {apt.title}
                </h3>
                <p className="text-slate-500 text-sm font-light mb-6 flex items-center gap-1.5 border-b border-slate-200 pb-5">
                   <span className="material-symbols-outlined text-sm text-slate-400" aria-hidden="true">
                    explore
                  </span>
                  {apt.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-medium text-primary tracking-tight">{apt.price}</span>
                  {apt.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-[2px]">
                      {apt.badge.text}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
