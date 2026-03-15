"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/data/news";
import { useSearchParams } from "next/navigation";

function AllNewsContent() {
  const searchParams = useSearchParams();
  const initQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initQuery);
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  useEffect(() => {
    if (initQuery) {
      setSearchQuery(initQuery);
    }
  }, [initQuery]);

  // Get unique categories dynamically
  const categories = ["Tất cả", ...Array.from(new Set(newsData.map(item => item.category)))];

  // Filter logic
  const filteredNews = newsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tất cả" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header & Search */}
      <div className="text-center mb-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
          Kho tri thức
          <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10">
          Tất Cả Bài Viết
        </h1>

        {/* Search Bar - Command Palette Style */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-accent transition-colors">search</span>
          </div>
          <input
            type="text"
            className="w-full bg-white border border-slate-200 focus:border-accent shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:shadow-[0_10px_40px_rgba(212,175,55,0.1)] rounded-full py-5 pl-14 pr-6 text-primary outline-none transition-all duration-300 placeholder:text-slate-400"
            placeholder="Tìm kiếm bài phân tích, cẩm nang đầu tư..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-primary text-white shadow-md scale-105" 
                : "bg-white text-slate-500 hover:text-primary hover:border-slate-300 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
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
      ) : (
        <div className="text-center py-24 bg-white rounded-sm border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
          <h3 className="text-xl font-serif text-primary mb-2">Không tìm thấy bài viết nào</h3>
          <p className="text-slate-500 font-light">Vui lòng thử lại với từ khóa khác hoặc dọn dẹp bộ lọc.</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("Tất cả");
            }}
            className="mt-6 text-accent font-bold uppercase tracking-widest text-[12px] hover:underline underline-offset-4"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

export default function AllNewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-10 h-10 border-2 border-accent border-r-transparent rounded-full animate-spin"></div></div>}>
        <AllNewsContent />
      </Suspense>
    </main>
  );
}
