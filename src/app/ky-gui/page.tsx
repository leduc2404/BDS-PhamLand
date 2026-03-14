import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Ký gửi Bất Động Sản | Pham Land",
  description: "Dịch vụ ký gửi nhà đất chuyên nghiệp, định giá chính xác, hỗ trợ pháp lý và bán nhanh với nguồn khách hàng lớn tại Pham Land.",
};

export default function ConsignmentPage() {
  return (
    <main className="min-h-screen bg-background-light">

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ_jDH4IJ2nfsCqr_kIaPODF3tcArPT8wJpmje3I_KbaUZEiaqdzKWAkz8O56pxZI0gzNN77PpV8tFQBlpWB5yFm2F3KviEKvYkw7l3brUEd1FCKLQ1Bo9nbQvZ4W4TTl6u5x0eSRprtkn8P2lqmBvEaR8EpzS-AVQHGp6wivojvsxrJf6GqPE2sfPJH70yC-vkE5b_1zBP1OaNXjrv7s9m0PSmos40K1u62zyfyvS0b5yIuFn5Ck986s55Qa7sKsgFUafBSSRIsfp"
            alt="Modern luxury real estate office building"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.2em]">
              Dịch vụ Ký Gửi
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 text-white">
            Ký Gửi Bất Động Sản
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Bán nhanh — Giá tốt — Pháp lý minh bạch.
            <br className="hidden sm:block" />
            Kết nối trực tiếp với hàng ngàn nhà đầu tư tiềm năng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#ky-gui-form"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-white text-white hover:text-primary px-8 py-4 rounded-sm text-[13px] font-semibold uppercase tracking-widest transition-all duration-300"
            >
              Ký gửi ngay
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </a>
            <a
              href="#quy-trinh"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/90 hover:bg-white/10 px-8 py-4 rounded-sm text-[13px] font-semibold uppercase tracking-widest transition-all duration-300"
            >
              Quy trình
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CONSIGNMENT FORM
      ═══════════════════════════════════════════════════════════════ */}
      <section id="ky-gui-form" className="relative z-20 -mt-16 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-sm p-8 sm:p-12 shadow-lux border border-slate-100">
            {/* Form Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif font-medium text-primary mb-3">Thông Tin Ký Gửi</h2>
              <div className="w-10 h-[2px] bg-accent mx-auto"></div>
            </div>

            <form className="space-y-10">
              {/* Section: Property Info */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">home_work</span>
                  Thông tin bất động sản
                </p>

                <div className="space-y-6">
                  <div className="relative">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Loại bất động sản</label>
                    <select className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light appearance-none cursor-pointer outline-none">
                      <option value="">Chọn loại nhà đất</option>
                      <option value="nha-pho">Nhà phố / Shophouse</option>
                      <option value="can-ho">Căn hộ / Chung cư</option>
                      <option value="dat-nen">Đất nền / Đất dự án</option>
                      <option value="biet-thu">Biệt thự / Villa</option>
                      <option value="mat-bang">Mặt bằng kinh doanh</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Địa chỉ</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light placeholder:text-slate-300 outline-none"
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Diện tích</label>
                      <input
                        type="number"
                        className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light placeholder:text-slate-300 outline-none"
                        placeholder="m²"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Giá kỳ vọng</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light placeholder:text-slate-300 outline-none"
                        placeholder="VNĐ"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Legal Documents */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Pháp lý & Giấy tờ
                </p>
                <label className="flex flex-col items-center justify-center px-6 py-10 border border-dashed border-slate-200 rounded-sm bg-slate-50/50 hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-105 transition-transform border border-slate-100">
                    <span className="material-symbols-outlined text-2xl text-accent">cloud_upload</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Tải lên Sổ đỏ / Sổ hồng
                  </p>
                  <p className="text-xs text-slate-400 font-light">PNG, JPG, PDF — tối đa 10MB</p>
                  <input type="file" className="sr-only" multiple accept="image/*,.pdf" />
                </label>
              </div>

              {/* Section: Contact */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Thông tin liên hệ
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Họ và tên</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light placeholder:text-slate-300 outline-none"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Số điện thoại</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-0 border-b border-slate-200 focus:border-accent focus:ring-0 py-3 text-primary font-light placeholder:text-slate-300 outline-none"
                      placeholder="090xxxxxxx"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent text-white font-semibold uppercase tracking-widest text-[12px] py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Gửi yêu cầu ký gửi
                </button>
                <p className="mt-4 text-center text-[11px] text-slate-400 font-light flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-500">lock</span>
                  Thông tin được bảo mật tuyệt đối
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════ */}
      <section id="quy-trinh" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Đặc quyền</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary mb-4">Tại Sao Chọn Pham Land?</h2>
            <div className="w-10 h-[1px] bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "diversity_3",
                title: "Mạng Lưới Rộng Khắp",
                desc: "Kết nối hơn 50.000 khách hàng V.I.P và hệ thống đối tác liên kết trên toàn quốc.",
              },
              {
                icon: "camera_outdoor",
                title: "Marketing Chuyên Nghiệp",
                desc: "Quay phim Flycam, chụp ảnh chuyên nghiệp, chiến dịch truyền thông đa kênh.",
              },
              {
                icon: "gavel",
                title: "Pháp Lý Trọn Gói",
                desc: "Tư vấn và thực hiện mọi thủ tục sang tên, định giá tài sản minh bạch.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-sm border border-slate-100 hover:border-accent/20 bg-background-light hover:bg-white hover:shadow-lux transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:border-accent/30 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-accent transition-colors">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-medium text-primary mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Hỗ trợ trực tiếp</p>
          <h2 className="text-3xl font-serif font-medium text-white mb-4">Cần Tư Vấn Ngay?</h2>
          <p className="text-white/50 font-light mb-8 max-w-md mx-auto">
            Chuyên viên cấp cao sẽ liên hệ tư vấn lộ trình thanh khoản tối ưu nhất trong vòng 5 phút.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="tel:0905000000"
              className="inline-flex items-center gap-2 bg-accent hover:bg-white text-white hover:text-primary px-8 py-4 rounded-sm text-[13px] font-semibold uppercase tracking-widest transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              0905.XXX.XXX
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
