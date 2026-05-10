"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { getProperties } from "@/lib/firestore";

export default function ApartmentCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [apartments, setApartments] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getProperties(10).then((data) => {
      const apts = data.filter(p => p.propertyType === "apartment");
      const mapped = apts.map((p) => ({
        id: p.slug || p.id,
        title: p.title,
        location: p.location,
        price: p.priceDisplay || `${(p.price / 1000000000).toFixed(1)} Tỷ`,
        area: p.area.toString() + " m²",
        image: p.thumbnailUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        imageAlt: p.title,
        badge: p.isHot ? { text: "HOT", color: "accent" } : undefined,
        secondLabel: "HƯỚNG",
        secondValue: "Căn hộ",
        tags: ["sổ đỏ", "bàn giao ngay"],
        createdAt: p.createdAt?.toMillis?.() || Date.now()
      }));
      mapped.sort((a, b) => b.createdAt - a.createdAt);
      setApartments(mapped);
    }).catch((error) => {
      console.error("Firestore apartments fetch failed:", error);
    });
  }, []);

  // Intersection Observer for section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("apartment-carousel-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const children = scrollContainerRef.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
      }
    }
  };

  // IntersectionObserver for active dot tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const visibilityMap = new Map<number, number>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          
          if (!isNaN(index)) {
            if (entry.isIntersecting) {
              visibilityMap.set(index, entry.intersectionRatio);
            } else {
              visibilityMap.delete(index);
            }
          }
        });

        let bestIndex = -1;
        let highestRatio = 0;
        const visibleIndices = Array.from(visibilityMap.keys()).sort((a, b) => a - b);
        
        for (const idx of visibleIndices) {
          const ratio = visibilityMap.get(idx) || 0;
          if (ratio > highestRatio) {
             highestRatio = ratio;
          }
          if (ratio > 0.5) {
            bestIndex = idx;
            break; 
          }
        }

        if (bestIndex === -1 && visibleIndices.length > 0) {
           bestIndex = visibleIndices.reduce((a, b) => 
               (visibilityMap.get(a) || 0) > (visibilityMap.get(b) || 0) ? a : b
           );
        }

        if (bestIndex !== -1) {
          setActiveIndex(bestIndex);
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  // Don't render section if no apartments
  if (!apartments.length && isVisible) return null;

  return (
    <section
      id="apartment-carousel-section"
      className="py-16 md:py-28 bg-white relative overflow-hidden"
      aria-labelledby="carousel-title"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background-light to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with Navigation */}
        <div
          className={`flex items-end justify-between mb-8 md:mb-14 border-b-2 border-slate-100 pb-4 md:pb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
             <p className="text-slate-400 uppercase tracking-[0.2em] font-bold text-[10px] md:text-xs mb-2 md:mb-3 flex items-center gap-2">
              <span className="w-6 md:w-8 h-[1px] bg-slate-300 inline-block" />
              Bộ Sưu Tập
            </p>
            <h2 id="carousel-title" className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
              Căn Hộ Hạng Sang
            </h2>
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-white hover:bg-primary hover:border-primary transition-all focus:ring-2 focus:ring-accent outline-none active:scale-90"
              aria-label="Cuộn trái"
            >
              <span className="material-symbols-outlined font-light text-lg md:text-2xl" aria-hidden="true">arrow_back</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-white hover:bg-primary hover:border-primary transition-all focus:ring-2 focus:ring-accent outline-none active:scale-90"
              aria-label="Cuộn phải"
            >
              <span className="material-symbols-outlined font-light text-lg md:text-2xl" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-4 md:pb-8 pt-2 md:pt-4 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          role="region"
          aria-label="Danh sách căn hộ"
        >
          {apartments.map((apt, index) => (
            <Link
              href={`/can-ho/${apt.id}`}
              key={apt.id}
              data-index={index}
              className={`min-w-[75vw] sm:min-w-[60vw] md:min-w-[400px] flex-none snap-start bg-background-light rounded-lg border border-slate-200/50 group block hover:shadow-lux-hover transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="relative h-48 sm:h-56 md:h-72 w-full overflow-hidden">
                <Image
                  src={apt.image}
                  alt={apt.imageAlt || apt.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 60vw, 400px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                
                {apt.badge && (
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm border border-accent/50 text-accent text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-[2px] z-10">
                    {apt.badge.text}
                  </div>
                )}
              </div>
              <div className="p-4 md:p-6 bg-white relative">
                <h3 className="text-base md:text-xl font-serif font-medium text-primary mb-1.5 md:mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {apt.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-light mb-4 md:mb-6 flex items-center gap-1.5 border-b border-slate-200 pb-3 md:pb-5">
                   <span className="material-symbols-outlined text-xs md:text-sm text-accent" aria-hidden="true">
                    explore
                  </span>
                  {apt.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-serif font-medium text-primary tracking-tight">{apt.price}</span>
                  {/* Animated arrow on hover */}
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-white transition-colors" aria-hidden="true">
                      arrow_outward
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {apartments.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-8 h-2.5 bg-accent"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-accent/50"
              }`}
              aria-label={`Đến slide ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/can-ho"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium uppercase tracking-widest text-xs md:text-sm rounded-sm group"
          >
            Xem tất cả căn hộ
            <span className="material-symbols-outlined font-light text-xl group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
