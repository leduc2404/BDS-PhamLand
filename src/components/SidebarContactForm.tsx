"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendTelegramNotification } from "@/actions/telegram";

interface SidebarContactFormProps {
  propertyTitle: string;
  propertyPrice: string;
  propertyUrl?: string;
}

export default function SidebarContactForm({ propertyTitle, propertyPrice, propertyUrl }: SidebarContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);

    try {
      const data = {
        fullName: name,
        phone,
        email: "",
        consultationType: "Tải bảng giá & CSBH",
        details: `Quan tâm: ${propertyTitle} — ${propertyPrice}`,
        source: `Trang Chi Tiết BĐS: ${propertyTitle}`,
        propertyUrl: propertyUrl || "",
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
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Lỗi gửi form sidebar:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <span className="material-symbols-outlined text-4xl text-accent mb-4 block">check_circle</span>
        <h3 className="text-white font-serif font-medium mb-2">Đăng ký thành công!</h3>
        <p className="text-slate-400 text-sm font-light">Chuyên viên sẽ liên hệ quý khách sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative group">
        <input
          type="text"
          required
          className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
          id={`sidebar_name_${propertyTitle.slice(0, 5)}`}
          placeholder="Họ và tên *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor={`sidebar_name_${propertyTitle.slice(0, 5)}`}
          className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none"
        >
          Họ và tên *
        </label>
      </div>
      <div className="relative group">
        <input
          type="tel"
          required
          className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent hover:border-slate-500 focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
          id={`sidebar_phone_${propertyTitle.slice(0, 5)}`}
          placeholder="Số điện thoại *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label
          htmlFor={`sidebar_phone_${propertyTitle.slice(0, 5)}`}
          className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none"
        >
          Số điện thoại *
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-white text-primary font-bold py-4 rounded-sm text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.2)] mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Đang gửi..." : "Tải bảng giá & CSBH"}
        {!loading && <span className="material-symbols-outlined text-[16px]">download</span>}
      </button>
      <div className="text-center pt-4">
        <p className="text-[10px] text-slate-400 font-light uppercase tracking-widest mb-1.5">Hotline hỗ trợ 24/7</p>
        <a href="tel:0905098018" className="text-white text-lg font-serif italic hover:text-accent transition-colors">0905.098.018</a>
      </div>
    </form>
  );
}
