import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Cẩm nang đầu tư | Pham Land",
  description: "Tuyển tập chiến lược và kinh nghiệm đầu tư bất động sản giá trị cao từ Pham Land.",
};

export default function InvestmentGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          1. CINEMATIC HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 opacity-50 mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Cẩm nang đầu tư Pham Land"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-20">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-accent"></span>
            Tài liệu Độc quyền
            <span className="w-12 h-[1px] bg-accent"></span>
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-xl">
            Nghệ Thuật Đầu Tư<br />
            <span className="font-light italic text-white/90">Bất Động Sản Đoạt Vị</span>
          </h1>
          <p className="text-sm md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Vượt lên trên những con số, đầu tư bất động sản hạng sang là cuộc chơi của tầm nhìn, sự kiên nhẫn và nghệ thuật quản trị rủi ro hoàn mỹ.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THE MANIFESTO (STATEMENT)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-primary text-center px-6 border-t border-white/10 relative overflow-hidden">
        {/* Decorative Watermark */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[400px] font-serif font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
          VISION
        </span>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="material-symbols-outlined text-4xl text-accent mb-8">format_quote</span>
          <h2 className="text-2xl md:text-5xl font-serif font-light leading-relaxed text-white">
            "Trong mọi chu kỳ của nền kinh tế, <span className="text-accent font-bold italic">đất đai không tự sinh ra</span>. Kẻ nắm giữ những vị trí giới hạn sẽ nắm giữ chìa khóa của sự thịnh vượng xuyên thế hệ."
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. CORE PRINCIPLES - LUXURY GRID
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Nền Tảng Bất Di Bất Dịch</h3>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Bộ 3 Nguyên Tắc Vàng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 md:p-14 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)] transition-all duration-700 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                <span className="material-symbols-outlined text-white text-2xl">gavel</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">Pháp Lý Là Sinh Mệnh</h4>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                Tuyệt đối không nhượng bộ trước những tài sản mập mờ. Một siêu phẩm kiến trúc chỉ thực sự có giá trị khi nó được bảo chứng bằng nền tảng pháp lý vững như bàn thạch: Sổ hồng sở hữu lâu dài hoặc Quyết định 1/500 minh bạch.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 md:p-14 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)] transition-all duration-700 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                <span className="material-symbols-outlined text-white text-2xl">my_location</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">Vị Trí Độc Tôn (Location)</h4>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                Cấu trúc phục hồi và tăng trưởng của một bất động sản luôn được định đoạt bởi tọa độ của nó. Giới tinh hoa không mua gạch vữa, họ mua không gian sống, hạ tầng tiện ích và cộng đồng xung quanh.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 md:p-14 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)] transition-all duration-700 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                <span className="material-symbols-outlined text-white text-2xl">account_balance</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">Đòn Bẩy Tài Chính</h4>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                Nghệ thuật sử dụng nguồn vốn ngân hàng (Leverage). Tỷ lệ đòn bẩy an toàn luôn nên được kiểm soát dưới 40% giá trị tài sản, đảm bảo dòng tiền vận hành không bao giờ bị bào mòn bởi lãi suất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. MARKET CYCLES - Split Concept
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            {/* Visual Side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Chu kỳ thị trường bất động sản"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              </div>
              {/* Floating Stat Box */}
              <div className="absolute -bottom-10 -right-10 md:-right-16 bg-primary p-10 md:p-12 rounded-sm shadow-2xl max-w-xs border-l-4 border-accent">
                <span className="block text-accent font-serif text-5xl font-bold mb-2">3-5<span className="text-2xl">năm</span></span>
                <p className="text-white text-sm font-light leading-relaxed">Là khoảng thời gian trung bình của một chu kỳ sóng bất động sản hoàn hảo.</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2 mt-16 lg:mt-0">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Nhịp Tim Kinh Tế</h3>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-10 leading-tight">Thấu Hiểu Chu Kỳ <br/>Thị Trường</h2>
              
              <div className="space-y-10">
                <div className="border-l border-slate-200 pl-8 relative">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-white"></div>
                  <h4 className="text-xl font-serif font-bold text-primary mb-3">Giai Đoạn Đóng Băng & Phục Hồi</h4>
                  <p className="text-slate-500 font-light text-sm leading-relaxed">
                    Xảy ra sau những đợt siết chặt tín dụng. Tâm lý thị trường hoảng loạn. Tuy nhiên, dưới góc nhìn của giới tài phiệt, đây là lúc "Mùa Mua Sắm" (Shopping Season) thực sự bắt đầu với hàng loạt tài sản giá trị bị định giá cực thấp (Undervalued).
                  </p>
                </div>
                
                <div className="border-l border-slate-200 pl-8 relative">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white"></div>
                  <h4 className="text-xl font-serif font-bold text-primary mb-3">Giai Đoạn Tín Dụng Nóng (Bong Bóng)</h4>
                  <p className="text-slate-500 font-light text-sm leading-relaxed">
                    Tiền rẻ ngập tràn, truyền thông FOMO bùng nổ, rác cũng biến thành vàng. Lời khuyên tối thượng từ Pham Land: Kích hoạt lệnh <em>Chốt Lời (Take Profit)</em> và cơ cấu lại danh mục sang các kênh trú ẩn an toàn, tránh xa các sản phẩm đầu cơ lướt sóng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. CTA STRATEGY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a1128] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center mix-blend-luminosity"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Bạn Cần Mô Hình Danh Mục?</h2>
          <p className="text-white/60 font-light mb-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Thay vì chiến đấu đơn độc giữa biển sóng thông tin nhiễu loạn, hãy để đội ngũ chuyên gia được đào tạo bài bản của Pham Land làm người hoa tiêu thiết kế danh mục 1:1 cho bạn.
          </p>
          <Link href="/lien-he" className="inline-flex items-center gap-3 bg-accent hover:bg-white text-primary px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)]">
            <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
            Đặt Lịch Hành Động
          </Link>
        </div>
      </section>
    </main>
  );
}
