import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-slate-400 pt-12 md:pt-20 pb-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid: 1 col on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 md:mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-white icon-filled" aria-hidden="true">landscape</span>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-black leading-none tracking-tight text-white">PHAM LAND</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-accent">Real Estate</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-light hidden sm:block">
              Đối tác tư vấn đầu tư BĐS uy tín hàng đầu Miền Trung.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all" aria-label="Facebook">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">thumb_up</span>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all" aria-label="Youtube">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">smart_display</span>
              </Link>
            </div>
          </div>

          {/* Contact — shows first on mobile (most important) */}
          <div className="order-first sm:order-none lg:order-last">
            <h4 className="text-white font-serif font-medium text-base mb-4">Liên hệ</h4>
            <address className="not-italic space-y-3 text-sm font-light">
              <a href="tel:0905000000" className="flex items-center gap-3 text-white font-medium tracking-wider hover:text-accent transition-colors">
                <span className="material-symbols-outlined text-accent text-[18px]" aria-hidden="true">call</span>
                0905.XXX.XXX
              </a>
              <a href="mailto:info@phamland.vn" className="flex items-center gap-3 hover:text-accent transition-colors">
                <span className="material-symbols-outlined text-accent/70 text-[18px]" aria-hidden="true">mail</span>
                info@phamland.vn
              </a>
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-accent/70 text-[18px] mt-0.5 shrink-0" aria-hidden="true">location_on</span>
                <span>09 Nhơn Hoà 16, An Khê, Đà Nẵng</span>
              </div>
            </address>
          </div>

          {/* Projects */}
          <div className="hidden sm:block">
            <h4 className="text-white font-serif font-medium text-base mb-4">Dự án</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><Link href="/du-an/da-nang" className="hover:text-accent transition-colors">Đà Nẵng</Link></li>
              <li><Link href="/du-an/quang-nam" className="hover:text-accent transition-colors">Quảng Nam</Link></li>
              <li><Link href="/du-an/quang-binh" className="hover:text-accent transition-colors">Quảng Bình</Link></li>
              <li><Link href="/du-an" className="hover:text-accent transition-colors">Tất cả dự án</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="hidden lg:block">
            <h4 className="text-white font-serif font-medium text-base mb-4">Liên kết</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><Link href="/ky-gui" className="hover:text-accent transition-colors">Ký gửi BĐS</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Cẩm nang đầu tư</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-light tracking-wide text-slate-500">
          <p>© 2024 Pham Land Real Estate.</p>
          <p className="hidden sm:block">Kiến tạo thịnh vượng — Vững bước thành công.</p>
        </div>
      </div>
    </footer>
  );
}
