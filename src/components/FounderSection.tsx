"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const founderImages = [
  {
    src: "/images/founder/founder-project.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/images/founder/founder-working.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/images/founder/founder-outdoor.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/images/founder/founder-landmark.jpg",
    alt: "",
    caption: "",
  },
];

const milestones = [
  { number: "10+", label: "Năm Kinh Nghiệm", icon: "timeline" },
  { number: "500+", label: "Khách Hàng Tin Tưởng", icon: "groups" },
  { number: "50+", label: "Dự Án Phân Phối", icon: "apartment" },
  { number: "100%", label: "Pháp Lý Minh Bạch", icon: "verified" },
];

export default function FounderSection() {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % founderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const section = document.getElementById("founder-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleImageClick = useCallback((index: number) => {
    setActiveImage(index);
  }, []);

  return (
    <section
      id="founder-section"
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="founder-title"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-primary to-[#0f1d3a]" />
      
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section badge */}
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold px-4 py-1.5 border border-accent/20 rounded-full backdrop-blur-sm bg-accent/5">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              person
            </span>
            Người Sáng Lập
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Image Gallery */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main showcase image */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden group">
              {/* Gold border glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/40 via-accent/10 to-accent/30 rounded-lg z-0" />
              
              <div className="relative rounded-lg overflow-hidden z-10 h-full">
                {founderImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      idx === activeImage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                      priority={idx === 0}
                    />
                  </div>
                ))}
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent z-10" />
                
                {/* Caption on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <p className="text-white/90 text-sm md:text-base font-light tracking-wide">
                    {founderImages[activeImage].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
              {founderImages.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => handleImageClick(idx)}
                  className={`relative flex-1 aspect-[4/3] rounded-md overflow-hidden cursor-pointer group/thumb transition-all duration-300 ${
                    idx === activeImage
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-primary opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Xem ảnh: ${img.caption}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      idx === activeImage
                        ? "bg-transparent"
                        : "bg-primary/30 group-hover/thumb:bg-primary/10"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Progress dots (mobile alternative) */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {founderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleImageClick(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeImage
                      ? "w-8 h-2 bg-accent"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ảnh ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Bio & Info */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Name & title */}
            <div className="mb-8 md:mb-10">
              <h2
                id="founder-title"
                className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-3"
              >
                Phạm Văn Mão
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-accent to-transparent" />
                <span className="text-accent text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">
                  Pham Land
                </span>
              </div>
              <blockquote className="relative pl-5 border-l-2 border-accent/30 mb-8">
                <p className="text-white/80 text-base md:text-lg font-serif italic leading-relaxed">
                  &ldquo;Mỗi lô đất không chỉ là tài sản — đó là nền tảng cho tương lai thịnh vượng của gia đình bạn.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Bio text */}
            <div className="space-y-4 mb-10 md:mb-14">
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                Với hơn <strong className="text-white font-medium">10 năm</strong> kinh nghiệm 
                trong lĩnh vực bất động sản tại miền Trung, 
                <strong className="text-accent font-medium"> Pham Land</strong> — đã trực tiếp tham gia khảo sát, 
                thẩm định và phân phối hàng trăm dự án đất nền, biệt thự và căn hộ cao cấp.
              </p>
              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                Am hiểu sâu sắc quy hoạch vĩ mô tại Đà Nẵng, Quảng Nam và Quảng Bình, <strong className="text-accent font-medium"> Pham Land </strong>
                cam kết mang đến cho khách hàng những cơ hội đầu tư an toàn, minh bạch pháp lý và 
                tiềm năng sinh lời bền vững.
              </p>
            </div>

            {/* Milestones grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-14">
              {milestones.map((m, idx) => (
                <div
                  key={m.label}
                  className={`relative bg-white/[0.04] border border-white/[0.08] rounded-lg p-4 md:p-6 group hover:bg-accent/10 hover:border-accent/20 transition-all duration-500 cursor-default ${
                    isVisible ? "animate-[fadeIn_0.6s_ease-out_forwards]" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${600 + idx * 150}ms` }}
                >
                  <span
                    className="material-symbols-outlined text-accent/60 text-lg md:text-xl mb-2 block group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  >
                    {m.icon}
                  </span>
                  <span className="block text-2xl md:text-3xl font-serif text-white font-bold tracking-tight">
                    {m.number}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 mt-1 block group-hover:text-slate-300 transition-colors">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href="tel:0905098018"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-accent text-primary font-semibold text-xs md:text-sm uppercase tracking-wider rounded-sm hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(197,160,89,0.3)] transition-all duration-300 group"
              >
                <span
                  className="material-symbols-outlined text-lg group-hover:animate-pulse"
                  aria-hidden="true"
                >
                  call
                </span>
                Liên hệ trực tiếp
              </a>
              <a
                href="https://zalo.me/84905098018"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-white/20 text-white font-medium text-xs md:text-sm uppercase tracking-wider rounded-sm hover:bg-white/10 hover:border-accent/40 transition-all duration-300"
              >
                Chat Zalo tư vấn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
