export default function WhyChooseUs() {
  const features = [
    {
      icon: "insights",
      title: "Am Hiểu Biến Động",
      description:
        "Với hơn 10 năm kinh nghiệm thực địa, chúng tôi nắm vững từng biến động của các quy hoạch vĩ mô tại miền Trung.",
    },
    {
      icon: "gavel",
      title: "Pháp Lý Vững Chắc",
      description:
        "Cam kết 100% rổ hàng là sản phẩm minh bạch, sổ đỏ trao tay, loại bỏ mọi rủi ro về mặt quy hoạch và tranh chấp pháp lý.",
    },
    {
      icon: "handshake",
      title: "Quản Trị Đầu Tư",
      description:
        "Không chỉ bán hàng, chúng tôi đồng hành cùng khách hàng trong cả chu kỳ đầu tư, từ tái định cư đến thanh khoản dòng tiền.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden" aria-labelledby="why-choose-us-title">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header — stacks vertically on mobile */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row gap-6 md:gap-8 md:items-end justify-between border-b border-white/10 pb-8">
          <div className="max-w-xl">
            <h2 id="why-choose-us-title" className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3">
              Tại Sao Chọn <br/><span className="text-accent italic">Pham Land?</span>
            </h2>
            <p className="text-slate-300 font-light text-base md:text-lg">
              Đối tác chiến lược định hướng dòng vốn vào bất động sản ven biển miền Trung.
            </p>
          </div>
          {/* Stats — grid 2 cols, consistent on all sizes */}
          <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-sm overflow-hidden">
            <div className="text-center px-5 py-4 border-r border-white/10">
              <span className="block text-2xl md:text-3xl font-serif text-accent font-bold">10+</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1 block">Năm Kinh Nghiệm</span>
            </div>
            <div className="text-center px-5 py-4">
              <span className="block text-2xl md:text-3xl font-serif text-accent font-bold">100%</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mt-1 block">Sổ Đỏ Minh Bạch</span>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <article key={feature.title} className="group relative pt-4 md:pt-6">
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 md:mb-6 inline-flex w-12 h-12 md:w-16 md:h-16 items-center justify-center border border-accent/30 rounded-full bg-accent/5 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
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
                
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 mt-auto flex">
                  <span className="w-12 h-[1px] bg-accent/50 group-hover:w-full transition-all duration-700 ease-in-out"></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
