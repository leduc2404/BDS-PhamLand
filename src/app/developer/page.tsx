import Link from "next/link";

export const metadata = {
  title: "Kiến Trúc Sư Kỹ Thuật Số | Pham Land",
  description: "Trang web được thiết kế và phát triển bởi Lê Đức — Full-stack Developer chuyên xây dựng hệ thống số trọn gói cho doanh nghiệp bất động sản.",
};

export default function DeveloperPage() {
  const services = [
    {
      icon: "code",
      title: "Frontend Engineering",
      desc: "Next.js · React · TypeScript · Tailwind CSS — Giao diện pixel-perfect, hiệu năng tối ưu, SEO chuẩn Core Web Vitals.",
    },
    {
      icon: "dns",
      title: "Backend Architecture",
      desc: "Node.js · PostgreSQL · REST/GraphQL API — Kiến trúc microservice, bảo mật enterprise-grade, auto-scaling.",
    },
    {
      icon: "palette",
      title: "UI/UX Design System",
      desc: "Figma · Design Tokens · Motion Design — Hệ thống thiết kế nhất quán, premium và tối ưu trải nghiệm người dùng.",
    },
    {
      icon: "cloud_sync",
      title: "DevOps & Deployment",
      desc: "Docker · CI/CD · Vercel · AWS — Triển khai tự động, monitoring 24/7, uptime 99.9%.",
    },
    {
      icon: "speed",
      title: "Performance Optimization",
      desc: "Lighthouse 95+ · Image CDN · Edge Caching — Tốc độ tải trang dưới 1.5 giây trên mọi thiết bị.",
    },
    {
      icon: "support_agent",
      title: "Bảo Trì & Hỗ Trợ",
      desc: "Bảo trì định kỳ · Cập nhật tính năng · Hỗ trợ kỹ thuật nhanh chóng — Đồng hành lâu dài.",
    },
  ];

  const techStack = [
    "Next.js 15", "React 19", "TypeScript", "Tailwind CSS",
    "Node.js", "PostgreSQL", "Prisma", "Docker",
    "Vercel", "Figma", "Git", "REST API",
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-accent/30 overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          1. IMMERSIVE HERO — Code Meets Luxury
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "2s" }}></div>
        
        {/* Vertical Lines Decoration */}
        <div className="absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          {/* Terminal-like badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-accent/30 bg-accent/5 backdrop-blur-md rounded-full mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-accent">
              &gt;_ Crafted by Developer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-serif font-bold leading-[1.05] mb-8 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">Lê Đức</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            Full-Stack Developer & Digital Architect
          </p>
          <p className="text-sm md:text-base text-white/30 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Chịu trách nhiệm Thiết kế · Phát triển · Vận hành toàn bộ hệ thống kỹ thuật số cho <span className="text-accent font-medium">Pham Land</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://lduc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent hover:bg-white text-primary px-8 py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] group"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Portfolio — lduc.dev
            </a>
            <a
              href="mailto:leduc.isme@gmail.com"
              className="inline-flex items-center gap-3 border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-all duration-500"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Liên hệ hợp tác
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. RESPONSIBILITY — What I Built
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Title */}
            <div className="lg:w-5/12 lg:sticky lg:top-32 lg:self-start">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
                Trách nhiệm kỹ thuật
              </h3>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
                Kiến Trúc Sư<br/>
                <span className="italic font-light text-white/80">Kỹ Thuật Số</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-base mb-8">
                Toàn bộ website <strong className="text-white font-medium">Pham Land</strong> — từ pixel đầu tiên trên giao diện đến dòng code cuối cùng chạy trong hệ thống — đều được thiết kế, lập trình và tối ưu hóa bởi một người duy nhất.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                  <span className="text-slate-300 font-light">Frontend + Backend + DevOps</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                  <span className="text-slate-300 font-light">UI/UX Design + Branding</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
                  <span className="text-slate-300 font-light">SEO + Performance Optimization</span>
                </div>
              </div>
            </div>

            {/* Right: Stats & Info Card */}
            <div className="lg:w-7/12 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "15+", label: "Trang được thiết kế", icon: "web" },
                  { num: "95+", label: "Lighthouse Score", icon: "speed" },
                  { num: "100%", label: "Responsive Design", icon: "devices" },
                  { num: "<1.5s", label: "Thời gian tải trang", icon: "bolt" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-6 hover:border-accent/30 hover:bg-accent/[0.02] transition-all duration-700 group">
                    <span className="material-symbols-outlined text-accent/50 text-2xl mb-4 block group-hover:text-accent transition-colors duration-500">{stat.icon}</span>
                    <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">{stat.num}</div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Personal Info Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[60px] rounded-full pointer-events-none"></div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent mb-6">Thông tin liên hệ</h4>
                <div className="space-y-5 relative z-10">
                  <a href="https://lduc.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                      <span className="material-symbols-outlined text-lg text-accent">language</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Portfolio</p>
                      <p className="text-white font-light group-hover:text-accent transition-colors">lduc.dev</p>
                    </div>
                  </a>
                  <a href="mailto:leduc.isme@gmail.com" className="flex items-center gap-4 group hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                      <span className="material-symbols-outlined text-lg text-accent">mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
                      <p className="text-white font-light group-hover:text-accent transition-colors">leduc.isme@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:0705942498" className="flex items-center gap-4 group hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                      <span className="material-symbols-outlined text-lg text-accent">call</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Điện thoại</p>
                      <p className="text-white font-light group-hover:text-accent transition-colors">070.594.2498</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. TECH STACK — Animated Tag Cloud
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent mb-10 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
            Technology Stack
            <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2.5 border border-white/10 rounded-full text-[12px] font-mono font-medium text-slate-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-500 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. SERVICES — Full-Stack Package
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
              Dịch vụ trọn gói
              <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
            </h3>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              End-to-End <span className="italic font-light text-white/80">Digital Solutions</span>
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Từ ý tưởng đến sản phẩm hoàn chỉnh — Tôi đảm nhận toàn bộ quy trình phát triển phần mềm, không cần thuê nhiều team riêng biệt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-sm p-8 hover:border-accent/30 hover:bg-accent/[0.02] transition-all duration-700 relative overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute -bottom-2 right-2 font-mono text-7xl font-bold text-white/[0.03] group-hover:text-accent/[0.06] transition-colors duration-700 pointer-events-none">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-500">
                    <span className="material-symbols-outlined text-accent text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-mono font-bold text-white text-base mb-3 group-hover:text-accent transition-colors duration-500">{service.title}</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. CTA — Hire Me / Collaborate
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-full mb-8 backdrop-blur-md bg-emerald-500/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">Đang nhận dự án mới</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Bạn cần một website<br/>
            <span className="italic font-light text-white/80">đẳng cấp như thế này?</span>
          </h2>
          <p className="text-slate-400 font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Tôi sẵn sàng biến ý tưởng kinh doanh của bạn thành một hệ thống kỹ thuật số hoàn chỉnh, từ thiết kế đến vận hành.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0705942498"
              className="inline-flex items-center gap-3 bg-accent hover:bg-white text-primary px-8 py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)] group"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Gọi ngay: 070.594.2498
            </a>
            <a
              href="https://lduc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-all duration-500"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Xem thêm dự án
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-12 text-xs text-slate-600 font-mono flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-accent/50">verified</span>
            &copy; {new Date().getFullYear()} Lê Đức — Thiết kế & Phát triển bởi lduc.dev
          </p>
        </div>
      </section>
      
      {/* Back to main site */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="text-[11px] font-mono uppercase tracking-widest">Quay lại Pham Land</span>
          </Link>
          <a href="https://lduc.dev" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase tracking-widest text-accent/60 hover:text-accent transition-colors">
            lduc.dev
          </a>
        </div>
      </div>

    </main>
  );
}
