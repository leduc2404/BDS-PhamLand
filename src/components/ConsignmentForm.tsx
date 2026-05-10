"use client";

import { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendTelegramNotification } from "@/actions/telegram";
import { uploadImageServerAction } from "@/actions/upload";
import imageCompression from "browser-image-compression";

export default function ConsignmentForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ... (propertyOptions and other handlers remain the same) ...
  const propertyOptions = [
    { value: "Nhà phố / Shophouse", label: "Nhà phố / Shophouse" },
    { value: "Căn hộ hạng sang", label: "Căn hộ hạng sang" },
    { value: "Đất nền / Đất dự án", label: "Đất nền / Đất dự án" },
    { value: "Biệt thự / Villa nghỉ dưỡng", label: "Biệt thự / Villa nghỉ dưỡng" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls: string[] = [];

      if (files.length > 0) {
        // Compression configuration
        const options = {
          maxSizeMB: 1.5,             // Max target size 1.5MB
          maxWidthOrHeight: 1280,     // Max dimension
          useWebWorker: true,         // Run in background thread
          initialQuality: 0.8         // 80% quality
        };
        
        const uploadPromises = files.map(async (file) => {
          // 1. Nén ảnh trước
          const compressedFile = await imageCompression(file, options);
          
          // 2. Upload ảnh đã nén qua Server Action
          const formData = new FormData();
          formData.append("image", compressedFile, file.name);
          
          try {
            const url = await uploadImageServerAction(formData);
            return url;
          } catch (error: any) {
            throw new Error(error.message || "Lỗi upload ảnh");
          }
        });
        
        const urls = await Promise.all(uploadPromises);
        imageUrls.push(...urls);
      }

      const data = {
        fullName,
        phone,
        email: "Không yêu cầu", // Field not in form
        consultationType: propertyType || "Chưa chọn tài sản",
        details: price + " VNĐ",
        address,
        images: imageUrls,
        source: "Trang Ký Gửi Dành Riêng"
      };

      // 2. Lưu vào Firestore (Free tier is generous enough)
      await addDoc(collection(db, "consignments"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });

      // 3. Gửi Telegram
      await sendTelegramNotification(data);

      setSubmitted(true);
      
      // Reset form
      setFullName("");
      setPhone("");
      setPropertyType("");
      setPrice("");
      setAddress("");
      setFiles([]);
      
      setTimeout(() => setSubmitted(false), 8000);
    } catch (error: any) {
      console.error("Lỗi khi Ký gửi:", error);
      alert(`Có lỗi xảy ra: ${error.message || "Quá trình kết nối bị gián đoạn. Vui lòng thử tải lại trang."}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-transparent border border-accent/20 rounded-sm p-10 mt-10 text-center flex flex-col items-center justify-center min-h-[400px] animate-[fade-in-up_0.5s_ease-out]">
        <span className="material-symbols-outlined text-5xl text-accent mb-6">task_alt</span>
        <h3 className="text-2xl font-serif text-white mb-2">Tài liệu đã được mã hóa và gửi đi</h3>
        <p className="text-slate-400 font-light max-w-sm mx-auto">Chuyên viên tư vấn khu vực sẽ liên lạc theo số điện thoại đã cung cấp để chốt lịch hẹn thẩm định thực tế trong vòng 30 phút.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
      {/* Box 1: Contact Info */}
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label htmlFor="phone" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
              Số điện thoại liên hệ *
            </label>
          </div>
        </div>
      </div>

      {/* Box 2: Property Info & Images */}
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
              onChange={(val) => setPropertyType(val)}
            />

            <div className="relative group">
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-accent focus:ring-0 py-3 text-white font-light placeholder:text-transparent peer outline-none transition-colors"
                id="price"
                placeholder="Giá bán"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label htmlFor="address" className="absolute left-0 top-3 text-slate-400 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-medium peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-slate-500 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none">
              Địa chỉ chi tiết bất động sản *
            </label>
          </div>

          {/* Upload box */}
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center px-6 py-12 border border-dashed border-white/20 hover:border-accent/50 rounded-sm bg-white/5 hover:bg-accent/5 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-accent/20">
                <span className="material-symbols-outlined text-3xl text-accent">add_photo_alternate</span>
              </div>
              <p className="text-base text-white font-medium mb-2">
                Tải lên hình ảnh thực tế / Sổ đỏ
              </p>
              <p className="text-xs text-slate-400 font-light text-center">
                Kéo thả file vào đây hoặc nhấn để chọn<br/>(PNG, JPG - Tối đa 5 ảnh, max 10MB/ảnh)
              </p>
              <input 
                type="file" 
                className="sr-only" 
                multiple 
                accept="image/png, image/jpeg, image/jpg" 
                onChange={handleFileChange} 
              />
            </label>
            
            {/* Display selected files */}
            {files.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group/tag flex items-center gap-2 bg-white/10 border border-white/20 pl-3 pr-2 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[16px] text-accent font-light">image</span>
                    <span className="text-xs text-slate-300 max-w-[150px] truncate">{file.name}</span>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)} 
                      className="ml-1 w-5 h-5 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors"
                      title="Xoá ảnh"
                    >
                      <span className="material-symbols-outlined text-[12px] text-white">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-white disabled:opacity-70 disabled:hover:bg-accent disabled:cursor-not-allowed text-primary font-bold uppercase tracking-widest text-[13px] py-5 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_5px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_5px_20px_rgba(255,255,255,0.4)]"
        >
          {loading ? (
            "Đang xử lý tài liệu & định giá..."
          ) : (
            <>
              Gửi thông tin định giá
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
        <p className="mt-6 text-center text-xs text-slate-400 font-light flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-accent">gpp_good</span>
          Giao dịch an toàn - Thông tin mã hóa chuẩn quân đội
        </p>
      </div>
    </form>
  );
}
