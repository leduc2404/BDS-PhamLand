"use client";

import { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendTelegramNotification } from "@/actions/telegram";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestedOptions = [
    { value: "Xây dựng danh mục Đầu tư mới", label: "Xây dựng danh mục Đầu tư mới" },
    { value: "Ký gửi & Phân phối Tài sản", label: "Ký gửi & Phân phối Tài sản" },
    { value: "Hoạch định Pháp lý giao dịch", label: "Hoạch định Pháp lý giao dịch" },
    { value: "Hỗ trợ đặc quyền khác", label: "Hỗ trợ đặc quyền khác" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        fullName,
        phone,
        email,
        consultationType: consultationType || "Không có",
        details,
        source: "Trang Liên Hệ / VIP Form"
      };

      // 1. Lưu vào Firebase
      await addDoc(collection(db, "consignments"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });

      // 2. Gửi Telegram
      await sendTelegramNotification(data);

      setSubmitted(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setConsultationType("");
      setDetails("");
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-transparent border border-accent/30 rounded-sm p-10 text-center flex flex-col items-center justify-center min-h-[400px] animate-[fade-in-up_0.5s_ease-out]">
        <span className="material-symbols-outlined text-5xl text-accent mb-6">workspace_premium</span>
        <h3 className="text-2xl font-serif text-white mb-2">Thông Điệp Đã Truyền Đi</h3>
        <p className="text-slate-400 font-light max-w-sm mx-auto">Giám đốc Khối đầu tư sẽ thẩm định và liên hệ trực tiếp với quý khách trong thời gian sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-slate-700/80 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                id="vip_name"
                placeholder="Họ và tên"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="vip_name" className="absolute left-0 top-3 text-slate-500 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-400 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                Họ và tên *
            </label>
          </div>
          <div className="relative group">
            <input
                type="tel"
                className="w-full bg-transparent border-0 border-b border-slate-700/80 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                id="vip_phone"
                placeholder="Số điện thoại"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="vip_phone" className="absolute left-0 top-3 text-slate-500 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-400 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
                Số điện thoại *
            </label>
          </div>
      </div>

      <div className="relative group">
          <input
            type="email"
            className="w-full bg-transparent border-0 border-b border-slate-700/80 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
            id="vip_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="vip_email" className="absolute left-0 top-3 text-slate-500 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-400 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
            Địa chỉ Email
          </label>
      </div>

      <div className="relative z-20">
          <CustomSelect 
            options={interestedOptions}
            theme="dark"
            placeholder="Chọn cấu trúc tư vấn"
            label="Lĩnh vực tư vấn *"
            className="w-full bg-transparent border-0 border-b py-3 text-left font-light outline-none transition-colors px-0"
            onChange={(val) => setConsultationType(val)}
          />
      </div>

      <div className="relative group">
          <textarea
            className="w-full bg-transparent border-0 border-b border-slate-700/80 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors resize-none h-24"
            id="vip_message"
            placeholder="Nội dung"
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          <label htmlFor="vip_message" className="absolute left-0 top-3 text-slate-500 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-400 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
            Đề xuất & Yêu cầu chi tiết *
          </label>
      </div>

      <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-white text-primary font-bold uppercase tracking-widest text-[13px] py-5 mt-6 rounded-sm transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] group/btn disabled:opacity-70 disabled:cursor-not-allowed"
      >
          {loading ? "Đang kết nối..." : "Thiết Lập Kết Nối VIP"}
          {!loading && <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 transition-transform duration-300">east</span>}
      </button>
    </form>
  );
}
