"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  thumbnailUrl: string;
  images: string[];
  title: string;
}

export default function PropertyGallery({ thumbnailUrl, images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const allImages = images || [];
  const thumbnail = thumbnailUrl || allImages[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  // Combine all unique images for the gallery/lightbox
  const galleryItems = [thumbnail, ...allImages.filter(img => img !== thumbnail)];

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, nextImage, prevImage]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Touch swipe for mobile lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  };





  return (
    <>
      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a1128]/95 backdrop-blur-md flex flex-col animate-[fadeIn_0.2s_ease-out]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 shrink-0 absolute top-0 left-0 w-full z-50">
            <div className="px-4 py-2 rounded-full bg-white/10 text-white font-serif tracking-widest text-sm backdrop-blur-md border border-white/10">
              {currentIndex + 1} / {galleryItems.length}
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer backdrop-blur-md border border-white/10 hover:scale-105"
              aria-label="Đóng"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Image area */}
          <div className="flex-1 relative flex items-center justify-center min-h-0 w-full h-full">
            
            {/* Invisible touch zones for easy mobile tapping */}
            {galleryItems.length > 1 && (
              <>
                <div className="absolute left-0 top-0 w-1/4 h-full z-20 cursor-pointer" onClick={(e) => { e.stopPropagation(); prevImage(); }} />
                <div className="absolute right-0 top-0 w-1/4 h-full z-20 cursor-pointer" onClick={(e) => { e.stopPropagation(); nextImage(); }} />
              </>
            )}

            {/* Desktop Navigation arrows */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="hidden md:flex absolute left-8 z-30 w-14 h-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer backdrop-blur-md border border-white/10 hover:-translate-x-1"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_left</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="hidden md:flex absolute right-8 z-30 w-14 h-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer backdrop-blur-md border border-white/10 hover:translate-x-1"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_right</span>
                </button>
              </>
            )}

            {/* Main image container */}
            <div className="relative w-full h-full max-w-6xl p-4 md:p-16 flex items-center justify-center">
               {/* Lightbox Ambient Blur */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <Image
                  src={galleryItems[currentIndex]}
                  alt=""
                  fill
                  className="object-cover blur-[100px] saturate-200"
                  unoptimized
                />
              </div>
              <Image
                src={galleryItems[currentIndex]}
                alt={`${title} - ảnh ${currentIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl z-10 p-4 md:p-12"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Thumbnail strip */}
          {galleryItems.length > 1 && (
            <div className="shrink-0 px-4 md:px-8 pb-6 pt-2 flex justify-center gap-3 overflow-x-auto scrollbar-hide z-40">
              {galleryItems.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer group ${
                    idx === currentIndex
                      ? "border-accent opacity-100 scale-110 shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                      : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                  aria-label={`Xem ảnh ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════ GALLERY GRID (SPLIT LAYOUT) ═══════ */}
      <div className="mb-12">
        <div className="flex flex-row items-start gap-2 md:gap-3">
          
          {/* Main Hero Image (Left Side - Larger) */}
          <div className="w-[55%] sm:w-[45%] md:w-[40%] lg:w-[35%] shrink-0">
            <div
              className="relative cursor-pointer group rounded-lg md:rounded-xl overflow-hidden bg-slate-100/50 shadow-sm"
              onClick={() => openLightbox(0)}
            >
              <img
                src={galleryItems[0]}
                alt={title}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  <span className="material-symbols-outlined text-white text-2xl md:text-3xl drop-shadow-lg">zoom_in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Images Masonry (Right Side) */}
          {galleryItems.length > 1 && (
            <div className="w-[45%] sm:w-[55%] md:w-[60%] lg:w-[65%]">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 md:gap-3 space-y-2 md:space-y-3">
                {galleryItems.slice(1).map((img, idx) => {
                  const actualIndex = idx + 1;
                  return (
                    <div
                      key={actualIndex}
                      className="relative break-inside-avoid cursor-pointer group rounded-lg md:rounded-xl overflow-hidden bg-slate-100/50 shadow-sm"
                      onClick={() => openLightbox(actualIndex)}
                    >
                      <img
                        src={img}
                        alt={`${title} - ảnh ${actualIndex + 1}`}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl md:text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 drop-shadow-md">
                          open_in_full
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
