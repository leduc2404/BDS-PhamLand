import { getArticleById, newsData } from "@/data/news";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return newsData.map((article) => ({
    id: article.id,
  }));
}

export default async function NewsDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* ═══════════════════════════════════════════════════════════════
          1. PARALLAX ARTICLE HEADER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 overflow-hidden bg-[#0a1128]">
        <div className="absolute inset-0 z-0 opacity-50 mix-blend-luminosity">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
             <Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
             <Link href="/tin-tuc/tat-ca" className="hover:text-white transition-colors">{article.category}</Link>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 justify-between border-t border-white/20 pt-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                   <span className="material-symbols-outlined text-white/80">edit</span>
                </div>
                <div>
                   <p className="text-white font-medium text-sm">{article.author}</p>
                   <p className="text-slate-400 font-light text-[11px] uppercase tracking-wider">{article.date} • {article.readTime} phút đọc</p>
                </div>
             </div>
             {/* Social Share Icons */}
             <div className="hidden sm:flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors text-white">
                   <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. ARTICLE BODY - Editorial Design
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
         {/* Dropcap & Excerpt Lead-in */}
         <p className="text-xl md:text-2xl font-light text-primary leading-relaxed mb-12 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-accent first-letter:mr-3 first-letter:float-left drop-cap-fallback">
            {article.excerpt}
         </p>

         <div className="w-16 h-[1px] bg-slate-200 mb-12 mx-auto"></div>

         {/* Markdown/HTML injection simulation */}
         <article className="prose prose-lg prose-slate max-w-none font-light text-slate-600 leading-loose prose-headings:font-serif prose-headings:text-primary prose-headings:font-medium prose-a:text-accent hover:prose-a:text-primary">
            {/* 
               In a real app with backend data, this would be: 
               <div dangerouslySetInnerHTML={{ __html: article.content }} />
               Below we mock a luxurious article structure.
            */}
            <h2>Bức tranh toàn cảnh</h2>
            <p>Thị trường bất động sản đang chứng kiến những chuyển biến tích cực hiếm có sau chu kỳ điều chỉnh cơ cấu. Sự thanh lọc mạnh mẽ giúp những chủ đầu tư uy tín, có tiềm lực tài chính thực sự tỏa sáng, tạo lập tiêu chuẩn mặt bằng giá mới.</p>
            
            <blockquote className="border-l-4 border-accent pl-6 py-2 my-10 bg-slate-50 relative">
               <span className="material-symbols-outlined absolute top-4 right-4 text-4xl text-slate-200">format_quote</span>
               <p className="text-2xl font-serif italic text-primary m-0 relative z-10">Một chiến lược đầu tư bất động sản xuất sắc không nằm ở việc đuổi theo đám đông, mà ở khả năng nhìn thấy giá trị nội tại trước khi nó được phô bày.</p>
            </blockquote>

            <h3>Tác động định hình trong tương lai</h3>
            <p>Hệ thống cơ sở hạ tầng giao thông kết nối đồng bộ đang là "cú hích" cực mạnh trải thảm đỏ đón các nguồn vốn đầu tư khổng lồ từ nước ngoài. Song song đó, việc tối ưu hóa diện tích xanh và không gian mặt nước tiếp tục là chuẩn mực mới của các siêu dự án thương mại.</p>
            <ul>
               <li>Dòng vốn hướng tới các giá trị thật và pháp lý rõ ràng.</li>
               <li>Sự khan hiếm quỹ đất trung tâm đẩy mạnh nhu cầu bất động sản sinh thái vùng ven.</li>
               <li>Xu hướng cá nhân hóa không gian sống chuẩn V.I.P hoàng gia.</li>
            </ul>
         </article>

         {/* Tags & Actions */}
         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-2">
               <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-xs hover:bg-slate-100 cursor-pointer transition-colors">#BấtĐộngSản</span>
               <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-xs hover:bg-slate-100 cursor-pointer transition-colors">#ĐầuTư</span>
            </div>
            <Link href="/tin-tuc/tat-ca" className="text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-2">
               <span className="material-symbols-outlined text-[18px]">arrow_back</span>
               Trở về kho tri thức
            </Link>
         </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary pt-16 pb-20 relative overflow-hidden mt-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Bạn cần nhận định chuyên sâu riêng biệt?</h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto text-base">
            Hãy kết nối với chuyên viên tư vấn cao cấp của chúng tôi để cập nhật bộ tài liệu phân tích độc quyền tháng này.
          </p>
          <div className="flex justify-center">
             <Link
               href="/lien-he"
               className="inline-flex items-center gap-3 border border-accent/50 text-accent hover:bg-accent hover:text-primary px-10 py-4 rounded-sm text-[13px] font-bold uppercase tracking-widest transition-all duration-300"
             >
               Yêu cầu tư vấn 1-1
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
