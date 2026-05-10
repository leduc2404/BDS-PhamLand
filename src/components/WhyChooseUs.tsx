"use client";

import { useState, useEffect } from "react";

const features = [
  {
    icon: "insights",
    title: "Am Hiểu Biến Động",
    description:
      "Với hơn 10 năm kinh nghiệm thực địa, chúng tôi nắm vững từng biến động của các quy hoạch vĩ mô tại miền Trung.",
    highlight: "10+ năm",
  },
  {
    icon: "gavel",
    title: "Pháp Lý Vững Chắc",
    description:
      "Cam kết 100% rổ hàng là sản phẩm minh bạch, sổ đỏ trao tay, loại bỏ mọi rủi ro về mặt quy hoạch và tranh chấp pháp lý.",
    highlight: "100%",
  },
  {
    icon: "handshake",
    title: "Quản Trị Đầu Tư",
    description:
      "Không chỉ bán hàng, chúng tôi đồng hành cùng khách hàng trong cả chu kỳ đầu tư, từ tái định cư đến thanh khoản dòng tiền.",
    highlight: "Toàn diện",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("why-choose-us-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us-section"
      className="py-16 md:py-28 bg-primary text-white relative overflow-hidden"
      aria-labelledby="why-choose-us-title"
    >
      {/* Decorative background layers */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23c5a059' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`mb-14 md:mb-20 flex flex-col md:flex-row gap-6 md:gap-8 md:items-end justify-between border-b border-white/10 pb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-4 block">
              <span className="w-8 h-[1px] bg-accent/50 inline-block" />
              Cam Kết Giá Trị
            </span>
            <h2 id="why-choose-us-title" className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3">
              Tại Sao Chọn <br/><span className="text-accent italic">Pham Land?</span>
            </h2>
            <p className="text-slate-300 font-light text-base md:text-lg">
              Đối tác chiến lược định hướng dòng vốn vào bất động sản ven biển miền Trung.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-sm overflow-hidden">
            <div className="text-center px-5 py-4 border-r border-white/10 group hover:bg-accent/10 transition-colors">
              <span className="block text-2xl md:text-3xl font-serif text-accent font-bold group-hover:scale-110 transition-transform inline-block">10+</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1 block">Năm Kinh Nghiệm</span>
            </div>
            <div className="text-center px-5 py-4 group hover:bg-accent/10 transition-colors">
              <span className="block text-2xl md:text-3xl font-serif text-accent font-bold group-hover:scale-110 transition-transform inline-block">100%</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1 block">Sổ Đỏ Minh Bạch</span>
            </div>
          </div>
        </div>

        {/* Feature cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <article
              key={feature.title}
              className={`group relative bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 md:p-8 hover:bg-white/[0.08] hover:border-accent/20 transition-all duration-500 cursor-default ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${300 + idx * 150}ms`,
                transitionDuration: "800ms",
              }}
            >
              {/* Highlight number */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-accent/10 text-4xl md:text-5xl font-serif font-bold group-hover:text-accent/20 transition-colors">
                {feature.highlight}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5 md:mb-6 inline-flex w-14 h-14 md:w-16 md:h-16 items-center justify-center border border-accent/30 rounded-full bg-accent/5 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                  <span className="material-symbols-outlined text-2xl md:text-3xl font-light" aria-hidden="true">
                    {feature.icon}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-medium mb-3 text-white group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 w-0 h-[1px] bg-accent/50 group-hover:w-full transition-all duration-700" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
