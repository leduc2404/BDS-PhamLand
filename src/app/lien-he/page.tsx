import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Đặc quyền liên hệ | Pham Land",
  description: "Trải nghiệm dịch vụ Private Concierge từ Pham Land. Kết nối trực tiếp cùng Chuyên gia quản trị danh mục đầu tư bất động sản hạng sang.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ═══════════════════════════════════════════════════════════════
          1. CINEMATIC HEADQUARTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#050a15]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Trụ sở Pham Land"
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          {/* Advanced Gradient Masking */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/90 via-[#050a15]/60 to-[#050a15]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center mt-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-accent/30 rounded-full mb-8 backdrop-blur-md bg-white/5">
     <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Private Concierge
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Tâm Điểm <br />
            <span className="font-light italic text-white/90">Kết Nối Đặc Quyền</span>
          </h1>
          <p className="text-sm md:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            Hệ thống chuyên gia cấp cao của Pham Land luôn ở trạng thái sẵn sàng để phác thảo chiến lược danh mục tài sản 1:1 dành riêng cho quý khách.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THE ASYMMETRIC FLOATING CONTACT CARDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-32 max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row items-stretch gap-6 h-auto md:h-[320px]">
          
          {/* Card 1: Address (Dark Glossy) */}
          <div className="flex-1 bg-gradient-to-br from-[#0f172a] to-[#020617] p-8 md:p-10 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col justify-between group relative overflow-hidden transform md:translate-y-8 hover:-translate-y-1 transition-transform duration-1000 ease-out">
            {/* Ambient Accent Light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-100"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Trụ Sở Điều Hành</h3>
              <span className="material-symbols-outlined text-white/20 group-hover:text-accent transition-colors duration-500 text-3xl">domain</span>
            </div>
            
            <div className="relative z-10">
              <p className="text-white font-serif font-bold text-2xl md:text-3xl mb-4 group-hover:text-accent transition-colors duration-700">Trụ sở chính</p>
              <a href="https://maps.app.goo.gl/BRSHTiaSP3Y5q8j28" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-slate-400 font-light text-sm leading-relaxed group/link hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5 text-accent group-hover/link:animate-bounce">pin_drop</span>
                <p>09 Nhơn Hoà 16,<br/>An Khê, Đà Nẵng</p>
              </a>
            </div>
          </div>

          {/* Card 2: Hotline (Gold Core) */}
          <div className="flex-1 bg-gradient-to-br from-[#d4af37] to-[#aa8920] p-8 md:p-10 rounded-sm shadow-[0_20px_40px_rgba(212,175,55,0.2)] border border-yellow-200/20 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-1000 ease-out z-10 scale-105">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">Đường Dây Nóng VIP</h3>
              <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors duration-500 text-3xl">support_agent</span>
            </div>
            
            <div>
              <p className="text-primary/70 font-light text-sm mb-4">Kết nối trực tiếp giám đốc hệ thống</p>
              <div className="space-y-1">
                <a href="tel:0905098018" className="flex items-center gap-3 text-primary font-serif font-bold text-3xl md:text-4xl group-hover:drop-shadow-md transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px] shrink-0">call</span>
                  0905.098.018
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Email (Clean Glass) */}
          <div className="flex-1 bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between group transform md:translate-y-8 hover:-translate-y-1 transition-transform duration-1000 ease-out relative overflow-hidden">
             {/* Subtle corner line */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-slate-100 rounded-full scale-150 transition-transform duration-1000 ease-out group-hover:scale-100 opacity-50"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Thư Điện Tử</h3>
              <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors duration-500 text-3xl">mail</span>
            </div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Khách hàng V.I.P</p>
                <a href="mailto:vip@phamland.vn" className="flex items-center gap-2 text-primary overflow-hidden font-serif text-xl font-bold group-hover:text-accent transition-colors duration-300">
                  <span className="material-symbols-outlined text-[16px] text-accent">star</span>
                  vip@phamland.vn
                </a>
              </div>
              <div className="pt-4 border-t border-slate-100">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Hỗ trợ chung</p>
                 <a href="mailto:contact@phamland.vn" className="text-slate-500 font-light text-sm group-hover:text-primary transition-colors duration-300">contact@phamland.vn</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. DEEP DARK VIP CONSULTATION FORM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary border-y border-slate-800 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0a1128] skew-x-12 origin-top transform translate-x-32 shadow-[0_0_100px_rgba(0,0,0,0.5)]"></div>

        <div className="max-w-7xl mx-auto px-6 py-0 flex flex-col lg:flex-row">
          
          {/* Left: Manifesto & Trust */}
          <div className="lg:w-5/12 py-24 lg:py-32 lg:pr-16 relative z-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
              Gửi Tín Hiệu
            </h3>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-none drop-shadow-md">
              Khởi Tạo<br/>
              <span className="italic font-light text-white/90">Chiến Lược</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed mb-12 text-base md:text-lg">
              Chúng tôi không bán đơn thuần một khu đất hay một căn nhà. Chúng tôi phân tích <strong className="text-white font-medium">cấu trúc tài chính</strong>, tư vấn <strong className="text-white font-medium">hàm lượng rủi ro</strong> và xác lập <strong className="text-white font-medium">lộ trình lợi nhuận</strong> rõ ràng cho bạn.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-accent text-xl">verified_user</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-lg mb-1">Mã hóa thông tin 100%</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">Mọi tín hiệu rủi ro danh mục đều được đưa vào luồng khóa bảo mật nội bộ và không bao giờ rò rỉ.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-accent text-xl">hourglass_top</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-lg mb-1">Thiết lập kết nối siêu tốc</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">Giám đốc Khối đầu tư thay vì nhân viên tư vấn sẽ hồi đáp trực tiếp trong vòng 30 phút làm việc.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Deep Form */}
          <div className="lg:w-7/12 py-16 lg:py-24 lg:pl-16 relative z-10">
            <div className="bg-transparent rounded-sm relative overflow-hidden">
               {/* Ambient Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent blur-[100px] opacity-10 rounded-full pointer-events-none"></div>

               <ContactForm />
            </div>
          </div>
          
        </div>
      </section>

    </main>
  );
}
