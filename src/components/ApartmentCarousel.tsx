"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { apartmentsData as apartments } from "@/data/apartments";

export default function ApartmentCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
          inline: "start", // Align to start makes the most sense on desktop multi-view
          block: "nearest",
        });
      }
    }
  };

  // Use IntersectionObserver for commercial-grade active dot tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Track visibility ratio of each card
    const visibilityMap = new Map<number, number>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Get the index from the DOM element (we set data-index on the links)
          const index = Number((entry.target as HTMLElement).dataset.index);
          
          if (!isNaN(index)) {
            if (entry.isIntersecting) {
              visibilityMap.set(index, entry.intersectionRatio);
            } else {
              visibilityMap.delete(index);
            }
          }
        });

        // Find the lowest index that is sufficiently visible (e.g. at least 50% in view)
        // If none are > 50%, fallback to the one with the highest ratio
        let bestIndex = -1;
        let highestRatio = 0;

        // Sort keys to find the *first* visible item on the left
        const visibleIndices = Array.from(visibilityMap.keys()).sort((a, b) => a - b);
        
        for (const idx of visibleIndices) {
          const ratio = visibilityMap.get(idx) || 0;
          if (ratio > highestRatio) {
             highestRatio = ratio;
          }
          // If this card is mostly visible, it's our winner (we prefer the leftmost visible one)
          if (ratio > 0.5) {
            bestIndex = idx;
            break; 
          }
        }

        // If we couldn't find one > 50% but we have a highest ratio, use that
        if (bestIndex === -1 && visibleIndices.length > 0) {
           // Find index with highest ratio
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
        threshold: [0, 0.25, 0.5, 0.75, 1], // Trigger at multiple visibility points
      }
    );

    // Observe all children
    Array.from(container.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-24 bg-white" id="can-ho" aria-labelledby="carousel-title">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Navigation */}
        <div className="flex items-end justify-between mb-6 md:mb-12 border-b-2 border-slate-100 pb-4 md:pb-6">
          <div>
             <p className="text-slate-400 uppercase tracking-[0.2em] font-bold text-[10px] md:text-xs mb-2 md:mb-3 flex items-center gap-2">
              <span className="w-6 md:w-8 h-[1px] bg-slate-300 inline-block"></span>
              Bộ Sưu Tập
            </p>
            <h2 id="carousel-title" className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
              Căn Hộ Hạng Sang
            </h2>
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-accent outline-none active:scale-90"
              aria-label="Cuộn trái"
            >
              <span className="material-symbols-outlined font-light text-lg md:text-2xl" aria-hidden="true">arrow_back</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-accent outline-none active:scale-90"
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
              href={`/san-pham/${apt.id}`}
              key={apt.id}
              data-index={index}
              className="min-w-[75vw] sm:min-w-[60vw] md:min-w-[400px] flex-none snap-start bg-background-light rounded-md border border-slate-200/50 group block hover:shadow-lux transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative h-48 sm:h-56 md:h-72 w-full overflow-hidden">
                <Image
                  src={apt.image}
                  alt={apt.imageAlt || apt.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 60vw, 400px"
                />
              </div>
              <div className="p-4 md:p-6 bg-white relative">
                <h3 className="text-base md:text-xl font-serif font-medium text-primary mb-1.5 md:mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {apt.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-light mb-4 md:mb-6 flex items-center gap-1.5 border-b border-slate-200 pb-3 md:pb-5">
                   <span className="material-symbols-outlined text-xs md:text-sm text-slate-400" aria-hidden="true">
                    explore
                  </span>
                  {apt.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-serif font-medium text-primary tracking-tight">{apt.price}</span>
                  {apt.badge && (
                    <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-white border border-slate-200 text-slate-500 px-2 md:px-3 py-1 md:py-1.5 rounded-[2px]">
                      {apt.badge.text}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll Indicator Dots - visible on all viewports */}
        <div className="flex justify-center gap-2 mt-4">
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
        
        {/* CTA Link to Full Page */}
        <div className="mt-10 md:mt-14 text-center">
          <Link href="/can-ho" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium uppercase tracking-widest text-xs md:text-sm rounded-sm">
            Xem tất cả căn hộ
            <span className="material-symbols-outlined font-light text-xl">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

