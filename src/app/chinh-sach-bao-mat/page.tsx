"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("muc-dich");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("div[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 md:pt-48 pb-24">
      {/* ═══════════════════════════════════════════════════════════════
          HERO TITLE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-accent/50 inline-block"></span>
          Cập nhật: Tháng 03/2026
        </p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
          Chính Sách <br className="hidden md:block"/>Bảo Mật
        </h1>
        <p className="text-slate-500 font-light text-sm md:text-lg max-w-2xl leading-relaxed">
          Sự minh bạch và bảo vệ tối thượng dữ liệu người dùng là nền tảng cốt lõi trong mọi giao dịch tại Pham Land.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT LAYOUT (Sidebar + Main)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* 1. STICKY SIDEBAR (Table of Contents) */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 bg-white rounded-sm p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
              <h4 className="font-serif font-bold text-primary text-lg mb-6 border-b border-slate-100 pb-4">Nội Dung</h4>
              <nav className="space-y-4 text-sm font-light">
                <a href="#muc-dich" onClick={(e) => handleClick(e, "muc-dich")} className={`block uppercase tracking-wider border-l-2 pl-4 transition-colors ${activeSection === "muc-dich" ? "text-accent font-bold border-accent" : "text-slate-400 hover:text-primary border-transparent"}`}>1. Mục đích thu thập</a>
                <a href="#pham-vi" onClick={(e) => handleClick(e, "pham-vi")} className={`block uppercase tracking-wider border-l-2 pl-4 transition-colors ${activeSection === "pham-vi" ? "text-accent font-bold border-accent" : "text-slate-400 hover:text-primary border-transparent"}`}>2. Phạm vi dữ liệu</a>
                <a href="#cam-ket" onClick={(e) => handleClick(e, "cam-ket")} className={`block uppercase tracking-wider border-l-2 pl-4 transition-colors ${activeSection === "cam-ket" ? "text-accent font-bold border-accent" : "text-slate-400 hover:text-primary border-transparent"}`}>3. Cam kết bảo mật</a>
                <a href="#quyen-loi" onClick={(e) => handleClick(e, "quyen-loi")} className={`block uppercase tracking-wider border-l-2 pl-4 transition-colors ${activeSection === "quyen-loi" ? "text-accent font-bold border-accent" : "text-slate-400 hover:text-primary border-transparent"}`}>4. Quyền lợi khách hàng</a>
                <a href="#cookies" onClick={(e) => handleClick(e, "cookies")} className={`block uppercase tracking-wider border-l-2 pl-4 transition-colors ${activeSection === "cookies" ? "text-accent font-bold border-accent" : "text-slate-400 hover:text-primary border-transparent"}`}>5. Triển khai Cookies</a>
              </nav>
            </div>
          </aside>

          {/* 2. MAIN DOCUMENT */}
          <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="space-y-16">
              
              {/* Section 1 */}
              <div id="muc-dich" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">1. Mục Đích Thu Thập Thông Tin</h2>
                <div className="text-slate-600 font-light leading-loose space-y-4">
                  <p>
                    Hệ thống Pham Land chỉ tiến hành thu thập các thông tin cá nhân thiết yếu khi và chỉ khi quý khách hàng chủ động tương tác với nền tảng của chúng tôi (chẳng hạn như: điền form Nhận bảng giá, gửi yêu cầu Ký gửi tài sản, hoặc đăng ký nhận bản tin thị trường định kỳ). 
                  </p>
                  <p>Mục đích cốt lõi của chúng tôi tập trung vào 3 yếu tố:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500">
                    <li><strong className="text-primary font-medium">Cá nhân hóa giao dịch:</strong> Cung cấp chính xác thông tin dự án và hoạch định chiến lược tài chính sát với "khẩu vị" đầu tư của từng cá nhân.</li>
                    <li><strong className="text-primary font-medium">Chăm sóc đặc quyền:</strong> Gửi thông báo ưu tiên về tiến độ thi công, thiệp mời sự kiện Private, và các chính sách rạp giá độc quyền cho giới tinh hoa.</li>
                    <li><strong className="text-primary font-medium">Nâng cấp trải nghiệm số:</strong> Phân tích hành vi duyệt web ẩn danh nhằm tự động tối ưu hóa giao diện người dùng thường xuyên.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div id="pham-vi" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">2. Phạm Vi Truy Xuất Dữ Liệu</h2>
                <div className="text-slate-600 font-light leading-loose space-y-4">
                  <p>
                    Tôn trọng quyền riêng tư là nguyên tắc tối cao. Các luồng thông tin chúng tôi tiếp nhận và lưu trữ được giới hạn nghiêm ngặt, bao gồm:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500">
                    <li>Định danh cơ bản: Họ và tên, Phương thức liên lạc (Điện thoại, Kênh Chat), Địa chỉ Email.</li>
                    <li>Mô hình quan tâm: Loại hình bất động sản (Biệt thự compound, Shophouse thương mại, Căn hộ hạng sang, v.v.).</li>
                    <li>Khung năng lực số: Mức ngân sách giải ngân dự kiến và Toạ độ địa lý ưu tiên.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div id="cam-ket" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">3. Tuyên Ngôn Bảo Mật Tuyệt Đối</h2>
                <div className="text-slate-600 font-light leading-loose space-y-6">
                  <p>
                    Là đối tác tư vấn các tài sản có giá trị lên đến hàng triệu Đô-la, Pham Land thấu hiểu tính Kín Đáo (Confidentiality) chính là sinh mệnh của doanh nghiệp và là đặc quyền của giới thượng lưu.
                  </p>
                  <div className="bg-primary text-white p-8 md:p-10 rounded-sm shadow-xl relative overflow-hidden">
                    <span className="material-symbols-outlined absolute -top-4 -right-4 text-[120px] text-white/5 rotate-[-15deg]">shield_lock</span>
                    <p className="relative z-10 font-serif text-lg md:text-xl italic leading-relaxed">
                      "Chúng tôi tuyên bố hoàn toàn KHÔNG tham gia vào bất kỳ hình thức mua bán, trao đổi, hay chia sẻ chéo dữ liệu người dùng cho các tổ chức thứ ba dưới mọi vỏ bọc thương mại."
                    </p>
                  </div>
                  <p>
                    Mọi băng thông thông tin đều được mã hóa theo tiêu chuẩn SSL/TLS và được đóng băng trong Hệ thống Quản trị Khách hàng (CRM) nội bộ, dưới sự giám sát độc quyền của Hệ thống Phân quyền cấp cao nhất.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div id="quyen-loi" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">4. Quyền Kiểm Soát Của Khách Hàng</h2>
                <div className="text-slate-600 font-light leading-loose space-y-4">
                  <p>
                    Tại nền tảng Pham Land, khối tài sản quý giá nhất là sự an tâm của bạn. Quý khách nắm giữ toàn quyền sinh sát đối với kho dữ liệu cá nhân của mình:
                  </p>
                  <ul className="list-none space-y-4">
                    <li className="flex items-start gap-4 p-4 border border-slate-100 rounded-sm bg-slate-50/50">
                      <span className="material-symbols-outlined text-accent w-6 shrink-0 mt-0.5">manage_search</span>
                      <span className="text-slate-600"><strong>Truy xuất & Căn chỉnh:</strong> Yêu cầu rà soát và cập nhật thông tin nhận dạng mới nhất mượt mà mọi lúc.</span>
                    </li>
                    <li className="flex items-start gap-4 p-4 border border-slate-100 rounded-sm bg-slate-50/50">
                      <span className="material-symbols-outlined text-accent w-6 shrink-0 mt-0.5">delete_forever</span>
                      <span className="text-slate-600"><strong>Xóa sổ vĩnh viễn:</strong> Đơn phương yêu cầu hủy bỏ và xóa trắng toàn bộ lịch sử dữ liệu khỏi các Trạm Lưu Trữ của Pham Land mà không cần bất kỳ lý do giải trình nào.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div id="cookies" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">5. Triển Khai Cookies</h2>
                <div className="text-slate-600 font-light leading-loose space-y-4">
                  <p>
                    Hệ thống Pham Land (phamland.vn) sử dụng một lượng nhỏ các tập tin Cookies để nhận diện phiên làm việc. Cookies là chìa khóa để ghi nhớ thiết lập, tùy chọn bộ lọc dự án và hỗ trợ tải trang nhanh gấp 3 lần ở những lần truy cập sau của quý khách.
                  </p>
                  <p>
                    Quý khách hoàn toàn có thể chủ động vô hiệu hóa tính năng lưu trữ Cookies ngay tại phần cài đặt của Trình duyệt đang sử dụng mà không ảnh hưởng lớn đến việc tham khảo thông tin lõi của nền tảng.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Contact Box */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8 bg-[#0a1128] text-white p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent blur-[80px] opacity-30 rounded-full"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold mb-2">Đường Dây Nóng Bảo Mật</h3>
                <p className="text-white/60 font-light text-sm max-w-sm">Tín hiệu của bạn sẽ được giải mã trực tiếp bởi Giám đốc Cấp cao thay vì đội ngũ tư vấn thông thường.</p>
              </div>
              <a href="mailto:privacy@phamland.vn" className="relative z-10 shrink-0 bg-white text-primary hover:bg-accent hover:text-white px-8 py-3.5 rounded-sm text-[12px] font-bold uppercase tracking-widest transition-colors flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Báo Cáo Rủi Ro
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
