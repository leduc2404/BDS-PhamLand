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
        className={`w-11 h-11 bg-white border border-slate-200 text-primary shadow-lux rounded-full flex items-center justify-center hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 outline-none ${
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
        href="tel:0905000000"
        className="w-12 h-12 bg-primary text-accent shadow-lux rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lux-hover hover:brightness-110 transition-all duration-300 relative group animate-[pulse_2s_infinite]"
        aria-label="Gọi điện thoại"
      >
        <span className="material-symbols-outlined icon-filled" aria-hidden="true">
          call
        </span>
        <span className="absolute right-full mr-3 bg-white text-primary text-xs font-medium px-3 py-1.5 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Gọi 0905.XXX.XXX
        </span>
      </Link>

      {/* Zalo Button */}
      <Link
        href="https://zalo.me/0905000000"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#0068ff] text-white shadow-lux rounded-full flex items-center justify-center hover:-translate-y-1 hover:shadow-lux-hover transition-all duration-300 relative group"
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
