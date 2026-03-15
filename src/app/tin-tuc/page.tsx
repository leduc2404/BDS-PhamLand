import Image from "next/image";
import Link from "next/link";
import { getFeaturedArticle, getOtherArticles, getAllNews } from "@/data/news";

export const metadata = {
  title: "Tin tức & Phân tích | Pham Land",
  description: "Góc nhìn chuyên sâu, phân tích thị trường và cẩm nang từ các chuyên gia bất động sản hàng đầu tại Pham Land.",
};

export default function NewsPage() {
  const featuredArticle = getFeaturedArticle();
  const otherArticles = getOtherArticles();

  return (
    <main className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION - Cinematic Editorial
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 md:pt-48 pb-[250px] md:pb-[400px] overflow-hidden bg-[#0a1128]">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuDrJd_oQk0V2eID_T48gWvL4S8Gry-OItDttd0E9xS_A5vjB-Hj0Z5fB_PoyGgZ2F6k6GjEDe2j_q8R_yqFmE05xN2bV9mJ70N0hP3L4iZ-O731-M2e0Lg9RkH2k1f4T4tI9Mv-2rJ-2pD3f1zD2eB_jZ-8uE7Dk-xV12-p_1F9sO6pI092N28eZ_N1_9-E65_nZ_mN6y"
            alt="Tin tức bất động sản hàng hiệu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-[#0a1128]/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 rounded-full mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              Góc Nhìn Chuyên Gia
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Thấu Hiểu Thị Trường <br />
            <span className="text-accent italic font-medium">Làm Chủ Lợi Nhuận</span>
          </h1>
          <p className="text-sm md:text-lg text-white/60 font-light max-w-2xl mx-auto mb-10">
            Cập nhật liên tục những biến động, chính sách và cẩm nang đầu tư giá trị nhất từ đội ngũ phân tích của Pham Land.
          </p>

          {/* Hero Search Bar */}
          <form action="/tin-tuc/tat-ca" className="w-full max-w-2xl md:max-w-3xl mx-auto relative group mt-8">
            <div className="absolute inset-y-0 left-6 md:left-8 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-white/50 group-focus-within:text-accent transition-colors md:text-[28px]">search</span>
            </div>
            <input
              type="text"
              name="q"
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-accent shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:bg-white focus:text-primary rounded-full py-4 md:py-5 pl-14 md:pl-20 pr-6 text-white outline-none transition-all duration-300 placeholder:text-white/60 focus:placeholder:text-slate-400 font-light text-sm md:text-base"
              placeholder="Nhập từ khóa tìm kiếm (VD: Luật đất đai...)"
            />
            <button type="submit" className="hidden"></button>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. FEATURED ARTICLE - Magazine Style
      ═══════════════════════════════════════════════════════════════ */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-6 -mt-24 md:-mt-32 relative z-20 pb-20">
          <Link href={`/tin-tuc/${featuredArticle.id}`} className="group block">
            <div className="bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
              
              {/* Image Half */}
              <div className="md:w-3/5 h-[300px] md:h-[500px] relative overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-lg z-10">
                  {featuredArticle.category}
                </div>
              </div>

              {/* Text Half */}
              <div className="md:w-2/5 p-8 md:p-14 flex flex-col justify-center bg-white relative">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                  <span className="text-accent">{featuredArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{featuredArticle.readTime} phút đọc</span>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-6 leading-snug group-hover:text-accent transition-colors">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-slate-500 font-light leading-relaxed mb-8 hidden md:block">
                  {featuredArticle.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-sm font-medium text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-accent">edit_square</span>
                    {featuredArticle.author}
                  </span>
                  <span className="text-accent flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Xem chi tiết <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          3. NEWS GRID - Premium Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
                Tin tức mới nhất
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Tiêu Điểm & Phân Tích</h2>
            </div>
            {/* Category Filter Pills - Static for UI mockup */}
            <div className="flex flex-wrap gap-2">
              {["Tất cả", "Thị trường", "Pháp lý", "Đầu tư"].map((cat, i) => (
                <button 
                  key={i} 
                  className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                    i === 0 ? "bg-primary text-white shadow-md cursor-default" : "bg-white text-slate-500 hover:text-primary hover:shadow-md border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <Link href={`/tin-tuc/${article.id}`} key={article.id} className="group flex flex-col bg-white rounded-sm overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-500">
                {/* Image */}
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm z-10">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{article.readTime} phút đọc</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-primary mb-4 leading-normal group-hover:text-accent transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
                    <span className="font-medium text-slate-600">{article.author}</span>
                    <span className="material-symbols-outlined text-accent group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Outline Button */}
          <div className="mt-16 text-center">
            <Link href="/tin-tuc/tat-ca" className="inline-flex items-center justify-center gap-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              Kho tàng tri thức bất động sản
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
