"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dự án",
    href: "/du-an",
    children: [
      { label: "Tất cả dự án", href: "/du-an" },
      { label: "Đà Nẵng", href: "/du-an/da-nang" },
      { label: "Quảng Nam", href: "/du-an/quang-nam" },
      { label: "Quảng Bình", href: "/du-an/quang-binh" },
    ],
  },
  { label: "Căn hộ", href: "/can-ho" },
  { label: "Ký gửi", href: "/ky-gui" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages that have a dark hero get transparent header; all others get solid white
  const isHomepage = pathname === "/";
  const hasDarkHero = isHomepage || pathname === "/ky-gui" || pathname === "/tin-tuc" || pathname === "/lien-he" || pathname === "/developer" || (pathname.startsWith("/tin-tuc/") && pathname !== "/tin-tuc/tat-ca");
  // Force solid header on pages without a dark hero
  const solid = scrolled || !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    // Check exact match for root level pages to avoid "/can-ho" highlighting "/can-ho/abc"
    // Also correctly highlight /tin-tuc and /lien-he
    return pathname.startsWith(href) && (pathname === href || pathname.startsWith(href + '/'));
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-1000 ease-in-out ${
        solid
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)] py-2.5 md:py-3"
          : "bg-transparent py-2.5 md:py-5"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Pham Land - Trang chủ">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center transition-all duration-1000 ease-in-out ${solid ? "bg-primary" : "bg-white/15 backdrop-blur-sm border border-white/20"}`}>
            <span className={`material-symbols-outlined text-xl md:text-2xl icon-filled transition-colors duration-1000 ease-in-out ${solid ? "text-accent" : "text-white"}`} aria-hidden="true">
              landscape
            </span>
          </div>
          <div className="flex flex-col">
            <span className={`text-base md:text-lg font-serif font-bold leading-none tracking-tight transition-colors duration-1000 ease-in-out ${solid ? "text-primary" : "text-white"}`}>
              PHAM LAND
            </span>
            <span className={`text-[8px] font-semibold uppercase tracking-[0.3em] mt-0.5 transition-colors duration-1000 ease-in-out ${solid ? "text-accent" : "text-white/60"}`}>
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu chính">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.children ? (
                <>
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-sm text-[13px] font-medium transition-all duration-300 ${
                      solid
                        ? "text-slate-600 hover:text-primary hover:bg-slate-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    {link.label}
                    <span className="material-symbols-outlined text-[16px] ml-0.5 opacity-50" aria-hidden="true">
                      expand_more
                    </span>
                  </button>
                  {/* 
                    Dropdown: pt-2 creates an invisible bridge above the menu
                    so the mouse doesn't lose hover when crossing from button to panel
                  */}
                  <div
                    className="absolute top-full left-0 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <div className="w-52 bg-white border border-slate-100 shadow-lux rounded-sm py-1.5" role="menu">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-slate-600 hover:text-accent hover:bg-accent/5 transition-colors"
                          role="menuitem"
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-sm text-[13px] font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-accent"
                      : solid
                        ? "text-slate-600 hover:text-primary hover:bg-slate-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full"></span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="tel:0905000000"
            className={`hidden lg:flex px-5 py-2.5 rounded-sm font-semibold text-[12px] uppercase tracking-wider items-center gap-2 transition-all duration-1000 ease-in-out ${
              solid
                ? "bg-primary text-white hover:bg-accent"
                : "bg-white text-primary hover:bg-accent hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">call</span>
            Tư vấn
          </Link>
          <button
            className={`lg:hidden w-10 h-10 rounded-sm flex items-center justify-center transition-all ${solid ? "text-primary hover:bg-slate-50" : "text-white hover:bg-white/10"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-slate-100 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1" aria-label="Menu di động">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className={`flex items-center justify-between py-3.5 px-3 rounded-sm text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-accent bg-accent/5" : "text-slate-700 hover:text-accent hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>}
              </Link>
              {link.children && (
                <div className="pl-6 space-y-0.5">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="flex items-center gap-2 py-2.5 px-3 text-sm text-slate-500 hover:text-accent rounded-sm hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-slate-100 mt-2">
            <Link
              href="tel:0905000000"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-sm font-semibold text-xs uppercase tracking-widest hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              Liên hệ tư vấn
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
