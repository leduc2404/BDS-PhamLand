"use client";

import { useState } from "react";

export default function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 500);
  };

  return (
    <section className="py-24 bg-background-light relative flex items-center justify-center">
      {/* Abstract decorative background */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-200/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-slate-200/50 to-transparent"></div>
      </div>
      
      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        <div className="bg-primary rounded-xl overflow-hidden shadow-lux-hover flex flex-col md:flex-row relative">
           {/* Subtle Gold Gradient Border effect pseudo-element */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary rounded-xl pointer-events-none opacity-50"></div>
          
          {/* Left: Copy */}
          <div className="md:w-5/12 p-10 md:p-14 text-white flex flex-col justify-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 leading-tigth">
              Nhận Bảng Giá &amp; <br/>
              <span className="text-accent italic">Bản Đồ Quy Hoạch</span>
            </h2>
            <p className="text-slate-300 font-light mb-10 leading-relaxed">
              Đăng ký ngay để nhận thông tin mật và mới nhất về các quỹ đất vàng tại Đà Nẵng, Quảng Nam chuẩn bị ra mắt trong quý này.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <span className="material-symbols-outlined text-accent font-light group-hover:scale-110 transition-transform" aria-hidden="true">
                  done_all
                </span>
                <span className="text-slate-200 text-sm font-light">Cập nhật giá thị trường mỗi tuần</span>
              </li>
              <li className="flex items-start gap-4 group">
                <span className="material-symbols-outlined text-accent font-light group-hover:scale-110 transition-transform" aria-hidden="true">
                  done_all
                </span>
                <span className="text-slate-200 text-sm font-light">Bản đồ quy hoạch 1/500 chi tiết</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="md:w-7/12 bg-white p-10 md:p-14 relative z-10 clip-path-slant md:rounded-l-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl font-serif text-primary font-medium mb-8">
              Thông tin đăng ký
            </h3>
            
            {submitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-8 rounded-md border border-emerald-100 flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-[fade-in-up_0.5s_ease-out]">
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
                  />
                </div>
                
                <div className="space-y-1 group">
                  <label htmlFor="area" className="text-xs uppercase tracking-widest text-slate-400 font-semibold group-focus-within:text-primary transition-colors">
                    Khu vực quan tâm
                  </label>
                  <div className="relative">
                    <select
                      id="area"
                      className="w-full bg-transparent border-0 border-b border-slate-200 focus:ring-0 focus:border-b-accent focus:border-accent py-3 outline-none text-slate-800 transition-colors appearance-none font-light px-0"
                    >
                      <option value="all">Tất cả khu vực</option>
                      <option value="da-nang">Đà Nẵng</option>
                      <option value="quang-nam">Quảng Nam</option>
                      <option value="quang-binh">Quảng Bình</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none font-light">
                      expand_more
                    </span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-4 mt-8 rounded-sm hover:bg-primary-light hover:shadow-lux transition-all text-sm uppercase tracking-widest"
                >
                  Nhận Tài Liệu Ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
