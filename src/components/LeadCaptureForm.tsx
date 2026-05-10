"use client";

import { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendTelegramNotification } from "@/actions/telegram";

export default function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("lead-capture-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        fullName: name,
        phone,
        email: "",
        consultationType: "Nhận Bảng Giá & Bản Đồ Quy Hoạch",
        details: `Khu vực quan tâm: ${region}`,
        source: "Trang Chủ / Lead Capture Form"
      };

      await addDoc(collection(db, "consignments"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });

      await sendTelegramNotification(data);

      setSubmitted(true);
      setName("");
      setPhone("");
      setRegion("all");
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="lead-capture-section"
      className="py-24 md:py-32 bg-background-light relative flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced decorative backgrounds */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      <div
        className={`max-w-5xl w-full mx-auto px-4 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-primary rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] flex flex-col md:flex-row relative">
           {/* Subtle Gold Gradient Border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary rounded-xl pointer-events-none opacity-50" />
          
          {/* Left: Copy */}
          <div className="md:w-5/12 p-10 md:p-14 text-white flex flex-col justify-center relative z-10">
            <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.2em] text-[10px] font-semibold mb-6">
              <span className="w-8 h-[1px] bg-accent/50 inline-block" />
              Ưu đãi đặc biệt
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 leading-tight">
              Nhận Bảng Giá &amp; <br/>
              <span className="text-accent italic">Bản Đồ Quy Hoạch</span>
            </h2>
            <p className="text-slate-300 font-light mb-10 leading-relaxed">
              Đăng ký ngay để nhận thông tin mật và mới nhất về các quỹ đất vàng tại Đà Nẵng, Quảng Nam chuẩn bị ra mắt trong quý này.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <span className="material-symbols-outlined text-accent text-sm font-light" aria-hidden="true">
                    done_all
                  </span>
                </div>
                <span className="text-slate-200 text-sm font-light">Cập nhật giá thị trường mỗi tuần</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <span className="material-symbols-outlined text-accent text-sm font-light" aria-hidden="true">
                    done_all
                  </span>
                </div>
                <span className="text-slate-200 text-sm font-light">Bản đồ quy hoạch 1/500 chi tiết</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <span className="material-symbols-outlined text-accent text-sm font-light" aria-hidden="true">
                    done_all
                  </span>
                </div>
                <span className="text-slate-200 text-sm font-light">Tư vấn 1-1 với chuyên gia</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="md:w-7/12 bg-white p-10 md:p-14 relative z-10 clip-path-slant md:rounded-l-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl font-serif text-primary font-medium mb-2">
              Thông tin đăng ký
            </h3>
            <p className="text-slate-400 text-sm font-light mb-8">
              Điền thông tin để nhận tài liệu độc quyền
            </p>
            
            {submitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-8 rounded-lg border border-emerald-100 flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-emerald-600 font-light" aria-hidden="true">
                    check_circle
                  </span>
                </div>
                <h4 className="font-serif text-xl font-medium mb-2">Đăng ký thành công!</h4>
                <p className="text-emerald-700/80 font-light text-sm">Chuyên viên của Pham Land sẽ liên hệ với quý khách trong thời gian sớm nhất.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 group">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-400 font-semibold group-focus-within:text-primary transition-colors">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-slate-200 focus:border-accent py-3 outline-none text-slate-800 transition-colors placeholder:text-slate-300 font-light"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1 group">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest text-slate-400 font-semibold group-focus-within:text-primary transition-colors">
                    Số điện thoại/Zalo *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full bg-transparent border-b border-slate-200 focus:border-accent py-3 outline-none text-slate-800 transition-colors placeholder:text-slate-300 font-light"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1 group relative z-50">
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold group-focus-within:text-primary transition-colors">
                    Khu vực quan tâm
                  </label>
                  <CustomSelect 
                    options={[
                      { value: "all", label: "Tất cả khu vực" },
                      { value: "da-nang", label: "Đà Nẵng" },
                      { value: "quang-nam", label: "Quảng Nam" },
                      { value: "quang-binh", label: "Quảng Bình" },
                    ]}
                    placeholder="Tất cả khu vực"
                    defaultValue="all"
                    theme="light"
                    floatingLabel={false}
                    className="w-full bg-transparent border-0 border-b py-3 text-left font-light outline-none transition-colors px-0"
                    onChange={(val) => setRegion(val)}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-medium py-4 mt-8 rounded-sm hover:bg-accent hover:shadow-[0_8px_32px_rgba(197,160,89,0.3)] transition-all text-sm uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Đang xử lý..." : "Nhận Tài Liệu Ngay"}
                    {!loading && (
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        arrow_forward
                      </span>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
