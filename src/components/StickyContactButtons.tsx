"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StickyContactButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 bg-white/90 backdrop-blur-sm border border-slate-200 text-primary shadow-lux rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all duration-300 outline-none cursor-pointer ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
      >
         <span className="material-symbols-outlined font-light" aria-hidden="true">
          arrow_upward
        </span>
      </button>

      {/* Phone Button */}
      <Link
        href="tel:0905098018"
        className="w-12 h-12 bg-primary text-accent shadow-[0_4px_20px_rgba(15,23,42,0.3)] rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,23,42,0.4)] hover:bg-accent hover:text-primary transition-all duration-300 relative group"
        aria-label="Gọi điện thoại"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: "2s" }} />
        <span className="material-symbols-outlined icon-filled relative z-10" aria-hidden="true">
          call
        </span>
        <span className="absolute right-full mr-3 bg-white text-primary text-xs font-medium px-3 py-1.5 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Gọi 0905.098.018
        </span>
      </Link>

      {/* Zalo Button */}
      <Link
        href="https://zalo.me/84905098018"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#0068ff] text-white shadow-[0_4px_20px_rgba(0,104,255,0.3)] rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,104,255,0.4)] transition-all duration-300 relative group"
        aria-label="Chat qua Zalo"
      >
        <span className="font-bold text-sm tracking-wider">Zalo</span>
        <span className="absolute right-full mr-3 bg-white text-primary text-xs font-medium px-3 py-1.5 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Chat Zalo
        </span>
      </Link>
    </div>
  );
}
