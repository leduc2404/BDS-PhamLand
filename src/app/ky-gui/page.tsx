import Image from "next/image";
import Link from "next/link";
import CustomSelect from "@/components/CustomSelect";

export const metadata = {
  title: "Ký gửi Bất Động Sản | Pham Land",
  description: "Dịch vụ ký gửi nhà đất chuyên nghiệp, định giá chính xác, hỗ trợ pháp lý và bán nhanh với nguồn khách hàng lớn tại Pham Land.",
};

export default function ConsignmentPage() {
  const propertyOptions = [
    { value: "nha-pho", label: "Nhà phố / Shophouse" },
    { value: "can-ho", label: "Căn hộ hạng sang" },
    { value: "dat-nen", label: "Đất nền / Đất dự án" },
    { value: "biet-thu", label: "Biệt thự / Villa nghỉ dưỡng" },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-accent/30">

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION - High Contrast Cinematic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80/AB6AXuCQ_jDH4IJ2nfsCqr_kIaPODF3tcArPT8wJpmje3I_KbaUZEiaqdzKWAkz8O56pxZI0gzNN77PpV8tFQBlpWB5yFm2F3KviEKvYkw7l3brUEd1FCKLQ1Bo9nbQvZ4W4TTl6u5x0eSRprtkn8P2lqmBvEaR8EpzS-AVQHGp6wivojvsxrJf6GqPE2sfPJH70yC-vkE5b_1zBP1OaNXjrv7s9m0PSmos40K1u62zyfyvS0b5yIuFn5Ck986s55Qa7sKsgFUafBSSRIsfp"
            alt="Định giá và ký gửi bất động sản cao cấp"
            fill
            className="object-cover scale-105"
            priority
          />
          {/* Deep dark gradient for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/95 via-[#0a1128]/80 to-[#0a1128]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-accent/40 bg-accent/10 backdrop-blur-md rounded-full mb-10 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
            <span className="text-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              Dịch vụ Ký Gửi Độc Quyền
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-8 text-white tracking-tight">
            Thanh Khoản Nhanh Chóng <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#f9e596] to-accent italic font-medium">Bảo Mật Tuyệt Đối</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Hệ thống tệp khách hàng V.I.P sẵn sàng giao dịch. Chúng tôi cam kết định giá chính xác, tư vấn pháp lý trọn gói và bảo vệ thông tin khách hàng ở mức độ cao nhất.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#ky-gui-form"
              className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-white text-primary px-8 py-4 sm:py-5 rounded-sm text-[12px] sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] group"
            >
              Ký gửi tài sản
              <span className="material-symbols-outlined text-[18px] group-hover:translate-y-1 transition-transform">south</span>
            </a>
          </div>
          
          {/* Trust Indicators inside Hero */}
          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-4xl mx-auto">
            {[
              { num: "48h", text: "Khớp lệnh giao dịch" },
              { num: "50k+", text: "Nhà đầu tư sẵn sàng" },
              { num: "100%", text: "Bảo mật thông tin" },
              { num: "0đ", text: "Phí tư vấn ban đầu" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">{stat.num}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-medium">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CONSIGNMENT FORM - Luxury Dark Theme
      ═══════════════════════════════════════════════════════════════ */}
      <section id="ky-gui-form" className="relative z-20 py-24 bg-[#0a1128]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="w-full sm:max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-sm p-5 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            {/* Form Header */}
            <div className="text-center mb-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4">Mẫu Yêu Cầu Ký Gửi</h2>
              <p className="text-slate-400 font-light text-sm sm:text-base">Vui lòng cung cấp thông tin chính xác để chuyên viên hỗ trợ thẩm định nhanh nhất.</p>
            </div>

            <form className="space-y-12 relative z-10">
              {/* Box 1: Contact Info (Now on top for trust) */}
              <div className="p-5 sm:p-8 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
                  Thông tin cá nhân
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                      id="name"
                      placeholder="Họ và tên"
                      required
                    />
                    <label htmlFor="name" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                      Họ và tên chủ sở hữu *
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="tel"
                      className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                      id="phone"
                      placeholder="Số điện thoại"
                      required
                    />
                    <label htmlFor="phone" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                      Số điện thoại liên hệ *
                    </label>
                  </div>
                </div>
              </div>

              {/* Box 2: Property Info */}
              <div className="p-5 sm:p-8 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
                  Thông tin bất động sản
                </p>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CustomSelect 
                      options={propertyOptions}
                      placeholder="Chọn loại hình tài sản *"
                    />

                    <div className="relative group">
                      <input
                        type="text"
                        className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                        id="price"
                        placeholder="Giá bán"
                        required
                      />
                      <label htmlFor="price" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                        Mức giá mong muốn (VNĐ) *
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                      id="address"
                      placeholder="Địa chỉ"
                      required
                    />
                    <label htmlFor="address" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                      Địa chỉ chi tiết bất động sản *
                    </label>
                  </div>

                  {/* Upload box */}
                  <label className="flex flex-col items-center justify-center px-6 py-12 border border-dashed border-white/20 rounded-sm bg-white/5 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 cursor-pointer group mt-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-accent/20">
                      <span className="material-symbols-outlined text-3xl text-accent">add_photo_alternate</span>
                    </div>
                    <p className="text-base text-white font-medium mb-2">
                      Tải lên hình ảnh thực tế / Sổ đỏ
                    </p>
                    <p className="text-xs text-slate-400 font-light">Kéo thả file vào đây hoặc click để chọn (PNG, JPG — max 10MB)</p>
                    <input type="file" className="sr-only" multiple accept="image/*" />
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-white text-primary font-bold uppercase tracking-widest text-[13px] py-5 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_5px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_5px_20px_rgba(255,255,255,0.4)]"
                >
                  Gửi thông tin định giá
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <p className="mt-6 text-center text-xs text-slate-400 font-light flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-accent">gpp_good</span>
                  Giao dịch an toàn - Thông tin mã hóa chuẩn quân đội
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. WHY CHOOSE US - Refined Commercial Look
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-slate-300 inline-block"></span>
              Đặc quyền đối tác
              <span className="w-8 h-[1px] bg-slate-300 inline-block"></span>
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">Tại sao uỷ thác cho Pham Land?</h2>
            <p className="text-slate-500 font-light max-w-2xl mx-auto text-lg/relaxed">Thay vì mệt mỏi tự tìm kiếm người mua, hãy để chúng tôi thiết lập kỷ lục bán hàng mới cho bất động sản của bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                icon: "diversity_3",
                title: "Mạng Lưới V.I.P",
                desc: "Tiếp cận trực tiếp hơn 50.000 hồ sơ khách hàng định danh, siêu giàu và các nhà đầu tư tổ chức đang săn tìm dự án tốt.",
              },
              {
                icon: "camera_outdoor",
                title: "Thương Hiệu Hóa Tài Sản",
                desc: "Đội ngũ Media in-house quay chụp Flycam 4K, Virtual Tour 360, và thiết kế brochure định vị tầm vóc cho tài sản của bạn.",
              },
              {
                icon: "gavel",
                title: "Pháp Lý Trọn Gói",
                desc: "Đội ngũ luật sư nội bộ trực tiếp rà soát, tư vấn thuế và hỗ trợ 100% thủ tục công chứng sang tên chỉ trong vòng 24 giờ.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white border border-slate-100 p-8 lg:p-10 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-accent/40 hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] transition-all duration-500 overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute -bottom-4 right-0 text-slate-100 font-serif text-9xl font-bold opacity-[0.4] z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:text-slate-200">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-sm flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                    <span className="material-symbols-outlined text-3xl text-primary group-hover:text-accent transition-colors duration-500">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. CTA BANNER - Luxurious Touch
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary pt-20 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="material-symbols-outlined text-accent text-5xl mb-6 font-light">real_estate_agent</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Trò Chuyện Cùng Chuyên Gia Giá Trị Cao</h2>
          <p className="text-white/60 font-light mb-10 max-w-lg mx-auto text-lg/relaxed">
            Nhận báo cáo định giá thị trường khu vực của bạn hoàn toàn miễn phí trong vòng 5 phút làm việc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="tel:0905000000"
              className="inline-flex items-center gap-3 bg-accent hover:bg-white text-primary px-10 py-5 rounded-sm text-[13px] font-bold uppercase tracking-widest transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              Goị điện ngay
            </Link>
            <a
              href="#ky-gui-form"
              className="inline-flex items-center gap-3 border border-white/30 text-white hover:bg-white/10 px-10 py-5 rounded-sm text-[13px] font-bold uppercase tracking-widest transition-all duration-300"
            >
              Để lại thông tin
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
