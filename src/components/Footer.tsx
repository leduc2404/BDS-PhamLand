import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-slate-400 pt-10 md:pt-20 pb-6 md:pb-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid: 1 col on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-white icon-filled" aria-hidden="true">landscape</span>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-serif font-black leading-none tracking-tight text-white">PHAM LAND</span>
                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] text-accent">Real Estate</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-light hidden sm:block">
              Đối tác tư vấn đầu tư BĐS uy tín hàng đầu Miền Trung.
            </p>
            {/* Socials - Hidden on very small screens to save space, visible on sm and up */}
            <div className="hidden sm:flex gap-3">
              <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all" aria-label="Facebook">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">thumb_up</span>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all" aria-label="Youtube">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">smart_display</span>
              </Link>
            </div>
          </div>

          {/* Contact — shows first on mobile (most important) */}
          <div className="order-first sm:order-none lg:order-last border-b border-white/5 pb-6 sm:pb-0 sm:border-b-0 space-y-4">
            <h4 className="text-white font-serif font-medium text-sm md:text-base hidden sm:block">Liên hệ</h4>
            <address className="not-italic space-y-3 md:space-y-4 text-[13px] md:text-sm font-light">
              <a href="tel:0905000000" className="flex items-center gap-3 text-white font-medium tracking-wider hover:text-accent transition-colors">
                <span className="material-symbols-outlined text-accent text-[18px]" aria-hidden="true">call</span>
                0905.XXX.XXX
              </a>
              <a href="mailto:info@phamland.vn" className="flex items-center gap-3 hover:text-accent transition-colors mb-3">
                <span className="material-symbols-outlined text-accent/70 text-[18px]" aria-hidden="true">mail</span>
                info@phamland.vn
              </a>
              <a href="https://maps.app.goo.gl/BRSHTiaSP3Y5q8j28" target="_blank" rel="noopener noreferrer" className="flex gap-3 items-start group hover:text-accent transition-colors">
                <span className="material-symbols-outlined text-accent/70 text-[18px] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">location_on</span>
                <span className="leading-relaxed">09 Nhơn Hoà 16, <br className="hidden md:block"/>An Khê, Đà Nẵng</span>
              </a>
            </address>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-white font-serif font-medium text-sm md:text-base mb-3 md:mb-4">Dự án</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-[13px] md:text-sm font-light">
              <li><Link href="/du-an/da-nang" className="hover:text-accent transition-colors">Đà Nẵng</Link></li>
              <li><Link href="/du-an/quang-nam" className="hover:text-accent transition-colors">Quảng Nam</Link></li>
              <li><Link href="/du-an/quang-binh" className="hover:text-accent transition-colors">Quảng Bình</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-accent transition-colors">Tin tức</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="col-span-1 border-b border-white/5 sm:border-b-0 pb-8 sm:pb-0">
            <h4 className="text-white font-serif font-bold text-sm md:text-base mb-3 md:mb-8 uppercase tracking-wider flex items-center gap-2 md:gap-3">
              <span className="w-4 md:w-6 h-[1px] bg-accent/50"></span>
              Hỗ trợ
            </h4>
            <ul className="space-y-2.5 md:space-y-4 text-[13px] md:text-sm font-light text-slate-400">
              <li><Link href="/lien-he" className="hover:text-accent transition-colors">Liên hệ</Link></li>
              <li><Link href="/cam-nang-dau-tu" className="hover:text-accent transition-colors">Cẩm nang đầu tư</Link></li>
              <li><Link href="/chinh-sach-bao-mat" className="hover:text-accent transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] md:text-[11px] font-light tracking-wide text-slate-500">
          <p>© 2024 Pham Land Real Estate.</p>
          <p className="hidden sm:block">Kiến tạo thịnh vượng — Vững bước thành công.</p>
          <Link href="/developer" className="flex items-center gap-1.5 hover:text-accent transition-colors group">
            <span className="material-symbols-outlined text-[12px] text-slate-600 group-hover:text-accent transition-colors">code</span>
            Thiết kế bởi <span className="text-slate-400 group-hover:text-accent transition-colors font-medium">Lê Đức</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
